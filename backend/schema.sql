-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. ENUMS (for cleaner data integrity)
create type user_role as enum ('owner', 'admin', 'trainer', 'receptionist', 'member');
create type subscription_status as enum ('active', 'inactive', 'pending', 'expired', 'cancelled');
create type payment_status as enum ('paid', 'pending', 'failed', 'refunded');
create type payment_method as enum ('stripe', 'razorpay', 'cash', 'pos');
create type attendance_status as enum ('present', 'absent', 'late');

-- 2. GYM / ORGANIZATION (Multi-tenant root)
create table gyms (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. PROFILES (Extends Supabase Auth Users)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  gym_id uuid references gyms(id),
  full_name text,
  email text unique not null,
  phone_number text,
  avatar_url text,
  role user_role default 'member',
  
  -- Member specific fields
  date_of_birth date,
  gender text,
  height_cm numeric,
  weight_kg numeric,
  emergency_contact text,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. BRANCHES (For multi-branch support)
create table branches (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  name text not null,
  address text,
  city text,
  phone text,
  manager_id uuid references profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. MEMBERSHIP PLANS
create table membership_plans (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  name text not null, -- e.g. "Gold Plan", "Starter"
  description text,
  price numeric not null,
  duration_days integer not null, -- 30, 90, 365
  features jsonb, -- List of access features
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. SUBSCRIPTIONS (Memberships assigned to users)
create table subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  plan_id uuid references membership_plans(id) not null,
  branch_id uuid references branches(id), -- Home branch
  start_date date not null,
  end_date date not null,
  status subscription_status default 'active',
  auto_renew boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. ATTENDANCE LOGS
create table attendance (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  branch_id uuid references branches(id) not null,
  check_in_time timestamp with time zone default timezone('utc'::text, now()) not null,
  check_out_time timestamp with time zone,
  method text default 'qr_scan', -- qr, manual, face_id
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. PAYMENTS & INVOICES
create table invoices (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  user_id uuid references profiles(id) not null,
  subscription_id uuid references subscriptions(id),
  amount numeric not null,
  currency text default 'USD',
  status payment_status default 'pending',
  invoice_number text unique,
  due_date date,
  paid_at timestamp with time zone,
  payment_method payment_method,
  stripe_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. TRAINERS & BOOKINGS
create table trainer_schedules (
    id uuid primary key default uuid_generate_v4(),
    trainer_id uuid references profiles(id) not null,
    branch_id uuid references branches(id) not null,
    day_of_week integer, -- 0-6
    start_time time,
    end_time time,
    is_available boolean default true
);

create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) not null,
  trainer_id uuid references profiles(id), -- Optional if class booking
  branch_id uuid references branches(id) not null,
  scheduled_at timestamp with time zone not null,
  status text default 'confirmed', -- confirmed, cancelled, completed
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. INVENTORY
create table inventory (
  id uuid primary key default uuid_generate_v4(),
  branch_id uuid references branches(id) not null,
  item_name text not null,
  category text, -- supplement, equipment, merch
  quantity integer default 0,
  unit_price numeric,
  reorder_level integer default 10,
  last_restock_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- ROW LEVEL SECURITY (RLS) POLICIES
-- NOTE: These are basic policies. In production, you need granular control.

alter table profiles enable row level security;
alter table gyms enable row level security;
alter table branches enable row level security;
alter table subscriptions enable row level security;

-- Profiles: Users can read their own profile. Admins can read all.
create policy "Public profiles are viewable by everyone" on profiles
  for select using (true);

create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

-- Gyms: Publicly viewable (for landing pages/signups)
create policy "Gyms are public" on gyms
  for select using (true);

-- Subscriptions: Users see own, Admins see all
create policy "Users see own subscription" on subscriptions
  for select using (auth.uid() = user_id);

-- TODO: Add 'is_admin' function to auth.users for robust RLS
