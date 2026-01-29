'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rocket, Check, ArrowRight, Store, Key, ExternalLink, Smartphone } from 'lucide-react'
import { submitOnboarding } from './actions'

type Props = {
    profileId: string
    webhookUrl: string
}

export default function OnboardingFlow({ profileId, webhookUrl }: Props) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        shopName: '',
        lineToken: '',
        lineChannelSecret: '',
        lineBasicId: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleNext = () => setStep(s => s + 1)
    const handleBack = () => setStep(s => s - 1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        const data = new FormData()
        data.append('shopName', formData.shopName)
        data.append('lineToken', formData.lineToken)
        data.append('lineChannelSecret', formData.lineChannelSecret)
        data.append('lineBasicId', formData.lineBasicId)

        try {
            // Server Action may redirect, or return object. If redirect happens, client code stops here (usually).
            // But if we return { error }, it continues.
            const result = await submitOnboarding(data)
            if (result?.error) {
                alert(result.error)
                setIsSubmitting(false)
            }
        } catch (e) {
            console.error(e)
            setIsSubmitting(false)
            alert('エラーが発生しました')
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'bg-muted text-muted-foreground'
                            }`}>
                            {step > s ? <Check className="w-5 h-5" /> : s}
                        </div>
                        <span className={`text-[10px] font-medium ${step >= s ? 'text-primary' : 'text-muted-foreground'}`}>
                            {s === 1 && '基本情報'}
                            {s === 2 && 'LINE準備'}
                            {s === 3 && '連携設定'}
                        </span>
                    </div>
                ))}
                {/* Connector Lines */}
                <div className="absolute top-[8rem] left-0 w-full -z-10 hidden sm:block">
                    {/* Visual only, implementing properly requires more layout work */}
                </div>
            </div>

            {/* Card Content */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-10 min-h-[400px] flex flex-col justify-between">

                {/* STEP 1: Shop Info */}
                {step === 1 && (
                    <div className="space-y-6 animate-accordion-down">
                        <div className="text-center space-y-2 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-4">
                                <Rocket className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold">LineAssistへようこそ！</h2>
                            <p className="text-muted-foreground text-sm">
                                まずはあなたの美容室の名前を教えてください。<br />
                                この名前はLINEのメッセージ送信者として使用されます。
                            </p>
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Store className="w-4 h-4 text-primary" />
                                店舗名
                            </label>
                            <input
                                name="shopName"
                                value={formData.shopName}
                                onChange={handleChange}
                                placeholder="例: Hair Salon Tokyo"
                                className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                autoFocus
                            />
                        </div>
                    </div>
                )}

                {/* STEP 2: LINE Prep Guide */}
                {step === 2 && (
                    <div className="space-y-6 animate-accordion-down">
                        <div className="text-center space-y-2 mb-6">
                            <h2 className="text-xl font-bold">LINE公式アカウントの準備</h2>
                            <p className="text-muted-foreground text-sm">
                                LineAssistを利用するには、LINE Developersでの設定が必要です。
                            </p>
                        </div>

                        <div className="space-y-4 text-sm border border-border rounded-xl p-5 bg-muted/20">
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                                <div>
                                    <p className="font-bold mb-1">LINE Developersにログイン</p>
                                    <p className="text-muted-foreground text-xs">
                                        まだアカウントがない場合は作成してください。
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                                <div>
                                    <p className="font-bold mb-1">プロバイダーとチャネルを作成</p>
                                    <p className="text-muted-foreground text-xs">
                                        「Messaging API」チャネルを作成してください。
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex-shrink-0 flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                                <div>
                                    <p className="font-bold mb-1">トークンとシークレットの発行</p>
                                    <p className="text-muted-foreground text-xs">
                                        Messaging API設定タブで「チャネルアクセストークン」を発行し、
                                        チャネル基本設定タブで「チャネルシークレット」を確認してください。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <a
                                href="https://developers.line.biz/console/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                            >
                                LINE Developers コンソールを開く <ExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                )}

                {/* STEP 3: Token Input & Finish */}
                {step === 3 && (
                    <div className="space-y-6 animate-accordion-down">
                        <div className="text-center space-y-2 mb-6">
                            <h2 className="text-xl font-bold">連携情報の入力</h2>
                            <p className="text-muted-foreground text-sm">
                                取得した情報を入力して、セットアップを完了しましょう。
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-primary" />
                                    LINE ID (ベーシックID / プレミアムID)
                                </label>
                                <input
                                    name="lineBasicId"
                                    value={formData.lineBasicId}
                                    onChange={handleChange}
                                    placeholder="@から始まるID (例: @123abcd)"
                                    className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    ※ 顧客に提示する友だち追加QRコードの生成に使用します。
                                </p>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Key className="w-4 h-4 text-[#06C755]" />
                                    チャネルアクセストークン
                                </label>
                                <input
                                    name="lineToken"
                                    value={formData.lineToken}
                                    onChange={handleChange}
                                    placeholder="非常に長い文字列です..."
                                    className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xs font-mono"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <Key className="w-4 h-4 text-slate-500" />
                                    チャネルシークレット
                                </label>
                                <input
                                    name="lineChannelSecret"
                                    value={formData.lineChannelSecret}
                                    onChange={handleChange}
                                    placeholder="32文字程度の英数字"
                                    className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-xs font-mono"
                                />
                            </div>

                            <div className="space-y-3 pt-4 border-t border-border">
                                <label className="text-sm font-bold flex items-center gap-2">
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                    Webhookの設定 (重要)
                                </label>
                                <p className="text-xs text-muted-foreground">
                                    LINEコンソールの「Webhook URL」に以下を設定し、「利用する」をONにしてください。
                                </p>
                                <div className="flex items-center gap-2">
                                    <code className="flex-1 bg-muted p-3 rounded-lg text-[10px] break-all">
                                        {webhookUrl}
                                    </code>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(webhookUrl)}
                                        className="bg-primary/10 text-primary text-xs font-bold px-3 py-3 rounded-lg hover:bg-primary/20 flex-shrink-0"
                                    >
                                        コピー
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/50">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
                        >
                            戻る
                        </button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {step < 3 ? (
                        <button
                            onClick={handleNext}
                            disabled={step === 1 && !formData.shopName}
                            className="bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                        >
                            次へ <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.lineToken}
                            className="bg-[#06C755] text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-[#06C755]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                        >
                            利用開始 <Check className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
