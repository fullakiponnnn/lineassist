import { createClient } from '@/utils/supabase/server'
import { signOut } from './login/actions'
import { LogOut, Plus, Search, User, Calendar, Camera, Settings, QrCode, MessageCircleQuestion } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import LandingPage from './landing-page'
import SetupRequestAlert from '@/components/setup-request-alert'

export default async function Dashboard() {
  const supabase = await createClient()

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 1. 未ログインの場合はLPを表示
  if (!user) {
    return <LandingPage />
  }

  // プロフィール情報の取得
  let profile: any = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  // 2. オンボーディング未完了の場合はリダイレクト
  if (!profile?.shop_name || !profile?.line_channel_token) {
    redirect('/onboarding')
  }

  // 最近の来店履歴の取得
  let recentVisits: any[] = []
  let monthlyCount = 0

  if (user) {
    const { data: visitsData } = await supabase
      .from('visits')
      .select(`
        id,
        visit_date,
        menu_tags,
        customers (
            display_name
        )
      `)
      .order('visit_date', { ascending: false })
      .limit(5)
      .filter('customers.profile_id', 'eq', user.id) // Ensure RLS safety explicitly though RLS handles it

    if (visitsData) {
      recentVisits = visitsData.map((v) => ({
        id: v.id,
        // @ts-ignore
        customer: v.customers?.display_name || '名称不明',
        date: new Date(v.visit_date).toLocaleDateString('ja-JP'),
        tags: v.menu_tags || []
      }))
    }

    // Starterプランの場合、月間利用件数を取得
    // @ts-ignore
    if (profile?.subscription_status !== 'active') {
      const now = new Date()
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString()

      const { count } = await supabase
        .from('visits')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfMonth)
        .lte('created_at', endOfMonth)

      monthlyCount = count || 0
    }
  }

  return (
    <div className="min-h-screen bg-[#fbf9f5] pb-32 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-[#ffffff]/80 backdrop-blur-xl sticky top-0 z-10 safe-area-top shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif font-bold text-xl text-[#134231] tracking-wide">
            {profile?.shop_name || 'SnapKarte'}
          </h1>
          <div className="flex items-center gap-2">
            <a
              href="https://lin.ee/O3ydcSf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-[#134231] transition-colors rounded-full hover:bg-slate-50"
            >
              <MessageCircleQuestion className="w-5 h-5" />
            </a>
            <Link
              href="/settings"
              className="p-2 text-slate-400 hover:text-[#134231] transition-colors rounded-full hover:bg-slate-50"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-full hover:bg-slate-50"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Setup Alert */}
        {profile?.is_setup_purchased && profile?.setup_status !== 'completed' && (
          <SetupRequestAlert profileId={profile.id} />
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="顧客名やタグで検索..."
            className="w-full bg-[#ffffff] rounded-2xl pl-12 pr-4 py-4 shadow-sm focus:outline-none focus:shadow-md transition-shadow placeholder:text-slate-400 text-sm"
          />
        </div>

        {/* Starter Plan Usage Limit */}
        {profile?.subscription_status !== 'active' && (
          <div className="bg-[#ffffff] rounded-[2rem] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-500 flex items-center gap-2">
                <span>利用状況 (今月)</span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${monthlyCount >= 10 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700'}`}>
                  Starterプラン
                </span>
              </h3>
              <span className={`text-sm font-bold ${monthlyCount >= 10 ? 'text-red-600' : 'text-[#134231]'}`}>
                {monthlyCount} / 10
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-500 ${monthlyCount >= 10 ? 'bg-red-500' : 'bg-gradient-to-r from-[#134231] to-[#2d5a47]'}`}
                style={{ width: `${Math.min((monthlyCount / 10) * 100, 100)}%` }}
              />
            </div>

            {monthlyCount >= 10 ? (
              <div className="text-center">
                <p className="text-xs text-red-600 font-bold mb-3">今月の上限に達しました</p>
                <Link href="/settings" className="block w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white text-center py-3 rounded-xl text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
                  Soloプランにアップグレード
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 text-right font-medium">
                  あと {10 - monthlyCount} 件登録できます
                </p>
                <Link href="/settings" className="block w-full bg-slate-50 hover:bg-slate-100 text-slate-700 text-center py-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <span className="text-[#134231]">✦</span> Soloプランを見る
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/visits/new" className="col-span-2 bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white p-6 rounded-[2rem] shadow-lg shadow-[#134231]/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Camera className="w-6 h-6" />
            <span className="font-bold text-lg tracking-wide">来店記録を作成</span>
          </Link>

          <Link href="/scan" className="bg-[#ffffff] text-slate-700 p-5 rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all aspect-[4/3]">
            <QrCode className="w-7 h-7 text-[#134231]" />
            <span className="font-bold text-xs tracking-wide">QR受付</span>
          </Link>

          <Link href="/customers" className="bg-[#ffffff] text-slate-700 p-5 rounded-[2rem] shadow-sm flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all aspect-[4/3]">
            <User className="w-7 h-7 text-[#134231]" />
            <span className="font-bold text-xs tracking-wide">顧客一覧</span>
          </Link>

          <Link href="/guide" className="bg-[#06C755]/10 text-[#06C755] p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-[#06C755]/20 transition-all aspect-[4/3] shadow-sm">
            <MessageCircleQuestion className="w-7 h-7" />
            <span className="font-bold text-xs tracking-wide">連携ガイド</span>
          </Link>

          <Link href="/settings" className="bg-slate-100 text-slate-700 p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:bg-slate-200 transition-all aspect-[4/3] shadow-sm">
            <Settings className="w-7 h-7" />
            <span className="font-bold text-xs tracking-wide">設定・ポスター</span>
          </Link>
        </div>

        {/* Recent Visits */}
        <div>
          <h2 className="text-sm font-serif font-bold text-slate-400 mb-4 uppercase tracking-widest pl-2">
            Recent Visits
          </h2>
          <div className="space-y-3">
            {recentVisits.length > 0 ? (
              recentVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-[#ffffff] rounded-2xl p-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-lg font-serif font-bold text-[#134231]">
                    {visit.customer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="font-bold text-slate-800 truncate">
                        {visit.customer}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {visit.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {visit.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#134231] text-[10px] font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 text-sm bg-[#ffffff] rounded-[2rem] shadow-sm">
                <Calendar className="w-8 h-8 mx-auto mb-3 opacity-20" />
                来店履歴はまだありません
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
