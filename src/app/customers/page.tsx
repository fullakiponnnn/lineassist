import { createClient } from '@/utils/supabase/server'
import { Plus, Search, User } from 'lucide-react'
import Link from 'next/link'

export default async function CustomersPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const supabase = await createClient()
    const { q } = await searchParams

    let query = supabase
        .from('customers')
        .select('id, display_name, last_visit_date, line_user_id')
        .order('created_at', { ascending: false })

    if (q) {
        query = query.ilike('display_name', `%${q}%`)
    }

    const { data: customers } = await query

    return (
        <div className="min-h-screen bg-muted/20 pb-32">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
                <h1 className="text-lg font-bold">顧客一覧</h1>
                <Link
                    href="/customers/new"
                    className="bg-primary text-primary-foreground text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 hover:opacity-90 transition-opacity"
                >
                    <Plus className="w-4 h-4" />
                    新規登録
                </Link>
            </header>

            <main className="container mx-auto px-4 py-4 space-y-4">
                {/* Search */}
                <form className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <input
                        name="q"
                        defaultValue={q}
                        type="text"
                        placeholder="名前で検索..."
                        className="w-full bg-card border border-border rounded-xl px-10 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                </form>

                {/* List */}
                <div className="space-y-3">
                    {customers?.map((customer) => (
                        <Link
                            key={customer.id}
                            href={`/customers/${customer.id}`}
                            className="block bg-card rounded-xl p-4 border border-border shadow-sm active:scale-[0.99] transition-all hover:border-primary/30"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                                    {customer.display_name?.[0] || <User className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-foreground truncate">
                                            {customer.display_name || '名称未設定'}
                                        </h3>
                                        {customer.line_user_id ? (
                                            <span className="text-[10px] px-1.5 py-0.5 bg-[#06C755]/10 text-[#06C755] rounded-md font-bold border border-[#06C755]/20">
                                                LINE連携済
                                            </span>
                                        ) : (
                                            <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded-md border border-border">
                                                未連携
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        最終来店: {customer.last_visit_date ? new Date(customer.last_visit_date).toLocaleDateString('ja-JP') : 'なし'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {customers?.length === 0 && (
                        <div className="text-center py-10 text-muted-foreground text-sm">
                            顧客が見つかりませんでした
                        </div>
                    )}
                </div>
            </main>


        </div>
    )
}
