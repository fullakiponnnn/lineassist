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
    // lineBasicId assignment handled later with bot_basic_id check

    if (lineToken && lineToken.trim() !== '') {
        updates.line_channel_token = lineToken.trim()

        // トークンが更新された場合、自動的にBot情報を取得してBasic IDを保存する
        try {
            const { LineService } = await import('@/utils/line')
            const lineService = new LineService(lineToken.trim())
            const botInfo = await lineService.getBotInfo()
            if (botInfo.basicId) {
                updates.bot_basic_id = botInfo.basicId
            }
        } catch (e) {
            console.error('Failed to fetch bot info:', e)
        }
    }

    const lineChannelSecret = formData.get('lineChannelSecret') as string
    if (lineChannelSecret && lineChannelSecret.trim() !== '') {
        updates.line_channel_secret = lineChannelSecret.trim()
    }

    // 自動取得できなかった場合のみ、手動入力を採用（または上書き更新）
    // 手動入力がある場合、それを優先するか悩みどころだが、APIからの正規情報があればそちらが確実。
    // API取得できなかった場合(updates.bot_basic_idがない場合)にフォーム値を採用。
    if (!updates.bot_basic_id && lineBasicId) {
        updates.bot_basic_id = lineBasicId
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
