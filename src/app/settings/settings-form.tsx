'use client'

import { useState, useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Store, Key, ExternalLink, Smartphone, CreditCard, Check, Zap, CheckCircle2 } from 'lucide-react'
// @ts-ignore
import { updateProfile, completeSetup } from './actions'

type Props = {
    initialShopName: string | null
    initialLineBasicId: string | null
    hasToken: boolean
    profileId: string
    profile: any
}

function PlanSelector({ profileId, isSetupOnly = false }: { profileId: string, isSetupOnly?: boolean }) {
    const [isYearly, setIsYearly] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async (priceId: string) => {
        if (!priceId) {
            alert('システムエラー: プランIDが見つかりません。環境設定を確認してください。')
            console.error('Checkout Error: priceId is undefined', { isYearly })
            return
        }
        setIsLoading(true)
        try {
            // mode='payment' を指定してAPIを呼び出す（セットアップ単発購入の場合）
            const mode = isSetupOnly ? 'payment' : 'subscription';

            const body: any = { mode };
            if (isSetupOnly) {
                // 単発決済の場合は priceId を送る
                body.priceId = priceId;
            } else {
                // サブスクの場合は planId を送る
                body.planId = priceId;
            }

            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...body, returnUrl: '/settings' })
            })
            const data = await res.json()
            if (data.url) window.location.href = data.url
            else alert('エラーが発生しました: ' + (data.error || 'Unknown error'))
        } catch (error) {
            alert('通信エラーが発生しました')
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    const SOLO_PRICE_ID = isYearly
        ? process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY
        : process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY

    // Setup Fee ID
    const SETUP_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_SETUP;

    if (isSetupOnly) {
        return (
            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => handleCheckout(SETUP_PRICE_ID!)}
                    disabled={isLoading}
                    className="w-full bg-amber-500 text-white py-3 rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20 hover:bg-amber-600 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '今すぐ購入する'}
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Toggle */}
            <div className="flex justify-center mb-6">
                <div className="bg-slate-950/50 p-1 rounded-full flex relative">
                    <button
                        type="button"
                        onClick={() => setIsYearly(false)}
                        className={`relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-all ${!isYearly ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        月払い
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsYearly(true)}
                        className={`relative z-10 px-4 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${isYearly ? 'text-slate-900 bg-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                    >
                        年払い
                        <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">お得</span>
                    </button>
                </div>
            </div>

            {/* Solo Plan Card */}
            <div className="bg-white text-slate-900 rounded-xl p-4 md:p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <div className="absolute top-0 right-0 bg-primary/10 w-24 h-24 rounded-full -mr-8 -mt-8"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div>
                        <h3 className="font-bold text-lg">Solo Plan</h3>
                        <p className="text-xs text-slate-500">個人事業主・フリーランス向け</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-extrabold">{isYearly ? '¥2,483' : '¥2,980'}<span className="text-xs font-normal text-slate-500">/月</span></p>
                        {isYearly && <p className="text-[10px] text-emerald-600 font-bold">年間 ¥29,800 (2ヶ月分無料)</p>}
                    </div>
                </div>

                <ul className="space-y-2 mb-6 text-xs text-slate-600 relative z-10">
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> 写真送信数・容量 無制限</li>
                    <li className="flex items-center gap-2"><Check className="w-3 h-3 text-primary" /> LINE自動連携</li>
                </ul>

                <button
                    type="button"
                    onClick={() => handleCheckout(SOLO_PRICE_ID!)}
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 relative z-10"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'アップグレードする'}
                </button>
            </div>
        </div>
    )
}

function SetupCompletionForm() {
    const [state, formAction, isPending] = useActionState(completeSetup, null)

    return (
        <form action={formAction} className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 shadow-sm space-y-4">
            <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-600" />
                セットアップ完了報告
            </h3>
            <p className="text-xs text-emerald-800 leading-relaxed">
                サポート担当から「設定完了」の連絡が来ましたか？
                <br />
                作成されたLINE公式アカウントのIDを入力して、利用を開始しましょう。
            </p>

            <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-900">LINE公式アカウントID</label>
                <input
                    type="text"
                    name="lineBasicId"
                    placeholder="@123abcd"
                    required
                    className="w-full bg-white border border-emerald-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none placeholder:text-emerald-300/70"
                />
            </div>

            {state?.error && (
                <div className="p-3 rounded-lg bg-red-100 text-red-600 text-xs font-bold">
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 text-xs font-bold">
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
            >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                完了して利用開始
            </button>
        </form>
    )
}

export default function SettingsForm({ initialShopName, initialLineBasicId, hasToken, profileId, profile }: Props) {
    const router = useRouter()
    // Hydration mismatch avoidance for origin
    const origin = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.snapkarte.jp';
    const webhookUrl = `${origin}/api/webhook/line?shop_id=${profileId}`;

    const [state, formAction, isPending] = useActionState(updateProfile, null)

    return (
        <div className="space-y-6">
            {/* Subscription Section */}
            <div className="space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>

                    <h2 className="text-sm font-bold text-slate-300 mb-6 uppercase tracking-wider flex items-center gap-2 relative z-10">
                        <CreditCard className="w-4 h-4" />
                        ご利用プラン
                    </h2>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <p className="text-2xl font-bold flex items-center gap-2">
                                    {profile.plan_tier === 'free' ? 'Free プラン' :
                                        profile.plan_tier === 'solo' ? 'Solo プラン' : 'Standard プラン'}
                                    <span className={`text-xs px-2 py-0.5 rounded-full border ${profile.subscription_status === 'active'
                                        ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                                        : 'border-slate-500 text-slate-400'
                                        }`}>
                                        {profile.subscription_status === 'active' ? '有効' : '無料版'}
                                    </span>
                                </p>
                                {profile.subscription_status === 'active' && profile.current_period_end && (
                                    <p className="text-xs text-slate-400 mt-1">
                                        次回更新日: {(() => {
                                            const val = profile.current_period_end;
                                            if (!val) return '不明';
                                            // Handle unix timestamp as seconds (e.g. Stripe API returns seconds)
                                            // If number and less than 10000000000 (year 2286), assume seconds
                                            const date = (typeof val === 'number' && val < 10000000000)
                                                ? new Date(val * 1000)
                                                : new Date(val);
                                            return date.toLocaleDateString('ja-JP');
                                        })()}
                                    </p>
                                )}
                            </div>
                        </div>

                        {profile.plan_tier === 'free' ? (
                            <div className="mt-6">
                                <PlanSelector profileId={profileId} />
                            </div>
                        ) : (
                            <div className="mt-4">
                                <a
                                    href="#"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const res = await fetch('/api/payment/portal', { method: 'POST' });
                                        const data = await res.json();
                                        if (data.url) window.location.href = data.url;
                                    }}
                                    className="inline-block w-full text-center bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    契約内容の確認・変更
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Setup Support Section */}
                {
                    !profile.is_setup_purchased && (
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200 shadow-sm text-slate-800 relative overflow-hidden">
                            <h2 className="text-sm font-bold text-amber-800 mb-4 uppercase tracking-wider flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                オプション購入
                            </h2>

                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">初期導入サポート</h3>
                                    <p className="text-xs text-slate-600 mt-1 max-w-xs">
                                        LINE公式アカウントの開設からリッチメニュー設置まで、面倒な設定をすべてプロが代行します。
                                    </p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-xl font-extrabold">¥29,800</p>
                                    <p className="text-xs text-slate-500">一回払い</p>
                                </div>
                            </div>

                            <PlanSelector profileId={profileId} isSetupOnly={true} />
                        </div>
                    )
                }
            </div>

            {/* Setup Completion Form (Separate Form) */}
            {profile.is_setup_purchased && profile.setup_status !== 'completed' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 shadow-sm flex items-start gap-4">
                        <div className="bg-amber-100 p-2 rounded-full shrink-0">
                            <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
                        </div>
                        <div>
                            <h3 className="font-bold text-amber-800 text-sm">初期導入サポート進行中</h3>
                            <p className="text-xs text-amber-700 mt-1">
                                現在、担当者が設定を進めています。LINEでの連絡をお待ちください。
                            </p>
                        </div>
                    </div>

                    {/* Completion Form */}
                    <SetupCompletionForm />
                </div>
            )}

            {profile.is_setup_purchased && profile.setup_status === 'completed' && (
                <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200 shadow-sm flex items-center gap-4">
                    <div className="bg-emerald-100 p-3 rounded-full">
                        <Check className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-800">初期導入設定 完了済み</h3>
                        <p className="text-xs text-emerald-700">すべての設定が正常に完了しています。</p>
                    </div>
                </div>
            )}

            <form action={formAction} className="space-y-6">
                {/* Shop Name Section */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-sm font-bold text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Store className="w-4 h-4" />
                        店舗情報
                    </h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold">店舗名</label>
                            <input
                                type="text"
                                name="shopName"
                                defaultValue={initialShopName || ''}
                                placeholder="Hair Salon Tokyo"
                                className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-primary" />
                                LINE ID (ベーシックID / プレミアムID)
                            </label>
                            <input
                                type="text"
                                name="lineBasicId"
                                defaultValue={initialLineBasicId || ''}
                                placeholder="@から始まるID (例: @123abcd)"
                                className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                            <p className="text-[10px] text-muted-foreground">
                                ※ 顧客に提示する友だち追加QRコードの生成に使用します。
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border/50">
                        <label className="text-xs font-bold text-muted-foreground block mb-2">店舗ID (Profile ID)</label>
                        <code className="block bg-muted p-2 rounded text-xs font-mono">{profileId}</code>
                    </div>
                </div>

                {/* LINE Integration Section */}
                <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
                    <h2 className="text-sm font-bold text-[#06C755] mb-4 uppercase tracking-wider flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        LINE連携設定
                    </h2>

                    {/* Webhook URL Info */}
                    <div className="mb-6 space-y-2">
                        <label className="text-sm font-bold">Webhook URL</label>
                        <p className="text-xs text-muted-foreground">
                            LINE Developers コンソールの "Messaging API設定 &gt; Webhook URL" に以下のURLを設定し、"Webhookの利用" をオンにしてください。
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                readOnly
                                value={webhookUrl}
                                className="flex-1 bg-muted/50 border border-input rounded-lg px-3 py-2 text-xs font-mono text-muted-foreground focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(webhookUrl)}
                                className="bg-primary/10 text-primary text-xs font-bold px-3 py-2 rounded-lg hover:bg-primary/20"
                            >
                                コピー
                            </button>
                        </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mb-6 text-xs text-muted-foreground leading-relaxed">
                        <p className="mb-2">
                            LINE Developersコンソールから取得した <strong>チャネルアクセストークン (長期)</strong> を入力してください。
                        </p>
                        <a
                            href="https://developers.line.biz/console/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                            LINE Developers コンソールを開く <ExternalLink className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold">チャネルアクセストークン</label>
                            {hasToken && (
                                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-bold">
                                    設定済み
                                </span>
                            )}
                        </div>
                        <input
                            type="text"
                            name="lineToken"
                            placeholder={hasToken ? "設定済み (変更する場合のみ入力)" : "非常に長い文字列です..."}
                            className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-xs font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                            ※ 更新する場合のみ入力してください。以前の値はセキュリティのため表示されません。
                        </p>
                    </div>

                    <div className="space-y-2 pt-4 border-t border-border/50">
                        <label className="text-sm font-bold flex items-center gap-2">
                            <Key className="w-4 h-4 text-slate-500" />
                            チャネルシークレット
                        </label>
                        <input
                            type="text"
                            name="lineChannelSecret"
                            placeholder={hasToken ? "設定済み (変更する場合のみ入力)" : "32文字程度の英数字"}
                            className="w-full bg-muted/50 border border-input rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-xs font-mono"
                        />
                        <p className="text-xs text-muted-foreground">
                            ※ Webhookの署名検証に使用します。
                        </p>
                    </div>
                </div>

                {/* Status Messages for Main Form */}
                {
                    state?.error && (
                        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-bold text-center">
                            {state.error}
                        </div>
                    )
                }
                {
                    state?.success && (
                        <div className="p-3 rounded-lg bg-primary/10 text-primary text-sm font-bold text-center">
                            {state.message}
                        </div>
                    )
                }

                {/* Submit Button */}
                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                        保存する
                    </button>
                </div>
            </form >
        </div>
    )
}
