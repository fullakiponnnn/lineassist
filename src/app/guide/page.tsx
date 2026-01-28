import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Smartphone } from 'lucide-react'
import GuideContent from './guide-content'

export default async function GuidePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: rawProfile } = await supabase
        .from('profiles')
        .select('shop_name, line_basic_id')
        .eq('id', user.id)
        .single()

    const profile = rawProfile as any

    // ID未設定の場合は設定画面へ誘導
    if (!profile?.line_basic_id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
                    <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-lg font-bold mb-2">LINE IDが設定されていません</h2>
                    <p className="text-slate-500 text-sm mb-6">
                        連携ガイドを表示するには、設定画面で<br />
                        LINE公式アカウントのID (例: @123abcd) を登録してください。
                    </p>
                    <Link href="/settings" className="block w-full bg-slate-800 text-white font-bold py-3 rounded-xl hover:bg-slate-700 transition-colors">
                        設定画面へ移動
                    </Link>
                </div>
            </div>
        )
    }

    return <GuideContent
        shopName={profile.shop_name || '美容室'}
        lineBasicId={profile.line_basic_id}
    />
}
