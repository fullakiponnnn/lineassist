import { createClient } from '@/utils/supabase/server'
import { signOut } from './login/actions'
import { LogOut, Plus, Search, User, Calendar, Camera, Settings, QrCode } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()

  // ユーザー情報の取得
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // プロフィール情報の取得
  let profile = null
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    profile = data
  }

  // オンボーディング未完了の場合はリダイレクト
  if (user && (!profile?.shop_name || !profile?.line_channel_token)) {
    redirect('/onboarding')
  }

  // 最近の来店履歴の取得
  let recentVisits: any[] = []
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

    if (visitsData) {
      recentVisits = visitsData.map((v) => ({
        id: v.id,
        // @ts-ignore
        customer: v.customers?.display_name || '名称不明',
        date: new Date(v.visit_date).toLocaleDateString('ja-JP'),
        tags: v.menu_tags || []
      }))
    }
  }

  return (
    <div className="min-h-screen bg-muted/20 pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 safe-area-top">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-lg text-foreground">
            {profile?.shop_name || 'LineAssist'}
          </h1>
          <div className="flex items-center gap-1">
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
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="顧客名やタグで検索..."
            className="w-full bg-card border border-border rounded-xl px-10 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/visits/new" className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-lg shadow-primary/20 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all aspect-square sm:aspect-auto">
            <Camera className="w-8 h-8" />
            <span className="font-bold text-sm">写真撮影</span>
          </Link>
          <Link href="/guide" className="bg-[#06C755] text-white p-4 rounded-2xl shadow-lg shadow-[#06C755]/20 flex flex-col items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all aspect-square sm:aspect-auto">
            <QrCode className="w-8 h-8" />
            <span className="font-bold text-sm">連携ガイド</span>
          </Link>
          <Link href="/customers" className="col-span-2 bg-card text-foreground border border-border p-4 rounded-2xl shadow-sm flex flex-row items-center justify-center gap-3 hover:bg-muted/50 transition-all h-20">
            <User className="w-6 h-6 text-primary" />
            <span className="font-bold text-sm">顧客一覧を表示</span>
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

      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Link href="/visits/new" className="w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-xl shadow-primary/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
          <Plus className="w-8 h-8" />
        </Link>
      </div>
    </div>
  )
}
