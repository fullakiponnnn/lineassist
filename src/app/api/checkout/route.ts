import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        // type: check mode ('subscription' or 'payment')
        // planId: for subscription
        // priceId: for one-time payment (setup fee)
        const { planId, withSetup, mode = 'subscription', priceId } = body;

        // DBからプロフィール情報を取得
        // @ts-ignore
        const { data: profile } = await supabase
            .from('profiles')
            .select('shop_name, stripe_customer_id')
            .eq('id', user.id)
            .single();

        const shopName = (profile as any)?.shop_name || '店舗名未設定';
        let customerId = (profile as any)?.stripe_customer_id;

        // Stripe上でCustomerを作成（未登録の場合）
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email!,
                metadata: {
                    supabaseUUID: user.id
                }
            });
            customerId = customer.id;

            // プロフィールを更新
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId } as any)
                .eq('id', user.id);
        }

        let session;

        // Base URLの判定
        let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
        if (process.env.VERCEL_URL) {
            baseUrl = `https://${process.env.VERCEL_URL}`;
        }
        // 末尾のスラッシュを削除
        baseUrl = baseUrl.replace(/\/$/, '');

        if (mode === 'payment') {
            // 単発決済モード（主に既存会員のセットアップ購入用）
            if (!priceId) {
                return NextResponse.json({ error: 'Price ID is required for payment mode' }, { status: 400 });
            }

            session = await stripe.checkout.sessions.create({
                customer: customerId,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                metadata: {
                    userId: user.id,
                    shopName: shopName,
                    type: 'setup_fee_only', // Webhookで判定用
                    planName: '初期導入サポート',
                },
                success_url: `${baseUrl}/setup-thanks`,
                cancel_url: `${baseUrl}/settings`,
                allow_promotion_codes: true,
            });

        } else {
            // サブスクリプションモード
            if (!planId) {
                return NextResponse.json({ error: 'Plan ID is required for subscription mode' }, { status: 400 });
            }

            // プラン情報を取得して年額かどうか判定
            const price = await stripe.prices.retrieve(planId);
            const isYearly = price.recurring?.interval === 'year';

            const line_items = [
                {
                    price: planId,
                    quantity: 1,
                },
            ];

            // 月額プラン かつ セットアップ希望の場合のみ初期費用を追加
            if (!isYearly && withSetup) {
                const setupPriceId = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SETUP;
                if (!setupPriceId) {
                    throw new Error('Setup price ID is not configured');
                }
                line_items.push({
                    price: setupPriceId,
                    quantity: 1,
                });
            }

            const hasSetup = isYearly || withSetup;

            session = await stripe.checkout.sessions.create({
                customer: customerId,
                line_items,
                mode: 'subscription',
                subscription_data: {
                    metadata: {
                        userId: user.id,
                    }
                },
                metadata: {
                    userId: user.id,
                    shopName: shopName,
                    type: hasSetup ? 'subscription_with_setup' : 'subscription_only',
                    planName: isYearly ? '年額プラン' : '月額プラン',
                    isSetupFree: isYearly ? 'true' : 'false',
                },
                success_url: `${baseUrl}/setup-thanks`,
                cancel_url: `${baseUrl}/pricing`,
                allow_promotion_codes: true,
            });
        }

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
