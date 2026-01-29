import { createClient } from '@/utils/supabase/server'
import { ArrowLeft, Calendar, User, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DeleteCustomerButton from './delete-button'
import CustomerNotes from './notes'

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const supabase = await createClient()
    const { id } = await params

    // Fetch Customer
    const { data: customer } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single()

    if (!customer) {
        notFound()
    }

    // Fetch Visits
    const { data: visits } = await supabase
        .from('visits')
        .select('*')
        .eq('customer_id', id)
        .order('visit_date', { ascending: false })

    return (
        <div className="min-h-screen bg-muted/20 pb-10">
            <header className="bg-card sticky top-0 z-10 border-b border-border">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4 min-w-0">
                        <Link href="/customers" className="p-2 -ml-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors shrink-0">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-bold text-lg truncate">{customer.display_name}</h1>
                    </div>
                    <DeleteCustomerButton customerId={id} />
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 space-y-6">

                {/* Profile Card */}
                <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                            {customer.display_name?.[0]}
                        </div>
                        {customer.line_user_id ? (
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] px-2 py-1 bg-[#06C755]/10 text-[#06C755] rounded-full font-bold border border-[#06C755]/20 flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" />
                                    LINE連携中
                                </span>
                                <span className="text-[10px] text-muted-foreground mt-1 font-mono">{customer.line_user_id.slice(0, 8)}...</span>
                            </div>
                        ) : (
                            <span className="text-[10px] px-2 py-1 bg-muted text-muted-foreground rounded-full border border-border">
                                LINE未連携
                            </span>
                        )}
                    </div>

                    <div className="space-y-1">
                        <h2 className="text-xl font-bold">{customer.display_name}</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            最終来店: {customer.last_visit_date ? new Date(customer.last_visit_date).toLocaleDateString('ja-JP') : '記録なし'}
                        </p>
                    </div>
                </div>

                <CustomerNotes customerId={id} initialNotes={customer.notes} />

                {/* Gallery / History */}
                <div>
                    <h3 className="text-sm font-bold text-muted-foreground mb-3 uppercase tracking-wider pl-1">
                        来店履歴・アルバム
                    </h3>

                    {visits && visits.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                            {visits.map(visit => {
                                // Construct public URL if path exists
                                // NOTE: In real app, consider using signed URLs or pre-fetching public URLs properly
                                const imageUrl = visit.photo_url
                                    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/visit-photos/${visit.photo_url}`
                                    : null

                                return (
                                    <div key={visit.id} className="bg-card rounded-xl overflow-hidden border border-border shadow-sm group">
                                        <div className="aspect-[3/4] bg-muted relative">
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="Visit Photo"
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    <span className="text-xs">No Photo</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
                                                <p className="text-white text-xs font-bold">
                                                    {new Date(visit.visit_date).toLocaleDateString('ja-JP')}
                                                </p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {visit.menu_tags?.slice(0, 2).map((tag: string) => (
                                                        <span key={tag} className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded backdrop-blur-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-card rounded-xl border border-border border-dashed text-muted-foreground text-sm">
                            来店記録がまだありません
                        </div>
                    )}
                </div>

            </main>
        </div>
    )
}
