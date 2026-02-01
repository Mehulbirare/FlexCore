# Supabase Backend Setup for FlexCore

Follow these steps to configure your backend in minutes.

## 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **"New Project"**.
3. Organization: Select your org.
4. Name: `FlexCore`.
5. Database Password: Generate a strong password and save it.
6. Region: Choose one close to you (e.g., AWS Mumbai).
7. Click **"Create new project"**.

## 2. Get API Credentials
Once the project is created (it takes ~2 mins):
1. Go to **Project Settings** (Cog icon) -> **API**.
2. Copy the `Project URL`.
3. Copy the `anon` public key.

## 3. Configure Environment Variables
1. Create a file named `.env.local` in the root of your `flexcore` folder.
2. Add the following keys:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 4. Setup Database Tables
1. In the Supabase Dashboard, go to the **SQL Editor** (icon on the left sidebar).
2. Click **"New Query"**.
3. Open the file `backend/schema.sql` from this project.
4. Copy the entire content and paste it into the SQL Editor.
5. Click **"Run"** (bottom right).

✅ This will create all the necessary tables: `users`, `gyms`, `memberships`, `attendance`, `payments`, etc.

## 5. Setup Auth (Optional but Recommended)
1. Go to **Authentication** -> **Providers**.
2. Enable **Email/Password**.
3. (Optional) Enable **Google** if you want social login.

## 6. Verification
To verify it works:
1. Go to the **Table Editor** icon.
2. You should see all your tables (profiles, gyms, etc.) created.

---
**Next Steps:**
- The frontend is already pre-configured to look for these environment variables.
- Once `.env.local` is set, restart your dev server (`Ctrl+C` then `npm run dev`).
