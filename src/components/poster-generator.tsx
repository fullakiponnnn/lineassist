'use client';

import React, { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
import { Download, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import html2canvas from 'html2canvas';

type Props = {
    shopName: string;
    lineId: string; // @xxxx
};

export default function PosterGenerator({ shopName, lineId }: Props) {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState<number>(0);

    // LINE Add Friend URL
    // https://line.me/R/ti/p/{LINE_ID_WITHOUT_AT}
    // Note: lineId includes '@', so remove it.
    const cleanLineId = lineId.replace('@', '');
    const lineUrl = `https://line.me/R/ti/p/%40${cleanLineId}`;

    const designs = [
        { name: 'Simple & Clean', color: 'bg-white', textColor: 'text-slate-900' },
        { name: 'Elegant Dark', color: 'bg-slate-900', textColor: 'text-white' },
        { name: 'Warm Salon', color: 'bg-[#fdfbf7]', textColor: 'text-[#4a4a4a]' },
    ];

    const posterRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!posterRef.current) return;

        setIsGenerating(true);
        try {
            const canvas = await html2canvas(posterRef.current, {
                scale: 2, // High resolution
                useCORS: true,
                backgroundColor: null,
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = `line-poster-${shopName}-${designs[selectedDesign].name}.png`;
            link.click();
        } catch (err) {
            console.error('Failed to generate poster:', err);
            alert('画像の生成に失敗しました。');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    店舗掲示用ポスター作成
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                    お客様にLINE連携を案内するためのポスターをダウンロードできます。印刷して店内に掲示したり、タブレットで表示してご活用ください。
                </p>

                {/* Design Selector */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {designs.map((design, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedDesign(index)}
                            className={`p-2 rounded-lg border-2 text-xs font-bold transition-all ${selectedDesign === index
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-transparent bg-slate-100 text-slate-500 hover:bg-slate-200'
                                }`}
                        >
                            {design.name}
                        </button>
                    ))}
                </div>

                {/* Preview Area (Hidden overflow strictly for preview, but we need full render for capture) */}
                <div className="flex justify-center mb-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="scale-[0.4] origin-top transform-gpu" style={{ height: '300px' }}> {/* Scaling down for preview */}
                        {/* Actual Poster Content */}
                        <div
                            ref={posterRef}
                            className={`w-[595px] h-[842px] relative flex flex-col items-center justify-between p-16 text-center shadow-2xl ${designs[selectedDesign].color} ${designs[selectedDesign].textColor}`}
                            style={{ fontFamily: 'sans-serif' }}
                        >
                            {/* Header */}
                            <div className="space-y-4">
                                <p className="text-2xl font-bold opacity-70 tracking-widest uppercase">Official LINE</p>
                                <h1 className="text-5xl font-extrabold tracking-tight">{shopName}</h1>
                                <div className="w-20 h-1 bg-[#06C755] mx-auto mt-6"></div>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-8">
                                <p className="text-3xl font-bold leading-relaxed">
                                    来店記録・スタイル写真を<br />
                                    LINEでお届けします
                                </p>

                                <div className="bg-white p-6 rounded-3xl shadow-xl inline-block">
                                    <QRCode
                                        value={lineUrl}
                                        size={280}
                                        style={{ height: "auto", maxWidth: "100%", width: "280px" }}
                                        viewBox={`0 0 256 256`}
                                    />
                                </div>
                                <p className="text-xl font-bold flex items-center justify-center gap-2">
                                    <span className="bg-[#06C755] text-white px-3 py-1 rounded-full text-sm">ID</span>
                                    {lineId}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center gap-4 text-left border-2 border-[#06C755] p-6 rounded-2xl mx-8">
                                    <div className="bg-[#06C755] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shrink-0">1</div>
                                    <div>
                                        <p className="font-bold text-xl">QRコードをスキャン</p>
                                        <p className="text-sm opacity-80">またはID検索で友だち追加</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-4 text-left border-2 border-[#06C755] p-6 rounded-2xl mx-8">
                                    <div className="bg-[#06C755] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shrink-0">2</div>
                                    <div>
                                        <p className="font-bold text-xl">連携用QRを提示</p>
                                        <p className="text-sm opacity-80">スタッフが提示するコードを読み取って連携完了！</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                    {isGenerating ? <Loader2 className="animate-spin" /> : <Download className="w-5 h-5" />}
                    ポスターをダウンロード (A4サイズ)
                </button>
            </div>
        </div>
    );
}
