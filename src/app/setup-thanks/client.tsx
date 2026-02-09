'use client';

import React from 'react';
import QRCode from 'react-qr-code';
import { ExternalLink, Copy, Check } from 'lucide-react';

type Props = {
    userId: string;
};

export default function SetupThanksClient({ userId }: Props) {
    const [copied, setCopied] = React.useState(false);

    // LINE公式アカウントのURL（友達追加用）
    const lineAddFriendUrl = 'https://lin.ee/O3ydcSf';

    // LINE URLスキーム
    // https://line.me/R/oaMessage/{LINE_ID}/?{message}
    // を使いたいが、LINE IDが不明な場合はシンプルに友達追加URLへ誘導する。
    // ここでは、ユニバーサルリンクを使って、メッセージ入力済みの画面を開くことは難しい（IDが必要なため）。
    // 代わりに、IDをコピーさせてからLINEを開くフローにする。

    const handleCopy = () => {
        navigator.clipboard.writeText(userId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Step 1: ID Copy */}
            <div className="bg-white rounded-xl p-4 border border-dashed border-green-200">
                <p className="text-sm font-bold text-gray-600 mb-2">
                    STEP 1. あなたの店舗IDをコピー
                </p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 bg-gray-100 p-3 rounded-lg font-mono text-sm break-all text-gray-700">
                        {userId}
                    </code>
                    <button
                        onClick={handleCopy}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg transition-colors flex flex-col items-center justify-center min-w-[60px]"
                    >
                        {copied ? (
                            <>
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-[10px] font-bold text-green-600">OK</span>
                            </>
                        ) : (
                            <>
                                <Copy className="w-5 h-5" />
                                <span className="text-[10px] font-bold">コピー</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Step 2: LINE Add Friend */}
            <div className="bg-white rounded-xl p-4 border border-dashed border-green-200">
                <p className="text-sm font-bold text-gray-600 mb-4">
                    STEP 2. LINEでIDを送信
                </p>

                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* QR Code (for Desktop) */}
                    <div className="shrink-0 bg-white p-2 rounded-lg border border-gray-100 shadow-sm hidden md:block">
                        <QRCode
                            value={lineAddFriendUrl}
                            size={120}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            viewBox={`0 0 256 256`}
                        />
                        <p className="text-[10px] text-center text-gray-400 mt-1">スマホでスキャン</p>
                    </div>

                    {/* Button (for Mobile/All) */}
                    <div className="flex-1 w-full">
                        <p className="text-xs text-gray-500 mb-3">
                            以下のボタンから公式LINEを追加し、
                            <br />
                            コピーしたIDを貼り付けて送信してください。
                        </p>
                        <a
                            href={lineAddFriendUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            <span className="text-xl font-bold">LINEを開く</span>
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
