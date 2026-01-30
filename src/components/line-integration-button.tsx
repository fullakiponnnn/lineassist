'use client'

import { useState } from 'react'
import { MessageCircle, X, QrCode, Copy, Check, Loader2 } from 'lucide-react'
import { generateLinkToken } from '@/app/customers/[id]/actions' // Adjust import path carefully
import { QRCodeSVG } from 'qrcode.react'

type Props = {
    customerId: string
    initialLinkToken?: string | null
    botBasicId?: string | null
}

export default function LineIntegrationButton({ customerId, initialLinkToken, botBasicId }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [token, setToken] = useState<string | null>(initialLinkToken || null)
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleOpen = async () => {
        if (!botBasicId) {
            alert('LINE連携設定が完了していません。設定画面でLINE IDを入力してください。')
            return
        }

        setIsOpen(true)
        if (!token) {
            handleGenerate()
        }
    }

    const handleGenerate = async () => {
        setIsLoading(true)
        try {
            const res = await generateLinkToken(customerId)
            if (res.error) {
                alert(res.error)
            } else if (res.token) {
                setToken(res.token)
            }
        } catch (e) {
            alert('通信エラーが発生しました')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = () => {
        // Just copy the text command
        const text = `連携コード: ${token}`
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // LINE URL Scheme
    // https://line.me/R/oaMessage/{botId}/?text={encodedText}
    const messageText = `連携コード: ${token}`
    const qrValue = botBasicId && token
        ? `https://line.me/R/oaMessage/${botBasicId.replace('@', '')}/?text=${encodeURIComponent(messageText)}`
        : ''

    return (
        <>
            <button
                onClick={handleOpen}
                className="text-xs px-3 py-1.5 bg-[#06C755] text-white rounded-full font-bold shadow-sm shadow-[#06C755]/20 hover:bg-[#06C755]/90 transition-all flex items-center gap-1.5"
            >
                <QrCode className="w-3.5 h-3.5" />
                LINE連携QR
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="bg-[#06C755] p-4 flex items-center justify-between text-white">
                            <h3 className="font-bold flex items-center gap-2">
                                <MessageCircle className="w-5 h-5 fill-white" />
                                LINE連携
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col items-center gap-6">
                            <p className="text-sm text-slate-600 text-center leading-relaxed">
                                このQRコードをお客様のスマートフォンで読み取っていただくと、LINEが起動し連携メッセージが自動入力されます。
                            </p>

                            <div className="bg-white p-4 rounded-xl border-2 border-slate-100 shadow-inner">
                                {isLoading ? (
                                    <div className="w-48 h-48 flex items-center justify-center text-slate-300">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                    </div>
                                ) : qrValue ? (
                                    <QRCodeSVG
                                        value={qrValue}
                                        size={192}
                                        level="M"
                                        includeMargin={true}
                                    />
                                ) : (
                                    <div className="w-48 h-48 flex items-center justify-center text-slate-300 bg-slate-50 rounded-lg text-xs">
                                        QRコード生成エラー
                                    </div>
                                )}
                            </div>

                            {/* Manual Code Section */}
                            <div className="w-full bg-slate-50 rounded-lg p-3 border border-slate-100">
                                <p className="text-[10px] text-slate-500 mb-1 text-center font-bold">
                                    QRが読み取れない場合
                                </p>
                                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-2 py-1.5">
                                    <code className="flex-1 text-xs font-mono text-slate-700 truncate">
                                        {messageText}
                                    </code>
                                    <button
                                        onClick={handleCopy}
                                        className="text-slate-400 hover:text-primary transition-colors"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-1 text-center">
                                    このメッセージをLINE公式アカウントに送信してください
                                </p>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                            <button
                                onClick={handleGenerate}
                                className="text-xs text-primary hover:underline"
                            >
                                新しいQRコードを発行する
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
