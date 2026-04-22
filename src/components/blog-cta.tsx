import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function BlogCTA() {
    return (
        <section className="bg-gradient-to-br from-[#134231] to-[#1b2f26] rounded-[3rem] p-10 sm:p-14 text-white shadow-xl mt-16 mb-8 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2d5a47]/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#06C755]/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
                <div className="bg-white/10 p-3 rounded-2xl mb-6 backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-8 h-8 text-[#e4e2de]" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 tracking-wide leading-snug">
                    スマホ1つで、カルテ管理も<br className="sm:hidden" />LINE送信も自動化。
                </h2>
                
                <p className="text-[#bcedd4] sm:text-lg mb-10 max-w-xl leading-relaxed">
                    SnapKarteなら、写真の保存や顧客情報の管理はもちろん、来店後のLINEフォローまで自動化できます。まずは無料のStarterプラン（カルテ30件まで）でお試しください。
                </p>
                
                <Link
                    href="/login"
                    className="group flex items-center justify-center gap-2 bg-[#fbf9f5] text-[#134231] px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] hover:bg-white transition-all duration-300 w-full sm:w-auto"
                >
                    無料でStarterプランを始める
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <p className="text-xs text-white/50 mt-6 font-medium tracking-wide">
                    ※ クレジットカード登録不要。いつでも解約可能です。
                </p>
            </div>
        </section>
    )
}
