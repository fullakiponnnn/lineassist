-- setup関連のカラムをprofilesテーブルに追加
alter table profiles add column is_setup_purchased boolean default false;
alter table profiles add column setup_status text check (setup_status in ('pending', 'in_progress', 'completed')) default 'pending';

-- 既存のデータに対するデフォルト設定（必要に応じて）
update profiles set is_setup_purchased = false where is_setup_purchased is null;
update profiles set setup_status = 'pending' where setup_status is null;
