'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera, Clock, Menu, X, MessageCircle,
    Zap, PlayCircle, BookOpen, Layers,
    Star, Share, Check, ChevronDown, CheckCircle2,
    ArrowLeft, Calendar, QrCode, Printer, Smartphone,
    Shield, Heart
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
                            <span className="inline-block px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs tracking-widest mb-6">個人スタイリストのための顧客カルテ</span>
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
                                    src="/hero-japanese.png"
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
                                    icon: <Camera className="w-8 h-8 text-primary-stitch" />,
                                    title: "写真を撮って即カルテ化",
                                    desc: "施術後の仕上がりをスマホで撮影するだけ。来店日・メニュータグ・特記事項と一緒に、ビジュアルカルテが10秒で完成します。",
                                    translateY: ""
                                },
                                {
                                    icon: <MessageCircle className="w-8 h-8 text-tertiary" />,
                                    title: "LINE自動送信でフォロー",
                                    desc: "カルテ保存と同時に、施術写真と感謝メッセージが顧客のLINEへ自動送信。手間なくアフターフォローが完了します。",
                                    translateY: "md:translate-y-6"
                                },
                                {
                                    icon: <QrCode className="w-8 h-8 text-secondary-stitch" />,
                                    title: "QR受付で顧客を瞬時に特定",
                                    desc: "デジタル会員証のQRコードをスキャンするだけで、顧客カルテにアクセス。紙の顧客リストはもう不要です。",
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
                            { num: "1", title: "Take", desc: "施術後、仕上がりをスマホでパシャッと撮影。" },
                            { num: "2", title: "Save", desc: "顧客を選んでメニュータグを入力し、保存。" },
                            { num: "3", title: "Auto", desc: "保存と同時にLINEで写真付きメッセージが自動送信。" }
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

                {/* --- Numbers / Impact --- */}
                <section className="py-20 px-4 sm:px-8 bg-surface-container-low">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {[
                                { num: "10秒", label: "カルテ作成時間" },
                                { num: "0円", label: "初期費用" },
                                { num: "30分", label: "毎日の時短効果" },
                                { num: "自動", label: "LINE送信" },
                            ].map((stat, i) => (
                                <FadeIn delay={i * 0.1} key={i}>
                                    <div>
                                        <p className="text-3xl sm:text-4xl font-headline font-black text-primary-stitch mb-2">{stat.num}</p>
                                        <p className="text-sm text-on-surface-variant font-medium">{stat.label}</p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Feature Showcase (Mockups) */}
                <section className="bg-primary-stitch py-32 px-4 sm:px-8 text-white overflow-hidden rounded-[3rem] mx-2 sm:mx-4">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                        <FadeIn className="relative flex justify-center lg:justify-start lg:ml-4 xl:ml-12">
                            <div className="relative w-[360px]">
                                {/* Hyper-Realistic Mobile Mockup */}
                                <div className="w-[360px] h-[740px] bg-[#1b1c1a] rounded-[3.5rem] p-[14px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] ring-4 ring-[#3a3b3a]/20 relative">
                                    {/* Screen Content Wrapper */}
                                    <div className="w-full h-full bg-[#fbf9f5] rounded-[2.5rem] relative overflow-hidden font-sans text-[#1b1c1a] flex flex-col shadow-[inset_0_0_0_2px_rgba(255,255,255,0.1)] isolate">
                                        {/* Dynamic Island */}
                                        <div className="absolute top-2 inset-x-0 flex justify-center z-40">
                                            <div className="w-[110px] h-[32px] bg-[#1b1c1a] rounded-full shadow-inner flex items-center justify-between px-2.5">
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] border border-white/5"></div>
                                                <div className="w-2.5 h-2.5 rounded-full bg-[#111111] border border-white/5 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[1px]"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* App Header */}
                                        <div className="pt-14 pb-3 px-5 bg-[#fbf9f5]/85 backdrop-blur-xl flex items-center justify-between z-30 sticky top-0 border-b border-[#e4e2de]/50 rounded-t-[2.5rem]">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 -ml-1.5 text-[#414944] hover:bg-[#f5f3ef] rounded-full transition-colors"><ArrowLeft className="w-5 h-5" /></div>
                                                <span className="font-serif font-bold text-lg tracking-wide text-[#1b1c1a]">Mio Sato</span>
                                            </div>
                                            <Menu className="w-5 h-5 text-[#414944]" />
                                        </div>

                                        {/* App Body */}
                                        <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
                                            {/* Profile Card */}
                                            <div className="bg-[#ffffff] rounded-3xl p-5 shadow-[0_8px_30px_rgba(27,28,26,0.04)] mt-2">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-[#f5f3ef] flex items-center justify-center text-xl font-serif font-bold text-[#134231] shadow-sm">
                                                        M
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <span className="text-[10px] px-2.5 py-1 bg-[#06C755]/10 text-[#06C755] rounded-full font-bold flex items-center gap-1">
                                                            <MessageCircle className="w-3 h-3" />
                                                            LINE連携中
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <h2 className="text-xl font-serif font-bold tracking-tight text-[#1b1c1a]">Mio Sato</h2>
                                                    <p className="text-xs text-[#414944] flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-[#6a5e33]" />
                                                        最終来店: 2026/04/10
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <div className="bg-[#ffffff] rounded-3xl p-5 shadow-[0_8px_30px_rgba(27,28,26,0.04)]">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <BookOpen className="w-4 h-4 text-[#134231]" />
                                                    <h3 className="font-serif font-bold text-sm">特記事項</h3>
                                                </div>
                                                <p className="text-xs text-[#414944] leading-relaxed">
                                                    地毛の暗髪を活かした透明感のあるダークトーン希望。顔周りのレイヤーで動きを出すスタイルがお気に入り。普段はコテで軽く巻くことが多いそうなので、ご自宅で再現しやすいカットラインを意識する。
                                                </p>
                                            </div>

                                            {/* Gallery / History */}
                                            <div>
                                                <h3 className="font-serif text-sm font-bold text-[#1b1c1a] mb-3 tracking-wide flex items-center gap-2">
                                                    <span className="text-[#6a5e33]">◆</span> 来店履歴・アルバム
                                                </h3>

                                                <div className="grid grid-cols-2 gap-3">
                                                    {[
                                                        { id: 1, date: '2026/04/10', tags: ['カット', 'カラー'], img: '/ui-hair-1-new.png' },
                                                        { id: 2, date: '2026/02/15', tags: ['カット', 'TR'], img: '/ui-hair-2-new.png' },
                                                        { id: 3, date: '2025/12/20', tags: ['カラー'], img: '/ui-hair-3-new.png' },
                                                        { id: 4, date: '2025/10/05', tags: ['カット', 'パーマ'], img: '/ui-hair-4-new.png' }
                                                    ].map((visit) => (
                                                        <div key={visit.id} className="bg-[#ffffff] rounded-[1.5rem] overflow-hidden shadow-[0_4px_15px_rgba(27,28,26,0.03)] relative">
                                                            <div className="aspect-[3/4] bg-[#f5f3ef] relative overflow-hidden">
                                                                <Image src={visit.img} alt={`Visit ${visit.date}`} fill className="object-cover" />
                                                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b1c1a]/80 via-[#1b1c1a]/40 to-transparent p-3 pt-8">
                                                                    <p className="text-[#ffffff] text-[11px] font-bold tracking-wide">
                                                                        {visit.date}
                                                                    </p>
                                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                                        {visit.tags.map((tag) => (
                                                                            <span key={tag} className="text-[9px] bg-[#ffffff]/20 text-[#ffffff] px-1.5 py-0.5 rounded-full backdrop-blur-md font-medium">
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
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
                                    className="absolute -right-6 lg:-right-24 xl:-right-32 top-1/2 -translate-y-1/2 hidden md:block z-40"
                                >
                                    <div className="bg-white p-6 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] text-primary-stitch w-64 border border-[#e4e2de]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-8 h-8 rounded-full bg-[#06C755]/10 flex items-center justify-center">
                                                <MessageCircle className="w-4 h-4 text-[#06C755]" />
                                            </div>
                                            <span className="text-sm font-bold">LINE自動送信</span>
                                        </div>
                                        <p className="text-xs text-[#414944] leading-relaxed">施術写真とお礼メッセージが自動で届きました！</p>
                                        <div className="flex items-center gap-1 mt-3 text-[10px] text-[#06C755] font-bold">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            送信完了
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeIn>

                        <FadeIn>
                            <h3 className="text-3xl sm:text-4xl font-headline mb-12">繋がるカルテ、広がる信頼。</h3>
                            <div className="space-y-10">
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-full border border-primary-fixed-dim/30 bg-white/5 flex items-center justify-center">
                                        <Share className="w-6 h-6 text-primary-fixed-dim" />
                                    </div>
                                    <div>
                                        <h6 className="text-xl font-bold mb-3">LINE自動送信・フォローアップ</h6>
                                        <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">カルテ保存と同時に、施術写真と感謝メッセージが顧客のLINEへ自動送信。アフターフォローの手間を劇的に減らします。</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-full border border-primary-fixed-dim/30 bg-white/5 flex items-center justify-center">
                                        <QrCode className="w-6 h-6 text-primary-fixed-dim" />
                                    </div>
                                    <div>
                                        <h6 className="text-xl font-bold mb-3">デジタル会員証・QR受付</h6>
                                        <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">顧客毎に発行されるデジタル会員証のQRコードをスキャンすれば、瞬時にカルテを開けます。</p>
                                    </div>
                                </div>
                                <div className="flex gap-6">
                                    <div className="shrink-0 w-14 h-14 rounded-full border border-primary-fixed-dim/30 bg-white/5 flex items-center justify-center">
                                        <Printer className="w-6 h-6 text-primary-fixed-dim" />
                                    </div>
                                    <div>
                                        <h6 className="text-xl font-bold mb-3">LINE友だち追加ポスター生成</h6>
                                        <p className="text-primary-fixed-dim leading-relaxed text-sm sm:text-base">店舗用のおしゃれな「LINEお友だち追加」ポスターをワンクリックで生成。印刷して店内に掲示するだけです。</p>
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
                                    # 完全無料プランあり
                                </span>
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # パソコン不要
                                </span>
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # 初期費用0円
                                </span>
                                <span className="px-6 py-3 bg-surface-container-low rounded-full text-secondary-stitch font-bold border border-outline-variant/20 shadow-sm text-sm">
                                    # 10秒でセットアップ
                                </span>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* --- All Features Grid --- */}
                <section className="py-24 px-4 sm:px-8 bg-surface-container-low">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn className="text-center mb-16">
                            <p className="text-tertiary font-label text-sm font-bold uppercase tracking-widest mb-4">All Features</p>
                            <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch">すべての機能を、ひとつのアプリで。</h3>
                        </FadeIn>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Camera className="w-6 h-6" />, title: "写真付きカルテ作成", desc: "施術写真・来店日・メニュータグを記録" },
                                { icon: <MessageCircle className="w-6 h-6" />, title: "LINE自動送信", desc: "保存と同時に写真付きメッセージを送信" },
                                { icon: <QrCode className="w-6 h-6" />, title: "QRコード受付", desc: "会員証をスキャンして顧客カルテを呼び出し" },
                                { icon: <Smartphone className="w-6 h-6" />, title: "デジタル会員証", desc: "顧客ごとにQR付きの会員証を自動発行" },
                                { icon: <Printer className="w-6 h-6" />, title: "ポスター自動生成", desc: "LINE友だち追加ポスターをワンクリックで作成" },
                                { icon: <BookOpen className="w-6 h-6" />, title: "連携ガイド", desc: "LINE公式アカウント設定をステップバイステップで解説" },
                                { icon: <Layers className="w-6 h-6" />, title: "来店履歴アルバム", desc: "写真中心のレイアウトで過去のスタイルを一覧" },
                                { icon: <Heart className="w-6 h-6" />, title: "特記事項メモ", desc: "顧客ごとの好みや注意点を自由に記録" },
                                { icon: <Shield className="w-6 h-6" />, title: "セキュアなデータ管理", desc: "暗号化ストレージでお客様のデータを安全に保護" },
                            ].map((f, i) => (
                                <FadeIn delay={i * 0.05} key={i}>
                                    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                                        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary-stitch">
                                            {f.icon}
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-primary-stitch mb-1">{f.title}</h5>
                                            <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section className="py-32 px-4 sm:px-8 bg-surface-container-low scroll-mt-24" id="pricing">
                    <div className="max-w-7xl mx-auto">
                        <FadeIn className="text-center mb-16">
                            <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch mb-14">すべてのスタイリストに、<br className="sm:hidden" />最適なプランを。</h3>

                            {/* Billing Cycle Toggle */}
                            <div className="flex items-center justify-center gap-4 relative max-w-sm mx-auto">
                                <div className="absolute -top-7 right-0 bg-tertiary text-white text-[10px] font-bold px-3 py-1.5 rounded-full animate-bounce shadow-md">
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
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> カルテ登録 最大30件まで</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 写真保存 無制限</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> LINE自動送信 月10回まで</li>
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
                                    <h4 className="text-lg font-headline font-bold text-primary-fixed-dim mb-4">Soloプラン</h4>
                                    <div className="mb-8 text-white relative z-10">
                                        <span className="text-5xl font-black">{billingCycle === 'monthly' ? '¥2,980' : '¥29,800'}</span>
                                        <span className="text-primary-fixed-dim text-sm font-medium ml-1">/ {billingCycle === 'monthly' ? '月' : '年'}</span>
                                    </div>
                                    <ul className="space-y-5 mb-10 text-sm text-primary-fixed-dim flex-1 relative z-10">
                                        <li className="flex gap-3 text-white font-medium leading-relaxed"><CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> 顧客登録・来店記録 無制限</li>
                                        <li className="flex gap-3 text-white font-medium leading-relaxed"><CheckCircle2 className="w-5 h-5 text-tertiary shrink-0" /> LINE自動送信 無制限</li>
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
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> スタッフ間カルテ共有</li>
                                        <li className="flex gap-3 text-slate-700 font-medium leading-relaxed"><Check className="w-5 h-5 text-emerald-600 shrink-0" /> 顧客データ一括管理</li>
                                    </ul>
                                    <button disabled className="w-full py-4 rounded-xl font-bold bg-surface-container text-on-surface-variant cursor-not-allowed">
                                        準備中
                                    </button>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* --- Our Promise / Values --- */}
                <section className="py-24 px-4 sm:px-8 bg-surface">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn className="text-center mb-16">
                            <p className="text-tertiary font-label text-sm font-bold uppercase tracking-widest mb-4">Our Promise</p>
                            <h3 className="text-3xl sm:text-4xl font-headline text-primary-stitch mb-4">私たちが約束する「新しい日常」</h3>
                            <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
                                架空のレビューではなく、システムとして確実に提供できる3つの体験
                            </p>
                        </FadeIn>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "紙より速いカルテ入力",
                                    icon: "⏱️",
                                    description: "「入力が面倒」という課題を根本から解決。直感的な操作と写真の自動整理により、カルテ作成は10秒で完結。次のお客様をすぐにお迎えできます。"
                                },
                                {
                                    title: "退店後30分の感動体験",
                                    icon: "💌",
                                    description: "お客様の気持ちが最も高まっている帰り道に、仕上がり写真とお礼が自動で届く。忘れられない接客体験が、自然な再来店を生み出します。"
                                },
                                {
                                    title: "あなた専用に育つツール",
                                    icon: "🌱",
                                    description: "完成品を押し付ける気はありません。現場の皆様の要望を何よりも大切にし、日々のリアルな声を取り入れながら、最高のツールへと進化し続けます。"
                                }
                            ].map((p, i) => (
                                <FadeIn delay={i * 0.1} key={i}>
                                    <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-sm flex flex-col h-full border border-outline-variant/10">
                                        <div className="text-5xl mb-6">{p.icon}</div>
                                        <h4 className="text-xl font-headline font-bold text-primary-stitch mb-4">{p.title}</h4>
                                        <p className="text-on-surface-variant text-base leading-relaxed">{p.description}</p>
                                    </div>
                                </FadeIn>
                            ))}
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
                                answer="はい、無料のStarterプランでは顧客登録30件まで、来店記録・LINE自動送信は月に10回までご利用いただけます。QR受付やデジタル会員証も無料で使えます。制限なく使いたい方は、Soloプラン（月額¥2,980）へのアップグレードをご検討ください。"
                            />
                            <AccordionItem
                                question="LINE公式アカウントを持っていなくても使えますか？"
                                answer={`はい、ご利用可能です。アプリ内に連携ガイド（マニュアル）をご用意しておりますので、初めての方でも安心して導入いただけます。\n\n年払いプランをお選びいただくと、初期設定の代行サポートが無料で付いてきます。`}
                            />
                            <AccordionItem
                                question="パソコンがなくても使えますか？"
                                answer="はい、スマートフォンやタブレットのみで全ての機能をご利用いただけます。カルテ作成からLINE送信、QR受付まで、すべてスマホ画面に最適化されています。"
                            />
                            <AccordionItem
                                question="顧客のデータは安全ですか？"
                                answer="はい。データは暗号化された状態で安全に管理されています。写真データも専用のセキュアストレージに保存され、アカウント所有者のみがアクセスできます。"
                            />
                            <AccordionItem
                                question="解約はいつでも可能ですか？"
                                answer="はい。契約期間の縛りはなく、いつでも設定画面から解約手続きが可能です。解約後も一定期間はデータの閲覧が可能です。"
                            />
                            <AccordionItem
                                question="来店記録にはどんな情報を保存できますか？"
                                answer="施術写真（スマホで撮影）、来店日、メニュータグ（カット・カラーなど）を保存できます。顧客ごとに特記事項メモも記録でき、次回来店時の参考にご活用いただけます。"
                            />
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="relative py-40 px-4 sm:px-8 flex justify-center items-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-japanese.png"
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
                                完全無料のStarterプランあり / 10秒でセットアップ
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
                            <a href="https://lin.ee/O3ydcSf" target="_blank" rel="noopener noreferrer" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors flex items-center gap-1.5">
                                <MessageCircle className="w-3.5 h-3.5" />
                                LINEサポート
                            </a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link href="/legal/privacy" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">プライバシーポリシー</Link>
                            <Link href="/legal/terms" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">利用規約</Link>
                            <Link href="/legal/tokusho" className="text-left text-sm font-medium text-emerald-800/60 hover:text-emerald-900 transition-colors">特商法表記</Link>
                        </div>
                    </div>
                </div>

                <div className="border-t border-outline-variant/20 py-8 px-8 flex justify-center text-center">
                    <p className="text-xs font-medium tracking-wider text-emerald-800/50 uppercase">
                        &copy; {new Date().getFullYear()} BlackSwan logic. All rights reserved.
                    </p>
                </div>
            </footer>
        </div >
    )
}
