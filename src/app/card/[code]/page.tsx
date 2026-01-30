import { createAdminClient } from '@/utils/supabase/admin'
import { notFound } from 'next/navigation'
import MemberCard from '@/components/member-card'

export const dynamic = 'force-dynamic'

export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
}

export default async function MemberCardPage({ params }: { params: Promise<{ code: string }> }) {
    // Next.js 15: params is a Promise
    const { code } = await params

    const supabase = createAdminClient()

    // 会員コードまたはURLトークンで顧客を検索
    // URLパラメータ(code)は、現在は url_token (UUID) を想定するが、
    // 移行期間中や旧URLのために member_code も検索対象とする（ただしUUID形式ならtoken優先）

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(code)

    let query = supabase.from('customers').select('display_name, profile_id, member_code')

    if (isUuid) {
        query = query.eq('url_token', code)
    } else {
        query = query.eq('member_code', code)
    }

    const { data: customerData } = await query.single()
    const customer = customerData as any // Quick fix for TS type inference in this context

    if (!customer) {
        return notFound()
    }

    // 店舗情報も取得（店名を表示したい）
    const { data: profile } = await supabase
        .from('profiles')
        .select('shop_name')
        .eq('id', customer.profile_id)
        .single()

    const shopName = profile?.shop_name || 'SnapKarte'

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Background Lights */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-purple-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] bg-cyan-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
            </div>

            <div className="relative z-10 w-full flex flex-col items-center gap-12">
                <div className="text-center space-y-2">
                    <p className="text-xs font-bold tracking-[0.3em] text-cyan-500 uppercase">Membership Card</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
                        {shopName}
                    </h1>
                </div>

                {/* Static Card Component */}
                <div className="w-full max-w-md px-4">
                    <MemberCard
                        customerName={customer.display_name || 'Member'}
                        memberCode={code}
                        shopName={shopName}
                    />
                </div>

                <div className="text-center space-y-4 max-w-xs mx-auto">
                    <p className="text-xs text-slate-500 leading-relaxed">
                        ご来店の際は、この画面をスタッフにご提示ください。<br />
                        QRコードをスキャンして受付いたします。
                    </p>

                    {/* Future: Add to Apple Wallet Button could go here */}
                </div>
            </div>

            {/* Bottom branding */}
            <div className="absolute bottom-6 left-0 w-full text-center">
                <p className="text-[10px] text-white/10 tracking-widest uppercase">Powered by SnapKarte v2.0</p>
            </div>
        </div>
    )
}
