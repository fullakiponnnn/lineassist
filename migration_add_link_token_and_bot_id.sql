-- Add bot_basic_id to profiles for generating LINE URL schemes
alter table profiles add column bot_basic_id text;

-- Add link_token to customers for secure line integration
alter table customers add column link_token text unique;
