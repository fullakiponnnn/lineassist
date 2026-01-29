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
        const { data } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', user.id)
            .single()

        const profile: any = data

        if (!profile?.stripe_customer_id) {
            return NextResponse.json({ error: 'No billing information found' }, { status: 404 })
        }

        const getSiteUrl = () => {
            if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
            if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
            return 'http://localhost:3000';
        };
        const siteUrl = getSiteUrl();

        const session = await stripe.billingPortal.sessions.create({
            customer: profile.stripe_customer_id,
            return_url: `${siteUrl}/settings`,
        })

        return NextResponse.json({ url: session.url })

    } catch (error: any) {
        console.error('Stripe Portal Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
