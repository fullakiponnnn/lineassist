'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfile(prevState: any, formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const shopName = formData.get('shopName') as string
    const lineToken = formData.get('lineToken') as string
    const lineBasicId = formData.get('lineBasicId') as string

    const updates: any = {
        updated_at: new Date().toISOString(),
    }

    if (shopName) updates.shop_name = shopName
    if (lineBasicId) updates.line_basic_id = lineBasicId

    // LINE Tokenは入力がある場合のみ更新する（空送信で消さないように）
    if (lineToken && lineToken.trim() !== '') {
        updates.line_channel_token = lineToken.trim()
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)

    if (error) {
        console.error('Profile update error', error)
        return { error: '設定の保存に失敗しました' }
    }

    revalidatePath('/settings')
    revalidatePath('/') // Dashboardの店名表示も更新
    return { success: true, message: '設定を保存しました' }
}
