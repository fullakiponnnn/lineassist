'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Camera,
    Send,
    Save,
    Clock,
    Smartphone,
    Search,
    Check,
    ChevronDown,
    Menu,
    X,
    MessageCircle,
    Image as ImageIcon,
    Zap
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
        <div className="border-b border-gray-100 last:border-0">
            <button
                className="flex items-center justify-between w-full py-4 text-left group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-bold text-slate-800 group-hover:text-primary transition-colors">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-slate-500 leading-relaxed text-sm">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

// --- Main Landing Page Component ---

export default function LandingPage() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "SnapKarte",
        "description": "個人美容師・フリーランス向けのLINE自動連携電子カルテ。施術写真を撮影・送信し、顧客管理とリピート施策を自動化します。",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web, iOS, Android",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "JPY"
        },
        "featureList": ["LINE自動送信", "電子カルテ", "顧客管理", "Google口コミ促進", "予約管理補助"],
        "audience": {
            "@type": "Audience",
            "audienceType": "美容師, 個人事業主, フリーランス, シェアサロン利用者"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "120"
        }
    }

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            setIsMobileMenuOpen(false)
        }
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20 selection:text-primary overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 1. Header / Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 h-16 sm:h-20">
                <div className="container mx-auto px-4 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                            <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-800">SnapKarte</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">機能</button>
                        <button onClick={() => scrollToSection('pricing')} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">料金</button>
                        <button onClick={() => scrollToSection('faq')} className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">よくある質問</button>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
                            ログイン
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-slate-800 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            無料で試す
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-600"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

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
                                <button onClick={() => scrollToSection('faq')} className="text-left py-2 font-medium text-slate-600">よくある質問</button>
                                <div className="h-px bg-gray-100 my-2" />
                                <Link href="/login" className="text-center py-3 font-bold text-slate-600 bg-gray-50 rounded-lg">ログイン</Link>
                                <Link href="/login" className="text-center py-3 font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20">無料で試す</Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="pt-20 sm:pt-24">
                {/* 2. Hero Section */}
                <section className="container mx-auto px-4 py-10 sm:py-20 lg:py-28">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left space-y-8 z-10">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-4 tracking-wide uppercase">
                                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 fill-current" />
                                    個人美容師・フリーランス特化型CRM
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.15] tracking-tight text-slate-900">
                                    「また来たい」を、<br className="hidden sm:block" />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">自動で作る。</span>
                                </h1>
                                <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                                    シャッターを切るだけで、お礼LINE送信完了。<br className="hidden sm:block" />
                                    事務作業をゼロにし、技術と接客だけに集中できる<br className="hidden sm:block" />
                                    新しい電子カルテアプリです。
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                                    <Link
                                        href="/login"
                                        className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        無料でアカウント作成
                                        <Send className="w-5 h-5" />
                                    </Link>
                                    <Link
                                        href="#how-it-works"
                                        onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                                        className="w-full sm:w-auto px-8 py-4 bg-white text-slate-600 border border-gray-200 text-lg font-bold rounded-full hover:bg-gray-50 hover:border-gray-300 transition-all"
                                    >
                                        仕組みを見る
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Hero Visual */}
                        <FadeIn delay={0.2} className="flex-1 w-full relative">
                            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
                                <Image
                                    src="/hero-image.png"
                                    alt="美容師がスマートフォンで写真を撮影している様子"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />

                                {/* Floating Notification UI Element */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                                    className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[280px]"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-[#06C755] rounded-xl flex items-center justify-center shrink-0">
                                            <MessageCircle className="w-6 h-6 text-white text-fill" fill="currentColor" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-400 mb-1">LINE • 今</p>
                                            <p className="text-sm font-bold text-slate-800">ご来店ありがとうございます！</p>
                                            <p className="text-xs text-slate-500 mt-1">本日の仕上がりのお写真です✨</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* 3. Pain Points */}
                <section className="py-20 bg-slate-50 border-t border-b border-gray-100" id="features">
                    <div className="container mx-auto px-4">
                        <FadeIn>
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">
                                    ひとりサロンの「限界」を<br className="sm:hidden" />突破しませんか？
                                </h2>
                                <p className="text-lg text-slate-500">
                                    施術、接客、予約管理、SNS更新、経理...<br />
                                    個人美容師の仕事は多すぎます。<br />
                                    せめて「お礼連絡」と「カルテ管理」は、まるごと自動化しましょう。
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Clock className="w-8 h-8 text-rose-500" />,
                                    title: "営業後の「見えない残業」",
                                    desc: "疲れ切った営業後、一人ひとりにお礼LINEを打っていませんか？SnapKarteなら、施術直後に完了しているので、ハサミを置いたら即帰宅できます。"
                                },
                                {
                                    icon: <Search className="w-8 h-8 text-amber-500" />,
                                    title: "「前の髪型」が見つからない",
                                    desc: "カメラロールに埋もれた数千枚の写真から、お客様の過去スタイルを探すのは時間の無駄。QRコードをかざすだけで、0秒で履歴を呼び出せます。"
                                },
                                {
                                    icon: <MessageCircle className="w-8 h-8 text-[#06C755]" />,
                                    title: "Google口コミが増えない",
                                    desc: "「口コミ書いてください」とは言いづらいもの。サンキューメッセージに依頼リンクを自動で埋め込めば、自然と高評価レビューが集まります。"
                                }
                            ].map((item, i) => (
                                <FadeIn delay={i * 0.1} key={i} className="h-full">
                                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                        <p className="text-slate-500 leading-relaxed text-sm sm:text-base">
                                            {item.desc}
                                        </p>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. How it Works */}
                <section className="py-24 bg-white" id="how-it-works">
                    <div className="container mx-auto px-4">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-16">
                                操作はたったの3ステップ
                            </h2>
                        </FadeIn>

                        <div className="relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-primary/30 to-gray-200 -z-10" />

                            <div className="grid md:grid-cols-3 gap-12">
                                {[
                                    {
                                        step: "STEP 1",
                                        icon: <Camera className="w-8 h-8 text-white" />,
                                        title: "撮る",
                                        desc: "アプリ内のカメラで施術写真を撮影するか、ライブラリから選択します。",
                                        color: "bg-slate-900"
                                    },
                                    {
                                        step: "STEP 2",
                                        icon: <Save className="w-8 h-8 text-white" />,
                                        title: "保存",
                                        desc: "お客様を選んで保存ボタンをタップ。これだけで作業は完了です。",
                                        color: "bg-primary"
                                    },
                                    {
                                        step: "STEP 3",
                                        icon: <Send className="w-8 h-8 text-white" />,
                                        title: "送信完了",
                                        desc: "自動でお客様のLINEに写真とお礼メッセージが届きます。",
                                        color: "bg-[#06C755]"
                                    }
                                ].map((item, i) => (
                                    <FadeIn delay={i * 0.2} key={i} className="relative bg-white pt-4">
                                        <div className="flex flex-col items-center text-center">
                                            <div className={`w-20 h-20 ${item.color} rounded-3xl shadow-xl flex items-center justify-center mb-8 relative z-10 transform transition-transform hover:scale-110`}>
                                                {item.icon}
                                                <div className="absolute -top-3 -right-3 bg-white border border-gray-100 shadow-sm px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider text-slate-400">
                                                    {item.step}
                                                </div>
                                            </div>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                            <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Key Benefits */}
                <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary to-transparent rounded-full blur-[200px]" />
                        <div className="absolute top-1/2 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-emerald-500 to-transparent rounded-full blur-[200px]" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <FadeIn>
                                <div className="space-y-8">
                                    <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                                        SnapKarteが<br />
                                        選ばれる理由
                                    </h2>
                                    <p className="text-slate-400 text-lg">
                                        美容師の使いやすさを極限まで追求しました。<br />
                                        シンプル機能で、導入したその日から効果を実感。
                                    </p>

                                    <div className="space-y-6 pt-4">
                                        {[
                                            { title: "LINE公式アカウント完全連携", desc: "あなたのお店の名前でお礼が届きます。ブロックされにくい信頼設計。" },
                                            { title: "Googleマップ口コミ収集", desc: "お礼メッセージにリンクを貼るだけで、自然に高評価レビューが集まります。" },
                                            { title: "スタイルギャラリー", desc: "お客様ごとに過去のスタイルが自動で整理され、カウンセリングがスムーズに。" }
                                        ].map((feature, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                                                    <Check className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 relative">
                                    {/* Simplified chat UI representation */}
                                    <div className="space-y-4">
                                        {/* Message from Salon */}
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full shrink-0" />
                                            <div className="space-y-2 max-w-[80%]">
                                                <div className="bg-white rounded-2xl rounded-tl-none p-4 text-slate-800 text-sm shadow-lg">
                                                    <p>本日はご来店ありがとうございました！</p>
                                                    <p className="mt-2">今回の仕上がりのお写真をお送りしますね📸</p>
                                                </div>
                                                <div className="bg-white p-2 rounded-2xl rounded-tl-none shadow-lg w-48">
                                                    <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[3/4] relative">
                                                        <Image
                                                            src="/sample-hair.png"
                                                            alt="仕上がり写真"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Reply from Customer */}
                                        <div className="flex gap-3 flex-row-reverse">
                                            <div className="w-10 h-10 bg-primary/20 rounded-full shrink-0" />
                                            <div className="bg-[#06C755] rounded-2xl rounded-tr-none p-4 text-white text-sm shadow-lg max-w-[80%]">
                                                <p>わあ！ありがとうございます！✨</p>
                                                <p>今回の色味すごく気に入りました😊</p>
                                                <p>また来月もお願いします！</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* --- New Section: Ideal for Solopreneurs --- */}
                <section className="py-20 bg-emerald-50">
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
                                個人美容師・面貸しの方に<br className="sm:hidden" />最適です
                            </h2>
                            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
                                大手サロン向けの複雑で高価なPOSレジは必要ありません。<br />
                                SnapKarteは、個人のスマートフォン1台で<br className="hidden sm:block" />
                                最高の顧客体験（CX）を提供するために作られました。
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <span className="px-6 py-3 bg-white rounded-full text-emerald-700 font-bold shadow-sm">
                                    # クレジットカード登録不要
                                </span>
                                <span className="px-6 py-3 bg-white rounded-full text-emerald-700 font-bold shadow-sm">
                                    # パソコン不要
                                </span>
                                <span className="px-6 py-3 bg-white rounded-full text-emerald-700 font-bold shadow-sm">
                                    # 初期費用0円
                                </span>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* 6. Pricing */}
                <section className="py-24 bg-gray-50 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" id="pricing">
                    <div className="container mx-auto px-4">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 mb-16">
                                シンプルで透明な<span className="text-primary">料金プラン</span>
                            </h2>
                        </FadeIn>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {/* Free Plan */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all h-full flex flex-col"
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-500 mb-2">Free</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-extrabold text-slate-900">¥0</span>
                                        <span className="text-slate-500">/ 月</span>
                                    </div>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-primary shrink-0" /> 月間10枚まで送信</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-primary shrink-0" /> 基本的な顧客管理</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-600"><Check className="w-5 h-5 text-primary shrink-0" /> LINE手動連携</li>
                                </ul>
                                <Link href="/login" className="w-full py-3 rounded-xl border-2 border-slate-900 text-slate-900 font-bold text-center hover:bg-slate-900 hover:text-white transition-all">
                                    無料で試す
                                </Link>
                            </motion.div>

                            {/* Solo Plan (Highlighted) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                                whileHover={{ scale: 1.03 }}
                                className="relative transform md:-translate-y-4"
                            >
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                    className="absolute -top-4 inset-x-0 mx-auto w-max px-4 py-1 bg-gradient-to-r from-primary to-emerald-400 text-white text-xs font-bold rounded-full shadow-lg z-20"
                                >
                                    一番人気
                                </motion.div>
                                <div className="bg-white p-8 rounded-3xl border-2 border-primary shadow-2xl transition-all h-full flex flex-col relative overflow-hidden">
                                    <div className="mb-6 relative z-10">
                                        <h3 className="text-xl font-bold text-primary mb-2">Solo</h3>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-5xl font-extrabold text-slate-900">¥2,980</span>
                                            <span className="text-slate-500">/ 月</span>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-2">個人事業主・フリーランス向け</p>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-1 relative z-10">
                                        <li className="flex items-center gap-3 text-sm font-bold text-slate-800"><Check className="w-5 h-5 text-primary shrink-0" /> 無制限の写真送信</li>
                                        <li className="flex items-center gap-3 text-sm font-bold text-slate-800"><Check className="w-5 h-5 text-primary shrink-0" /> 顧客データ無制限</li>
                                        <li className="flex items-center gap-3 text-sm font-bold text-slate-800"><Check className="w-5 h-5 text-primary shrink-0" /> 優先サポート</li>
                                    </ul>
                                    <Link href="/login" className="w-full py-4 rounded-xl bg-primary text-white font-bold text-center shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all relative z-10">
                                        今すぐ始める
                                    </Link>
                                    {/* Shining effect background */}
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                                </div>
                            </motion.div>

                            {/* Standard Plan */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm transition-all h-full flex flex-col opacity-80"
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-slate-500 mb-2">Standard</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-bold text-slate-400">Coming Soon</span>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2">小規模サロン向け（準備中）</p>
                                </div>
                                <ul className="space-y-4 mb-8 flex-1">
                                    <li className="flex items-center gap-3 text-sm text-slate-400"><Check className="w-5 h-5 text-slate-300 shrink-0" /> すべてのSolo機能</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-400"><Check className="w-5 h-5 text-slate-300 shrink-0" /> スタッフ管理機能</li>
                                    <li className="flex items-center gap-3 text-sm text-slate-400"><Check className="w-5 h-5 text-slate-300 shrink-0" /> 顧客分析レポート</li>
                                </ul>
                                <button disabled className="w-full py-3 rounded-xl border border-gray-100 text-gray-300 font-bold text-center cursor-not-allowed">
                                    準備中
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 7. FAQ */}
                <section className="py-24 bg-white" id="faq">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <FadeIn>
                            <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
                                よくある質問
                            </h2>
                        </FadeIn>

                        <div className="space-y-2">
                            <AccordionItem
                                question="LINE公式アカウントを持っていなくても使えますか？"
                                answer="はい、ご利用可能です。LINE公式アカウントの開設サポート（マニュアル等）もご用意しておりますので、初めての方でも安心して導入いただけます。"
                            />
                            <AccordionItem
                                question="解約はいつでもできますか？"
                                answer="はい、契約期間の縛りはございません。月単位でいつでも解約が可能です。解約後も保存されたデータは一定期間保持されます。"
                            />
                            <AccordionItem
                                question="パソコンがなくても使えますか？"
                                answer="はい、スマートフォンやタブレットのみで全ての機能をご利用いただけます。初期設定時のみ、LINEの管理画面操作のためにPCがあるとスムーズですが、必須ではありません。"
                            />
                            <AccordionItem
                                question="個人情報のセキュリティは大丈夫ですか？"
                                answer="はい、通信の暗号化やデータの厳重な管理を行っており、セキュリティには万全を期しています。顧客データは安全なクラウドサーバーに保存されます。"
                            />
                        </div>
                    </div>
                </section>

                {/* 8. Footer */}
                <footer className="bg-slate-50 pt-20 pb-10 border-t border-gray-200">
                    <div className="container mx-auto px-4 text-center">
                        <FadeIn>
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">
                                業務効率化と顧客満足度を<br />
                                同時に手に入れよう。
                            </h2>
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-10 py-4 bg-primary text-white text-lg font-bold rounded-full shadow-xl shadow-primary/30 hover:scale-105 hover:shadow-primary/40 transition-all mb-16"
                            >
                                無料でアカウント作成
                            </Link>
                        </FadeIn>

                        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500 gap-4">
                            <p>&copy; {new Date().getFullYear()} SnapKarte. All rights reserved.</p>
                            <div className="flex gap-6">
                                <Link href="/legal/terms" className="hover:text-primary transition-colors">利用規約</Link>
                                <Link href="/legal/privacy" className="hover:text-primary transition-colors">プライバシーポリシー</Link>
                                <Link href="/legal/tokusho" className="hover:text-primary transition-colors">特定商取引法に基づく表記</Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div >
    )
}
