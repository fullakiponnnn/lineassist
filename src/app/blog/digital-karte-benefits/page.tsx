import { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Check, ChevronRight, Cloud, Smartphone, Shield, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
    title: '紙カルテから電子カルテへ移行するメリットと注意点',
    description: 'シェアサロンや面貸しで働く個人美容師にとって、クラウド型電子カルテがなぜ必須なのか。紙カルテからの移行メリットと注意点を徹底解説します。',
    keywords: ['電子カルテ 美容室', '美容師 カルテ管理', '紙カルテ 電子化', 'クラウド カルテ', '面貸し 顧客管理'],
    alternates: {
        canonical: 'https://www.snapkarte.jp/blog/digital-karte-benefits',
    },
    openGraph: {
        title: '紙カルテから電子カルテへ移行するメリットと注意点',
        description: '個人美容師のための電子カルテ導入ガイド',
        type: 'article',
        publishedTime: '2026-02-09T00:00:00.000Z',
    },
}

export default function DigitalKarteBenefitsArticle() {
    return (
        <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#134231] to-[#2d5a47] rounded-[1rem] flex items-center justify-center text-white shadow-sm">
                                <Camera className="w-5 h-5" />
                            </div>
                            <span className="font-serif font-bold text-xl tracking-wide text-[#134231]">SnapKarte</span>
                        </Link>
                        <Link
                            href="/login"
                            className="px-6 py-2.5 bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white text-sm font-bold rounded-full shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] transition-all duration-300"
                        >
                            無料で始める
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="text-sm text-[#717974] mb-12 flex items-center gap-2">
                    <Link href="/" className="hover:text-[#134231] transition-colors">ホーム</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-[#134231] transition-colors">ブログ</Link>
                    <span>/</span>
                    <span className="text-[#414944]">電子カルテ</span>
                </nav>

                {/* Article Header */}
                <article>
                    <header className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-xs font-bold px-4 py-1.5 bg-[#f5f3ef] text-[#134231] rounded-full uppercase tracking-wider">
                                電子カルテ
                            </span>
                            <time className="text-sm text-[#717974] font-medium">2026年2月9日</time>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-serif text-[#1b1c1a] leading-[1.2] mb-8 tracking-tight">
                            紙カルテから電子カルテへ<br className="hidden sm:block" />
                            移行するメリットと注意点
                        </h1>
                        <p className="text-lg sm:text-xl text-[#414944] leading-relaxed">
                            シェアサロンや面貸しで活躍する個人美容師にとって、紙カルテから電子カルテへの移行は大きな決断です。この記事では、移行のメリットと注意点を詳しく解説します。
                        </p>
                    </header>

                    {/* Table of Contents */}
                    <nav className="bg-[#ffffff] rounded-[2rem] p-8 mb-16 shadow-[0_12px_40px_rgba(27,28,26,0.04)]">
                        <h2 className="font-serif text-xl font-bold text-[#1b1c1a] mb-6 tracking-wide">目次</h2>
                        <ol className="space-y-4 text-base text-[#414944]">
                            <li><a href="#why-digital" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">01.</span> なぜ今、電子カルテなのか</a></li>
                            <li><a href="#merit1" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">02.</span> メリット①：どこでもアクセスできる</a></li>
                            <li><a href="#merit2" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">03.</span> メリット②：検索・管理が楽</a></li>
                            <li><a href="#merit3" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">04.</span> メリット③：紛失・劣化リスクがない</a></li>
                            <li><a href="#caution" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">05.</span> 移行時の注意点</a></li>
                            <li><a href="#snapkarte" className="hover:text-[#134231] transition-colors flex gap-3"><span className="text-[#6a5e33] font-bold">06.</span> SnapKarteなら簡単に始められる</a></li>
                        </ol>
                    </nav>

                    {/* Content */}
                    <div className="space-y-16">
                        <section id="why-digital" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-6 tracking-tight">
                                なぜ今、電子カルテなのか
                            </h2>
                            <p className="text-[#414944] text-lg leading-relaxed mb-6">
                                美容業界でも<strong className="text-[#134231]">デジタル化</strong>の波が押し寄せています。特に個人美容師・フリーランスにとって、紙カルテには以下のような課題があります。
                            </p>
                            <ul className="space-y-4 mb-8 bg-[#f5f3ef] rounded-[2rem] p-8">
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <AlertTriangle className="w-4 h-4 text-[#6a5e33]" />
                                    </div>
                                    <span className="text-[#414944] text-lg">サロンを移籍すると、カルテを持ち出せない</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <AlertTriangle className="w-4 h-4 text-[#6a5e33]" />
                                    </div>
                                    <span className="text-[#414944] text-lg">お客様の過去のスタイルを探すのに時間がかかる</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-[#ffffff] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                        <AlertTriangle className="w-4 h-4 text-[#6a5e33]" />
                                    </div>
                                    <span className="text-[#414944] text-lg">水濡れや紛失で大切なデータが消える可能性</span>
                                </li>
                            </ul>
                            <p className="text-[#414944] text-lg leading-relaxed">
                                これらの課題を解決するのが、<strong className="text-[#134231]">クラウド型電子カルテ</strong>です。
                            </p>
                        </section>

                        <section id="merit1" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-6 flex items-center gap-4 tracking-tight">
                                <span className="w-12 h-12 bg-[#ffffff] rounded-full flex items-center justify-center shadow-sm">
                                    <Cloud className="w-6 h-6 text-[#134231]" />
                                </span>
                                メリット①：どこでもアクセスできる
                            </h2>
                            <p className="text-[#414944] text-lg leading-relaxed mb-6">
                                クラウド型電子カルテの最大のメリットは、<strong className="text-[#134231]">場所を選ばない</strong>こと。
                                シェアサロンを転々としても、自宅でカルテを確認することも可能です。
                            </p>
                            <p className="text-[#414944] text-lg leading-relaxed mb-8">
                                面貸しで複数のサロンを掛け持ちしている方でも、スマホ一つでお客様の過去の施術履歴をすぐに確認できます。
                            </p>
                            <div className="bg-[#f5f3ef] rounded-[2rem] p-8">
                                <p className="text-[#2d5a47] text-lg font-medium leading-relaxed">
                                    <span className="text-[#6a5e33] font-bold mr-2">POINT</span> 顧客データはあなたの「資産」。クラウドなら、どこで働いても持ち運べます。
                                </p>
                            </div>
                        </section>

                        <section id="merit2" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-6 flex items-center gap-4 tracking-tight">
                                <span className="w-12 h-12 bg-[#ffffff] rounded-full flex items-center justify-center shadow-sm">
                                    <Smartphone className="w-6 h-6 text-[#134231]" />
                                </span>
                                メリット②：検索・管理が楽
                            </h2>
                            <p className="text-[#414944] text-lg leading-relaxed mb-6">
                                紙カルテの山から特定のお客様を探すのは大変です。電子カルテなら、<strong className="text-[#134231]">名前や電話番号で一発検索</strong>。
                            </p>
                            <p className="text-[#414944] text-lg leading-relaxed">
                                また、施術写真もカルテに紐づけて保存できるので、「前回のカラーは何色だったっけ？」という時もすぐに確認できます。
                            </p>
                        </section>

                        <section id="merit3" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-6 flex items-center gap-4 tracking-tight">
                                <span className="w-12 h-12 bg-[#ffffff] rounded-full flex items-center justify-center shadow-sm">
                                    <Shield className="w-6 h-6 text-[#134231]" />
                                </span>
                                メリット③：紛失・劣化リスクがない
                            </h2>
                            <p className="text-[#414944] text-lg leading-relaxed mb-6">
                                紙カルテは水濡れ、火災、単純な紛失で失われるリスクがあります。クラウド型なら、データは安全なサーバーに<strong className="text-[#134231]">自動バックアップ</strong>されます。
                            </p>
                            <p className="text-[#414944] text-lg leading-relaxed">
                                スマホが壊れても、新しい端末でログインすればすぐにデータを復元できます。
                            </p>
                        </section>

                        <section id="caution" className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-8 tracking-tight">
                                移行時の注意点
                            </h2>
                            <div className="space-y-6">
                                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(27,28,26,0.03)]">
                                    <h3 className="font-serif text-xl font-bold text-[#1b1c1a] mb-4 flex items-center gap-3">
                                        <span className="text-[#6a5e33]">01.</span> 既存データの移行
                                    </h3>
                                    <p className="text-[#414944] text-lg leading-relaxed">
                                        紙カルテのデータを一気に移行するのは大変です。まずは<strong className="text-[#134231]">新規のお客様から電子カルテを使い始め</strong>、既存のお客様は来店時に順次登録していく方法がおすすめです。
                                    </p>
                                </div>
                                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(27,28,26,0.03)]">
                                    <h3 className="font-serif text-xl font-bold text-[#1b1c1a] mb-4 flex items-center gap-3">
                                        <span className="text-[#6a5e33]">02.</span> セキュリティ
                                    </h3>
                                    <p className="text-[#414944] text-lg leading-relaxed">
                                        顧客情報を扱うため、セキュリティがしっかりしたサービスを選びましょう。通信の暗号化、データのバックアップ体制を確認してください。
                                    </p>
                                </div>
                                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(27,28,26,0.03)]">
                                    <h3 className="font-serif text-xl font-bold text-[#1b1c1a] mb-4 flex items-center gap-3">
                                        <span className="text-[#6a5e33]">03.</span> 継続コスト
                                    </h3>
                                    <p className="text-[#414944] text-lg leading-relaxed">
                                        月額料金がかかるサービスが多いです。無料プランがあるサービスから始めて、使い勝手を確認してから有料プランに移行するのが安心です。
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section id="snapkarte" className="scroll-mt-32 bg-[#134231] rounded-[3rem] p-10 sm:p-14 relative overflow-hidden">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d5a47] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                            
                            <div className="relative z-10">
                                <h2 className="font-serif text-3xl sm:text-4xl text-[#ffffff] mb-6 tracking-tight">
                                    SnapKarteなら<br className="sm:hidden" />簡単に始められる
                                </h2>
                                <p className="text-[#bcedd4] text-lg leading-relaxed mb-10 max-w-xl">
                                    SnapKarteは、個人美容師のために設計されたクラウド型電子カルテです。
                                </p>
                                <ul className="space-y-4 mb-10 max-w-xl">
                                    <li className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#2d5a47] flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-[#bcedd4]" />
                                        </div>
                                        <span className="text-[#ffffff] text-lg"><strong className="text-[#ffffff]">無料プラン</strong>で始められる（月10枚まで）</span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#2d5a47] flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-[#bcedd4]" />
                                        </div>
                                        <span className="text-[#ffffff] text-lg">スマホだけで完結、<strong className="text-[#ffffff]">PCなしでOK</strong></span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#2d5a47] flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-[#bcedd4]" />
                                        </div>
                                        <span className="text-[#ffffff] text-lg">QRコードで<strong className="text-[#ffffff]">お客様自身に登録してもらえる</strong></span>
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#2d5a47] flex items-center justify-center shrink-0">
                                            <Check className="w-3.5 h-3.5 text-[#bcedd4]" />
                                        </div>
                                        <span className="text-[#ffffff] text-lg">LINE連携で<strong className="text-[#ffffff]">お礼メッセージを自動送信</strong></span>
                                    </li>
                                </ul>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-[#fbf9f5] text-[#134231] text-lg font-bold rounded-full hover:bg-white transition-colors w-full sm:w-auto shadow-[0_8px_16px_rgba(0,0,0,0.1)]"
                                >
                                    無料でSnapKarteを始める
                                    <ChevronRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </section>

                        {/* Conclusion */}
                        <section className="scroll-mt-32">
                            <h2 className="font-serif text-3xl text-[#1b1c1a] mb-6 tracking-tight">まとめ</h2>
                            <p className="text-[#414944] text-lg leading-relaxed mb-6">
                                面貸しやシェアサロンで働く個人美容師にとって、クラウド型電子カルテは<strong className="text-[#134231]">自分の顧客データを守る最良の方法</strong>です。
                            </p>
                            <p className="text-[#414944] text-lg leading-relaxed">
                                まずは無料プランで試してみて、使い勝手を確認してから本格的な移行を検討してみてください。
                            </p>
                        </section>
                    </div>
                </article>

                {/* Related Articles */}
                <section className="mt-24 pt-16 border-t border-[#e4e2de]">
                    <h2 className="font-serif text-2xl font-bold text-[#1b1c1a] mb-8 tracking-tight">関連記事</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Link href="/blog/line-for-hairdressers" className="block p-8 bg-[#ffffff] rounded-[2rem] hover:shadow-[0_12px_40px_rgba(27,28,26,0.06)] transition-all duration-300 group">
                            <span className="text-xs font-bold text-[#6a5e33] uppercase tracking-wider block mb-3">LINE活用</span>
                            <h3 className="font-serif text-xl font-bold text-[#1b1c1a] group-hover:text-[#134231] transition-colors leading-snug">個人美容師がLINE公式アカウントを活用すべき5つの理由</h3>
                        </Link>
                        <Link href="/blog/increase-repeat-rate" className="block p-8 bg-[#ffffff] rounded-[2rem] hover:shadow-[0_12px_40px_rgba(27,28,26,0.06)] transition-all duration-300 group">
                            <span className="text-xs font-bold text-[#6a5e33] uppercase tracking-wider block mb-3">リピート施策</span>
                            <h3 className="font-serif text-xl font-bold text-[#1b1c1a] group-hover:text-[#134231] transition-colors leading-snug">美容師のリピート率を劇的に上げる3つの施策</h3>
                        </Link>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#f5f3ef] py-16 mt-24">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#134231] to-[#2d5a47] rounded-lg flex items-center justify-center text-white">
                            <Camera className="w-4 h-4" />
                        </div>
                        <span className="font-serif font-bold text-lg text-[#134231]">SnapKarte</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 text-[#717974] text-sm font-medium">
                        <Link href="/legal/terms" className="hover:text-[#134231] transition-colors">利用規約</Link>
                        <Link href="/legal/privacy" className="hover:text-[#134231] transition-colors">プライバシーポリシー</Link>
                        <Link href="/" className="hover:text-[#134231] transition-colors">トップページ</Link>
                    </div>
                    <p className="text-sm text-[#a1a1a0]">&copy; {new Date().getFullYear()} SnapKarte. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
