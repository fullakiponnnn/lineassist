'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, User, Loader2, Save } from 'lucide-react'
import { createCustomer } from './actions'

export default function NewCustomerPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)

        const formData = new FormData(e.currentTarget)
        const res = await createCustomer(null, formData)

        if (res?.error) {
            alert(res.error)
            setIsSubmitting(false)
        } else if (res?.success) {
            // Success
            router.back()
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-muted rounded-full">
                    <X className="w-6 h-6" />
                </button>
                <h1 className="text-lg font-bold">新規顧客登録</h1>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold flex items-center gap-2">
                            <User className="w-4 h-4 text-primary" />
                            お名前 (必須)
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="山田 花子"
                            className="w-full bg-card border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                            LINE User ID (任意)
                        </label>
                        <input
                            type="text"
                            name="lineUserId"
                            placeholder="U1234..."
                            className="w-full bg-card border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                        <p className="text-xs text-muted-foreground ml-1">
                            ※ 現時点では不明な場合は自動生成されたIDが使用されます。後で連携可能です。
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                            登録する
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}
