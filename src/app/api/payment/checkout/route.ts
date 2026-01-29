import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { stripe } from '@/utils/stripe'

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { priceId, isYearly } = await request.json()

        // Get user profile to check if Stripe Customer ID exists
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id, email, shop_name')
            .eq('id', user.id)
            .single()

        let customerId = profile?.stripe_customer_id

        // Create Stripe Customer if not exists
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email!,
                name: profile?.shop_name || undefined,
                metadata: {
                    supabase_user_id: user.id
                }
            })
            customerId = customer.id

            // Save to DB
            await supabase
                .from('profiles')
                .update({ stripe_customer_id: customerId })
                .eq('id', user.id)
        }

        // Guard: Prevent duplicate subscriptions
        // If user is already on a paid plan and active, do not allow new checkout
        if (profile?.subscription_status === 'active' && profile?.plan_tier !== 'free') {
            return NextResponse.json({ error: 'すでに有料プランを契約中です。プラン変更は「契約内容の確認・変更」から行ってください。' }, { status: 400 })
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: `${siteUrl}/settings?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/settings?canceled=true`,
            client_reference_id: user.id,
            metadata: {
                // Determine plan tier based on priceId (Simple logic for now)
                plan_tier: priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY || priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY ? 'solo' : 'standard',
                plan_interval: isYearly ? 'year' : 'month'
            }
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })

    } catch (error: any) {
        console.error('Stripe Checkout Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
