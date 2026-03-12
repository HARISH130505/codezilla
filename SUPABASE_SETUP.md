# Codezilla — Supabase Setup Guide

Hey, here's everything you need to set up the Supabase backend for our website.
Go to our Supabase project → SQL Editor → New query, and run each block below.

---

## STEP 1 — Profiles table

```sql
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  roll_number text,
  year text,
  joined_at date,
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'moderator', 'admin'))
);

alter table public.profiles enable row level security;

create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);
```

---

## STEP 2 — Blogs table

```sql
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  content text,
  published date default current_date,
  author_id uuid references auth.users(id) on delete set null
);

alter table public.blogs enable row level security;

create policy "Blogs are publicly readable"
  on public.blogs for select
  using (true);

create policy "Authenticated users can insert blogs"
  on public.blogs for insert
  with check (auth.uid() is not null);
```

---

## STEP 3 — Auto-create profile on signup

Run this so every new user automatically gets a profile row:

```sql
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

---

## STEP 4 — Storage buckets

Go to Storage → New bucket and create these two:

| Bucket name  | Public |
|--------------|--------|
| avatars      | YES    |
| blog-images  | YES    |

Then in the avatars bucket → Policies, run:

```sql
create policy "Users can upload their avatar"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy "Avatars are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'avatars');
```

---

## STEP 5 — Google OAuth

1. Go to Authentication → Providers → Google → Enable it
2. Go to console.cloud.google.com → create OAuth 2.0 credentials
3. Set the redirect URI to:
   https://<your-project-ref>.supabase.co/auth/v1/callback
4. Paste the Client ID and Client Secret into Supabase

---

## STEP 6 — Send me these two values when done

Go to Supabase Dashboard → Settings → API and send me:

- Project URL   →  https://xxxx.supabase.co
- Anon public key  →  eyJ...

I need these to connect the website to the database.

---

That's it! Let me know if anything errors out.
