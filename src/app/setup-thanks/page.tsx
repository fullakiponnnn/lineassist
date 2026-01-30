import Link from 'next/link';
import { CheckCircle, MessageCircle } from 'lucide-react';

export default function SetupThanksPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-2xl font-bold text-gray-900">
                    お申し込み
                    <br />
                    ありがとうございます！
                </h1>

                <p className="text-gray-600 leading-relaxed">
                    決済が完了いたしました。
                    <br />
                    続いて、導入サポート担当者と
                    <br />
                    LINEで連携を行います。
                </p>

                {/* Instruction Box */}
                <div className="bg-green-50 rounded-xl p-5 border border-green-100 text-left">
                    <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        次のステップ
                    </h3>
                    <p className="text-sm text-green-700 leading-relaxed">
                        以下のボタンから公式LINEを追加し、
                        <br />
                        <span className="font-bold underline">「店舗名」</span>
                        を一言送ってください。
                        <br />
                        担当者が設定を開始します。
                    </p>
                </div>

                {/* Action Button */}
                <a
                    href="https://lin.ee/O3ydcSf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-[#06C755] hover:bg-[#05b34c] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                    LINEでサポート担当とつながる
                </a>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
