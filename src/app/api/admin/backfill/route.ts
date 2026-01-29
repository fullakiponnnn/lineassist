import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { generateMemberCode } from '@/utils/id'

export async function GET() {
    const supabase = await createClient()

    // member_code が NULL の顧客を取得
    const { data: customers, error } = await supabase
        .from('customers')
        .select('id')
        .is('member_code', null)

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!customers || customers.length === 0) {
        return NextResponse.json({ message: 'No customers to update' })
    }

    let updatedCount = 0
    const errors = []

    // 1件ずつ更新（バッチ処理ではないので数は多くない前提）
    for (const customer of customers) {
        const code = generateMemberCode()
        const { error: updateError } = await supabase
            .from('customers')
            .update({ member_code: code } as any) // column might not exist in types yet
            .eq('id', customer.id)

        if (updateError) {
            errors.push({ id: customer.id, error: updateError.message })
        } else {
            updatedCount++
        }
    }

    return NextResponse.json({
        total: customers.length,
        updated: updatedCount,
        errors
    })
}
