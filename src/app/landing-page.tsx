'use client'

import Link from 'next/link'
import { Rocket, Check, Zap, Smartphone, ArrowRight } from 'lucide-react'

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 p-4 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="container mx-auto max-w-5xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">L</div>
                        <span className="font-bold text-xl">SnapKarte</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm font-bold text-slate-600 hover:text-primary transition-colors"
                        >
                            ログイン
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm font-bold bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:shadow-lg hover:opacity-90 transition-all"
                        >
                            無料で始める
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-4 text-center">
                <div className="container mx-auto max-w-4xl space-y-8">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold border border-blue-100 animate-fade-in-up">
                        <Rocket className="w-4 h-4" />
                        美容室向けLINE自動連携CRM
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight text-slate-900 animate-fade-in-up delay-100">
                        施術写真を撮るだけ。<br />
                        <span className="text-primary">お礼LINE</span>まで<span className="text-primary">全自動。</span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        SnapKarteは、美容室の面倒なカルテ管理とLINE送信を自動化します。<br />
                        お客様の満足度を高め、リピート率を劇的に向上させましょう。
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-300">
                        <Link
                            href="/login"
                            className="w-full sm:w-auto bg-primary text-primary-foreground text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-primary/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
                        >
                            今すぐ無料で始める <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Mockup / Image Placeholder */}
                    <div className="mt-16 relative mx-auto max-w-3xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="bg-slate-900 rounded-2xl p-2 shadow-2xl border border-slate-800">
                            <div className="bg-slate-800 rounded-xl overflow-hidden aspect-[16/10] relative flex items-center justify-center">
                                <span className="text-slate-500 font-bold">ダッシュボード画面イメージ</span>
                                {/* Add real image here later */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="py-20 bg-white">
                <div className="container mx-auto max-w-5xl px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">5秒で送信完了</h3>
                            <p className="text-slate-500 leading-relaxed">
                                施術写真を撮って保存するだけ。
                                自動でお客様にLINEでお礼メッセージと写真が届きます。
                            </p>
                        </div>
                        {/* Feature 2 */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Smartphone className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">QRコード連携</h3>
                            <p className="text-slate-500 leading-relaxed">
                                専用の連携ガイド画面をお客様に見せるだけ。
                                QRコードを読み取って名前を送れば、一瞬で連携完了。
                            </p>
                        </div>
                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all group">
                            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Check className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">顧客管理 & 分析</h3>
                            <p className="text-slate-500 leading-relaxed">
                                過去の来店写真もパッと確認。
                                顧客ごとのギャラリーとして、カウンセリングの質を高めます。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-slate-50 text-center text-slate-400 text-sm border-t border-slate-200">
                <p>&copy; 2024 SnapKarte. All rights reserved.</p>
            </footer>
        </div>
    )
}
