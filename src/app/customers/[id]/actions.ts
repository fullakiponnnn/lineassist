'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteCustomer(customerId: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)

    if (error) {
        return { error: '顧客の削除に失敗しました' }
    }

    revalidatePath('/customers')
    // 削除後は一覧へリダイレクト
    return { success: true }
}
