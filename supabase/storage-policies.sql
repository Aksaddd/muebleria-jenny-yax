-- ═══════════════════════════════════════════════════════════════════════════
-- MUEBLERÍA JENNY YAX — SUPABASE STORAGE POLICIES
-- Run this AFTER creating the storage bucket in Supabase Dashboard
-- 
-- FIRST: Create bucket manually:
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Name: product-images
-- 4. Public bucket: YES (check the box)
-- 5. Click "Create bucket"
--
-- THEN: Run this SQL to set up proper access policies
-- ═══════════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────────
-- STORAGE POLICIES FOR product-images BUCKET
-- ───────────────────────────────────────────────────────────────────────────

-- Helper function (same as in schema.sql, but included here for completeness)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN (
      'moisesyax46@gmail.com'
      -- Add more admin emails here
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────
-- PUBLIC READ ACCESS
-- Anyone can view/download images (for fast site loading)
-- ─────────────────────────────────────────

DROP POLICY IF EXISTS "Public can view product images" ON storage.objects;
CREATE POLICY "Public can view product images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'product-images');

-- ─────────────────────────────────────────
-- ADMIN UPLOAD ACCESS
-- Only admins can upload images
-- ─────────────────────────────────────────

DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
CREATE POLICY "Admins can upload product images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'product-images' 
    AND is_admin()
  );

-- ─────────────────────────────────────────
-- ADMIN UPDATE ACCESS
-- Only admins can update/replace images
-- ─────────────────────────────────────────

DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
CREATE POLICY "Admins can update product images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND is_admin()
  )
  WITH CHECK (
    bucket_id = 'product-images' 
    AND is_admin()
  );

-- ─────────────────────────────────────────
-- ADMIN DELETE ACCESS
-- Only admins can delete images
-- ─────────────────────────────────────────

DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;
CREATE POLICY "Admins can delete product images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'product-images' 
    AND is_admin()
  );

-- ═══════════════════════════════════════════════════════════════════════════
-- NOTES:
-- 
-- Public URL format after upload:
-- https://<project-ref>.supabase.co/storage/v1/object/public/product-images/<path>
--
-- Example:
-- https://trecwshaaumtjeksngpx.supabase.co/storage/v1/object/public/product-images/products/abc123/image.webp
-- ═══════════════════════════════════════════════════════════════════════════
