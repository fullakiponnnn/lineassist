import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import SettingsForm from './settings-form'
import { ArrowLeft, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'

export default async function SettingsPage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    const { data: rawProfile } = await supabase
        .from('profiles')
        .select('shop_name, line_channel_token, line_basic_id, plan_tier, plan_interval, subscription_status, current_period_end, is_setup_purchased')
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
