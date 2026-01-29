import { createAdminClient } from '@/utils/supabase/admin'
import QRDisplay from '@/components/qr-display'
import { notFound } from 'next/navigation'

export default async function MemberCardPage({ params }: { params: Promise<{ code: string }> }) {
    // Next.js 15: params is a Promise
    const { code } = await params

    const supabase = createAdminClient()

    // 会員コードで顧客を検索
    const { data: customer } = await supabase
        .from('customers')
        .select('display_name, profile_id')
        .eq('member_code', code)
        .single()

    if (!customer) {
        return notFound()
    }

    // 店舗情報も取得（店名を表示したい）
    const { data: profile } = await supabase
        .from('profiles')
        .select('shop_name')
        .eq('id', customer.profile_id)
        .single()

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] aspect-square bg-primary/20 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] aspect-square bg-blue-500/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center shadow-2xl">
                    <div className="mb-8">
                        <p className="text-sm text-slate-300 mb-2">{profile?.shop_name || 'SnapKarte'}</p>
                        <h1 className="text-2xl font-bold text-white tracking-widest uppercase">Member Card</h1>
                    </div>

                    <div className="mb-8 flex justify-center">
                        <QRDisplay value={code} />
                    </div>

                    <div className="text-left bg-black/20 rounded-xl p-4">
                        <p className="text-xs text-slate-400 mb-1">MEMBER NAME</p>
                        <p className="text-lg font-bold">{customer.display_name} 様</p>

                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-end">
                            <div>
                                <p className="text-xs text-slate-400 mb-1">MEMBER ID</p>
                                <p className="text-xl font-mono text-primary font-bold tracking-widest">{code}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-slate-500">
                    ご来店の際は、この画面をスタッフにご提示ください。
                </p>
            </div>
        </div>
    )
}
