'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { generateMemberCode } from '@/utils/id'

export async function createCustomer(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Unauthorized' }
  }

  // ---------------------------------------------------------
  // Limit Check for Free Plan (Max 30 Karters)
  // ---------------------------------------------------------
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single()

  if (profile?.subscription_status !== 'active') {
    const { count } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })
      .eq('profile_id', user.id)

    if (count !== null && count >= 30) {
      return { error: 'FREE_PLAN_LIMIT_REACHED' }
    }
  }

  const name = formData.get('name') as string
  const lineUserId = formData.get('lineUserId') as string // Optional for now, strictly should be required for LINE integration

  if (!name) {
    return { error: '顧客名は必須です' }
  }

  // 仮実装：LINE User IDがない場合、ダミーを入れるか空文字（NOT NULL制約がある場合は注意）
  // schema.sqlでは `line_user_id text not null` なので必須。
  // 現段階では手入力か、ダミーを入れる。
  const actualLineId = lineUserId || `DUMMY_${Date.now()}`

  const { error } = await supabase.from('customers').insert({
    profile_id: user.id,
    display_name: name,
    line_user_id: actualLineId,
    member_code: generateMemberCode()
  })

  if (error) {
    console.error('Customer create error', error)
    return { error: '保存に失敗しました' }
  }

  revalidatePath('/visits/new') // Refresh the list in the visit page
  return { success: true }
}
