export default function TokushoPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 text-slate-800 leading-relaxed bg-white">
            <h1 className="text-3xl font-bold mb-8 text-center">特定商取引法に基づく表記</h1>

            <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                                販売業者
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                SwaBlackn Logic
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                代表責任者
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                [代表者名] ※別途お問い合わせにより遅滞なく開示いたします。
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                所在地
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                [所在地] ※別途お問い合わせにより遅滞なく開示いたします。
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                電話番号
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                [電話番号] ※別途お問い合わせにより遅滞なく開示いたします。
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                メールアドレス
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                anke.akfe@gmail.com
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                販売価格
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                プラン案内ページに記載の通り
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                商品代金以外の必要料金
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                インターネット接続料金、通信料金等はお客様の負担となります。
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                支払方法
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                クレジットカード決済
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                支払時期
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                初回申込時、及び翌月以降毎月（または毎年）の自動更新時
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                商品の引渡時期
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                決済完了後、直ちにご利用いただけます。
                            </td>
                        </tr>
                        <tr>
                            <th className="px-6 py-4 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                返品・キャンセルについて
                            </th>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                本サービスの性質上、返品はお受けできません。<br />
                                解約はサービス内の設定画面よりいつでも行っていただけます。<br />
                                中途解約による返金は行いません。
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
