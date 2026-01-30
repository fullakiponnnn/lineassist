'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function findCustomerByMemberCode(memberCode: string) {
    const supabase = await createClient()

    // Check if input is UUID (url_token)
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(memberCode)

    let query = supabase.from('customers').select('id, display_name')

    if (isUuid) {
        query = query.eq('url_token', memberCode)
    } else {
        query = query.eq('member_code', memberCode)
    }

    const { data: customer } = await query.single()

    if (customer) {
        return {
            customerId: customer.id,
            displayName: customer.display_name
        }
    }

    return { error: '顧客が見つかりませんでした' }
}
