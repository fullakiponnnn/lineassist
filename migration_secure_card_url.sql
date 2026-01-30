-- Add url_token to customers for secure card access
-- Default to gen_random_uuid() so existing rows get a value immediately
alter table customers add column url_token uuid default gen_random_uuid() not null unique;

-- Add index for fast lookup
create index customers_url_token_idx on customers(url_token);
