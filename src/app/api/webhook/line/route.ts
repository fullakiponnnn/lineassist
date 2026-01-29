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
// The shop owner registers https://myapp.com/api/webhook/line/<their-profile-id> in LINE Developers.

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
            // Optional: Handle keywords, but for now just silence or echo?
            // Let's not reply to avoid spamming unless it's a specific command.
            return
        }

        // 2. If not connected, try to match by NAME sent in text
        // This is a "Heuristic Matching" - weak security but high usability for initial setup.
        // Better: Send a unique code?
        // Simplest for now: User sends their exact registered name.
        // ... (Existing name matching logic) ...

        const { data: matchCustomers } = await supabase
            .from('customers')
            .select('*')
            .eq('profile_id', shopId)
            .eq('display_name', text)
            .is('line_user_id', null) // Only match unlinked customers

        // Strict match: Only if exactly 1 customer matches that name and is not linked
        if (matchCustomers && matchCustomers.length === 1) {
            const customer = matchCustomers[0]

            // Link them!
            await supabase
                .from('customers')
                .update({
                    line_user_id: userId,
                    // Optionally update name to LINE name? No, keep shop's record.
                })
                .eq('id', customer.id)

            // Reply success
            await lineService.replyMessage(replyToken, [{
                type: 'text',
                text: `${customer.display_name}様、連携が完了しました！\n次回から来店後に写真をお送りします。`
            }])
        } else if (matchCustomers && matchCustomers.length > 1) {
            // Too many matches
            await lineService.replyMessage(replyToken, [{
                type: 'text',
                text: `「${text}」様というお名前の顧客データが複数見つかりました。店舗スタッフにお問い合わせください。`
            }])
        } else {
            // No match
            await lineService.replyMessage(replyToken, [{
                type: 'text',
                text: `「${text}」様のお名前が見つかりませんでした。\n\n美容室で登録した「正確なお名前（フルネーム）」を送信してください。\nご不明な場合はスタッフにお声がけください。`
            }])
        }
    }))

    return NextResponse.json({ success: true })
}
