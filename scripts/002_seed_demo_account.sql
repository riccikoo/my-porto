-- Seed script untuk membuat demo account untuk testing
-- Email: demo@example.com
-- Password: Demo123456!

-- Insert demo user (gunakan hash password yang aman)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  aud,
  role,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change,
  email_change_token_new,
  email_change_confirms_at,
  recovery_sent_at,
  last_sign_in_at,
  phone,
  phone_confirmed_at,
  phone_change,
  phone_change_token,
  phone_change_sent_at,
  banned_until,
  banned_reason,
  reauthentication_token,
  reauthentication_sent_at
) VALUES (
  'f5d5f5d5-f5d5-f5d5-f5d5-f5d5f5d5f5d5',
  '00000000-0000-0000-0000-000000000000',
  'demo@example.com',
  crypt('Demo123456!', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"first_name":"Demo","last_name":"User"}',
  'authenticated',
  'authenticated',
  NOW(),
  NOW(),
  '',
  '',
  '',
  '',
  NOW(),
  NOW(),
  NOW(),
  null,
  null,
  '',
  '',
  NOW(),
  null,
  null,
  '',
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create profile for demo user
INSERT INTO public.profiles (id, first_name, last_name, bio)
VALUES (
  'f5d5f5d5-f5d5-f5d5-f5d5-f5d5f5d5f5d5',
  'Demo',
  'User',
  'Welcome to my portfolio! This is a demo account. Feel free to create, edit, and delete projects to test the portfolio builder.'
) ON CONFLICT (id) DO NOTHING;
