'use client'

import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Loader2, Store, Key, ExternalLink, Smartphone } from 'lucide-react'
import { updateProfile } from './actions'

type Props = {
    initialShopName: string | null
    initialLineBasicId: string | null
    hasToken: boolean
    profileId: string
}

export default function SettingsForm({ initialShopName, initialLineBasicId, hasToken, profileId }: Props) {
    const router = useRouter()
    // Hydration mismatch avoidance for origin
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://your-app.com';
    const webhookUrl = `${origin}/api/webhook/line?shop_id=${profileId}`;

    const [state, formAction, isPending] = useActionState(updateProfile, null)

    return (
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
            </div>

            {/* Status Messages */}
            {state?.error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-bold text-center">
                    {state.error}
                </div>
            )}
            {state?.success && (
                <div className="p-3 rounded-lg bg-primary/10 text-primary text-sm font-bold text-center">
                    {state.message}
                </div>
            )}

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
        </form>
    )
}
