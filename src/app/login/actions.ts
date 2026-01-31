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

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/', 'layout')

    // リダイレクト先にパラメータを引き継ぐ
    const plan = formData.get('plan')
    const withSetup = formData.get('with_setup')

    // プロフィール状態を確認
    let isOnboarded = false
    if (authData.user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('shop_name, line_channel_token')
            .eq('id', authData.user.id)
            .single()

        if (profile?.shop_name && profile?.line_channel_token) {
            isOnboarded = true
        }
    }

    let redirectUrl = '/onboarding'
    const params = new URLSearchParams()
    if (plan) params.set('plan', plan as string)
    if (withSetup) params.set('with_setup', withSetup as string)

    if (isOnboarded) {
        // すでにオンボーディング済みの場合は、プラン指定があれば設定画面へ、なければダッシュボードへ
        redirectUrl = (plan || withSetup) ? '/settings' : '/'
    }

    if (params.toString() && redirectUrl !== '/') {
        redirectUrl += `?${params.toString()}`
    }

    redirect(redirectUrl)
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
        }
    }

    revalidatePath('/', 'layout')

    // リダイレクト先にパラメータを引き継ぐ
    const plan = formData.get('plan')
    const withSetup = formData.get('with_setup')

    let redirectUrl = '/onboarding'
    const params = new URLSearchParams()
    if (plan) params.set('plan', plan as string)
    if (withSetup) params.set('with_setup', withSetup as string)

    if (params.toString()) {
        redirectUrl += `?${params.toString()}`
    }

    redirect(redirectUrl)
}
