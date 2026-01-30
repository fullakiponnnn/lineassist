'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function generateLinkToken(customerId: string) {
    const supabase = await createClient()

    // Generate a secure random token (using crypto in Node context or just UUID)
    const token = crypto.randomUUID()

    const { error } = await supabase
        .from('customers')
        .update({ link_token: token } as any)
        .eq('id', customerId)

    if (error) {
        console.error('Error generating link token:', error)
        return { error: '連携トークンの生成に失敗しました' }
    }

    revalidatePath(`/customers/${customerId}`)
    return { success: true, token }
}
