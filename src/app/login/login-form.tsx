'use client'

import { useState, useTransition, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Sparkles, Loader2, Store, Mail, Lock, ArrowRight, Camera } from 'lucide-react'
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
        <div className="flex min-h-screen items-center justify-center p-4 bg-[#fbf9f5] font-sans text-[#1b1c1a]">
            <div className="w-full max-w-md bg-[#ffffff] rounded-[2.5rem] shadow-[0_20px_60px_rgba(27,28,26,0.06)] overflow-hidden">
                {/* Header Section */}
                <div className="bg-[#f5f3ef]/50 p-10 text-center relative overflow-hidden">
                    <div className="inline-flex items-center justify-center p-3.5 rounded-[1rem] bg-gradient-to-br from-[#134231] to-[#2d5a47] mb-5 shadow-lg shadow-[#134231]/20">
                        <Camera className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold tracking-wide text-[#134231]">
                        SnapKarte
                    </h1>
                    <p className="text-[#414944] mt-3 text-sm font-medium tracking-wider">
                        美容室向けLINE自動連携CRM
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-10">
                    <div className="flex p-1.5 mb-10 bg-[#f5f3ef] rounded-2xl shadow-inner">
                        <button
                            onClick={() => {
                                setIsLogin(true)
                                setError(null)
                            }}
                            className={`flex-1 text-sm font-bold py-3 rounded-xl transition-all duration-300 ${isLogin
                                ? 'bg-[#ffffff] text-[#134231] shadow-sm'
                                : 'text-[#717974] hover:text-[#414944]'
                                }`}
                        >
                            ログイン
                        </button>
                        <button
                            onClick={() => {
                                setIsLogin(false)
                                setError(null)
                            }}
                            className={`flex-1 text-sm font-bold py-3 rounded-xl transition-all duration-300 ${!isLogin
                                ? 'bg-[#ffffff] text-[#134231] shadow-sm'
                                : 'text-[#717974] hover:text-[#414944]'
                                }`}
                        >
                            新規登録
                        </button>
                    </div>

                    <form action={handleSubmit} className="space-y-6">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-[#717974] ml-2">
                                    店舗名
                                </label>
                                <div className="relative group">
                                    <Store className="absolute left-4 top-4 w-5 h-5 text-[#a1a1a0] group-focus-within:text-[#134231] transition-colors" />
                                    <input
                                        name="shopName"
                                        type="text"
                                        required={!isLogin}
                                        placeholder="Hair Salon Tokyo"
                                        className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-12 py-4 text-sm focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] focus:outline-none transition-all placeholder:text-[#a1a1a0]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#717974] ml-2">
                                メールアドレス
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-4 w-5 h-5 text-[#a1a1a0] group-focus-within:text-[#134231] transition-colors" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-12 py-4 text-sm focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] focus:outline-none transition-all placeholder:text-[#a1a1a0]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-[#717974] ml-2">
                                パスワード
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-4 w-5 h-5 text-[#a1a1a0] group-focus-within:text-[#134231] transition-colors" />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-12 py-4 text-sm focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] focus:outline-none transition-all placeholder:text-[#a1a1a0]"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-[1rem] bg-[#eb5757]/10 text-[#eb5757] text-sm font-bold border-none text-center">
                                {error}
                            </div>
                        )}

                        {/* Hidden inputs to pass query params to server action */}
                        <input type="hidden" name="plan" value={searchParams.get('plan') || ''} />
                        <input type="hidden" name="with_setup" value={searchParams.get('with_setup') || ''} />

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white font-bold py-4 rounded-full hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-[0_8px_16px_rgba(27,28,26,0.06)]"
                            >
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? 'ログイン' : 'アカウント作成'}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-xs text-[#a1a1a0] leading-relaxed">
                        続行することで、<a href="/legal/terms" target="_blank" className="text-[#717974] hover:text-[#134231] underline underline-offset-4 font-medium transition-colors">利用規約</a>と<a href="/legal/privacy" target="_blank" className="text-[#717974] hover:text-[#134231] underline underline-offset-4 font-medium transition-colors">プライバシーポリシー</a>に同意したことになります。
                    </p>
                </div>
            </div>
        </div>
    )
}
