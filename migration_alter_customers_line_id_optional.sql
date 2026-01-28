-- customersテーブルのline_user_idカラムのNOT NULL制約を解除する
-- これにより、LINE連携していない顧客も登録できるようになります

alter table customers alter column line_user_id drop not null;
