import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/utils/stripe'
import { createAdminClient } from '@/utils/supabase/admin'
import Stripe from 'stripe'

export async function POST(request: Request) {
    const body = await request.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 })
    }

    const supabase = createAdminClient()

    try {
        switch (event.type) {
            // Subscription Created (Immediate Feedback using metadata)
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session
                console.log('WH: checkout.session.completed', session.id)

                // Checkout Session has metadata we added during creation
                const planTier = session.metadata?.plan_tier
                const planInterval = session.metadata?.plan_interval
                const customerId = session.customer as string
                const subscriptionId = session.subscription as string

                console.log('WH: Metadata:', { planTier, planInterval, customerId })

                if (planTier && customerId) {
                    const { error } = await supabase
                        .from('profiles')
                        .update({
                            stripe_subscription_id: subscriptionId,
                            subscription_status: 'active', // Assume active on success
                            plan_tier: planTier,
                            plan_interval: planInterval,
                            // Set a temporary future date until 'invoice.payment_succeeded' or 'subscription.updated' updates it accurately
                            current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                        } as any)
                        .eq('stripe_customer_id', customerId)

                    if (error) {
                        console.error('WH: Update error', error)
                    } else {
                        console.log('WH: Update success')
                    }
                } else {
                    console.log('WH: Missing metadata or customerId')
                }
                break
            }

            // Subscription Updated (Sync exact Stripe state)
            case 'customer.subscription.updated': {
                const subscription = event.data.object as any
                const customerId = subscription.customer as string

                // Retrieve price ID to determine tier if metadata logic is somehow skipped
                const priceId = subscription.items.data[0].price.id
                const isSolo = priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY || priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY
                const tier = isSolo ? 'solo' : 'standard'
                const interval = subscription.items.data[0].price.recurring?.interval === 'year' ? 'year' : 'month'

                // Ensure valid date
                const currentPeriodEnd = subscription.current_period_end
                    ? new Date(subscription.current_period_end * 1000).toISOString()
                    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

                await supabase
                    .from('profiles')
                    .update({
                        stripe_subscription_id: subscription.id,
                        subscription_status: subscription.status,
                        plan_tier: tier,
                        plan_interval: interval,
                        current_period_end: currentPeriodEnd
                    } as any)
                    .eq('stripe_customer_id', customerId)
                break
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as any
                if (invoice.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string)

                    await supabase
                        .from('profiles')
                        .update({
                            subscription_status: 'active', // Ensure status is active
                            current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString()
                        } as any)
                        .eq('stripe_customer_id', invoice.customer as string)
                }
                break
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription
                await supabase
                    .from('profiles')
                    .update({
                        subscription_status: 'canceled', // or 'free' if you want to downgrade immediately
                        plan_tier: 'free'
                    } as any)
                    .eq('stripe_customer_id', subscription.customer as string)
                break
            }
        }
    } catch (error) {
        console.error('Webhook processing failed:', error)
        return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
    }

    return NextResponse.json({ received: true })
}
