import { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Check, ChevronRight, MessageCircle, Star, Heart, Repeat } from 'lucide-react'

export const metadata: Metadata = {
    title: '美容師のリピート率を劇的に上げる3つの施策',
    description: 'お礼メッセージの自動化、施術写真の共有、Google口コミ促進など、今すぐ実践できるリピート率向上施策を紹介します。',
    keywords: ['美容師 リピート率', 'リピート率 上げる方法', '美容室 集客', '顧客満足度 向上', 'Google口コミ 増やす'],
    alternates: {
        canonical: 'https://www.snapkarte.jp/blog/increase-repeat-rate',
    },
    openGraph: {
        title: '美容師のリピート率を劇的に上げる3つの施策',
        description: '今すぐ実践できるリピート率向上施策を徹底解説',
        type: 'article',
        publishedTime: '2026-02-09T00:00:00.000Z',
    },
}

export default function IncreaseRepeatRateArticle() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
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

            <main className="container mx-auto px-4 py-12 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary">ホーム</Link>
                    <span className="mx-2">/</span>
                    <Link href="/blog" className="hover:text-primary">ブログ</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">リピート施策</span>
                </nav>

                {/* Article Header */}
                <article>
                    <header className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-xs font-bold px-3 py-1 bg-amber-500/10 text-amber-600 rounded-full">
                                リピート施策
                            </span>
                            <time className="text-sm text-gray-400">2026年2月9日</time>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                            美容師のリピート率を<br className="hidden sm:block" />
                            劇的に上げる3つの施策
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            技術には自信があるのに、なぜかリピート率が上がらない...。
                            そんな悩みを抱える個人美容師のために、
                            今日から実践できる3つのリピート率向上施策を紹介します。
                        </p>
                    </header>

                    {/* Table of Contents */}
                    <nav className="bg-gray-50 rounded-2xl p-6 mb-12">
                        <h2 className="font-bold text-gray-900 mb-4">目次</h2>
                        <ol className="space-y-2 text-sm">
                            <li><a href="#intro" className="text-primary hover:underline">1. リピート率が上がらない本当の理由</a></li>
                            <li><a href="#strategy1" className="text-primary hover:underline">2. 施策①：来店当日のお礼メッセージ</a></li>
                            <li><a href="#strategy2" className="text-primary hover:underline">3. 施策②：施術写真の共有</a></li>
                            <li><a href="#strategy3" className="text-primary hover:underline">4. 施策③：Google口コミで信頼獲得</a></li>
                            <li><a href="#automation" className="text-primary hover:underline">5. これらを自動化する方法</a></li>
                        </ol>
                    </nav>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        <section id="intro" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                リピート率が上がらない本当の理由
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                「また来たい」と思わせる技術を提供しているはずなのに、
                                なぜリピート率が思うように上がらないのでしょうか。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                その理由は単純です。<strong>お客様は「忘れる」</strong>のです。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                どんなに満足しても、日常に戻ると髪のことは頭から消えていきます。
                                1ヶ月後、2ヶ月後に「そろそろ髪を切ろう」と思った時、
                                あなたのことを真っ先に思い出してもらえるかどうかが勝負です。
                            </p>
                            <div className="bg-slate-100 border-l-4 border-primary rounded-r-xl p-4 my-6">
                                <p className="text-slate-800 font-medium">
                                    リピート率向上の鍵は「思い出してもらう」仕組み作りです。
                                </p>
                            </div>
                        </section>

                        <section id="strategy1" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#06C755] rounded-xl flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6 text-white" />
                                </div>
                                施策①：来店当日のお礼メッセージ
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                来店当日、帰宅後のタイミングでお礼メッセージを送りましょう。
                                メールではなく<strong>LINEがベスト</strong>です。開封率が圧倒的に違います。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                ただ「ありがとうございました」だけでは印象に残りません。
                                以下のような内容を含めると効果的です。
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>本日の施術内容のサマリー</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>ホームケアのアドバイス</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>次回来店のおすすめ時期</span>
                                </li>
                            </ul>
                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 my-6">
                                <p className="text-emerald-800 text-sm font-medium">
                                    💡 <strong>ポイント</strong>: 「営業後にメッセージを打つのが面倒...」という方は、
                                    SnapKarteのような自動送信ツールを使えば写真を撮るだけでOKです。
                                </p>
                            </div>
                        </section>

                        <section id="strategy2" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                施策②：施術写真の共有
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                施術後の仕上がり写真をお客様と共有しましょう。
                                これがリピート率向上に驚くほど効きます。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                なぜ効果的かというと...
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Repeat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>お客様が<strong>SNSにシェアしやすい</strong>（無料の口コミ）</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Repeat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>次回来店時に「<strong>前回と同じで</strong>」と言えるので楽</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-700">
                                    <Repeat className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span>写真を見返すたびに<strong>あなたを思い出す</strong></span>
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed">
                                写真を自分のカメラで撮ってAirDropで送って...とやると時間がかかります。
                                施術写真がそのままLINEで届く仕組みがあると理想的です。
                            </p>
                        </section>

                        <section id="strategy3" className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                                    <Star className="w-6 h-6 text-white" />
                                </div>
                                施策③：Google口コミで信頼獲得
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Googleマップの口コミは、新規顧客獲得に絶大な効果があります。
                                そして、<strong>口コミが多いと既存顧客も安心してリピート</strong>できます。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                「口コミ書いてください」と直接言うのは気が引ける方も多いでしょう。
                                そこでおすすめなのが、<strong>お礼メッセージにさりげなくリンクを入れる</strong>方法です。
                            </p>
                            <div className="bg-gray-100 rounded-xl p-4 my-6 text-sm text-gray-700">
                                <p className="mb-2"><strong>例文：</strong></p>
                                <p className="italic">
                                    「もしよろしければ、Googleマップでのご感想をいただけると
                                    とても励みになります😊 ▶ [リンク]」
                                </p>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                押しつけがましくならないように、あくまで「よければ」というトーンで。
                                満足しているお客様は、割と書いてくれるものです。
                            </p>
                        </section>

                        <section id="automation" className="mb-12 bg-slate-50 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                これらを自動化する方法
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                ここまで読んで「良いのはわかるけど、
                                営業後に毎回メッセージ送るのは無理...」と思った方も多いはず。
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                SnapKarteなら、<strong>施術写真を撮って保存するだけ</strong>で、
                                上記3つの施策をすべて自動化できます。
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-700">お礼メッセージ → <strong>自動送信</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-700">施術写真共有 → <strong>LINEで自動送信</strong></span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-700">Google口コミリンク → <strong>メッセージに自動挿入</strong></span>
                                </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-6">
                                あなたがやることは「写真を撮って保存」だけ。
                                あとはSnapKarteが全部やってくれます。
                            </p>
                            <Link
                                href="/login"
                                className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors"
                            >
                                無料でSnapKarteを始める
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </Link>
                        </section>

                        {/* Conclusion */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">まとめ</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                リピート率を上げるために特別なスキルは必要ありません。
                                「思い出してもらう」仕組みを作るだけです。
                            </p>
                            <ol className="space-y-2 mb-6 list-decimal list-inside text-gray-700">
                                <li>来店当日のお礼メッセージで<strong>記憶に残す</strong></li>
                                <li>施術写真の共有で<strong>繰り返し思い出してもらう</strong></li>
                                <li>Google口コミで<strong>信頼を可視化</strong>する</li>
                            </ol>
                            <p className="text-gray-700 leading-relaxed">
                                この3つを実践すれば、確実にリピート率は上がります。
                                まずは無料でSnapKarteを試して、その効果を体感してみてください。
                            </p>
                        </section>
                    </div>
                </article>

                {/* Related Articles */}
                <section className="mt-16 pt-8 border-t border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">関連記事</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Link href="/blog/line-for-hairdressers" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <span className="text-xs font-bold text-[#06C755]">LINE活用</span>
                            <h3 className="font-bold text-gray-900 mt-1">個人美容師がLINE公式アカウントを活用すべき5つの理由</h3>
                        </Link>
                        <Link href="/blog/digital-karte-benefits" className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                            <span className="text-xs font-bold text-primary">電子カルテ</span>
                            <h3 className="font-bold text-gray-900 mt-1">紙カルテから電子カルテへ移行するメリットと注意点</h3>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} SnapKarte. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <Link href="/legal/terms" className="hover:text-primary">利用規約</Link>
                        <Link href="/legal/privacy" className="hover:text-primary">プライバシーポリシー</Link>
                        <Link href="/" className="hover:text-primary">トップページ</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
