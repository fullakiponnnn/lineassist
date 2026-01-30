# SnapKarte (スナップカルテ) v2.0 - 導入・運用マニュアル

このマニュアルでは、SnapKarteのシステムのセットアップから、日々の営業での利用方法までを解説します。

---

## 📑 目次
1. [初期セットアップ（システム管理者向け）](#1-初期セットアップシステム管理者向け)
2. [LINE公式アカウントの設定](#2-line公式アカウントの設定)
3. [Stripe（決済）の設定](#3-stripe決済の設定)
4. [アプリの初期設定とプラン契約](#4-アプリの初期設定とプラン契約)
5. [現場での運用フロー（スタッフ向け）](#5-現場での運用フロースタッフ向け)
   - [新規のお客様の登録・連携](#新規のお客様の登録連携)
   - [来店受付（QRスキャン）](#来店受付qrスキャン)
   - [施術後の記録・送信](#施術後の記録送信)

---

## 1. 初期セットアップ（システム管理者向け）

### 必要要件
- Node.js v18以上
- Supabase アカウント
- Vercel アカウント（推奨）
- LINE Developers アカウント
- Stripe アカウント

### インストール
リポジトリをクローンし、依存パッケージをインストールします。
```bash
git clone <repository-url>
cd lineassist
npm install
```

### 環境変数の設定
`.env.local` ファイルを作成し、以下の変数を設定します。
（※各サービスのAPIキー取得方法は後述）

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh... (Admin操作用)

# App URL (本番環境のURL)
NEXT_PUBLIC_SITE_URL=https://www.snapkarte.jp

# LINE Messaging API
LINE_CHANNEL_ACCESS_TOKEN= (初期値は空でOK、アプリ画面から設定可)
LINE_CHANNEL_SECRET= (初期値は空でOK、アプリ画面から設定可)

# Stripe (決済機能を利用する場合)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe Price IDs (管理画面で作成したProductのID)
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY=price_...
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY=price_...
# ...他プラン
```

### データベース構築
SupabaseのSQLエディタで、`schema.sql` および `migration_*.sql` ファイルを順に実行し、テーブルを作成してください。

---

## 2. LINE公式アカウントの設定

LINE連携を行うための必須設定です。

1. **[LINE Developers](https://developers.line.biz/)** にログインし、プロバイダーとチャネル（Messaging API）を作成します。
2. **「Messaging API設定」** タブに進みます。
3. **Webhook URL** を設定します。
   - `https://[あなたのアプリURL]/api/webhook/line`
   - ※ 設定後、「Webhookの利用」を必ず **ON** にしてください。
4. **チャネルアクセストークン（長期）** を発行します。
   - 発行ボタンを押し、表示されたトークンを控えてください。アプリの設定画面で入力します。
5. **[LINE Official Account Manager](https://manager.line.biz/)** で応答設定を変更します。
   - 応答メッセージ: **オフ**
   - Webhook: **オン**

---

## 3. Stripe（決済）の設定

有料プラン（Solo / Standard）を提供する場合の設定です。

1. **[Stripe Dashboard](https://dashboard.stripe.com/)** でアカウントを作成します。
2. **商品 (Products)** を作成します。
   - 例: "SnapKarte Solo Plan"
   - 料金: 月額料金と年額料金の2つの「価格」を作成します。
   - 作成した価格のAPI ID (`price_xxxx`) を環境変数に設定します。
3. **Webhook** を設定します。
   - 開発者 > Webhook からエンドポイントを追加。
   - URL: `https://[あなたのアプリURL]/api/webhook/stripe`
   - イベント受信: `customer.subscription.created`, `invoice.payment_succeeded` 等を選択。

---

## 4. アプリの初期設定とプラン契約

1. アプリ (`/login`) にアクセスし、新規アカウントを作成します。
2. ログイン後、自動的にオンボーディング画面（または設定画面）へ移動します。
3. **店舗情報** と **LINE連携情報** を入力します。
   - ここで、STEP 2で取得した「チャネルアクセストークン」と「Basic ID」を入力し保存します。
4. **プラン選択**（任意）
   - 設定画面の「ご利用プラン」セクションで、「アップグレードする」を選択し、Stripe決済を行います。
   - テスト環境の場合は、Stripeのテストカード番号（4242...）を使用できます。

---

## 5. 現場での運用フロー（スタッフ向け）

### 🔰 新規のお客様の登録・連携

**重要**: SnapKarte v2.0では、セキュリティ強化のため **専用QRコード** による連携のみをサポートしています。（古い名前検索方式は廃止されました）

1. **お客様への案内**: 「LINEで会員証と写真をお送りしますので、登録をお願いします」と伝えます。
2. **連携用QRの表示**:
   - アプリの顧客詳細画面を開き、「LINE連携」ボタン（またはQRアイコン）をタップします。
   - ※ 新規顧客の場合は、まず「顧客登録」を行い、詳細画面へ進んでください。
3. **スキャン & 追加**:
   - お客様のスマホでQRコードを読み取ってもらいます。
   - LINEが起動し、自動入力された認証トークンを送信すると、即座に連携が完了します。
4. **自動挨拶**:
   - 連携と同時に、お客様のLINEへ「会員登録完了」のメッセージが届きます。

### 🛎 来店受付（QRスキャン）

リピーターのお客様が来店された場合の受付フローです。

1. **アプリでスキャナー起動**: 下部メニューの「受付 (QRアイコン)」をタップします。
2. **会員証をスキャン**: カメラが起動するので、お客様のLINE会員証QRコードを読み取ります。
3. **カルテ表示**: 一瞬でそのお客様のカルテ画面が開き、過去の履歴やメモを確認できます。

### 📸 施術後の記録・送信

1. **写真撮影**:
   - 顧客詳細画面、または下部メニュー中央の「記録」ボタンをタップします。
   - カメラで施術後のスタイル写真を撮影（またはライブラリから選択）します。
2. **アップロード**:
   - メニュータグ（カット, カラー等）を入力し、写真を保存します。
3. **自動送信完了**:
   - 保存された写真は、**お客様のLINEへ自動的に送信** されます。
   - お客様はその場ですぐに写真を確認・保存でき、満足度が向上します。

---

## ❓ よくある質問

**Q. 画像が表示されません（署名付きURLエラー）**
A. 画像URLはセキュリティのため1時間で失効します。画面をリロードすると新しいURLが発行され、再び表示されます。

**Q. LINE連携がうまくいきません**
A. LINE公式アカウントのWebhook設定がONになっているか、チャネルアクセストークンが正しいか（再発行されていないか）を確認してください。

**Q. 会員証のデザインが崩れます**
A. v2.0より縦型の航空券デザインに変更されました。最新のバージョンをご利用ください。
