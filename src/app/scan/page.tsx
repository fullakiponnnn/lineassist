'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scanner } from '@yudiel/react-qr-scanner'
import { X, Loader2, User, CheckCircle2, Scan } from 'lucide-react'
import Link from 'next/link'
import { findCustomerByMemberCode } from './actions'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScanPage() {
    const router = useRouter()
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [scannedCustomer, setScannedCustomer] = useState<{ id: string, name: string } | null>(null)

    const handleScan = async (result: any) => {
        if (isProcessing || scannedCustomer) return

        // @yudiel/react-qr-scanner v2
        const rawValue = result?.[0]?.rawValue
        if (!rawValue) return

        setIsProcessing(true)
        setError(null)

        // Haptic feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50)
        }

        try {
            const { customerId, displayName, error: apiError } = await findCustomerByMemberCode(rawValue)

            if (customerId) {
                // Determine 'name' explicitly, handling potential null from API
                const name = displayName || 'ゲスト'
                setScannedCustomer({ id: customerId, name })

                // Success feedback vibration
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([50, 50, 50])
                }
            } else {
                setError(apiError || '読み取れませんでした')

                // Error feedback
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                    navigator.vibrate([200])
                }

                // Allow retry after delay
                setTimeout(() => setIsProcessing(false), 2000)
            }
        } catch (e) {
            setError('エラーが発生しました')
            setTimeout(() => setIsProcessing(false), 2000)
        }
    }

    const handleConfirm = () => {
        if (scannedCustomer) {
            router.push(`/customers/${scannedCustomer.id}`)
        }
    }

    const handleCancel = () => {
        setScannedCustomer(null)
        setIsProcessing(false)
        setError(null)
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <div className="p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                    <Scan className="w-5 h-5 text-blue-400" />
                    <h1 className="text-lg font-bold tracking-wide">SCANNER</h1>
                </div>
                <Link href="/" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm">
                    <X className="w-5 h-5" />
                </Link>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative px-4">

                {/* Scanner Container */}
                <div className="w-full max-w-sm aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
                    {!scannedCustomer && !error && (
                        <div className="absolute inset-0 z-0">
                            <Scanner
                                onScan={handleScan}
                                onError={(error) => console.error(error)}
                                styles={{
                                    container: { width: '100%', height: '100%' },
                                    video: { objectFit: 'cover' }
                                }}
                                components={{
                                    onOff: false,
                                    torch: false,
                                    zoom: false,
                                    finder: false // Custom finder
                                }}
                            />
                        </div>
                    )}

                    {/* Scanning Animation / Overlay */}
                    {!scannedCustomer && !error && (
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Scanning Line */}
                            <motion.div
                                className="absolute left-0 right-0 h-0.5 bg-blue-400/80 shadow-[0_0_15px_rgba(96,165,250,0.8)]"
                                animate={{ top: ['10%', '90%', '10%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Corner Markers */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
                        </div>
                    )}

                    {/* Processing State */}
                    {isProcessing && !scannedCustomer && !error && (
                        <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                            <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
                            <p className="text-sm font-medium tracking-widest uppercase text-blue-200">Processing</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="absolute inset-0 z-20 bg-red-900/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in">
                            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                                <X className="w-6 h-6 text-red-200" />
                            </div>
                            <p className="font-bold text-red-100 text-lg mb-1">Scan Failed</p>
                            <p className="text-red-200/80 text-sm">{error}</p>
                        </div>
                    )}
                </div>

                {/* Instructions */}
                <div className="mt-8 text-center h-12">
                    {!isProcessing && !scannedCustomer && (
                        <p className="text-slate-400 text-sm animate-pulse">
                            会員証QRコードを枠内に合わせてください
                        </p>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            <AnimatePresence>
                {scannedCustomer && (
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        className="absolute bottom-0 left-0 w-full z-50 p-4"
                    >
                        <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-6 shadow-2xl safe-area-bottom">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400 ring-1 ring-blue-500/20">
                                    <User className="w-8 h-8" />
                                </div>
                                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Member Found</p>
                                <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-6">
                                    {scannedCustomer.name} <span className="text-sm text-slate-500 font-normal">様</span>
                                </h2>

                                <div className="flex w-full gap-3">
                                    <button
                                        onClick={handleCancel}
                                        className="flex-1 py-3.5 px-4 rounded-xl font-medium text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        onClick={handleConfirm}
                                        className="flex-1 py-3.5 px-4 rounded-xl font-bold text-black bg-white hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle2 className="w-5 h-5" />
                                        開く
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for modal */}
            {scannedCustomer && (
                <div className="absolute inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={handleCancel}></div>
            )}
        </div>
    )
}
