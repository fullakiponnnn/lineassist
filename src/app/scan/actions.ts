'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function findCustomerByMemberCode(memberCode: string) {
    const supabase = await createClient()

    const { data: customer } = await supabase
        .from('customers')
        .select('id, display_name')
        .eq('member_code', memberCode)
        .single()

    if (customer) {
        return {
            customerId: customer.id,
            displayName: customer.display_name
        }
    }

    return { error: '顧客が見つかりませんでした' }
}
