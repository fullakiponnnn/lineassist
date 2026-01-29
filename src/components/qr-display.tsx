'use client'

import { QRCodeSVG } from 'qrcode.react'

export default function QRDisplay({ value }: { value: string }) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
            <QRCodeSVG value={value} size={200} level="H" includeMargin={true} />
        </div>
    )
}
