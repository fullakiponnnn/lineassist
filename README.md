# SnapKarte (スナップカルテ) v2.0

**個人美容師・フリーランスのための、LINE連携・自動追客CRM。**
事務作業をゼロにし、顧客満足度とリピート率を劇的に向上させます。

![SnapKarte Poster](https://placehold.co/1200x630/06C755/white?text=SnapKarte+v2.0)

## 💎 コンセプト
**「撮るだけ、終わる。」**
施術後にスタイル写真を撮るだけで、クラウドへの保存、カルテ作成、そしてお客様へのサンクスLINE送信までが全自動で完了します。
もう営業後に残ってメッセージを送ったり、紙のカルテを探し回る必要はありません。

## 🚀 主な機能 (v2.0 New!)

### 1. 📸 瞬間カルテ作成 & 自動LINE送信
- **写真クラウド保存**: 施術写真を容量無制限（Proプラン）で安全にクラウド保存。
- **自動サンクスLINE**: 写真をアップロードした瞬間、お客様のLINEへ「本日のスタイル写真」として自動送信。
- **Signed URL (セキュリティ)**: 送信される写真は時限付きURLで保護され、プライバシー万全。

### 2. 🎫 プレミアム会員証 (Boarding Pass UI)
- **航空券デザイン**: 持っているだけで嬉しくなる、縦型フライトチケット風のデジタル会員証。
- **偽造防止アニメーション**: ホログラムや動的背景により、スクリーンショットではない「生きた」会員証を演出。
- **Walletレス**: LINEのリッチメニューからいつでも0秒で表示可能（要Lステップ等のリッチメニュー設定、またはリンク設定）。

### 3. 🛡️ セキュアなQR連携 (Security First)
- **トークンベース認証**: 従来の名前検索を廃止し、ワンタイムトークンを用いた銀行レベルのセキュアな紐付けを実現。
- **専用QRコード**: スタッフ用端末で発行したQRコードをお客様が読み取るだけで、誤登録ゼロで確実に連携完了。

### 4. 📱 スマートQR受付
- **専用スキャナーアプリ内蔵**: WEBアプリ内にQRコードリーダーを搭載。
- **瞬時に顧客呼び出し**: 来店時、お客様の会員証をスキャンするだけでカルテを即座に表示。

### 5. 💰 サブスクリプション決済 (Stripe)
- **プラン管理**: Free / Solo / Pro のプラン体系に対応。
- **自動継続課金**: Stripe Checkout / Customer Portal と完全統合し、契約管理を自動化。

---

## 🛠 技術スタック
フルスタックかつモダンな構成で、高速・堅牢・スケーラブルな設計です。

- **Framework**: Next.js 15 (App Router / Server Actions)
- **Database**: Supabase (PostgreSQL / Auth / Storage / Realtime)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4, Lucide React, Framer Motion
- **Payment**: Stripe API
- **Integration**: LINE Messaging API
- **Infrastructure**: Vercel (Recommended)

---

## 📦 セットアップ・導入
詳細な導入手順は [USER_MANUAL.md](./USER_MANUAL.md) をご覧ください。

### 環境変数の準備 (.env.local)
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# LINE Messaging API
LINE_CHANNEL_ACCESS_TOKEN=...
LINE_CHANNEL_SECRET=...

# Stripe
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=...
# Stripe Price IDs (Product Catalog)
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_MONTHLY=...
NEXT_PUBLIC_STRIPE_PRICE_ID_SOLO_YEARLY=...
...
```


## 💰 料金プラン

個人美容師・フリーランスの方に最適なプランをご用意しています。

| 機能 | **Free** (無料) | **Solo** (2,980円/月) | **Standard** (Coming Soon) |
| :--- | :---: | :---: | :---: |
| **初期費用** | ¥0 | **¥0** | ¥0 |
| **顧客登録数** | 10名まで | **無制限** | 無制限 |
| **写真保存** | 直近30日分 | **無制限** (クラウド永久保存) | 無制限 |
| **LINE自動連携** | 〇 | **〇** | 〇 |
| **自動サンクスLINE** | 〇 | **〇** | 〇 |
| **自動追客 (リマインド)** | × | **〇** | 〇 |
| **売上・分析レポート** | × | × | 〇 |

※ **2ヶ月分無料の実質2,483円/月** で利用できるお得な年額プランもご用意しています。

---

## 🗺 ロードマップ (今後の予定)

### 2026 Q1
- [x] **v2.0 リリース**: 新会員証UI、QRス受付、Stripe決済統合
- [ ] **Lステップ連携強化**: リッチメニューからのワンタップ会員証表示スクリプト配布
- [ ] **自動追客の高度化**: 「3ヶ月来店がないお客様」への自動クーポン配信機能

### 2026 Q2
- [ ] **Googleビジネスプロフィール連携**: 来店後のサンクスLINEで、自動的にGoogleマップの口コミ投稿を依頼する機能
- [ ] **予約システム連携**: ホットペッパービューティー等のiCal連携による予約一元管理
- [ ] **Standardプラン開始**: 複数スタッフ対応、売上分析ダッシュボードの実装

---

## 📜 ライセンス
This project is proprietary.
