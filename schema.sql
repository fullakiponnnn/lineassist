-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. profiles (店舗情報)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  line_channel_token text, -- アプリケーション側で暗号化して保存、またはSupabase Vaultを使用することを推奨
  shop_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for profiles
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

create policy "Users can insert own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- 2. customers (顧客)
create table customers (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  line_user_id text not null,
  display_name text,
  last_visit_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for customers
alter table customers enable row level security;

create policy "Users can view own customers"
  on customers for select
  using ( profile_id = auth.uid() );

create policy "Users can insert own customers"
  on customers for insert
  with check ( profile_id = auth.uid() );

create policy "Users can update own customers"
  on customers for update
  using ( profile_id = auth.uid() );

create policy "Users can delete own customers"
  on customers for delete
  using ( profile_id = auth.uid() );

-- 3. visits (来店記録)
create table visits (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references customers(id) on delete cascade not null,
  visit_date timestamp with time zone not null,
  photo_url text,
  menu_tags text[] default '{}',
  reminder_sent boolean default false,
  reminder_scheduled_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for visits
alter table visits enable row level security;

create policy "Users can view visits of own customers"
  on visits for select
  using (
    exists (
      select 1 from customers
      where customers.id = visits.customer_id
      and customers.profile_id = auth.uid()
    )
  );

create policy "Users can insert visits for own customers"
  on visits for insert
  with check (
    exists (
      select 1 from customers
      where customers.id = visits.customer_id
      and customers.profile_id = auth.uid()
    )
  );

create policy "Users can update visits of own customers"
  on visits for update
  using (
    exists (
      select 1 from customers
      where customers.id = visits.customer_id
      and customers.profile_id = auth.uid()
    )
  );

create policy "Users can delete visits of own customers"
  on visits for delete
  using (
    exists (
      select 1 from customers
      where customers.id = visits.customer_id
      and customers.profile_id = auth.uid()
    )
  );

-- Indexes for performance
create index customers_profile_id_idx on customers(profile_id);
create index visits_customer_id_idx on visits(customer_id);
