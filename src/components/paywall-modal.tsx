'use client'

import { Crown, X } from 'lucide-react'
import Link from 'next/link'

export default function PaywallModal({ isOpen, onClose, title, description }: { isOpen: boolean, onClose: () => void, title: string, description: string }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1b1c1a]/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#ffffff] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-[#f5f3ef] rounded-full transition-colors text-[#414944]"
                >
                    <X className="w-5 h-5" />
                </button>
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#134231] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#134231]/20">
                        <Crown className="w-8 h-8 text-[#e4e2de]" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[#1b1c1a] mb-3">{title}</h3>
                    <p className="text-[#414944] text-sm leading-relaxed mb-8 whitespace-pre-wrap">
                        {description}
                    </p>
                    <Link
                        href="/settings"
                        className="w-full bg-gradient-to-r from-[#134231] to-[#2d5a47] text-white font-bold py-4 rounded-full shadow-[0_8px_16px_rgba(27,28,26,0.06)] hover:shadow-[0_12px_24px_rgba(27,28,26,0.1)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                    >
                        Soloプランへアップグレード
                    </Link>
                    <button
                        onClick={onClose}
                        className="mt-4 text-sm font-bold text-[#717974] hover:text-[#414944] transition-colors"
                    >
                        後で検討する
                    </button>
                </div>
            </div>
        </div>
    )
}
