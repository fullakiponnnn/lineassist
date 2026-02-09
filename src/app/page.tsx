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

    // Freeプランの場合、月間利用件数を取得
    // @ts-ignore
    if (profile?.plan_tier === 'free') {
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
    <div className="min-h-screen bg-muted/20 pb-32">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 safe-area-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-lg text-foreground">
            {profile?.shop_name || 'SnapKarte'}
          </h1>
          <div className="flex items-center gap-1">
            <a
              href="https://lin.ee/O3ydcSf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
            >
              <MessageCircleQuestion className="w-5 h-5" />
            </a>
            <Link
              href="/settings"
              className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-muted"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-full hover:bg-muted"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Setup Alert */}
        {profile?.is_setup_purchased && profile?.setup_status !== 'completed' && (
          <SetupRequestAlert profileId={profile.id} />
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="顧客名やタグで検索..."
            className="w-full bg-card border border-border rounded-xl px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Free Plan Usage Limit */}
        {profile?.plan_tier === 'free' && (
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                <span>利用状況 (今月)</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${monthlyCount >= 10 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  Freeプラン
                </span>
              </h3>
              <span className={`text-sm font-bold ${monthlyCount >= 10 ? 'text-destructive' : 'text-foreground'}`}>
                {monthlyCount} / 10
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-3">
              <div
                className={`h-full rounded-full transition-all duration-500 ${monthlyCount >= 10 ? 'bg-destructive' : 'bg-primary'}`}
                style={{ width: `${Math.min((monthlyCount / 10) * 100, 100)}%` }}
              />
            </div>

            {monthlyCount >= 10 ? (
              <div className="text-center">
                <p className="text-xs text-destructive font-bold mb-2">今月の上限に達しました</p>
                <Link href="/settings" className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-2 rounded-lg text-sm font-bold shadow-md hover:opacity-90 transition-opacity">
                  無制限プランにアップグレード
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground text-right">
                  あと {10 - monthlyCount} 件登録できます
                </p>
                <Link href="/settings" className="block w-full bg-slate-900/5 hover:bg-slate-900/10 text-slate-600 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-200 text-center py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">✦</span> プロプランを見る
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/visits/new" className="col-span-2 bg-primary text-primary-foreground p-5 rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all">
            <Camera className="w-6 h-6" />
            <span className="font-bold text-lg">来店記録を作成</span>
          </Link>

          <Link href="/scan" className="bg-card text-foreground border border-border p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all aspect-[4/3]">
            <QrCode className="w-6 h-6 text-primary" />
            <span className="font-bold text-xs">QR受付</span>
          </Link>

          <Link href="/customers" className="bg-card text-foreground border border-border p-4 rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-all aspect-[4/3]">
            <User className="w-6 h-6 text-primary" />
            <span className="font-bold text-xs">顧客一覧</span>
          </Link>

          <Link href="/guide" className="bg-[#06C755]/10 text-[#06C755] border border-[#06C755]/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-[#06C755]/20 transition-all aspect-[4/3]">
            <MessageCircleQuestion className="w-6 h-6" />
            <span className="font-bold text-xs">連携ガイド</span>
          </Link>

          <Link href="/settings" className="bg-slate-100 text-slate-700 border border-slate-200 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-slate-200 transition-all aspect-[4/3]">
            <Settings className="w-6 h-6" />
            <span className="font-bold text-xs">設定・ポスター</span>
          </Link>
        </div>

        {/* Recent Visits */}
        <div>
          <h2 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider pl-1">
            最近の来店
          </h2>
          <div className="space-y-3">
            {recentVisits.length > 0 ? (
              recentVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="bg-card rounded-xl p-4 border border-border shadow-sm flex items-center gap-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-bold text-muted-foreground">
                    {visit.customer[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-foreground truncate">
                        {visit.customer}
                      </h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {visit.date}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {visit.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium border border-primary/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground text-sm bg-card rounded-xl border border-dashed border-border">
                来店履歴はまだありません
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button removed in favor of BottomNav */}
    </div>
  )
}
