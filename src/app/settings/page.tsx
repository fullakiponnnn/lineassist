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
        <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans pb-32">
            <header className="sticky top-0 z-50 bg-[#fbf9f5]/80 backdrop-blur-xl p-4 flex items-center justify-between">
                <div className="container mx-auto px-4 h-14 flex items-center gap-4">
                    <h1 className="font-serif font-bold text-xl tracking-wide text-[#1b1c1a]">設定</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-lg">
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

                <div className="mt-12 pt-8 text-center">
                    <p className="text-sm font-bold text-[#414944] mb-4">お困りですか？</p>
                    <a
                        href="https://lin.ee/O3ydcSf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#ffffff] shadow-[0_8px_24px_rgba(27,28,26,0.04)] hover:shadow-[0_12px_32px_rgba(27,28,26,0.08)] text-[#134231] font-bold text-sm hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <MessageCircleQuestion className="w-5 h-5" />
                        LINEでサポートに問い合わせる
                    </a>
                </div>
            </main>
        </div>
    )
}
