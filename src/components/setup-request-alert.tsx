'use client';

import { useState } from 'react';
import { MessageCircleQuestion, ExternalLink, Copy, Check } from 'lucide-react';

type Props = {
    profileId: string;
};

export default function SetupRequestAlert({ profileId }: Props) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(profileId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4 w-full sm:w-auto">
                <div className="bg-amber-100 p-3 rounded-full shrink-0 ring-4 ring-amber-50 animate-pulse">
                    <MessageCircleQuestion className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                        初期設定サポート進行中
                        <span className="bg-amber-200 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">要対応</span>
                    </h3>
                    <p className="text-xs text-amber-700 mt-1 mb-3 leading-relaxed">
                        LINEで店舗IDを送信してください。
                        <br className="hidden sm:block" />
                        これが完了すると担当者が設定を開始します。
                    </p>
                    <div className="flex items-center gap-2 bg-white/50 p-1 rounded-lg border border-amber-200/50 backdrop-blur-sm w-full sm:w-auto max-w-full">
                        <code className="bg-transparent px-2 py-1 text-xs font-mono text-amber-800 break-all select-all flex-1 min-w-0 overflow-hidden truncate">
                            {profileId}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="bg-white hover:bg-amber-50 ring-1 ring-amber-200 px-3 py-1.5 rounded-md text-[10px] font-bold text-amber-900 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                            aria-label="Copy Profile ID"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3 h-3 text-emerald-600" />
                                    <span className="text-emerald-600">OK</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3 text-amber-600" />
                                    <span>コピー</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <a
                href="https://lin.ee/O3ydcSf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center whitespace-nowrap bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 transform active:scale-95 group"
            >
                <span className="font-bold relative">
                    LINE送信
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                </span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
        </div>
    );
}
