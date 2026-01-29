'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function submitOnboarding(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const shopName = formData.get('shopName') as string
    const lineToken = formData.get('lineToken') as string
    const lineBasicId = formData.get('lineBasicId') as string
    const lineChannelSecret = formData.get('lineChannelSecret') as string

    // Update or Insert profile
    const { error } = await supabase
        .from('profiles')
        .upsert({
            id: user.id,
            email: user.email!,
            shop_name: shopName,
            line_channel_token: lineToken,
            line_channel_secret: lineChannelSecret,
            line_basic_id: lineBasicId,
            updated_at: new Date().toISOString()
        })

    if (error) {
        console.error('Onboarding update error', error)
        return { error: '設定の保存に失敗しました' }
    }

    redirect('/')
}
