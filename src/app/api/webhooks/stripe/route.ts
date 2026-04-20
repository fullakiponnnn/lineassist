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

            if (type === 'subscription_with_setup' || type === 'setup_fee_only') {
                await supabaseAdmin
                    .from('profiles')
                    .update({
                        is_setup_purchased: true,
                        setup_status: 'pending' // 初期状態はpending
                    } as any)
                    .eq('id', userId);
            }

            // サブスクリプション情報の更新
            // チェックアウトセッションでサブスクリプションが作成された場合
            // サブスクリプション情報の更新
            // チェックアウトセッションでサブスクリプションが作成された場合
            if (session.mode === 'subscription' && session.subscription) {
                const subscriptionId = typeof session.subscription === 'string'
                    ? session.subscription
                    : (session.subscription as any).id;

                if (subscriptionId) {
                    // サブスクリプション詳細を取得して期間終了日などを確認
                    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;

                    const currentPeriodEnd = subscription.current_period_end
                        ? new Date(subscription.current_period_end * 1000).toISOString()
                        : new Date().toISOString();

                    await supabaseAdmin
                        .from('profiles')
                        .update({
                            // stripe_subscription_id: subscriptionId,
                            subscription_status: subscription.status, // active, trialing, etc.
                            plan_tier: 'solo', // 現状はSoloプランのみ
                            plan_interval: metadata.planName === '年額プラン' ? 'year' : 'month',
                            current_period_end: currentPeriodEnd
                        } as any)
                        .eq('id', userId);
                }
            }

            // サブスクリプションステータス等の更新も通常ここで行うが、
            // 今回の要件はセットアップフローにフォーカスしているため割愛
            // (本来は subscription_id 保存などが必要)
        }

        // Discord通知
        if (process.env.DISCORD_WEBHOOK_URL) {
            const shopName = metadata.shopName || '不明な店舗';
            const planName = metadata.planName || '不明なプラン';
            const type = metadata.type;
            const isSetupIncluded = type === 'subscription_with_setup' || type === 'setup_fee_only';

            // 通知タイトル
            let title = '💰 新規申し込み発生！';
            if (type === 'setup_fee_only') {
                title = '🛠️ 初期セットアップ購入！';
            }

            const discordPayload = {
                embeds: [
                    {
                        title: title,
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

            // Setup support email notification
            if (isSetupIncluded) {
                const userEmail = session.customer_details?.email;
                if (userEmail) {
                    try {
                        const { sendSetupEmail } = await import('@/utils/resend');
                        await sendSetupEmail(userEmail, shopName, userId);
                    } catch (emailError) {
                        console.error('Failed to send setup email:', emailError);
                    }
                } else {
                    console.warn('No email found directly in session for setup notification. UserId:', userId);
                    // Optionally fetch user email from Supabase if critical
                }
            }

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
    } else if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
        const subscription = event.data.object as any;
        const supabaseAdmin = createAdminClient();

        const currentPeriodEnd = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : new Date().toISOString();

        const updateData: any = {
            subscription_status: subscription.status,
            current_period_end: currentPeriodEnd,
        };

        // 解約（canceled）または未払い（unpaid）の場合はフリープランへダウングレード
        if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
            updateData.plan_tier = 'free';
        }

        await supabaseAdmin
            .from('profiles')
            .update(updateData)
            .eq('stripe_subscription_id', subscription.id);

        // 解約時のDiscord通知
        if ((subscription.status === 'canceled' || subscription.status === 'unpaid') && process.env.DISCORD_WEBHOOK_URL) {
            const discordPayload = {
                embeds: [
                    {
                        title: '⚠️ サブスクリプション解約・停止',
                        color: 15548997, // Red
                        fields: [
                            {
                                name: 'Subscription ID',
                                value: subscription.id,
                                inline: false,
                            },
                            {
                                name: 'Status',
                                value: subscription.status,
                                inline: true,
                            }
                        ],
                        timestamp: new Date().toISOString(),
                    },
                ],
            };
            try {
                await fetch(process.env.DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(discordPayload),
                });
            } catch (error) {
                console.error('Failed to send Discord cancellation notification:', error);
            }
        }
    }

    return NextResponse.json({ received: true });
}
