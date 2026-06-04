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


-- ===================================================================
-- 11. DYNAMIC FEATURE EXTENSIONS
-- Added so the UI (landing page, admin dashboard, member app) can be
-- fully data-driven. Grouped by the screen/feature each set powers.
-- ===================================================================

-- 11.0 Additional ENUMs
create type lead_source as enum ('social', 'web', 'walk_in', 'referral', 'phone');
create type lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
create type transaction_type as enum ('income', 'expense');
create type trainer_status as enum ('available', 'in_session', 'on_leave', 'off_duty');
create type session_status as enum ('scheduled', 'in_progress', 'completed', 'cancelled');
create type enrollment_status as enum ('booked', 'attended', 'no_show', 'cancelled');
create type notification_type as enum ('signup', 'payment', 'inventory', 'system', 'class', 'report');
create type goal_type as enum ('weight_loss', 'weight_gain', 'muscle_gain', 'endurance', 'maintenance');

-- 11.1 EXISTING TABLE EXTENSIONS ----------------------------------

-- Marketing / pricing flags used by the public pricing cards
alter table membership_plans add column if not exists tier text;                       -- starter | pro | elite
alter table membership_plans add column if not exists billing_interval text default 'monthly';
alter table membership_plans add column if not exists is_popular boolean default false; -- "Most Popular" badge

-- Richer inventory fields used by the inventory dashboard
alter table inventory add column if not exists sku text;
alter table inventory add column if not exists image_url text;
alter table inventory add column if not exists supplier text;
alter table inventory add column if not exists status text; -- in_stock | low_stock | out_of_stock (denormalized for fast filtering)

-- 11.2 LEADS (CRM funnel: Ingest -> Process -> Convert) ------------
create table leads (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  branch_id uuid references branches(id),
  full_name text not null,
  email text,
  phone text,
  source lead_source default 'web',
  status lead_status default 'new',
  assigned_to uuid references profiles(id),         -- staff handling the lead
  converted_member_id uuid references profiles(id), -- set when the lead becomes a member
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11.3 FINANCIAL LEDGER (Finance page: income + expenses) ---------
-- invoices already covers member billing; this is the full gym ledger
-- (payroll, equipment purchases, retail / pro-shop sales, utilities, etc.)
create table financial_transactions (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  branch_id uuid references branches(id),
  description text not null,
  type transaction_type not null,
  category text not null,             -- Membership | Equipment | Payroll | Retail | Utilities ...
  amount numeric not null,
  currency text default 'USD',
  status payment_status default 'paid',
  related_invoice_id uuid references invoices(id),
  related_member_id uuid references profiles(id),
  occurred_on date not null default current_date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11.4 TRAINER DETAILS (Trainers grid + trainer profile page) -----
create table trainer_profiles (
  id uuid primary key references profiles(id) on delete cascade, -- 1:1 with a trainer profile
  specialty text,                     -- "Strength & Conditioning"
  bio text,
  status trainer_status default 'available',
  rating numeric(2,1) default 0,      -- avg review rating, 0-5
  active_clients integer default 0,
  training_hours integer default 0,
  hourly_rate numeric,
  location text,                      -- "Sector 7 - Main Floor"
  specializations jsonb,              -- ["Weight Loss","HIIT",...]
  years_experience integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table certifications (
  id uuid primary key default uuid_generate_v4(),
  trainer_id uuid references profiles(id) on delete cascade not null,
  name text not null,                 -- "NASM Certified Personal Trainer"
  issuer text,
  issued_date date,
  expiry_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ongoing personal-training relationship between a trainer and a member
create table trainer_assignments (
  id uuid primary key default uuid_generate_v4(),
  trainer_id uuid references profiles(id) on delete cascade not null,
  member_id uuid references profiles(id) on delete cascade not null,
  assigned_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true,
  unique (trainer_id, member_id)
);

-- 11.5 GROUP CLASSES (Member app schedule + trainer schedule) -----
create table classes (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  name text not null,                 -- "HIIT Blast", "Yoga Flow"
  category text,                      -- "High Intensity", "Mobility", "Cardio"
  description text,
  difficulty text,                    -- beginner | intermediate | advanced
  duration_min integer default 60,
  default_capacity integer default 20,
  default_trainer_id uuid references profiles(id),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- A scheduled occurrence of a class
create table class_sessions (
  id uuid primary key default uuid_generate_v4(),
  class_id uuid references classes(id) on delete cascade not null,
  branch_id uuid references branches(id) not null,
  trainer_id uuid references profiles(id),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone,
  capacity integer default 20,
  status session_status default 'scheduled',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Member sign-ups for a specific class session
create table class_enrollments (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references class_sessions(id) on delete cascade not null,
  member_id uuid references profiles(id) on delete cascade not null,
  status enrollment_status default 'booked',
  checked_in_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (session_id, member_id)
);

-- 11.6 MEMBER FITNESS DATA (Client dashboard KPIs + charts) -------
create table workout_logs (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references profiles(id) on delete cascade not null,
  trainer_id uuid references profiles(id),
  workout_date date not null default current_date,
  type text,                          -- "Strength", "HIIT", "Cardio"
  calories_burned integer default 0,
  duration_min integer default 0,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table body_measurements (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references profiles(id) on delete cascade not null,
  recorded_at date not null default current_date,
  weight_kg numeric,
  body_fat_pct numeric,
  muscle_mass_kg numeric,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table member_goals (
  id uuid primary key default uuid_generate_v4(),
  member_id uuid references profiles(id) on delete cascade not null,
  goal_type goal_type not null,
  target_value numeric,               -- e.g. target weight 78
  current_value numeric,
  unit text default 'kg',
  target_date date,
  is_achieved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11.7 REVIEWS & RATINGS (Trainer rating shown on cards) ----------
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  author_id uuid references profiles(id) not null,
  trainer_id uuid references profiles(id), -- subject of the review (if a trainer)
  class_id uuid references classes(id),    -- or the class being reviewed
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11.8 ACTIVITY FEED & NOTIFICATIONS ------------------------------
-- Gym-wide live feed ("New member signed up", "Payment processed $299")
create table activity_events (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  branch_id uuid references branches(id),
  actor_id uuid references profiles(id),
  type notification_type default 'system',
  description text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Per-user targeted notifications / alerts
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete cascade not null,
  type notification_type default 'system',
  title text not null,
  message text,
  is_read boolean default false,
  link text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11.9 USER PREFERENCES (Settings page) ---------------------------
create table user_settings (
  id uuid primary key references profiles(id) on delete cascade, -- 1:1 with a profile
  theme text default 'cyber_dark',
  language text default 'en',
  mfa_enabled boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table notification_preferences (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade not null,
  category text not null,             -- new_signups | payment_alerts | inventory | weekly_reports
  enabled boolean default true,
  unique (profile_id, category)
);

-- 11.10 ANALYTICS SNAPSHOTS (Dashboard KPI cards + trend charts) --
-- Pre-aggregated daily metrics so charts/KPIs don't recompute on every read
create table daily_metrics (
  id uuid primary key default uuid_generate_v4(),
  gym_id uuid references gyms(id) not null,
  branch_id uuid references branches(id),
  metric_date date not null,
  revenue numeric default 0,
  expenses numeric default 0,
  new_members integer default 0,
  active_members integer default 0,
  check_ins integer default 0,
  churn_rate numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (gym_id, branch_id, metric_date)
);

-- 11.11 INDEXES (common lookups / joins) --------------------------
create index idx_profiles_gym on profiles(gym_id);
create index idx_subscriptions_user on subscriptions(user_id);
create index idx_subscriptions_status on subscriptions(status);
create index idx_attendance_user on attendance(user_id);
create index idx_attendance_checkin on attendance(check_in_time);
create index idx_invoices_user on invoices(user_id);
create index idx_invoices_status on invoices(status);
create index idx_leads_gym_status on leads(gym_id, status);
create index idx_transactions_gym_date on financial_transactions(gym_id, occurred_on);
create index idx_class_sessions_start on class_sessions(start_time);
create index idx_class_enrollments_member on class_enrollments(member_id);
create index idx_workout_logs_member_date on workout_logs(member_id, workout_date);
create index idx_body_measurements_member on body_measurements(member_id, recorded_at);
create index idx_reviews_trainer on reviews(trainer_id);
create index idx_activity_events_gym on activity_events(gym_id, created_at);
create index idx_notifications_user on notifications(user_id, is_read);
create index idx_daily_metrics_gym_date on daily_metrics(gym_id, metric_date);


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

-- RLS for new member-private tables (each member only touches their own rows)
alter table workout_logs enable row level security;
alter table body_measurements enable row level security;
alter table member_goals enable row level security;
alter table notifications enable row level security;
alter table user_settings enable row level security;
alter table class_enrollments enable row level security;
alter table leads enable row level security;

create policy "Members manage own workout logs" on workout_logs
  for all using (auth.uid() = member_id);

create policy "Members manage own measurements" on body_measurements
  for all using (auth.uid() = member_id);

create policy "Members manage own goals" on member_goals
  for all using (auth.uid() = member_id);

create policy "Users read own notifications" on notifications
  for select using (auth.uid() = user_id);

create policy "Users manage own settings" on user_settings
  for all using (auth.uid() = id);

create policy "Members see own class enrollments" on class_enrollments
  for select using (auth.uid() = member_id);

-- TODO: Add 'is_admin' function to auth.users for robust RLS
-- TODO: Add staff/admin RLS policies (gym-scoped) for leads, financial_transactions,
--       trainer_profiles, classes, class_sessions, activity_events and daily_metrics.
-- TODO: Add updated_at triggers (leads, user_settings) to auto-touch the column.
