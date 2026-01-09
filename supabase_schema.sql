
-- Enable UUID extension if needed
create extension if not exists "uuid-ossp";

-- Table for static content sections (hero, about, contact, etc.)
create table if not exists site_metadata (
  id uuid default uuid_generate_v4() primary key,
  section text not null,
  lang text not null,
  content jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(section, lang)
);

-- Table for Leaders  
create table if not exists leaders (
  id uuid default uuid_generate_v4() primary key,
  lang text not null,
  name text not null,
  role text,
  bio text,
  experience text,
  district text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table for Vision Pillars
create table if not exists vision_pillars (
  id uuid default uuid_generate_v4() primary key,
  lang text not null,
  icon text,
  title text not null,
  description text,
  goals jsonb, -- Storing array of strings as jsonb
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table for Initiatives
create table if not exists initiatives (
  id uuid default uuid_generate_v4() primary key,
  lang text not null,
  title text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);



-- Table for News Items
create table if not exists news_items (
  id uuid default uuid_generate_v4() primary key,
  -- lang text not null, -- Deprecated in favor of unified rows
  date_str text,
  event_date date,
  image_urls text[],
  
  -- Legacy columns (keep for now)
  title text,
  description text,
  lang text, 

  -- New Unified Bilingual Columns
  title_en text,
  description_en text,
  title_ta text,
  description_ta text,

  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table site_metadata enable row level security;
alter table leaders enable row level security;
alter table vision_pillars enable row level security;
alter table initiatives enable row level security;
alter table news_items enable row level security;

-- Create policies to allow public read access
create policy "Allow public read access on site_metadata" on site_metadata for select using (true);
create policy "Allow public read access on leaders" on leaders for select using (true);
create policy "Allow public read access on vision_pillars" on vision_pillars for select using (true);
create policy "Allow public read access on initiatives" on initiatives for select using (true);
create policy "Allow public read access on news_items" on news_items for select using (true);

-- Create policies to allow insert/update for anyone
create policy "Allow anon insert on site_metadata" on site_metadata for insert with check (true);
create policy "Allow anon insert on leaders" on leaders for insert with check (true);
create policy "Allow anon insert on vision_pillars" on vision_pillars for insert with check (true);
create policy "Allow anon insert on initiatives" on initiatives for insert with check (true);

create policy "Allow anon insert on news_items" on news_items for insert with check (true);
create policy "Allow anon update on news_items" on news_items for update using (true);
create policy "Allow anon delete on news_items" on news_items for delete using (true);

-- Table for Membership/Join Requests
create table if not exists membership_requests (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  district text not null,
  address text,
  membership_type text default 'volunteer',
  status text default 'pending', -- pending, reviewed, accepted, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table for Saved ID Cards (Card Holders)
create table if not exists card_holders (
  id uuid default uuid_generate_v4() primary key,
  first_name text not null,
  last_name text not null,
  district text not null,
  membership_type text not null,
  phone text,
  photo_url text,
  membership_id text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table membership_requests enable row level security;
alter table card_holders enable row level security;

-- Create policies for membership_requests
create policy "Allow public insert on membership_requests" on membership_requests for insert with check (true);
create policy "Allow authenticated select on membership_requests" on membership_requests for select using (auth.role() = 'authenticated');
create policy "Allow authenticated update on membership_requests" on membership_requests for update using (auth.role() = 'authenticated');
create policy "Allow authenticated delete on membership_requests" on membership_requests for delete using (auth.role() = 'authenticated');

-- Create policies for card_holders
create policy "Allow public read access on card_holders" on card_holders for select using (true);
create policy "Allow authenticated all on card_holders" on card_holders for all using (auth.role() = 'authenticated');

-- Storage Bucket Notice:
-- Please create a public storage bucket named 'card-media' in Supabase 
-- with a folder named 'member-photos' for storing ID card profile pictures.

-- Force schema reload just in case
NOTIFY pgrst, 'reload schema';
