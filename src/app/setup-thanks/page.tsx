import Link from 'next/link';
import { CheckCircle, MessageCircle } from 'lucide-react';
import SetupThanksClient from './client';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function SetupThanksPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 pb-24">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-8">
                {/* Success Icon */}
                <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full ring-8 ring-green-50 animate-pulse">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                        お申し込み完了！
                    </h1>
                    <p className="text-sm text-gray-500">
                        初期設定サポートのご購入ありがとうございます。
                    </p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                    <h3 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        次のステップ（重要）
                    </h3>
                    <p className="text-xs text-amber-700 leading-relaxed">
                        サポートを開始するため、以下の手順で
                        <br />
                        <span className="font-bold underline decoration-amber-500/50">あなたの店舗ID</span>
                        をLINEでお送りください。
                    </p>
                </div>

                {/* Client Component for Interactive Elements */}
                <SetupThanksClient userId={user.id} />

                <div className="pt-4 border-t border-gray-100">
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1"
                    >
                        トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
