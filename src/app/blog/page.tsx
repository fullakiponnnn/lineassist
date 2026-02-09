import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Camera, MessageCircle, Star, Users, Zap, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
    title: '個人美容師のためのLINE活用術・電子カルテ導入ガイド',
    description: '個人美容師・フリーランス美容師・面貸し美容師向けに、LINE公式アカウントの活用方法、電子カルテの導入メリット、リピート率を上げるコツを解説します。',
    keywords: ['個人美容師 LINE', '美容師 電子カルテ 導入', 'フリーランス美容師 顧客管理', '面貸し カルテ', 'リピート率 上げる方法'],
    alternates: {
        canonical: 'https://www.snapkarte.jp/blog',
    },
}

export default function BlogPage() {
    const articles = [
        {
            slug: 'line-for-hairdressers',
            title: '個人美容師がLINE公式アカウントを活用すべき5つの理由',
            excerpt: 'フリーランス・面貸し美容師が自分の顧客を管理し、リピート率を上げるためにLINE公式アカウントが最強のツールである理由を解説します。',
            date: '2026-02-09',
            category: 'LINE活用',
        },
        {
            slug: 'digital-karte-benefits',
            title: '紙カルテから電子カルテへ移行するメリットと注意点',
            excerpt: 'シェアサロンや面貸しで働く美容師にとって、クラウド型電子カルテがなぜ必須なのか。移行時の注意点も含めて解説します。',
            date: '2026-02-09',
            category: '電子カルテ',
        },
        {
            slug: 'increase-repeat-rate',
            title: '美容師のリピート率を劇的に上げる3つの施策',
            excerpt: 'お礼メッセージの自動化、施術写真の共有、Google口コミ促進など、今すぐ実践できるリピート率向上施策を紹介します。',
            date: '2026-02-09',
            category: 'リピート施策',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center text-white">
                                <Camera className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-lg">SnapKarte</span>
                        </Link>
                        <Link
                            href="/login"
                            className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 transition-colors"
                        >
                            無料で始める
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">ホーム</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">ブログ</span>
                </nav>

                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        個人美容師のための<br className="sm:hidden" />
                        <span className="text-primary">LINE活用術</span>・電子カルテ導入ガイド
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        フリーランス・面貸し・シェアサロンで活躍する個人美容師の方へ。
                        顧客管理とリピート率向上のノウハウをお届けします。
                    </p>
                </div>

                {/* Featured Topics */}
                <div className="grid sm:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-[#06C755]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-6 h-6 text-[#06C755]" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">LINE活用術</h3>
                        <p className="text-sm text-gray-500">公式アカウントでリピーターを増やす方法</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Users className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">顧客管理</h3>
                        <p className="text-sm text-gray-500">電子カルテで効率的に顧客情報を管理</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Star className="w-6 h-6 text-amber-500" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">口コミ獲得</h3>
                        <p className="text-sm text-gray-500">Googleマップで高評価を集める方法</p>
                    </div>
                </div>

                {/* Articles List */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">最新記事</h2>
                    <div className="space-y-6">
                        {articles.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/blog/${article.slug}`}
                                className="block"
                            >
                                <article
                                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-bold px-2 py-1 bg-primary/10 text-primary rounded-full">
                                                    {article.category}
                                                </span>
                                                <time className="text-xs text-gray-400">{article.date}</time>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {article.excerpt}
                                            </p>
                                        </div>
                                        <div className="sm:self-center">
                                            <span className="inline-flex items-center text-sm font-bold text-primary">
                                                続きを読む
                                                <ChevronRight className="w-4 h-4 ml-1" />
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="mt-16 bg-gradient-to-r from-primary to-emerald-500 rounded-3xl p-8 sm:p-12 text-center text-white">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                        今すぐSnapKarteを無料で始めよう
                    </h2>
                    <p className="text-white/80 mb-6 max-w-xl mx-auto">
                        写真を撮るだけでお礼LINEが自動送信。
                        個人美容師の事務作業をゼロにする電子カルテアプリです。
                    </p>
                    <Link
                        href="/login"
                        className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                        無料でアカウント作成
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SnapKarte. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <Link href="/legal/terms" className="hover:text-primary">利用規約</Link>
                        <Link href="/legal/privacy" className="hover:text-primary">プライバシーポリシー</Link>
                        <Link href="/legal/tokusho" className="hover:text-primary">特定商取引法に基づく表記</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
