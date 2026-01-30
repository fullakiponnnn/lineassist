import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { LineService } from '@/utils/line'
import * as line from '@line/bot-sdk'

// Note: In a real multi-tenant app, we need to know WHICH shop this webhook is for.
// Standard LINE Webhook doesn't explicitly tell us the "Channel ID" in the payload easily suitable for multi-tenant lookup 
// WITHOUT registering a unique webhook URL for each shop (e.g. /api/webhook/line/[shopId]).
// 
// STRATEGY:
// Use a dynamic route: /api/webhook/line/[shopId]
// The shop owner registers https://www.snapkarte.jp/api/webhook/line/<their-profile-id> in LINE Developers.

export const dynamic = 'force-dynamic'

export async function POST(
    request: Request,
) {
    // Since we can't easily use dynamic route params in the same file structure without moving folders,
    // For now, let's assume the user passes the shop ID in the query string or we try to find the user by... Wait.
    // 
    // The problem: When LINE sends a webhook, we receive the UserID of the customer. We DON'T know which Shop (Channel) this is sent to,
    // unless we check the `destination` field (User ID of the bot) provided in the webhook body.
    // 
    // Let's rely on the `destination` field in the webhook body to identify the Shop (Profile).
    // But wait, we store `line_channel_token`, we likely don't store the Bot's User ID (destination).
    // 
    // To make this robust for SaaS:
    // 1. The URL should be `/api/webhook/line/[profileId]`
    // This is the safest way. But Route Handlers require folder structure.
    // 
    // Let's refuse to implement a "One Endpoint Fits All" without lookup tables.
    // Instead, I will implement a simpler version where we MUST verify the signature properly.
    // Because we are acting as a platform, we actually might be processing webhooks for MANY channels.
    // 
    // However, simplest MVP for SaaS:
    // User registers Webhook URL: `.../api/webhook/line?shop_id=<PROFILE_ID>`

    const url = new URL(request.url)
    const shopId = url.searchParams.get('shop_id')

    if (!shopId) {
        return NextResponse.json({ error: 'Shop ID required in URL' }, { status: 400 })
    }

    const body = await request.text()
    const signature = request.headers.get('x-line-signature') || ''

    // In a real scenario, we need the Channel Secret to verify the signature.
    // We would fetch it from the DB using shopId.
    const supabase = createAdminClient()

    // Fetch Shop Settings
    // Fetch Shop Settings
    const { data: profile } = await supabase
        .from('profiles')
        .select('line_channel_token, line_channel_secret, shop_name')
        .eq('id', shopId)
        .single()

    // @ts-ignore
    if (!profile || !profile.line_channel_token || !profile.line_channel_secret) {
        return NextResponse.json({ error: 'Shop not properly configured (Missing Token or Secret)' }, { status: 404 })
    }

    // STRICT SIGNATURE VALIDATION
    // @ts-ignore
    if (!line.validateSignature(body, profile.line_channel_secret, signature)) {
        console.error('Invalid signature for shop:', shopId)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse Payload
    const data = JSON.parse(body)
    const events = data.events

    console.log('Webhook Received:', JSON.stringify(events, null, 2)) // Debug log

    // @ts-ignore
    const lineService = new LineService(profile.line_channel_token)

    // Process events
    await Promise.all(events.map(async (event: any) => {
        const userId = event.source.userId
        const replyToken = event.replyToken

        // --- Handle Follow Event (Friend Add) ---
        if (event.type === 'follow') {
            try {
                // 1. Get LINE Profile
                const profile = await lineService.getProfile(userId)
                const displayName = profile.displayName

                // 2. Check if already exists
                const { data: existingCustomer } = await supabase
                    .from('customers')
                    .select('*')
                    .eq('profile_id', shopId)
                    .eq('line_user_id', userId)
                    .single()

                if (!existingCustomer) {
                    // 3. Register new customer
                    await supabase
                        .from('customers')
                        .insert({
                            profile_id: shopId,
                            line_user_id: userId,
                            display_name: displayName, // Use LINE name initially
                            // created_at will be set by default
                        })
                }

                // 4. Send Welcome Message
                await lineService.replyMessage(replyToken, [{
                    type: 'text',
                    text: `友だち追加ありがとうございます！\n\n会員登録が完了しました。\n次回ご来店の際に、こちらの画面をご提示ください。`
                }])

            } catch (err) {
                console.error('Follow Event Error:', err)
            }
            return
        }

        // --- Handle Text Message Event ---
        if (event.type !== 'message' || event.message.type !== 'text') {
            return
        }

        const text = event.message.text.trim()

        // 1. Try to find a customer with this LINE User ID first
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('*')
            .eq('profile_id', shopId)
            .eq('line_user_id', userId)
            .single()

        if (existingCustomer) {
            // Already connected

            // Check if the user is asking for their member card
            const lowerText = text.toLowerCase()
            const isCardRequest = ['会員証', 'カード', 'member', 'card', 'qr', 'マイページ'].some(keyword => lowerText.includes(keyword))

            if (isCardRequest) {
                // @ts-ignore
                let memberCode = existingCustomer.member_code

                // Generate member code if missing (Still used for display/scan)
                if (!memberCode) {
                    // Simple 8-char random alphanumeric code
                    memberCode = Math.random().toString(36).substring(2, 10).toUpperCase()

                    await supabase
                        .from('customers')
                        // @ts-ignore
                        .update({ member_code: memberCode })
                        .eq('id', existingCustomer.id)
                }

                // Construct Secure Card URL using url_token
                const urlObj = new URL(request.url)
                const origin = process.env.NEXT_PUBLIC_SITE_URL || `${urlObj.protocol}//${urlObj.host}`
                // @ts-ignore
                const cardUrl = `${origin}/card/${existingCustomer.url_token || existingCustomer.member_code}` // Fallback if migration delayed

                // Reply with Flex Message
                // @ts-ignore
                await lineService.replyMessage(replyToken, [{
                    type: 'flex',
                    altText: '会員証を表示します',
                    contents: {
                        type: 'bubble',
                        header: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'text',
                                    text: 'MEMBERSHIP CARD',
                                    weight: 'bold',
                                    color: '#1DB446',
                                    size: 'xs'
                                },
                                {
                                    type: 'text',
                                    text: '会員証',
                                    weight: 'bold',
                                    size: 'xl',
                                    margin: 'md'
                                }
                            ]
                        },
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'text',
                                    text: `${existingCustomer.display_name} 様`,
                                    weight: 'bold',
                                    size: 'lg'
                                },
                                {
                                    type: 'text',
                                    text: 'ご来店の際は、以下のボタンをタップして会員証をご提示ください。',
                                    wrap: true,
                                    size: 'sm',
                                    color: '#666666',
                                    margin: 'md'
                                }
                            ]
                        },
                        footer: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'button',
                                    style: 'primary',
                                    height: 'sm',
                                    action: {
                                        type: 'uri',
                                        label: '会員証を表示',
                                        uri: cardUrl
                                    },
                                    color: '#06c755'
                                }
                            ]
                        }
                    }
                }])
            }

            // Optional: Handle keywords, but for now just silence or echo?
            // Let's not reply to avoid spamming unless it's a specific command.
            return
        }

        // 2. CHECK FOR LINK TOKEN (Secure Integration)
        const linkTokenMatch = text.match(/^連携コード[:：]\s*(.+)$/)
        if (linkTokenMatch) {
            const token = linkTokenMatch[1].trim()

            const { data: customerData } = await supabase
                .from('customers')
                .select('*')
                .eq('profile_id', shopId)
                .eq('link_token', token)
                .is('line_user_id', null) // Ensure not already linked? Actually, re-linking might be okay if user changed LINE account.
                // But for safety let's only allow unlinked or handle overwrite carefully.
                // Let's assume re-linking is OK (e.g. migration), but we need to update the record.
                .single()

            if (customerData) {
                // Link Success!
                await supabase
                    .from('customers')
                    .update({
                        line_user_id: userId,
                        link_token: null // Invalidate token (One-time use)
                    } as any)
                    .eq('id', customerData.id)

                await lineService.replyMessage(replyToken, [{
                    type: 'text',
                    text: `${customerData.display_name}様、設定お疲れ様です！\nLINE連携が完了しました。\n\n次回からご来店後に、こちらのLINEへスタイル写真や美容履歴をお届けします。`
                }])
            } else {
                await lineService.replyMessage(replyToken, [{
                    type: 'text',
                    text: `連携コードが無効か、すでに使用されています。\n店舗スタッフに新しいコードの発行をご依頼ください。`
                }])
            }
            return
        }

        // 3. Fallback: No match found
        // Previously we used Name Matching here, but it is insecure.
        // We will output a generic message guiding to use the QR code.

        await lineService.replyMessage(replyToken, [{
            type: 'text',
            text: `メッセージありがとうございます！\n\n【会員連携について】\nまだLINE連携がお済みでない場合は、店舗スタッフに「連携用QRコード」を提示してもらってください。\n\nすでにお済みの方は、会員証を表示するには「会員証」と送信してください。`
        }])

        /* DEPRECATED: Insecure Name Matching
        // 2. If not connected, try to match by NAME sent in text
        // ... (Existing name matching logic) ...
        const { data: matchCustomers } = await supabase
            .from('customers')
            .select('*')
            .eq('profile_id', shopId)
            .eq('display_name', text)
            .is('line_user_id', null) // Only match unlinked customers

        // Strict match: Only if exactly 1 customer matches that name and is not linked
        if (matchCustomers && matchCustomers.length === 1) {
             // ...
        }
        */
    }))

    return NextResponse.json({ success: true })
}
