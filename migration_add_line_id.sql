-- profilesテーブルにLINE公式アカウントのID (Basic ID / Premium ID) を追加
-- これを使って友だち追加URLやQRコードを生成します

alter table profiles 
add column line_basic_id text;

-- 既存のRLSポリシーはそのまま適用されます
