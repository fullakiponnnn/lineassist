'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Sparkles, Loader2, Store, Mail, Lock, ArrowRight } from 'lucide-react'
import { login, signup } from './actions'

export default function LoginForm() {
    const searchParams = useSearchParams()
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        if (searchParams.get('mode') === 'signup') {
            setIsLogin(false)
        }
    }, [searchParams])

    async function handleSubmit(formData: FormData) {
        setError(null)
        startTransition(async () => {
            const action = isLogin ? login : signup
            const result = await action(formData)
            if (result?.error) {
                setError(result.error)
            }
        })
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-muted/30">
            <div className="w-full max-w-md bg-card rounded-2xl shadow-xl border border-border overflow-hidden">
                {/* Header Section */}
                <div className="bg-primary/5 p-8 text-center border-b border-border/50">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4 ring-1 ring-primary/20 shadow-[0_2px_10px_-4px_var(--color-primary)]">
                        <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        LineAssist
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        美容室向けLINE自動連携CRM
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <div className="flex p-1 mb-8 bg-muted rounded-xl">
                        <button
                            onClick={() => {
                                setIsLogin(true)
                                setError(null)
                            }}
                            className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 ${isLogin
                                ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            ログイン
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false)
                                setError(null)
                            }}
                            className={`flex-1 text-sm font-medium py-2.5 rounded-lg transition-all duration-200 ${!isLogin
                                ? 'bg-background text-foreground shadow-sm ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            新規登録
                        </button>
                    </div>

                    <form action={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                                    店舗名
                                </label>
                                <div className="relative">
                                    <Store className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <input
                                        name="shopName"
                                        type="text"
                                        required={!isLogin}
                                        placeholder="Hair Salon Tokyo"
                                        className="w-full bg-muted/50 border border-input rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                                メールアドレス
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-muted/50 border border-input rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">
                                パスワード
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-muted/50 border border-input rounded-xl px-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all placeholder:text-muted-foreground/50"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-xs font-medium border border-destructive/20">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-all focus:ring-offset-2 focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-primary/20"
                        >
                            {isPending ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'ログイン' : 'アカウント作成'}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-muted-foreground">
                        続行することで、利用規約とプライバシーポリシーに同意したことになります。
                    </p>
                </div>
            </div>
        </div>
    )
}
