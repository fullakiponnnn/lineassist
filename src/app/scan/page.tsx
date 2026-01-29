'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from '@yudiel/react-qr-scanner'
import { X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { findCustomerByMemberCode } from './actions'

export default function ScanPage() {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleScan = async (result: any) => {
        if (isProcessing) return

        // result はライブラリのバージョンによって配列だったりオブジェクトだったりする
        // @yudiel/react-qr-scanner v2系: result[0].rawValue
        const rawValue = result?.[0]?.rawValue

        if (!rawValue) return

        setIsProcessing(true)
        setError(null)

        // 音を鳴らす（オプション）
        // const audio = new Audio('/scan-beep.mp3')
        // audio.play().catch(() => {})

        try {
            const { customerId, error: apiError } = await findCustomerByMemberCode(rawValue)

            if (customerId) {
                // 成功したら顧客ページへ遷移
                router.push(`/customers/${customerId}`)
            } else {
                setError(apiError || '読み取れませんでした')
                setIsProcessing(false) // Retry allowed after error
            }
        } catch (e) {
            setError('エラーが発生しました')
            setIsProcessing(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center justify-between z-10">
                <h1 className="text-lg font-bold">QRコードをスキャン</h1>
                <Link href="/" className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                    <X className="w-6 h-6" />
                </Link>
            </div>

            {/* Camera Area */}
            <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                <div className="w-full max-w-sm aspect-square relative rounded-3xl overflow-hidden border-4 border-white/20">
                    {!isProcessing ? (
                        <Scanner
                            onScan={handleScan}
                            onError={(error) => console.error(error)}

                            styles={{
                                container: { width: '100%', height: '100%' },
                                video: { objectFit: 'cover' }
                            }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-4 animate-in fade-in">
                            <Loader2 className="w-12 h-12 text-primary animate-spin" />
                            <p className="font-bold">処理中...</p>
                        </div>
                    )}

                    {/* Overlay Frame */}
                    <div className="absolute inset-0 border-[40px] border-black/50 pointer-events-none"></div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-64 h-64 border-2 border-primary/80 rounded-2xl relative">
                            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-lg"></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-lg"></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-lg"></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Error Message */}
            <div className="p-8 pb-12 text-center min-h-[150px]">
                {error ? (
                    <div className="p-4 bg-red-500/20 text-red-200 rounded-xl border border-red-500/50 animate-in slide-in-from-bottom">
                        <p className="font-bold">Error</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                ) : (
                    <p className="text-slate-400 text-sm">
                        顧客の会員証QRコードを<br />
                        枠内に合わせてください
                    </p>
                )}
            </div>
        </div>
    )
}
