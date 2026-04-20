import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, Calendar, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteCustomerButton from './delete-button'
import CustomerNotes from './notes'
import LineIntegrationButton from '@/components/line-integration-button'

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient()
    const { id } = await params

    // Fetch Customer
    const { data: customerData } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single()

    const customer = customerData as any

    if (!customer) {
        notFound()
    }

    // Fetch Visits
    const { data: visits } = await supabase
        .from('visits')
        .select('*')
        .eq('customer_id', id)
        .order('visit_date', { ascending: false })

    // Fetch Shop Profile to get bot_basic_id
    const { data: profileData } = await supabase
        .from('profiles')
        .select('bot_basic_id')
        .eq('id', customer.profile_id)
        .single()

    // @ts-ignore
    const botBasicId = profileData?.bot_basic_id

    return (
        <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans pb-16">
            <header className="sticky top-0 z-50 bg-[#fbf9f5]/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                        <Link href="/customers" className="p-3 -ml-3 hover:bg-[#f5f3ef] rounded-full text-[#414944] hover:text-[#134231] transition-colors shrink-0">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-serif font-bold text-xl truncate tracking-wide text-[#1b1c1a]">{customer.display_name}</h1>
                    </div>
                    <DeleteCustomerButton customerId={id} />
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8 max-w-2xl">

                {/* Profile Card */}
                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)]">
                    <div className="flex items-start justify-between mb-6">
                        <div className="w-16 h-16 rounded-[1rem] bg-[#f5f3ef] flex items-center justify-center text-2xl font-serif font-bold text-[#134231] shadow-sm">
                            {customer.display_name?.[0]}
                        </div>
                        {customer.line_user_id ? (
                            <div className="flex flex-col items-end gap-3">
                                <span className="text-[11px] px-3 py-1.5 bg-[#06C755]/10 text-[#06C755] rounded-full font-bold flex items-center gap-1.5">
                                    <MessageCircle className="w-3.5 h-3.5" />
                                    LINE連携中
                                </span>
                                {customer.member_code && (
                                    <Link
                                        href={`/card/${customer.member_code}`}
                                        target="_blank"
                                        className="text-[11px] px-3 py-1.5 bg-[#f5f3ef] text-[#134231] rounded-full font-bold flex items-center gap-1.5 hover:bg-[#e4e2de] transition-colors"
                                    >
                                        <User className="w-3.5 h-3.5" />
                                        会員証を表示
                                    </Link>
                                )}
                                <span className="text-[10px] text-[#717974] font-mono tracking-widest">{customer.line_user_id.slice(0, 8)}...</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-end gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-[11px] px-3 py-1.5 bg-[#f5f3ef] text-[#717974] rounded-full font-medium">
                                        LINE未連携
                                    </span>
                                    <LineIntegrationButton
                                        customerId={id}
                                        // @ts-ignore
                                        initialLinkToken={customer.link_token}
                                        botBasicId={botBasicId}
                                    />
                                </div>
                                {customer.member_code && (
                                    <Link
                                        href={`/card/${customer.member_code}`}
                                        target="_blank"
                                        className="text-[11px] px-3 py-1.5 bg-[#f5f3ef] text-[#134231] rounded-full font-bold flex items-center gap-1.5 hover:bg-[#e4e2de] transition-colors"
                                    >
                                        <User className="w-3.5 h-3.5" />
                                        会員証を表示
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-serif font-bold tracking-tight text-[#1b1c1a]">{customer.display_name}</h2>
                        <p className="text-sm text-[#414944] flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#6a5e33]" />
                            最終来店: {customer.last_visit_date ? new Date(customer.last_visit_date).toLocaleDateString('ja-JP') : '記録なし'}
                        </p>
                    </div>
                </div>

                {/* @ts-ignore */}
                <CustomerNotes customerId={id} initialNotes={customer.notes} />

                {/* Gallery / History */}
                <div className="pt-4">
                    <h3 className="font-serif text-xl font-bold text-[#1b1c1a] mb-6 tracking-wide flex items-center gap-3">
                        <span className="text-[#6a5e33]">◆</span> 来店履歴・アルバム
                    </h3>

                    {visits && visits.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4">
                            {await Promise.all(visits.map(async (visit) => {
                                // Construct SIGNED URL (Private Access)
                                let imageUrl = null
                                if (visit.photo_url) {
                                    const { data } = await supabase.storage
                                        .from('visit-photos')
                                        // 1 hour expiry
                                        .createSignedUrl(visit.photo_url, 3600)
                                    imageUrl = data?.signedUrl
                                }

                                return (
                                    <div key={visit.id} className="bg-[#ffffff] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(27,28,26,0.03)] group cursor-pointer relative">
                                        <div className="aspect-[3/4] bg-[#f5f3ef] relative overflow-hidden">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl || ''}
                                                    alt="Visit Photo"
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[#a1a1a0]">
                                                    <span className="text-sm font-medium tracking-widest uppercase">No Photo</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b1c1a]/80 via-[#1b1c1a]/40 to-transparent p-5 pt-12">
                                                <p className="text-[#ffffff] text-sm font-bold tracking-wide">
                                                    {new Date(visit.visit_date).toLocaleDateString('ja-JP')}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {visit.menu_tags?.slice(0, 2).map((tag: string) => (
                                                        <span key={tag} className="text-[10px] bg-[#ffffff]/20 text-[#ffffff] px-2 py-1 rounded-full backdrop-blur-md font-medium">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-[#ffffff] rounded-[2rem] shadow-[0_12px_40px_rgba(27,28,26,0.04)] text-[#717974] text-sm flex flex-col items-center justify-center gap-3">
                            <Camera className="w-8 h-8 text-[#e4e2de]" />
                            <p>来店記録がまだありません</p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}
