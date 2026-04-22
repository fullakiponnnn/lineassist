'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, User, Loader2, Save } from 'lucide-react'
import { createCustomer } from './actions'
import PaywallModal from '@/components/paywall-modal'

export default function NewCustomerPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPaywall, setShowPaywall] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const res = await createCustomer(null, formData)

        if (res?.error === 'FREE_PLAN_LIMIT_REACHED') {
            setShowPaywall(true)
            setIsSubmitting(false)
        } else if (res?.error) {
            alert(res.error)
            setIsSubmitting(false)
        } else if (res?.success) {
            // Success
            router.back()
        }
    }

    return (
        <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans flex flex-col">
            <PaywallModal
                isOpen={showPaywall}
                onClose={() => setShowPaywall(false)}
                title="カルテ登録数の上限に達しました"
                description={`無料のStarterプランでは、カルテを最大30件まで登録できます。\n\n引き続き新しいカルテを登録・管理するには、Soloプランへのアップグレードをご検討ください。`}
            />
            <header className="sticky top-0 z-50 bg-[#fbf9f5]/80 backdrop-blur-xl p-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-3 -ml-2 hover:bg-[#f5f3ef] text-[#414944] hover:text-[#134231] rounded-full transition-colors">
                    <X className="w-5 h-5" />
                </button>
                <h1 className="font-serif font-bold text-xl tracking-wide text-[#1b1c1a]">新規顧客登録</h1>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold flex items-center gap-2 text-[#414944]">
                            <User className="w-4 h-4 text-[#6a5e33]" />
                            お名前 (必須)
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="山田 花子"
                            className="w-full bg-[#ffffff] rounded-[1rem] px-5 py-4 text-base shadow-[0_8px_24px_rgba(27,28,26,0.04)] focus:shadow-[0_12px_32px_rgba(27,28,26,0.08)] outline-none border-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold flex items-center gap-2 text-[#414944]">
                            LINE User ID (任意)
                        </label>
                        <input
                            type="text"
                            name="lineUserId"
                            placeholder="U1234..."
                            className="w-full bg-[#ffffff] rounded-[1rem] px-5 py-4 text-base shadow-[0_8px_24px_rgba(27,28,26,0.04)] focus:shadow-[0_12px_32px_rgba(27,28,26,0.08)] outline-none border-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                        />
                        <p className="text-xs text-[#717974] ml-2 leading-relaxed">
                            ※ 現時点では不明な場合は自動生成されたIDが使用されます。<br/>後からでも連携可能です。
                        </p>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white font-bold py-4 rounded-full shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
                        >
                            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                            登録する
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
