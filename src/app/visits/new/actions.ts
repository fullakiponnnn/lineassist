'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { LineService } from '@/utils/line'

export async function createVisit(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    // 1. Fetch Profile for settings
    const { data: profile } = await supabase
        .from('profiles')
        .select('shop_name, line_channel_token, plan_tier')
        .eq('id', user.id)
        .single()

    // ---------------------------------------------------------
    // Limit Check for Free Plan
    // ---------------------------------------------------------
    if (profile?.plan_tier === 'free') {
        const now = new Date()
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()

        // We assume RLS Policies restrict access to own customers/visits.
        // We link visits via customers table if RLS is not implicit on visits regarding profile_id, 
        // but typically RLS 'visits' policy uses `customer_id IN (select id from customers where profile_id = auth.uid())`
        // So a simple select count should work for the authenticated user.
        const { count } = await supabase
            .from('visits')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth)
            .lte('created_at', endOfMonth)

        if (count !== null && count >= 10) {
            return { error: '⚠️ Freeプランの上限(月間10件)に達しました。\n設定画面からSoloプランへアップグレードすると無制限に利用できます。' }
        }
    }

    const customerId = formData.get('customerId') as string
    const visitDate = formData.get('visitDate') as string
    const tags = formData.get('tags') as string // Comma separated
    const photoPath = formData.get('photoPath') as string

    if (!customerId || !visitDate) {
        return { error: '顧客と来店日は必須です' }
    }

    // Tags processing
    const menuTags = tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []

    const { error } = await supabase.from('visits').insert({
        customer_id: customerId,
        visit_date: new Date(visitDate).toISOString(),
        photo_url: photoPath, // This will be the path in storage
        menu_tags: menuTags,
        reminder_sent: false,
        // Reminder logic would go here (e.g. calculate 30 days later)
        reminder_scheduled_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    })

    if (error) {
        console.error('Visit create error', error)
        return { error: '保存に失敗しました' }
    }

    // ---------------------------------------------------------
    // LINE Automation
    // ---------------------------------------------------------
    // Only attempt if we have a token and the customer has a LINE ID
    // For dev, you might want to use process.env.LINE_CHANNEL_ACCESS_TOKEN as a fallback
    const token = profile?.line_channel_token || process.env.LINE_CHANNEL_ACCESS_TOKEN

    if (token && photoPath) {
        // Fetch customer details for LINE ID
        const { data: customer } = await supabase
            .from('customers')
            .select('line_user_id')
            .eq('id', customerId)
            .single()

        if (customer?.line_user_id) {
            try {
                // Construct Public URL
                // Supabase Storage Public URL format:
                // https://[project-ref].supabase.co/storage/v1/object/public/[bucket]/[path]
                const { data: { publicUrl } } = supabase.storage
                    .from('visit-photos')
                    .getPublicUrl(photoPath)

                const lineService = new LineService(token)
                await lineService.sendVisitThankYou(
                    customer.line_user_id,
                    publicUrl,
                    profile?.shop_name || '美容室'
                )
                console.log('LINE message sent successfully')
            } catch (lineError) {
                console.error('Failed to send LINE message', lineError)
                // Do not fail the request, just log
            }
        }
    }

    revalidatePath('/')
    redirect('/')
}

export async function uploadPhotoAction(formData: FormData) {
    // This is a helper action if we want to upload via server action, NOT recommended for large files.
    // Best practice for Next.js + Supabase Storage is often client-side upload for better UX (progress bars, etc)
    // So we will stick to client-side upload in the component and just receive the path here.
    return { success: true }
}
