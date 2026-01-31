import Link from 'next/link'
import { ArrowLeft, Book, MessageCircleQuestion, Smartphone, Settings, Camera, Users, CheckCircle } from 'lucide-react'

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
