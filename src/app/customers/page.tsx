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
        <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans pb-32">
            <header className="sticky top-0 z-50 bg-[#fbf9f5]/80 backdrop-blur-xl p-4 flex items-center justify-between">
                <h1 className="font-serif font-bold text-xl tracking-wide text-[#1b1c1a]">顧客一覧</h1>
                <Link
                    href="/customers/new"
                    className="bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] hover:-translate-y-0.5 transition-all duration-300"
                >
                    <Plus className="w-4 h-4" />
                    新規登録
                </Link>
            </header>

            <main className="container mx-auto px-4 py-6 space-y-6 max-w-2xl">
                {/* Search */}
                <form className="relative group">
                    <Search className="absolute left-5 top-4 w-5 h-5 text-[#a1a1a0] group-focus-within:text-[#134231] transition-colors" />
                    <input
                        name="q"
                        defaultValue={q}
                        type="text"
                        placeholder="名前で検索..."
                        className="w-full bg-[#ffffff] rounded-[1.5rem] px-12 py-4 text-base shadow-[0_8px_24px_rgba(27,28,26,0.04)] focus:shadow-[0_12px_32px_rgba(27,28,26,0.08)] outline-none border-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                    />
                </form>

                {/* List */}
                <div className="space-y-4">
                    {customers?.map((customer) => (
                        <Link
                            key={customer.id}
                            href={`/customers/${customer.id}`}
                            className="block bg-[#ffffff] rounded-[2rem] p-5 shadow-[0_8px_30px_rgba(27,28,26,0.03)] hover:shadow-[0_12px_40px_rgba(27,28,26,0.06)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-[1rem] bg-[#f5f3ef] flex items-center justify-center text-xl font-serif font-bold text-[#134231]">
                                    {customer.display_name?.[0] || <User className="w-6 h-6 text-[#717974]" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <h3 className="font-serif font-bold text-lg text-[#1b1c1a] truncate pr-2">
                                            {customer.display_name || '名称未設定'}
                                        </h3>
                                        {customer.line_user_id ? (
                                            <span className="text-[10px] px-2 py-1 bg-[#06C755]/10 text-[#06C755] rounded-full font-bold shrink-0">
                                                LINE連携済
                                            </span>
                                        ) : (
                                            <span className="text-[10px] px-2 py-1 bg-[#f5f3ef] text-[#717974] rounded-full font-medium shrink-0">
                                                未連携
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-[#717974] flex items-center gap-1">
                                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c0c8c2]"></span>
                                        最終来店: {customer.last_visit_date ? new Date(customer.last_visit_date).toLocaleDateString('ja-JP') : 'なし'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {customers?.length === 0 && (
                        <div className="text-center py-16 bg-[#ffffff] rounded-[2rem] shadow-[0_8px_30px_rgba(27,28,26,0.03)] text-[#a1a1a0] text-sm">
                            <User className="w-10 h-10 mx-auto mb-3 text-[#e4e2de]" />
                            <p>顧客が見つかりませんでした</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
