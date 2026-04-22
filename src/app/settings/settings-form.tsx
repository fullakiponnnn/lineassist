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
            <div className="mt-6">
                <button
                    type="button"
                    onClick={() => handleCheckout(SETUP_PRICE_ID!)}
                    disabled={isLoading}
                    className="w-full bg-[#6a5e33] text-white py-4 rounded-full font-bold text-sm shadow-[0_8px_16px_rgba(106,94,51,0.2)] hover:shadow-[0_12px_24px_rgba(106,94,51,0.3)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : '今すぐ購入する'}
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Toggle */}
            <div className="flex justify-center mb-8">
                <div className="bg-[#1b1c1a]/40 backdrop-blur-md p-1.5 rounded-full flex relative border border-white/10">
                    <button
                        type="button"
                        onClick={() => setIsYearly(false)}
                        className={`relative z-10 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 ${!isYearly ? 'text-[#1b1c1a] bg-white shadow-sm' : 'text-white/70 hover:text-white'}`}
                    >
                        月払い
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsYearly(true)}
                        className={`relative z-10 px-5 py-2 text-xs font-bold rounded-full transition-all duration-300 flex items-center gap-1.5 ${isYearly ? 'text-[#1b1c1a] bg-white shadow-sm' : 'text-white/70 hover:text-white'}`}
                    >
                        年払い
                        <span className="bg-[#06C755] text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Save</span>
                    </button>
                </div>
            </div>

            {/* Solo Plan Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-[2rem] p-6 relative overflow-hidden group hover:bg-white/15 transition-all duration-300">
                <div className="absolute top-0 right-0 bg-[#ffffff]/5 w-32 h-32 rounded-full -mr-12 -mt-12 blur-2xl transition-transform duration-700 group-hover:scale-150"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                        <h3 className="font-serif font-bold text-xl tracking-wide">Soloプラン</h3>
                        <p className="text-sm text-white/70 mt-1">個人事業主・フリーランス向け</p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-extrabold">{isYearly ? '¥2,483' : '¥2,980'}<span className="text-sm font-normal text-white/60">/月</span></p>
                        {isYearly && <p className="text-[11px] text-[#06C755] font-bold mt-1 bg-[#06C755]/10 inline-block px-2 py-0.5 rounded-full">年間 ¥29,800 (2ヶ月分無料)</p>}
                    </div>
                </div>

                <ul className="space-y-3 mb-8 text-sm text-white/80 relative z-10">
                    <li className="flex items-center gap-3"><div className="bg-white/20 p-1 rounded-full"><Check className="w-3 h-3 text-white" /></div> 写真送信数・容量 無制限</li>
                    <li className="flex items-center gap-3"><div className="bg-white/20 p-1 rounded-full"><Check className="w-3 h-3 text-white" /></div> LINE自動連携</li>
                </ul>

                <button
                    type="button"
                    onClick={() => handleCheckout(SOLO_PRICE_ID!)}
                    disabled={isLoading}
                    className="w-full bg-[#ffffff] text-[#134231] py-4 rounded-full font-bold text-sm shadow-[0_8px_16px_rgba(255,255,255,0.1)] hover:shadow-[0_12px_24px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2 relative z-10"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'アップグレードする'}
                </button>
            </div>
        </div>
    )
}

function SetupCompletionForm() {
    const [state, formAction, isPending] = useActionState(completeSetup, null)

    return (
        <form action={formAction} className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)] space-y-6">
            <h3 className="font-serif font-bold text-xl text-[#1b1c1a] flex items-center gap-2 tracking-wide">
                <span className="text-[#6a5e33]">◆</span>
                セットアップ完了報告
            </h3>
            <p className="text-sm text-[#414944] leading-relaxed">
                サポート担当から「設定完了」の連絡が来ましたか？
                <br />
                作成されたLINE公式アカウントのIDを入力して、利用を開始しましょう。
            </p>

            <div className="space-y-3">
                <label className="text-sm font-bold text-[#414944]">LINE公式アカウントID</label>
                <input
                    type="text"
                    name="lineBasicId"
                    placeholder="@123abcd"
                    required
                    className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-base focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                />
            </div>

            {state?.error && (
                <div className="p-4 rounded-[1rem] bg-[#eb5757]/10 text-[#eb5757] text-sm font-bold text-center">
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div className="p-4 rounded-[1rem] bg-[#134231]/10 text-[#134231] text-sm font-bold text-center">
                    {state.message}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white font-bold py-4 rounded-full shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-70 transition-all duration-300 flex items-center justify-center gap-2"
            >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
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
        <div className="space-y-8">
            {/* Subscription Section */}
            <div className="space-y-8">
                <div className="bg-gradient-to-br from-[#134231] to-[#1b2f26] rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(19,66,49,0.2)] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#2d5a47]/30 rounded-full blur-3xl -mr-20 -mt-20"></div>

                    <h2 className="text-sm font-bold text-white/60 mb-8 uppercase tracking-widest flex items-center gap-2 relative z-10">
                        <CreditCard className="w-4 h-4" />
                        ご利用プラン
                    </h2>

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-3xl font-serif font-bold flex items-center gap-3">
                                    {profile.plan_tier === 'free' ? 'Starterプラン' :
                                        profile.plan_tier === 'solo' ? 'Soloプラン' : 'Standardプラン'}
                                    <span className={`text-[10px] px-3 py-1 rounded-full font-sans tracking-widest uppercase ${profile.subscription_status === 'active'
                                        ? 'bg-[#ffffff] text-[#134231] font-bold shadow-sm'
                                        : 'bg-white/10 text-white/80'
                                        }`}>
                                        {profile.subscription_status === 'active' ? 'Active' : 'Free'}
                                    </span>
                                </p>
                                {profile.subscription_status === 'active' && profile.current_period_end && (
                                    <p className="text-sm text-white/70 mt-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#06C755]"></span>
                                        次回更新日: {(() => {
                                            const val = profile.current_period_end;
                                            if (!val) return '不明';
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
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <PlanSelector profileId={profileId} />
                            </div>
                        ) : (
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <a
                                    href="#"
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const res = await fetch('/api/payment/portal', { method: 'POST' });
                                        const data = await res.json();
                                        if (data.url) window.location.href = data.url;
                                    }}
                                    className="inline-flex justify-center w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 rounded-full transition-all duration-300"
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
                        <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)] text-[#1b1c1a] relative overflow-hidden group">
                            <h2 className="text-sm font-bold text-[#6a5e33] mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                オプション購入
                            </h2>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                <div>
                                    <h3 className="font-serif font-bold text-xl tracking-wide">初期導入サポート</h3>
                                    <p className="text-sm text-[#717974] mt-2 max-w-sm leading-relaxed">
                                        LINE公式アカウントの開設からリッチメニュー設置まで、面倒な設定をすべてプロが代行します。
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0">
                                    <p className="text-3xl font-extrabold text-[#1b1c1a]">¥29,800</p>
                                    <p className="text-sm text-[#a1a1a0] mt-1">一回払い</p>
                                </div>
                            </div>

                            <PlanSelector profileId={profileId} isSetupOnly={true} />
                        </div>
                    )
                }
            </div>

            {/* Setup Completion Form (Separate Form) */}
            {profile.is_setup_purchased && profile.setup_status !== 'completed' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="bg-[#fbf9f5] rounded-[2rem] p-6 shadow-inner flex items-center gap-5">
                        <div className="bg-[#ffffff] p-3 rounded-full shadow-sm shrink-0">
                            <Loader2 className="w-6 h-6 text-[#6a5e33] animate-spin" />
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-[#1b1c1a] text-lg">初期導入サポート進行中</h3>
                            <p className="text-sm text-[#717974] mt-1">
                                現在、担当者が設定を進めています。<br className="hidden md:block" />LINEでの連絡をお待ちください。
                            </p>
                        </div>
                    </div>

                    {/* Completion Form */}
                    <SetupCompletionForm />
                </div>
            )}

            {profile.is_setup_purchased && profile.setup_status === 'completed' && (
                <div className="bg-[#ffffff] rounded-[2rem] p-6 shadow-[0_12px_40px_rgba(27,28,26,0.04)] flex items-center gap-5">
                    <div className="bg-[#134231] p-3 rounded-full shadow-[0_8px_16px_rgba(19,66,49,0.2)]">
                        <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="font-serif font-bold text-[#1b1c1a] text-lg">初期導入設定 完了済み</h3>
                        <p className="text-sm text-[#717974] mt-1">すべての設定が正常に完了しています。</p>
                    </div>
                </div>
            )}

            <form action={formAction} className="space-y-8">
                {/* Shop Name Section */}
                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)]">
                    <h2 className="text-sm font-bold text-[#414944] mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Store className="w-4 h-4 text-[#6a5e33]" />
                        店舗情報
                    </h2>
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-[#414944]">店舗名</label>
                            <input
                                type="text"
                                name="shopName"
                                defaultValue={initialShopName || ''}
                                placeholder="Hair Salon Tokyo"
                                className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-base focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-bold flex items-center gap-2 text-[#414944]">
                                <Smartphone className="w-4 h-4 text-[#6a5e33]" />
                                LINE ID (ベーシックID / プレミアムID)
                            </label>
                            <input
                                type="text"
                                name="lineBasicId"
                                defaultValue={initialLineBasicId || ''}
                                placeholder="@から始まるID (例: @123abcd)"
                                className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-base focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                            />
                            <p className="text-xs text-[#717974] ml-2">
                                ※ 顧客に提示する友だち追加QRコードの生成に使用します。
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#f5f3ef]">
                        <label className="text-xs font-bold text-[#a1a1a0] uppercase tracking-widest block mb-3 ml-2">店舗ID (Profile ID)</label>
                        <code className="block bg-[#fbf9f5] p-4 rounded-[1rem] text-sm font-mono text-[#717974] break-all border border-[#e4e2de]/50">{profileId}</code>
                    </div>
                </div>

                {/* LINE Integration Section */}
                <div className="bg-[#ffffff] rounded-[2rem] p-8 shadow-[0_12px_40px_rgba(27,28,26,0.04)]">
                    <h2 className="text-sm font-bold text-[#134231] mb-6 uppercase tracking-widest flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        LINE連携設定
                    </h2>

                    {/* Webhook URL Info */}
                    <div className="mb-8 space-y-3">
                        <label className="text-sm font-bold text-[#414944]">Webhook URL</label>
                        <p className="text-sm text-[#717974] leading-relaxed">
                            LINE Developers コンソールの "Messaging API設定 &gt; Webhook URL" に以下のURLを設定し、"Webhookの利用" をオンにしてください。
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                            <input
                                readOnly
                                value={webhookUrl}
                                className="w-full sm:flex-1 bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-sm font-mono text-[#414944] outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => navigator.clipboard.writeText(webhookUrl)}
                                className="w-full sm:w-auto bg-[#ffffff] text-[#134231] border border-[#e4e2de] shadow-sm text-sm font-bold px-6 py-4 rounded-[1rem] hover:bg-[#fbf9f5] transition-colors shrink-0"
                            >
                                コピー
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#fbf9f5] p-5 rounded-[1rem] mb-8 text-sm text-[#414944] leading-relaxed shadow-inner">
                        <p className="mb-3">
                            LINE Developersコンソールから取得した <strong>チャネルアクセストークン (長期)</strong> を入力してください。
                        </p>
                        <a
                            href="https://developers.line.biz/console/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#134231] hover:text-[#2d5a47] font-bold inline-flex items-center gap-1.5 transition-colors"
                        >
                            LINE Developers コンソールを開く <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-[#414944]">チャネルアクセストークン</label>
                            {hasToken && (
                                <span className="text-[10px] px-3 py-1 bg-[#06C755]/10 text-[#06C755] rounded-full font-bold uppercase tracking-wider">
                                    設定済み
                                </span>
                            )}
                        </div>
                        <input
                            type="text"
                            name="lineToken"
                            placeholder={hasToken ? "設定済み (変更する場合のみ入力)" : "非常に長い文字列です..."}
                            className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-sm font-mono focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                        />
                        <p className="text-xs text-[#717974] ml-2">
                            ※ 更新する場合のみ入力してください。以前の値はセキュリティのため表示されません。
                        </p>
                    </div>

                    <div className="space-y-3 pt-8 mt-8 border-t border-[#f5f3ef]">
                        <label className="text-sm font-bold flex items-center gap-2 text-[#414944]">
                            <Key className="w-4 h-4 text-[#6a5e33]" />
                            チャネルシークレット
                        </label>
                        <input
                            type="text"
                            name="lineChannelSecret"
                            placeholder={hasToken ? "設定済み (変更する場合のみ入力)" : "32文字程度の英数字"}
                            className="w-full bg-[#f5f3ef] border-none rounded-[1rem] px-5 py-4 text-sm font-mono focus:bg-[#ffffff] focus:shadow-[0_8px_24px_rgba(27,28,26,0.06)] outline-none transition-all duration-300 placeholder:text-[#a1a1a0]"
                        />
                        <p className="text-xs text-[#717974] ml-2">
                            ※ Webhookの署名検証に使用します。
                        </p>
                    </div>
                </div>

                {/* Status Messages for Main Form */}
                {
                    state?.error && (
                        <div className="p-4 rounded-[1rem] bg-[#eb5757]/10 text-[#eb5757] text-sm font-bold text-center">
                            {state.error}
                        </div>
                    )
                }
                {
                    state?.success && (
                        <div className="p-4 rounded-[1rem] bg-[#134231]/10 text-[#134231] text-sm font-bold text-center">
                            {state.message}
                        </div>
                    )
                }

                {/* Submit Button */}
                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white font-bold py-4 rounded-full shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:transform-none"
                    >
                        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        保存する
                    </button>
                </div>
            </form >
        </div>
    )
}
