'use client'

import React from 'react'
import { Sparkles } from 'lucide-react'
import QRDisplay from '@/components/qr-display'

interface MemberCardProps {
    customerName: string
    memberCode: string
    shopName: string
}

export default function MemberCard({ customerName, memberCode, shopName }: MemberCardProps) {
    return (
        <div className="w-full max-w-[400px] mx-auto aspect-[1.586/1] relative rounded-2xl overflow-hidden shadow-2xl flex">
            {/* Left Side: Design & Info (65%) */}
            <div className="w-[65%] bg-gradient-to-br from-slate-900 via-slate-800 to-black p-5 flex flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                {/* Decorative Gradients */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full"></div>

                {/* Header */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="text-yellow-400 w-4 h-4" />
                        <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase">Official Member</span>
                    </div>
                    <h3 className="text-white font-bold tracking-wider text-sm opacity-90 truncate">{shopName}</h3>
                </div>

                {/* Member Info */}
                <div className="relative z-10 space-y-3">
                    <div>
                        <p className="text-[9px] text-slate-400 font-mono mb-0.5 tracking-wider uppercase">Member Name</p>
                        <p className="text-white font-medium tracking-wide text-base truncate">{customerName}</p>
                    </div>
                    <div>
                        <p className="text-[9px] text-slate-400 font-mono mb-0.5 tracking-wider uppercase">Member ID</p>
                        <p className="text-white font-mono text-xs tracking-widest opacity-80">{memberCode}</p>
                    </div>
                </div>
            </div>

            {/* Right Side: QR Code Area (35%) */}
            <div className="w-[35%] bg-white flex flex-col items-center justify-center p-2 relative">
                {/* Serrated edge effect (dashed line separator) */}
                <div className="absolute left-0 top-2 bottom-2 w-[1px] border-l-2 border-dashed border-slate-200"></div>

                {/* Cutout circles at top and bottom of separator */}
                <div className="absolute -top-3 left-[-12px] w-6 h-6 bg-[#0a0a0a] rounded-full z-20"></div>
                <div className="absolute -bottom-3 left-[-12px] w-6 h-6 bg-[#0a0a0a] rounded-full z-20"></div>

                <div className="w-full aspect-square flex items-center justify-center">
                    <QRDisplay value={memberCode} size={96} showContainer={false} className="w-full h-full" />
                </div>
                <p className="mt-1 text-[9px] text-slate-400 font-bold tracking-widest uppercase [writing-mode:vertical-rl]">SCAN ME</p>
            </div>

            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"></div>
        </div>
    )
}
