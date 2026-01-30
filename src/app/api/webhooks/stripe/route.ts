import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any; // Stripe.Checkout.Session
        const metadata = session.metadata || {};
        const userId = metadata.userId;

        // Supabase更新処理
        if (userId) {
            const supabaseAdmin = createAdminClient();

            // セットアップ購入済みフラグの更新
            // subscription_with_setup の場合、もしくはずっと前から購入済みの場合は考慮不要だが
            // ここでは今回購入されたセットアップについて更新する
            const type = metadata.type;

            if (type === 'subscription_with_setup') {
                await supabaseAdmin
                    .from('profiles')
                    .update({
                        is_setup_purchased: true,
                        setup_status: 'pending' // 初期状態はpending
                    } as any)
                    .eq('id', userId);
            }

            // サブスクリプションステータス等の更新も通常ここで行うが、
            // 今回の要件はセットアップフローにフォーカスしているため割愛
            // (本来は subscription_id 保存などが必要)
        }

        // Discord通知
        if (process.env.DISCORD_WEBHOOK_URL) {
            const shopName = metadata.shopName || '不明な店舗';
            const planName = metadata.planName || '不明なプラン';
            const isSetupIncluded = metadata.type === 'subscription_with_setup';

            const discordPayload = {
                embeds: [
                    {
                        title: '💰 新規申し込み発生！',
                        color: 5763719, // Green
                        fields: [
                            {
                                name: '店舗名 (Shop Name)',
                                value: shopName,
                                inline: true,
                            },
                            {
                                name: 'プラン (Plan)',
                                value: planName,
                                inline: true,
                            },
                            {
                                name: 'セットアップ有無 (Setup)',
                                value: isSetupIncluded ? 'あり' : 'なし',
                                inline: true,
                            },
                            {
                                name: 'ユーザーID',
                                value: userId || 'N/A',
                                inline: false,
                            },
                        ],
                        timestamp: new Date().toISOString(),
                    },
                ],
            };

            try {
                await fetch(process.env.DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(discordPayload),
                });
            } catch (error) {
                console.error('Failed to send Discord notification:', error);
            }
        }
    }

    return NextResponse.json({ received: true });
}
