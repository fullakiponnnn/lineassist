# LineAssist

美容室向けLINE自動連携CRM (Customer Relationship Management) アプリケーション。
スマホで施術写真を撮影し、LINEでお礼メッセージを自動送信。リピート率向上と業務効率化を支援します。

## 🚀 主な機能

### 1. 来店記録・自動メッセージ送信
- 施術写真を撮影・アップロードしてクラウドに保存。
- 保存と同時に、**お客様のLINEへ自動でお礼メッセージと写真を送信**。
- 過去の来店履歴と写真をギャラリー形式で閲覧可能。

### 2. スマートなLINE連携
- 店頭用「連携ガイド」画面をワンクリックで表示。
- 顧客はQRコードを読み取り、名前を送るだけでシステムと自動連携。
- 難しい操作不要で、Lステップのようなスムーズな導入を実現。

### 3. 顧客管理
- 顧客一覧・検索・詳細表示。
- LINE連携ステータスの可視化。
- 顧客データの削除機能。

### 4. 自動リマインド（Cron連携）
- 最終来店から一定期間経過した顧客へ、自動で再来店のきっかけ作りメッセージを送信（要Cron設定）。

## 🛠 セットアップ手順

### 1. 環境変数の設定
`.env.local` を作成し、SupabaseのURLとキーを設定してください。
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 2. データベースの準備
SupabaseのSQLエディタで以下の順番にSQLを実行してください。
1. `schema.sql`: テーブル定義とRLSポリシー
2. `storage_policies.sql`: 画像保存用のバケット設定
3. `migration_add_line_id.sql`: プロフィール拡張
4. `migration_alter_customers_line_id_optional.sql`: 顧客テーブル制約緩和

### 3. アプリケーションの起動
```bash
npm install
npm run dev
```

### 4. LINEとの接続設定
1. アプリにログインし、右上の「設定」アイコンをクリック。
2. **LINE Developers** で取得した以下の情報を入力して保存。
   - LINE ID (Basic ID / Premium ID)
   - チャネルアクセストークン (長期)
3. 設定画面に表示される **Webhook URL** をコピーし、LINE Developersの「Messaging API設定」に貼り付け、「利用する」をONにする。
4. LINE Official Account Managerで「応答メッセージ」をオフ、「Webhook」をオンにする。

## 📱 運用フロー

1. **来店・連携**: タブレットで「連携ガイド」を表示し、お客様に登録していただく。
2. **施術**: 通常通りサービスを提供。
3. **退店時**: 「写真撮影」から写真を撮り、保存。自動でお礼LINEが送信されるので、その場でお客様と確認して感動体験を提供。

## 📦 技術スタック
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **UI**: TailwindCSS, Lucide React
- **Integration**: LINE Messaging API
- **Deployment**: Vercel (Recommended)dd

