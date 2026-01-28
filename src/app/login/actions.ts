'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Type-casting here for convenience
    // In a production app, you might want to validate this more strictly
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const shopName = formData.get('shopName') as string

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                shop_name: shopName,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // プロフィールテーブルへの挿入は、SupabaseのTriggerで行うか、
    // ここで明示的に行うことができますが、
    // 今回はUser Managementと連動させるため、本来はTriggerがベストです。
    // しかし、Trigger設定をしていない場合はここでinsertします。
    // 一旦、profilesテーブルはuser.idと紐付いているので、
    // Triggerを作成するのがベストプラクティスですが、
    // 簡易的にここでProfilesへの書き込みも試行します。
    // ただし、RLSで insert own profile を許可しているため、クライアントからでも可能ですが、
    // Server Action内で行うのが安全です。

    if (data.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .insert({
                id: data.user.id,
                email: email,
                shop_name: shopName,
            })

        if (profileError) {
            console.error('Profile creation failed:', profileError)
            // ユーザー作成は成功しているがプロフィール作成に失敗した場合のハンドリング
            // 必要に応じてロールバック処理など（Supabase Authはロールバックできないので、ここが難しい）
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
