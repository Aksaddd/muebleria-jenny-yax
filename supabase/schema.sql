-- ═══════════════════════════════════════════════════════════════════════════
-- MUEBLERÍA JENNY YAX — SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ═══════════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────────
-- 1. PRODUCTS TABLE
-- ───────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  name_en TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  short_description_en TEXT,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  image_alt TEXT,
  image_alt_en TEXT,
  features TEXT[], -- Array of feature strings
  active BOOLEAN DEFAULT true
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ───────────────────────────────────────────────────────────────────────────
-- 2. INQUIRIES TABLE (Contact form submissions / Cotizaciones)
-- ───────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  product_category TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived'))
);

-- Index for admin queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);

-- ───────────────────────────────────────────────────────────────────────────
-- 3. ROW LEVEL SECURITY (RLS) POLICIES
-- ───────────────────────────────────────────────────────────────────────────

-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
-- Checks if the authenticated user's email is in the admin list
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'email' IN (
      'moisesyax46@gmail.com'
      -- Add more admin emails here, comma-separated
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─────────────────────────────────────────
-- PRODUCTS POLICIES
-- ─────────────────────────────────────────

-- Public can read active products (for catalog)
DROP POLICY IF EXISTS "Public can view active products" ON products;
CREATE POLICY "Public can view active products"
  ON products
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Admins can view all products (including inactive)
DROP POLICY IF EXISTS "Admins can view all products" ON products;
CREATE POLICY "Admins can view all products"
  ON products
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can insert products
DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products"
  ON products
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- Admins can update products
DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products"
  ON products
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete products
DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products"
  ON products
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ─────────────────────────────────────────
-- INQUIRIES POLICIES
-- ─────────────────────────────────────────

-- Anyone can submit an inquiry (contact form)
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON inquiries;
CREATE POLICY "Anyone can submit inquiries"
  ON inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view inquiries
DROP POLICY IF EXISTS "Admins can view inquiries" ON inquiries;
CREATE POLICY "Admins can view inquiries"
  ON inquiries
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Only admins can update inquiries
DROP POLICY IF EXISTS "Admins can update inquiries" ON inquiries;
CREATE POLICY "Admins can update inquiries"
  ON inquiries
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Only admins can delete inquiries
DROP POLICY IF EXISTS "Admins can delete inquiries" ON inquiries;
CREATE POLICY "Admins can delete inquiries"
  ON inquiries
  FOR DELETE
  TO authenticated
  USING (is_admin());

-- ───────────────────────────────────────────────────────────────────────────
-- 4. SEED DATA (Optional - Initial products)
-- ───────────────────────────────────────────────────────────────────────────

INSERT INTO products (name, name_en, slug, category, short_description, short_description_en, featured, active, image_alt, image_alt_en) VALUES
  ('Ropero Clásico', 'Classic Wardrobe', 'ropero-clasico', 'Roperos', 
   'Amplio espacio de almacenamiento con diseño tradicional. Ideal para organizar tu ropa y accesorios con estilo.',
   'Spacious storage with traditional design. Ideal for organizing your clothes and accessories with style.',
   true, true,
   'Ropero clásico de madera artesanal', 'Handcrafted classic wooden wardrobe'),
   
  ('Ropero Dos Puertas', 'Two-Door Wardrobe', 'ropero-dos-puertas', 'Roperos',
   'Diseño compacto con dos puertas. Perfecto para espacios medianos sin sacrificar capacidad.',
   'Compact design with two doors. Perfect for medium spaces without sacrificing capacity.',
   true, true,
   'Ropero de dos puertas hecho a mano', 'Handmade two-door wardrobe'),
   
  ('Trinchante Tradicional', 'Traditional Sideboard', 'trinchante-tradicional', 'Trinchantes',
   'Mueble elegante para comedor con cajones y puertas. Combina funcionalidad y belleza artesanal.',
   'Elegant dining room furniture with drawers and doors. Combines functionality and artisanal beauty.',
   true, true,
   'Trinchante tradicional de madera', 'Traditional wooden sideboard'),
   
  ('Librero de Pino', 'Pine Bookshelf', 'librero-pino', 'Libreros',
   'Estantes amplios para libros y decoración. Fabricado en madera de pino seleccionada.',
   'Wide shelves for books and decoration. Made from selected pine wood.',
   true, true,
   'Librero de pino con estantes', 'Pine bookshelf with shelves'),
   
  ('Buró Clásico', 'Classic Nightstand', 'buro-clasico', 'Burós',
   'Mesa de noche con cajón y repisa. Complemento perfecto para tu habitación.',
   'Nightstand with drawer and shelf. Perfect complement for your bedroom.',
   false, true,
   'Buró clásico de madera', 'Classic wooden nightstand'),
   
  ('Cuna para Bebé', 'Baby Crib', 'cuna-bebe', 'Cunas',
   'Cuna segura y resistente para tu bebé. Diseñada con barrotes a distancia segura.',
   'Safe and sturdy crib for your baby. Designed with safely-spaced bars.',
   false, true,
   'Cuna de madera para bebé', 'Wooden baby crib'),
   
  ('Mesa de Comedor', 'Dining Table', 'mesa-comedor', 'Mesas',
   'Mesa familiar para 6-8 personas. Superficie amplia y resistente para reuniones.',
   'Family table for 6-8 people. Spacious and sturdy surface for gatherings.',
   true, true,
   'Mesa de comedor familiar', 'Family dining table'),
   
  ('Mueble Personalizado', 'Custom Furniture', 'mueble-personalizado', 'Personalizado',
   '¿Tienes un diseño específico en mente? Fabricamos muebles a tu medida.',
   'Do you have a specific design in mind? We build furniture to your measurements.',
   true, true,
   'Mueble personalizado a medida', 'Custom-made furniture')
ON CONFLICT (slug) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- END OF SCHEMA
-- ═══════════════════════════════════════════════════════════════════════════
