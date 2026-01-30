'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { QrCode, Sparkles } from 'lucide-react'
import QRDisplay from '@/components/qr-display'

interface MemberCard3DProps {
    customerName: string
    memberCode: string
    shopName: string
}

export default function MemberCard3D({ customerName, memberCode, shopName }: MemberCard3DProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    // Mouse position state
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    // Smooth spring animation config
    const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

    // Calculate rotation based on mouse position
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

    // Shine effect position
    const shineX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
    const shineY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()

        // Normalize mouse position to -0.5 to 0.5
        const width = rect.width
        const height = rect.height

        const mouseXPos = e.clientX - rect.left
        const mouseYPos = e.clientY - rect.top

        const xPct = mouseXPos / width - 0.5
        const yPct = mouseYPos / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    // Handle device orientation for mobile
    useEffect(() => {
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta === null || e.gamma === null) return

            // Limit tilt range
            const beta = Math.min(Math.max(e.beta, -45), 45) // x-axis (-180 to 180)
            const gamma = Math.min(Math.max(e.gamma, -45), 45) // y-axis (-90 to 90)

            // Normalize to -0.5 to 0.5 range (approximate)
            y.set(beta / 90)
            x.set(gamma / 90)
        }

        // Only add listener if supported and on mobile/tablet likely
        if (typeof window !== 'undefined' && window.DeviceOrientationEvent && 'ontouchstart' in window) {
            // Permission might be required on iOS 13+
            window.addEventListener('deviceorientation', handleOrientation)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('deviceorientation', handleOrientation)
            }
        }
    }, [x, y])

    return (
        <div
            className="perspective-1000 w-full max-w-[360px] mx-auto aspect-[1.586/1] cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={cardRef}
        >
            <motion.div
                className="w-full h-full relative rounded-2xl will-change-transform shadow-2xl"
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Card Background */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden border border-slate-700/50">

                    {/* Decorative Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    {/* Holographic Shine Gradient */}
                    <motion.div
                        className="absolute inset-0 z-10 opacity-30 mix-blend-overlay pointer-events-none"
                        style={{
                            background: useTransform(
                                [mouseX, mouseY],
                                ([x, y]) => {
                                    // Type assertion for x and y as numbers is tricky in array transform, 
                                    // but Framer Motion handles it. We use the spring values directly above for logic.
                                    // Simpler radial gradient for shine:
                                    return `radial-gradient(circle at ${50 + (x as number) * 100}% ${50 + (y as number) * 100}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`
                                }
                            )
                        }}
                    />

                    {/* Rainbow Hologram Effect */}
                    <motion.div
                        className="absolute inset-0 z-10 opacity-20 mix-blend-color-dodge pointer-events-none"
                        style={{
                            background: 'linear-gradient(105deg, transparent 40%, rgba(255, 219, 112, 0.8) 45%, rgba(132, 50, 255, 0.6) 50%, transparent 54%)',
                            backgroundSize: '200% 200%',
                            backgroundPosition: useTransform(mouseX, [-0.5, 0.5], ['100% 0%', '0% 100%'])
                        }}
                    />

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                        {/* Header */}
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.2em] text-cyan-400 uppercase mb-1">Official Member</p>
                                <h3 className="text-white font-bold tracking-wider text-sm opacity-90">{shopName}</h3>
                            </div>
                            <Sparkles className="text-yellow-200/50 w-6 h-6" />
                        </div>

                        {/* Middle (Chip/Logo placeholder) */}
                        <div className="flex items-center gap-4 opacity-80">
                            <div className="w-10 h-7 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 flex items-center justify-center overflow-hidden relative shadow-inner group">
                                <div className="absolute inset-0 border border-black/10 rounded"></div>
                                <div className="w-full h-[1px] bg-black/20 absolute top-1/3"></div>
                                <div className="w-full h-[1px] bg-black/20 absolute bottom-1/3"></div>
                                <div className="h-full w-[1px] bg-black/20 absolute left-1/3"></div>
                                <div className="h-full w-[1px] bg-black/20 absolute right-1/3"></div>
                            </div>
                            <div className="h-6 w-6 rounded-full border border-white/20"></div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-slate-400 font-mono mb-1 tracking-wider">MEMBER NAME</p>
                                <p className="text-white font-medium tracking-wide shadow-black drop-shadow-md text-lg">{customerName}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-3 tracking-widest">{memberCode}</p>
                            </div>

                            <div className="bg-white p-1 rounded-lg shadow-lg">
                                <div className="w-16 h-16">
                                    <QRDisplay value={memberCode} size={64} showContainer={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Thickness/Edge (Pseudo-3D) - Optional touch for depth */}
                <div
                    className="absolute inset-0 rounded-2xl border-2 border-white/5 pointer-events-none z-30"
                    style={{ transform: 'translateZ(1px)' }}
                ></div>

            </motion.div>

            {/* Shadow Reflection */}
            <div className="absolute top-[110%] left-[5%] right-[5%] h-4 bg-black/40 blur-xl rounded-[50%]"></div>
        </div>
    )
}
