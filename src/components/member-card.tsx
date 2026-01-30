'use client'

import React from 'react'
import { Plane, Sparkles, QrCode } from 'lucide-react'
import QRDisplay from '@/components/qr-display'
import { motion } from 'framer-motion'

interface MemberCardProps {
    customerName: string
    memberCode: string
    shopName: string
}

export default function MemberCard({ customerName, memberCode, shopName }: MemberCardProps) {
    return (
        <div className="w-full max-w-[340px] mx-auto min-h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl flex flex-col bg-white ring-1 ring-white/10">

            {/* Top Section: Flight Info Style */}
            <div className="flex-[2] bg-slate-900 relative p-6 flex flex-col justify-between overflow-hidden text-white">

                {/* Holographic/Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black"></div>

                    {/* Moving sheen effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                        animate={{ x: ['-100%', '200%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />

                    {/* Glowing orbs */}
                    <motion.div
                        className="absolute top-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl mix-blend-screen"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl mix-blend-screen"
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ repeat: Infinity, duration: 5 }}
                    />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col h-full gap-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0 pr-2">
                            <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-1">Boarding Pass</p>
                            <h3 className="text-xl font-bold tracking-tight text-white leading-tight break-words">{shopName}</h3>
                        </div>
                        <Plane className="text-white/20 w-8 h-8 rotate-[-45deg] shrink-0" />
                    </div>

                    {/* QR Code Section - Centerpiece */}
                    <div className="flex-1 flex flex-col items-center justify-center py-2">
                        <div className="bg-white p-3 rounded-xl shadow-lg relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="relative bg-white rounded-lg p-1">
                                <QRDisplay value={memberCode} size={160} showContainer={false} />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-cyan-300/80">
                            <Sparkles className="w-3 h-3" />
                            <span className="text-[10px] tracking-widest uppercase font-semibold">Priority Access</span>
                            <Sparkles className="w-3 h-3" />
                        </div>
                    </div>

                    {/* Status Row */}
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                        <div>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">Class</p>
                            <p className="text-lg font-bold">MEMBER</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5">Gate</p>
                            <p className="text-lg font-bold">01</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tear-off Line */}
            <div className="relative flex items-center justify-between w-full h-8 shrink-0 bg-slate-900 overflow-hidden">
                {/* Visual trick: actually using the background color of top/bottom to make it look seamless,
                    but here we need a transitional container */}
                <div className="absolute inset-0 bg-white"></div>
                <div className="absolute inset-x-0 top-0 h-1/2 bg-slate-900"></div>

                <div className="w-6 h-6 rounded-full bg-[#0a0a0a] -ml-3 z-10 relative"></div>
                <div className="flex-1 border-t-2 border-dashed border-slate-300 mx-1 relative z-10 opacity-50"></div>
                <div className="w-6 h-6 rounded-full bg-[#0a0a0a] -mr-3 z-10 relative"></div>
            </div>

            {/* Bottom Section: White Ticket Info */}
            <div className="flex-1 bg-white p-6 flex flex-col justify-center relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

                <div className="space-y-4 relative z-10">
                    <div className="min-w-0">
                        <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">Passenger Name</p>
                        <p className="text-xl font-bold text-slate-900 tracking-tight truncate">{customerName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">Member ID</p>
                            <p className="font-mono text-sm text-slate-700 tracking-widest truncate">{memberCode.slice(0, 8)}</p>
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mb-1">Date</p>
                            <p className="font-mono text-sm text-slate-700">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="h-8 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMiIgaGVpZ2h0PSI1MCIgZmlsbD0iIzMzMyIvPjwvc3ZnPg==')] opacity-30"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
