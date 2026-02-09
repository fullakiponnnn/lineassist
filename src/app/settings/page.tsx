import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsForm from './settings-form'
import { ArrowLeft, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'
import PosterGenerator from '@/components/poster-generator'
import { stripe } from '@/utils/stripe'

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function SettingsPage(props: Props) {
    const searchParams = await props.searchParams;
    const sessionId = searchParams?.session_id as string | undefined;

    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // If returning from Checkout, sync data immediately
    if (sessionId) {
        try {
            const session = await stripe.checkout.sessions.retrieve(sessionId);
            if (session.status === 'complete' || session.payment_status === 'paid') {
                // If it's a subscription
                if (session.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

                    await supabase.from('profiles').update({
                        stripe_subscription_id: subscription.id,
                        subscription_status: subscription.status,
                        current_period_end: new Date((subscription as any).current_period_end * 1000).toISOString(),
                        plan_tier: session.metadata?.plan_tier || 'standard', // Fallback or trust metadata
                        plan_interval: session.metadata?.plan_interval || 'month'
                    } as any).eq('id', user.id);
                }
                // If it's a one-time payment (setup fee)
                else if (session.mode === 'payment') {
                    await supabase.from('profiles').update({
                        is_setup_purchased: true,
                        setup_status: 'pending' // Start setup
                    } as any).eq('id', user.id);
                }
            }
        } catch (e) {
            console.error('Failed to sync Stripe session:', e);
        }
    }

    const { data: rawProfile } = await supabase
        .from('profiles')
        .select('shop_name, line_channel_token, line_basic_id, plan_tier, plan_interval, subscription_status, current_period_end, is_setup_purchased, setup_status, bot_basic_id')
        .eq('id', user.id)
        .single()

    const profile = rawProfile as any

    const hasToken = !!(profile?.line_channel_token && profile.line_channel_token.length > 0)

    return (
        <div className="min-h-screen bg-muted/20 pb-32">
            <header className="bg-card sticky top-0 z-10 border-b border-border">
                <div className="container mx-auto px-4 h-14 flex items-center gap-4">

                    <h1 className="font-bold text-lg">設定</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-lg">
                <SettingsForm
                    initialShopName={profile?.shop_name || null}
                    initialLineBasicId={profile?.line_basic_id || null}
                    hasToken={hasToken}
                    profileId={user.id}
                    profile={profile}
                />

                {profile?.bot_basic_id && profile?.shop_name && (
                    <div className="mt-8">
                        <PosterGenerator
                            shopName={profile.shop_name}
                            lineId={profile.bot_basic_id}
                        />
                    </div>
                )}

                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                    <p className="text-sm text-muted-foreground mb-4">お困りですか？</p>
                    <a
                        href="https://lin.ee/O3ydcSf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                    >
                        <MessageCircleQuestion className="w-4 h-4" />
                        LINEでサポートに問い合わせる
                    </a>
                </div>
            </main>
        </div>
    )
}
