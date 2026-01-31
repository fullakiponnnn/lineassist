import Link from 'next/link'
import { ArrowLeft, Book, MessageCircleQuestion, Smartphone, Settings, Camera, Users, CheckCircle } from 'lucide-react'

const faqs = [
    { q: "料金プランはどのようになっていますか？", a: "現在は個人事業主様・フリーランス様向けの「Soloプラン」をご用意しております。月額2,980円（税込）ですが、年払いを選択いただくと2ヶ月分無料の29,800円（税込）でご利用いただけて大変お得です。また、すべての機能を無料でお試しいただけるFreeプラン（月間10件まで）もございます。" },
    { q: "初期費用はかかりますか？", a: "Soloプラン（年払い）には初期導入サポートが含まれているため、初期費用は実質0円です。月払いを選択された場合でも、ご自身で設定される場合は初期費用はかかりません。設定代行をご希望の場合は、別途「初期導入サポート」をご購入いただけます。" },
    { q: "LINE公式アカウントを持っていないのですが...", a: "ご利用にはLINE公式アカウントが必要ですが、お持ちでない場合は開設からサポートさせていただきます。初期設定に不安がある方は「初期導入サポート」のご利用をおすすめします。" },
    { q: "今使っているLINE公式アカウントをそのまま使えますか？", a: "はい、現在お使いのLINE公式アカウントにSnapKarteを連携させることが可能です。" },
    { q: "お客様（エンドユーザー）もアプリが必要ですか？", a: "いいえ、お客様はアプリのダウンロードは一切不要です。いつものLINEアプリでお店の公式アカウントと友だちになるだけでご利用いただけます。" },
    { q: "パソコンがなくてもスマホだけで使えますか？", a: "はい、スマホだけで全ての機能 (来店記録の作成、写真の撮影・アップロード、売上確認など) をご利用いただけます。" },
    { q: "解約したい場合はどうすればいいですか？", a: "管理画面の「設定」＞「契約内容の確認・変更」からいつでも解約手続きが可能です。違約金などは発生しません。" },
    { q: "支払い方法は何がありますか？", a: "クレジットカード決済（Visa, Mastercard, American Express, JCB, Diners Club, Discover）に対応しております。" },
    { q: "インボイス制度に対応した領収書は発行されますか？", a: "はい、可能です。お支払い完了後にStripeより送信されるメール、または管理画面から適格請求書（インボイス）対応の領収書をダウンロードいただけます。" },
    { q: "撮影した写真の保存容量や期間に制限はありますか？", a: "Soloプランをご契約の場合、写真の保存枚数・容量・期間はすべて「無制限」です。" },
]

export default function GuidePage() {
    return (
        <div className="min-h-screen bg-muted/20 pb-20">
            {/* Header */}
            <header className="bg-card sticky top-0 z-10 border-b border-border">
                <div className="container mx-auto px-4 h-14 flex items-center gap-4">
                    <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                    </Link>
                    <h1 className="font-bold text-lg">マニュアル / 使い方ガイド</h1>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-2xl space-y-8">

                {/* Introduction */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
                        <Book className="w-6 h-6" />
                        SnapKarteへようこそ
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        SnapKarte（スナップカルテ）は、LINE公式アカウントと連携して、顧客管理・カルテ作成・予約管理をスマホひとつで完結できるサービスです。まずは基本的な使い方をマスターしましょう。
                    </p>
                </div>

                {/* Section 1: Initial Setup */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                        初期設定（LINE連携）
                    </h3>
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <div className="p-4 border-b border-border/50">
                            <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                                <Settings className="w-4 h-4 text-primary" />
                                連携に必要なもの
                            </h4>
                            <p className="text-xs text-muted-foreground mb-3">
                                SnapKarteを利用するには、お店の「LINE公式アカウント」が必要です。まだお持ちでない方は、LINE for Businessからアカウントを作成してください。
                            </p>
                            <ul className="text-xs space-y-2 bg-muted/50 p-3 rounded-lg">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>LINE Developers コンソールでの「チャネルアクセストークン」の発行</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                    <span>Webhook URLの設定（設定画面に表示されているURLをLINE側に登録）</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-muted/30 p-4 text-center">
                            <Link href="/settings" className="text-xs text-primary font-bold hover:underline flex items-center justify-center gap-1">
                                設定画面で連携情報を確認する <ArrowLeft className="w-3 h-3 rotate-180" />
                            </Link>
                        </div>
                        <div className="p-4 text-xs text-muted-foreground border-t border-border/50">
                            <p>※ 設定が難しい場合は、プロが全て代行する「初期導入サポート」をご利用ください。</p>
                        </div>
                    </div>
                </section>

                {/* Section 2: Customer Register */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                        お客様の登録方法
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <Smartphone className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-bold text-sm mb-2">QRコードで友だち追加</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                お店のLINE公式アカウントの友だち追加QRコードをお客様に提示してください。友だち追加するだけで、自動的にSnapKarteの顧客リストに追加されます。
                            </p>
                        </div>
                        <div className="bg-card p-4 rounded-xl border border-border">
                            <Users className="w-8 h-8 text-primary mb-3" />
                            <h4 className="font-bold text-sm mb-2">顧客情報の紐付け</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                友だち追加されたお客様が、初回アンケートやお名前を送信すると、SnapKarte上の「顧客一覧」にお名前が表示されるようになります。
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Daily Works */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                        日々の業務
                    </h3>
                    <div className="space-y-4">
                        <div className="bg-card p-5 rounded-xl border border-border flex gap-4">
                            <div className="bg-primary/10 p-3 rounded-full h-fit">
                                <Camera className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm mb-1">来店記録をつける・写真を撮る</h4>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                                    ダッシュボードの「来店記録を作成」ボタンから、今日のお客様を選んで記録を開始します。施術前・施術後の写真をスマホで撮影してその場でアップロードできます。
                                </p>
                                <p className="text-xs text-muted-foreground bg-muted p-2 rounded">
                                    💡 記録した写真は、自動的にお客様の「マイページ」にも反映され、お客様自身のスマホでいつでも確認できるようになります。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: FAQ */}
                <section>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                        <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                        よくある質問
                    </h3>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <details key={index} className="group bg-card rounded-xl border border-border open:ring-2 open:ring-primary/10 transition-all">
                                <summary className="flex items-center justify-between p-4 font-bold text-sm cursor-pointer list-none">
                                    <span className="flex items-center gap-2">
                                        <span className="text-primary font-extrabold text-xs">Q.</span>
                                        {faq.q}
                                    </span>
                                    <span className="transform group-open:rotate-180 transition-transform text-muted-foreground text-[10px]">
                                        ▼
                                    </span>
                                </summary>
                                <div className="px-4 pb-4 pt-2 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                                    <span className="font-bold text-foreground mr-1">A.</span>
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <div className="mt-8 pt-8 border-t border-border/50 text-center">
                    <p className="text-sm text-muted-foreground mb-4">使い方がわからない場合は？</p>
                    <a
                        href="https://lin.ee/O3ydcSf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#06C755] text-white font-bold text-sm shadow-md hover:bg-[#05b54d] transition-colors"
                    >
                        <MessageCircleQuestion className="w-4 h-4" />
                        LINEでサポートに質問する
                    </a>
                </div>

            </main>
        </div>
    )
}
