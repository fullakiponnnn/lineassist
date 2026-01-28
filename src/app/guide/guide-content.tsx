'use client'

import React from 'react'
import QRCode from 'react-qr-code'
import { ArrowLeft, MessageCircle, Smartphone, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
    shopName: string
    lineBasicId: string
}

export default function GuideContent({ shopName, lineBasicId }: Props) {
    const lineAddFriendUrl = `https://line.me/R/ti/p/${lineBasicId}`

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <Link href="/" className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm text-slate-500 hover:text-slate-800 transition-colors no-print">
                <ArrowLeft className="w-6 h-6" />
            </Link>

            <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">{shopName}</h1>
                <p className="text-slate-500 mb-8 text-sm">LINE公式アカウント連携ガイド</p>

                <div className="space-y-8">
                    {/* STEP 1 */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="bg-slate-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <span className="font-bold text-slate-700">QRコードを読み取る</span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-2 border-slate-100 inline-block">
                            <QRCode
                                value={lineAddFriendUrl}
                                size={200}
                                level="H"
                                fgColor="#2c3e50"
                            />
                        </div>
                        <p className="text-xs text-slate-400 font-mono">{lineBasicId}</p>
                    </div>

                    {/* STEP 2 */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <span className="font-bold text-blue-900">お名前を送信する</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-sm text-blue-800">
                            <Smartphone className="w-5 h-5" />
                            <ArrowRight className="w-4 h-4 text-blue-300" />
                            <div className="bg-white px-3 py-2 rounded-lg shadow-sm font-bold">
                                「山田 花子」
                            </div>
                            <ArrowRight className="w-4 h-4 text-blue-300" />
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <p className="text-xs text-blue-600 mt-3 leading-relaxed">
                            友だち追加後、トーク画面で<br />
                            <strong>ご自身のお名前（フルネーム）</strong>を送信してください。
                        </p>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400">
                        連携が完了すると、次回の来店から<br />
                        お写真が自動でお手元に届きます。
                    </p>
                </div>
            </div>
        </div>
    )
}
