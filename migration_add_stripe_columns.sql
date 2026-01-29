-- Stripe関連のカラムをprofilesテーブルに追加
alter table profiles add column stripe_customer_id text;
alter table profiles add column stripe_subscription_id text;
alter table profiles add column subscription_status text default 'free'; -- 'active', 'past_due', 'canceled', 'free'
alter table profiles add column plan_tier text default 'free'; -- 'free', 'solo', 'standard'
alter table profiles add column plan_interval text default 'month'; -- 'month', 'year'
alter table profiles add column current_period_end timestamp with time zone;

-- インデックスの追加（検索パフォーマンス用）
create index profiles_stripe_customer_id_idx on profiles(stripe_customer_id);
create index profiles_stripe_subscription_id_idx on profiles(stripe_subscription_id);
