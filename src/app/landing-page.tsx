'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera, Send, Save, Clock, Menu, X, MessageCircle,
    ImageIcon, Zap, PlayCircle, BookOpen, Layers,
    Star, Share, Check, ChevronDown, CheckCircle2
} from 'lucide-react'

// --- Components ---
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
    >
        {children}
    </motion.div>
)

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <details className="group bg-surface rounded-xl overflow-hidden shadow-sm" open={isOpen} onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen) }}>
            <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
                <span className="font-bold text-primary">{question}</span>
                <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </summary>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-6 pb-6 text-on-surface-variant text-sm leading-relaxed whitespace-pre-wrap">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </details>
    )
}

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
    const [withSetup, setWithSetup] = useState(false)

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <div className="min-h-screen bg-surface font-body selection:bg-primary-fixed-dim selection:text-on-primary-fixed">

            {/* TopAppBar */}
            <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_40px_40px_-15px_rgba(27,28,26,0.06)]">
                <nav className="flex justify-between items-center px-4 sm:px-8 py-4 max-w-7xl mx-auto">
                    <Link href="/" className="flex items-center gap-2">
                        <Camera className="w-8 h-8 text-primary-stitch" />
                        <h1 className="text-xl sm:text-2xl font-headline font-bold text-primary-stitch">SnapKarte</h1>
                    </Link>

                    <div className="hidden md:flex gap-8 items-center">
                        <button onClick={() => scrollToSection('features')} className="text-on-surface-variant hover:text-primary-stitch transition-colors duration-300 font-medium tracking-wide">機能</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-on-surface-variant hover:text-primary-stitch transition-colors duration-300 font-medium tracking-wide">料金</button>
                        <button onClick={() => scrollToSection('faq')} className="text-on-surface-variant hover:text-primary-stitch transition-colors duration-300 font-medium tracking-wide">FAQ</button>
                        <Link href="/blog" className="text-on-surface-variant hover:text-primary-stitch transition-colors duration-300 font-medium tracking-wide">ブログ</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block">
                            <Link href="/login" className="text-sm font-bold text-primary-stitch hover:opacity-80 transition-opacity">
                                ログイン
                            </Link>
                        </div>
                        <Link
                            href="/login"
                            className="bg-primary-container text-on-primary-container px-4 sm:px-6 py-2.5 rounded-full font-semibold scale-95 hover:scale-100 active:scale-90 transition-transform shadow-sm"
                        >
                            無料で始める
                        </Link>
                        <button
                            className="md:hidden p-2 text-primary-stitch"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                        >
                            <div className="flex flex-col p-4 gap-4">
                                <button onClick={() => scrollToSection('features')} className="text-left py-2 font-medium text-slate-600">機能</button>
                                <button onClick={() => scrollToSection('pricing')} className="text-left py-2 font-medium text-slate-600">料金</button>
                                <button onClick={() => scrollToSection('faq')} className="text-left py-2 font-medium text-slate-600">FAQ</button>
                                <Link href="/blog" className="text-left py-2 font-medium text-slate-600">ブログ</Link>
                                <div className="h-px bg-gray-100 my-2" />
                                <Link href="/login" className="text-center py-3 font-bold text-slate-600 bg-gray-50 rounded-lg">ログイン</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="pt-24 overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative px-4 sm:px-8 py-20 lg:py-32 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <FadeIn className="z-10">
                            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs uppercase tracking-widest mb-6">Solo Stylist Edition</span>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-headline font-black text-primary leading-tight mb-8">
                                <span className="inline-block whitespace-nowrap">カルテを、</span><br />
                                <span className="inline-block whitespace-nowrap"><span className="text-tertiary">インスピレーション</span>の</span><br />
                                <span className="inline-block whitespace-nowrap">アーカイブへ。</span>
                            </h2>
                            <p className="text-lg text-on-surface-variant max-w-md mb-10 leading-relaxed">
                                忙しいサロンワークの合間に、スマホひとつで完璧なスタイル履歴を。面倒な事務作業から解放され、よりクリエイティブな時間を。
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/login" className="bg-primary-stitch text-center hover:opacity-90 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-[0_40px_40px_-15px_rgba(27,28,26,0.06)] hover:scale-105 transition-all">
                                    今すぐ無料で体験する
                                </Link>
                                <Link href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="flex justify-center items-center gap-2 px-8 py-4 text-primary-stitch font-bold hover:bg-surface-container-low rounded-xl transition-all">
                                    <PlayCircle className="w-5 h-5" />
                                    使い方を見る
                                </Link>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2} className="relative lg:h-[600px]">
                            <div className="absolute inset-0 bg-primary-fixed-dim rounded-xl -rotate-3 translate-x-4 translate-y-4 opacity-20"></div>
                            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-full bg-gray-100 rounded-xl overflow-hidden shadow-[0_40px_40px_-15px_rgba(27,28,26,0.06)]">
                                <Image
                                    className="object-cover"
                                    src="/hero-image.png"
                                    alt="Modern minimalist hair salon with professional stylist"
                                    fill
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-2 sm:-left-8 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-[0_40px_40px_-15px_rgba(27,28,26,0.06)] max-w-[240px]">
                                <div className="flex items-center gap-3 mb-2">
                                    <BookOpen className="w-5 h-5 text-tertiary" />
                                    <span className="text-sm font-bold text-primary-stitch">自動カルテ作成</span>
                                </div>
                                <p className="text-xs text-on-surface-variant leading-relaxed">写真を撮るだけで、施術内容をスマートに整理します。</p>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Value Prop / Pain Points */}
                <section className="bg-surface-container-low rounded-t-[3rem] py-32 px-4 sm:px-8 scroll-mt-24" id="features">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div className="max-w-2xl">
                                <p className="text-tertiary font-label text-sm font-bold uppercase tracking-widest mb-4">Problem vs Solution</p>
                                <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch leading-tight">
                                    <span className="inline-block whitespace-nowrap">もう、営業時間後の事務作業に</span><br className="hidden md:block" />
                                    <span className="inline-block whitespace-nowrap">追われる必要はありません。</span>
                                </h3>
                            </div>
                            <p className="text-on-surface-variant max-w-sm">SnapKarteは、スタイリストの「面倒」を「心地よい」に変えるために設計されました。</p>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Clock className="w-8 h-8 text-primary-stitch" />,
                                    title: "残業ゼロのカルテ管理",
                                    desc: "手書きやPC入力は不要。施術直後にスマホで完結。平均30分の残業時間を削減します。",
                                    translateY: ""
                                },
                                {
                                    icon: <Layers className="w-8 h-8 text-tertiary" />,
                                    title: "視覚的なスタイル履歴",
                                    desc: "「前回の仕上がり」が一目で分かる。写真中心のレイアウトで、再現性の高い施術をサポート。",
                                    translateY: "md:translate-y-6"
                                },
                                {
                                    icon: <MessageCircle className="w-8 h-8 text-secondary-stitch" />,
                                    title: "LINE連携でリピート率UP",
                                    desc: "カルテから直接メッセージ。適切なタイミングでの提案が、顧客との深い信頼関係を作ります。",
                                    translateY: ""
                                }
                            ].map((item, i) => (
                                <FadeIn delay={i * 0.1} key={i}>
                                    <div className={`bg-surface-container-lowest p-8 sm:p-10 rounded-[2rem] shadow-sm flex flex-col h-full ${item.translateY}`}>
                                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-8 ${i === 0 ? 'bg-primary-fixed' : i === 1 ? 'bg-tertiary-fixed' : 'bg-secondary-fixed'}`}>
                                            {item.icon}
                                        </div>
                                        <h4 className="text-xl font-headline font-bold text-primary-stitch mb-4">{item.title}</h4>
                                        <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="py-32 px-4 sm:px-8 scroll-mt-24" id="how-it-works">
                    <FadeIn className="max-w-4xl mx-auto text-center mb-20">
                        <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch mb-6">驚くほどシンプルな3ステップ</h3>
                        <p className="text-on-surface-variant leading-relaxed">複雑な設定は一切なし。明日からのサロンワークにすぐ取り入れられます。</p>
                    </FadeIn>

                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 md:gap-4 relative">
                        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[2px] bg-outline-variant/30"></div>
                        {[
                            { num: "1", title: "Take", desc: "施術後、自慢の仕上がりをスマホで撮影。" },
                            { num: "2", title: "Save", desc: "タグ付けやメモを添えて、10秒で保存。" },
                            { num: "3", title: "Send", desc: "必要に応じてLINEで顧客へアドバイスを送信。" }
                        ].map((step, i) => (
                            <FadeIn delay={0.1 * i} key={i}>
                                <div className="relative bg-surface p-8 mx-4 sm:mx-0 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-16 h-16 bg-primary-stitch text-white flex items-center justify-center rounded-full text-2xl font-bold mb-6 z-10 shadow-lg shadow-primary-stitch/30">{step.num}</div>
                                    <h5 className="text-lg font-bold text-primary-stitch mb-2">{step.title}</h5>
                                    <p className="text-sm text-on-surface-variant">{step.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </section>

                {/* Feature Showcase (Mockups) */}
                <section className="bg-primary-stitch py-32 px-4 sm:px-8 text-white overflow-hidden rounded-[3rem] mx-2 sm:mx-4">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn className="relative flex justify-center">
                            {/* Mockup Simulation */}
                            <div className="w-[280px] h-[580px] bg-sky-950 rounded-[3rem] border-8 border-[#30312e] relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 w-full h-6 bg-[#30312e] flex justify-center items-end pb-1 z-20">
                                    <div className="w-20 h-4 bg-sky-950 rounded-full"></div>
                                </div>
                                <div className="absolute inset-0 bg-surface-container- lowest overflow-y-auto">
                                    <div className="relative h-[300px] w-full bg-surface-container-high rounded-b-3xl">
                                        <Image
                                            src="/sample-hair.png"
                                            alt="Hair styles preview"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div className="p-6 -mt-16 relative z-10">
                                        <div className="bg-white p-5 rounded-2xl shadow-xl space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                                    <Camera className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                                                    <div className="h-3 w-32 bg-slate-300 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="h-px w-full bg-slate-100 my-2"></div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-slate-100 rounded"></div>
                                                <div className="h-2 w-4/5 bg-slate-100 rounded"></div>
                                                <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                            </div>
                                            <div className="mt-4 flex justify-center">
                                                <div className="w-full h-10 bg-[#06C755] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm shadow-md shadow-[#06c755]/30">
                                                    <Send className="w-4 h-4" />
                                                    LINEで送付する
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary floating element */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 hidden md:block"
                            >
                                <div className="bg-white p-6 rounded-xl shadow-[0_40px_40px_-15px_rgba(27,28,26,0.3)] text-primary-stitch w-64 border border-white/20">
                                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <p className="text-sm font-bold mb-1">Google口コミの増加</p>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">「丁寧なカウンセリング」の口コミが増えました！</p>
                                </div>
                            </motion.div>
                        </FadeIn>

                        <FadeIn>
                            <h3 className="text-3xl sm:text-4xl font-headline mb-12">繋がるカルテ、広がる信頼。</h3>
                            <div className="space-y-10">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-full border border-primary-fixed-dim/30 bg-white/5 flex items-center justify-center">
                                        <Share className="w-6 h-6 text-primary-fixed-dim" />
                                    </div>
                                    <div>
                                        <h6 className="text-xl font-bold mb-3">LINE連携・共有機能</h6>
                                        <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">作成したカルテの内容を、そのまま顧客のLINEへ。アフターフォローの手間を劇的に減らします。</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-full border border-primary-fixed-dim/30 bg-white/5 flex items-center justify-center">
                                        <Star className="w-6 h-6 text-primary-fixed-dim" />
                                    </div>
                                    <div>
                                        <h6 className="text-xl font-bold mb-3">Googleマイビジネス連携</h6>
                                        <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">満足度の高いお客様へ、スマートに口コミを依頼。集客の好循環を生み出します。</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* --- New Section: Ideal for Solopreneurs --- */}
                <section className="py-20 bg-surface">
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-headline font-bold text-primary-stitch mb-8">
                                個人美容師・面貸しの方に最適
                            </h2>
                            <p className="text-lg text-on-surface-variant max-w-3xl mx-auto mb-12 leading-relaxed">
                                大手サロン向けの複雑で高価なPOSレジは必要ありません。<br />
                                SnapKarteは、個人のスマートフォン1台で<br className="hidden sm:block" />
                                最高の顧客体験（CX）を提供するために作られました。
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # クレジットカード登録不要
                                </span>
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # パソコン不要
                                </span>
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # 初期費用0円
                                </span>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-32 px-4 sm:px-8 bg-surface-container-low scroll-mt-24" id="pricing">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn className="text-center mb-16">
                            <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch mb-8">すべてのスタイリストに、<br className="sm:hidden" />最適なプランを。</h3>

                            {/* Billing Cycle Toggle */}
                            <div className="flex items-center justify-center gap-4 relative max-w-sm mx-auto">
                                <div className="absolute -top-10 right-0 bg-tertiary text-white text-[10px] font-bold px-3 py-1.5 rounded-full animate-bounce shadow-md">
                                    年額ならセットアップ無料！
                                </div>
                                <span className={`text-sm font-bold ${billingCycle === 'monthly' ? 'text-primary-stitch' : 'text-on-surface-variant'}`}>月払い</span>
                                <div
                                    className="w-16 h-8 bg-surface-container-highest rounded-full p-1 cursor-pointer flex items-center relative border border-outline-variant/30"
                                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                                >
                                    <motion.div
                                        animate={{ x: billingCycle === 'yearly' ? 32 : 0 }}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        className="w-6 h-6 bg-primary-stitch rounded-full shadow-md"
                                    />
                                </div>
                                <span className={`text-sm font-bold ${billingCycle === 'yearly' ? 'text-primary-stitch' : 'text-on-surface-variant'}`}>
                                    年払い <span className="text-tertiary font-bold ml-1">(20% OFF)</span>
                                </span>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-8 items-stretch pt-4">
                            {/* Free Plan */}
                            <FadeIn delay={0.1}>
                                <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="text-lg font-headline font-bold text-on-surface-variant mb-4">Starter</h4>
                                    <div className="mb-8">
                                        <span className="text-4xl font-black text-primary-stitch">¥0</span>
                                        <span className="text-on-surface-variant text-sm font-medium ml-1">/ 月</span>
                                    </div>
                                    <ul className="space-y-5 mb-10 text-sm flex-1">
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 顧客登録 無制限</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 写真保存 無制限</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> LINE連携機能あり</li>
                                    </ul>
                                    <Link href="/login" className="w-full block text-center py-4 rounded-xl font-bold bg-surface-container text-on-surface-variant hover:bg-surface-variant transition-all">
                                        無料で始める
                                    </Link>
                                </div>
                            </FadeIn>

                            {/* Solo Plan (Highlighted) */}
                            <FadeIn delay={0.2} className="relative z-10 md:-mt-6 md:-mb-6">
                                <div className="bg-primary-stitch p-8 sm:p-10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(19,66,49,0.3)] flex flex-col h-full relative border border-primary-fixed-dim/20">
                                    <div className="absolute -top-4 right-8 bg-tertiary text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">Most Popular</div>
                                    <h4 className="text-lg font-headline font-bold text-primary-fixed-dim mb-4">Solo Pro</h4>
                                    <div className="mb-8 text-white relative z-10">
                                        <span className="text-5xl font-black">{billingCycle === 'monthly' ? '¥2,980' : '¥29,800'}</span>
                                        <span className="text-primary-fixed-dim text-sm font-medium ml-1">/ {billingCycle === 'monthly' ? '月' : '年'}</span>
                                    </div>
                                    <ul className="space-y-5 mb-10 text-sm text-primary-fixed-dim flex-1 relative z-10">
                                        <li className="flex gap-3 text-white font-medium leading-relaxed"><CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> Starterの全機能</li>
                                        <li className="flex gap-3 text-white font-medium leading-relaxed"><CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> 高度な分析ダッシュボード</li>
                                        <li className="flex gap-3 text-white font-medium leading-relaxed"><CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> 新機能の先行アクセス・優先サポート</li>

                                        {/* Setup Support Feature */}
                                        <li className={`flex gap-3 mt-8 p-3 rounded-xl border ${billingCycle === 'yearly' ? 'border-tertiary/50 bg-tertiary/10' : 'border-white/10'}`}>
                                            <div className="mt-0.5"><Zap className={`w-5 h-5 ${billingCycle === 'yearly' ? 'text-tertiary fill-tertiary' : 'text-primary-fixed-dim'}`} /></div>
                                            <div className="w-full">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-white font-bold">初期導入サポート</span>
                                                    {billingCycle === 'monthly' && (
                                                        <label className="inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" checked={withSetup} onChange={(e) => setWithSetup(e.target.checked)} />
                                                            <div className="relative w-11 h-6 bg-primary-container peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-tertiary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-tertiary"></div>
                                                        </label>
                                                    )}
                                                </div>
                                                <div className={`text-xs ${billingCycle === 'yearly' ? 'text-tertiary-fixed font-bold' : 'text-primary-fixed-dim'}`}>
                                                    {billingCycle === 'yearly' ? (
                                                        '★ 年払いなら無料特典！'
                                                    ) : (
                                                        withSetup ? <span className="text-white font-bold">+ ¥29,800 (一回払い)</span> : 'オプションで追加可能'
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <Link href={`/login?plan=${billingCycle}&with_setup=${billingCycle === 'yearly' ? 'true' : withSetup}`} className="w-full block text-center py-4 rounded-xl font-bold bg-white text-primary-stitch hover:bg-primary-fixed-dim hover:text-emerald-900 transition-all shadow-lg relative z-10">
                                        {billingCycle === 'monthly' && withSetup ? '総額 ¥32,780 で始める' : 'プロプランを試す'}
                                    </Link>
                                </div>
                            </FadeIn>

                            {/* Salon Plan */}
                            <FadeIn delay={0.3}>
                                <div className="bg-white p-8 sm:p-10 rounded-[2rem] flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
                                    <h4 className="text-lg font-headline font-bold text-on-surface-variant mb-4">Salon Team</h4>
                                    <div className="mb-8">
                                        <span className="text-4xl font-black text-primary-stitch">¥4,980</span>
                                        <span className="text-on-surface-variant text-sm font-medium ml-1">/ 月〜</span>
                                        <div className="mt-2 text-xs font-bold text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded">Coming Soon</div>
                                    </div>
                                    <ul className="space-y-5 mb-10 text-sm flex-1 opacity-60">
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 最大5名まで利用可能</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 顧客データ共有・一括管理</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 予約システム連携</li>
                                    </ul>
                                    <button disabled className="w-full py-4 rounded-xl font-bold bg-surface-container text-on-surface-variant cursor-not-allowed">
                                        準備中
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-32 px-4 sm:px-8 bg-surface-container scroll-mt-24" id="faq">
                    <div className="max-w-3xl mx-auto">
                        <FadeIn>
                            <h3 className="text-3xl sm:text-4xl font-headline text-center text-primary-stitch mb-16">
                                よくあるご質問
                            </h3>
                        </FadeIn>
                        <div className="space-y-4">
                            <AccordionItem
                                question="SnapKarteは無料で使えますか？"
                                answer="はい、顧客登録や写真の保存、LINE連携など、カルテ管理に必要な基本機能はすべて無料で無制限にご利用いただけます。将来的に提供される「高度な売上分析機能」や「優先サポート」をお求めの場合にのみ、Soloプランへのアップグレードをご検討ください。"
                            />
                            <AccordionItem
                                question="LINE公式アカウントを持っていなくても使えますか？"
                                answer={`はい、ご利用可能です。LINE公式アカウントの開設サポート（マニュアル等）もご用意しておりますので、初めての方でも安心して導入いただけます。\n\n年払いプランをお選びいただくと、初期設定の代行サポートが無料で付いてきます。`}
                            />
                            <AccordionItem
                                question="オフラインでも使えますか？"
                                answer="はい、一時的なオフライン状態でもデータの保存機能が一部動作します。ただしLINE連携の送信や画像アップロードはインターネット接続環境で行う必要があります。"
                            />
                            <AccordionItem
                                question="パソコンがなくても使えますか？"
                                answer="はい、スマートフォンやタブレットのみで全ての機能をご利用いただけます。初期化設定や分析ダッシュボードもスマホ画面に最適化されています。"
                            />
                            <AccordionItem
                                question="解約はいつでも可能ですか？"
                                answer="はい。契約期間の縛りはなく、いつでもマイページから解約手続きが可能です。解約後も一定期間はデータの閲覧が可能です。"
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative py-40 px-4 sm:px-8 flex justify-center items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-image.png"
                            alt="Dreamy modern beauty salon background"
                            fill
                            className="object-cover brightness-[0.3]"
                        />
                    </div>
                    <FadeIn className="relative z-10 text-center text-white max-w-3xl border border-white/10 bg-black/20 backdrop-blur-sm p-8 sm:p-16 rounded-[3rem]">
                        <h3 className="text-3xl sm:text-5xl lg:text-5xl font-headline font-black mb-8 leading-tight">
                            あなたの指先から、<br />サロン体験を再定義する。
                        </h3>
                        <p className="text-lg sm:text-xl text-primary-fixed-dim mb-12 opacity-90 leading-relaxed font-medium">
                            SnapKarteで、もっと自由で創造的な毎日を始めましょう。
                        </p>
                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <Link href="/login" className="bg-white text-primary-stitch px-10 py-5 rounded-full text-lg font-bold shadow-[0_20px_40px_-15px_rgba(255,255,255,0.3)] hover:scale-105 transition-all w-full sm:w-auto">
                                無料で今すぐ始める
                            </Link>
                            <p className="text-sm font-medium text-emerald-200">
                                クレジットカード登録不要 / 10秒でセットアップ
                            </p>
                        </div>
                    </FadeIn>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full bg-surface-container-low pt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-12 gap-10">
                    <div className="flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <Camera className="w-6 h-6 text-primary-stitch" />
                            <span className="font-headline text-2xl font-bold text-primary-stitch">SnapKarte</span>
                        </div>
                        <p className="text-sm font-medium tracking-wide text-on-surface-variant max-w-sm leading-relaxed">
                            スタイリストの創造性を引き出す、<br />デジタルカルテ・ソリューション。
                        </p>
                    </div>

                    <div className="flex flex-row flex-wrap gap-x-8 gap-y-4">
                        <div className="flex flex-col gap-3">
                            <button onClick={() => scrollToSection('features')} className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">機能</button>
                            <button onClick={() => scrollToSection('pricing')} className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">料金</button>
                            <button onClick={() => scrollToSection('faq')} className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">FAQ</button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/blog" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">ブログ</Link>
                            <Link href="/legal/privacy" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">プライバシーポリシー</Link>
                            <Link href="/legal/terms" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">利用規約</Link>
                            <Link href="/legal/tokusho" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">特商法表記</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-outline-variant/20 py-8 px-8 flex justify-center text-center">
                    <p className="text-xs font-medium tracking-wider text-emerald-800/50 uppercase">
                        &copy; {new Date().getFullYear()} SnapKarte Digital Atelier. All rights reserved.
                    </p>
                </div>
            </footer>
        </div >
    )
}
