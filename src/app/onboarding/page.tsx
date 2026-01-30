import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import OnboardingFlow from './flow'

export default async function OnboardingPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { plan, with_setup } = await searchParams;

    // Check availability for SSR props
    let webhookUrlBase = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.snapkarte.jp'
    // Fallback logic for production vs dev not fully covered by env often requires VERCEL_URL handling
    if (process.env.VERCEL_URL) {
        webhookUrlBase = `https://${process.env.VERCEL_URL}`
    }

    const webhookUrl = `${webhookUrlBase}/api/webhook/line?shop_id=${user.id}`

    return (
        <div className="min-h-screen bg-muted/30 py-10 px-4 flex items-center justify-center">
            <div className="w-full">
                <OnboardingFlow
                    profileId={user.id}
                    webhookUrl={webhookUrl}
                    initialPlan={(plan as string) || null}
                    initialWithSetup={(with_setup as string) === 'true'}
                />
            </div>
        </div>
    )
}
