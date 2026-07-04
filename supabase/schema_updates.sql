-- 1. Create News Table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'Tin Tức',
  author TEXT DEFAULT 'Ban Biên tập',
  image TEXT NOT NULL,
  "desc" TEXT,
  content TEXT,
  attachment_url TEXT,
  views INTEGER DEFAULT 0,
  date TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE news ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- 2. Create Admin Security Table (For secondary password layer)
CREATE TABLE IF NOT EXISTS admin_security (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT UNIQUE NOT NULL,
  secondary_password_hash TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Thiết lập mật khẩu cấp 2 mặc định là '123456' (SHA-256 hash - khớp với code actions.ts)
-- SHA-256('123456') = 8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92
INSERT INTO admin_security (admin_email, secondary_password_hash)
VALUES 
  ('inspiringhr.daotaonhansu@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
  ('khainguyen2122002@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92')
ON CONFLICT (admin_email) DO UPDATE 
SET secondary_password_hash = EXCLUDED.secondary_password_hash;

-- 3. Modify Contacts Table to support course registrations fields
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS course_title TEXT;
ALTER TABLE contacts ADD COLUMN IF NOT EXISTS level TEXT;

-- 4. Enable Row Level Security (RLS)
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_security ENABLE ROW LEVEL SECURITY;

-- 5. Define Security Policies
-- Drop existing policies if they exist to prevent conflicts
DROP POLICY IF EXISTS "Public can view news" ON news;
DROP POLICY IF EXISTS "Admin can manage news" ON news;
DROP POLICY IF EXISTS "Admin can manage admin_security" ON admin_security;
DROP POLICY IF EXISTS "Admin can manage courses" ON courses;
DROP POLICY IF EXISTS "Admin can view and manage contacts" ON contacts;

-- News policies
CREATE POLICY "Public can view news" ON news FOR SELECT USING (true);
CREATE POLICY "Admin can manage news" ON news FOR ALL 
USING (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'));

-- Admin security policies
CREATE POLICY "Admin can manage admin_security" ON admin_security FOR ALL 
USING (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'));

-- Courses policies
CREATE POLICY "Admin can manage courses" ON courses FOR ALL 
USING (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'));

-- Contacts policies
CREATE POLICY "Admin can view and manage contacts" ON contacts FOR ALL 
USING (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'));

-- 6. Enable Realtime for News
ALTER PUBLICATION supabase_realtime ADD TABLE news;

-- 7. Setup Storage Bucket and RLS Policies for 'edu-storage'
-- Tạo bucket 'edu-storage' nếu chưa có và cấu hình ở chế độ Public
INSERT INTO storage.buckets (id, name, public)
VALUES ('edu-storage', 'edu-storage', true)
ON CONFLICT (id) DO NOTHING;

-- Xóa các chính sách bảo mật cũ của bucket nếu có
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Upload Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Update Access" ON storage.objects;
DROP POLICY IF EXISTS "Admin Delete Access" ON storage.objects;

-- Cho phép tất cả mọi người có thể xem/đọc file từ bucket 'edu-storage' (Public Read)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'edu-storage');

-- Chỉ cho phép tài khoản Admin được upload file mới vào bucket 'edu-storage'
CREATE POLICY "Admin Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'edu-storage' AND
  (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'))
);

-- Chỉ cho phép tài khoản Admin được cập nhật file trong bucket 'edu-storage'
CREATE POLICY "Admin Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'edu-storage' AND
  (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'))
);

-- Chỉ cho phép tài khoản Admin được xóa file trong bucket 'edu-storage'
CREATE POLICY "Admin Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'edu-storage' AND
  (auth.jwt() ->> 'email' IN ('khainguyen2122002@gmail.com', 'inspiringhr.daotaonhansu@gmail.com'))
);
