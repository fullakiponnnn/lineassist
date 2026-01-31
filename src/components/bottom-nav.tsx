'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, QrCode, PlusCircle, Book } from 'lucide-react'

export default function BottomNav() {
    const pathname = usePathname()

    // Check if we should show the nav
    // Hide on login, onboarding, card, LP, and specific modal pages like new visit
    if (
        pathname === '/login' ||
        pathname === '/onboarding' ||
        pathname.startsWith('/card/') ||
        pathname.startsWith('/lp') ||
        pathname === '/visits/new' || // Hide on camera/upload page to give full screen space
        pathname === '/scan' // Hide on immersive scanner page
    ) {
        return null
    }

    const isActive = (path: string) => {
        if (path === '/' && pathname === '/') return true
        if (path !== '/' && pathname.startsWith(path)) return true
        return false
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border pb-safe">
            <nav className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
                <Link
                    href="/"
                    className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive('/') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Home className="w-6 h-6" />
                    <span className="text-[10px] font-medium">ホーム</span>
                </Link>

                <Link
                    href="/customers"
                    className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive('/customers') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Users className="w-6 h-6" />
                    <span className="text-[10px] font-medium">顧客</span>
                </Link>

                {/* Center FAB-like Button for New Visit */}
                <Link
                    href="/visits/new"
                    className="flex flex-col items-center justify-center -mt-6"
                >
                    <div className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition-transform">
                        <PlusCircle className="w-8 h-8" />
                    </div>
                    <span className="text-[10px] font-medium mt-1 text-primary">記録</span>
                </Link>

                <Link
                    href="/scan"
                    className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive('/scan') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <QrCode className="w-6 h-6" />
                    <span className="text-[10px] font-medium">受付</span>
                </Link>

                <Link
                    href="/guide"
                    className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${isActive('/guide') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    <Book className="w-6 h-6" />
                    <span className="text-[10px] font-medium">使い方</span>
                </Link>
            </nav>
        </div>
    )
}
