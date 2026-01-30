import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
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
        const { planId, withSetup } = body;

        if (!planId) {
            return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
        }

        // DBからプロフィール情報を取得
        const { data: profile } = await supabase
            .from('profiles')
            .select('shop_name, stripe_customer_id')
            .eq('id', user.id)
            .single();

        const shopName = profile?.shop_name || '店舗名未設定';
        let customerId = profile?.stripe_customer_id;

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
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id);
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
        // 年額プランの場合は無料特典として付帯するため、ここでの課金ラインアイテムは追加しないが、
        // メタデータでセットアップありとして扱う
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

        const session = await stripe.checkout.sessions.create({
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
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/setup-thanks`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pricing`, // 仮のURL
            allow_promotion_codes: true,
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe Checkout Error:', err);
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
