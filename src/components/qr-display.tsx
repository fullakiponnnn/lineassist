
import { QRCodeSVG } from 'qrcode.react'

interface QRDisplayProps {
    value: string
    size?: number
    className?: string
    showContainer?: boolean
}

export default function QRDisplay({ value, size = 200, className = '', showContainer = true }: QRDisplayProps) {
    const qrCode = <QRCodeSVG value={value} size={size} level="H" includeMargin={true} />

    if (!showContainer) {
        return <div className={className}>{qrCode}</div>
    }

    return (
        <div className={`bg-white p-4 rounded-xl shadow-sm inline-block ${className}`}>
            {qrCode}
        </div>
    )
}
