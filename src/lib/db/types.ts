/* ═══════════════════════════════════════════════════════════════════════════
   DATABASE TYPES
   TypeScript types for Supabase tables
   ═══════════════════════════════════════════════════════════════════════════ */

// Product from database
export interface DbProduct {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  name_en: string | null;
  slug: string;
  category: string;
  short_description: string;
  short_description_en: string | null;
  featured: boolean;
  image_url: string | null;
  image_alt: string | null;
  image_alt_en: string | null;
  features: string[] | null;
  active: boolean;
}

// Product for insert/update
export interface DbProductInsert {
  name: string;
  name_en?: string | null;
  slug: string;
  category: string;
  short_description: string;
  short_description_en?: string | null;
  featured?: boolean;
  image_url?: string | null;
  image_alt?: string | null;
  image_alt_en?: string | null;
  features?: string[] | null;
  active?: boolean;
}

export interface DbProductUpdate {
  name?: string;
  name_en?: string | null;
  slug?: string;
  category?: string;
  short_description?: string;
  short_description_en?: string | null;
  featured?: boolean;
  image_url?: string | null;
  image_alt?: string | null;
  image_alt_en?: string | null;
  features?: string[] | null;
  active?: boolean;
}

// Inquiry from database
export interface DbInquiry {
  id: string;
  created_at: string;
  name: string;
  contact: string;
  product_category: string | null;
  message: string;
  source: string;
  status: "new" | "reviewed" | "archived";
}

// Inquiry for insert
export interface DbInquiryInsert {
  name: string;
  contact: string;
  product_category?: string | null;
  message: string;
  source?: string;
}

// Inquiry status update
export interface DbInquiryUpdate {
  status?: "new" | "reviewed" | "archived";
}

// Product categories (for type safety)
export const PRODUCT_CATEGORIES = [
  "Roperos",
  "Trinchantes",
  "Libreros",
  "Burós",
  "Cunas",
  "Mesas",
  "Personalizado",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// Category labels for display
export const CATEGORY_LABELS: Record<ProductCategory, { es: string; en: string }> = {
  Roperos: { es: "Roperos", en: "Wardrobes" },
  Trinchantes: { es: "Trinchantes", en: "Sideboards" },
  Libreros: { es: "Libreros", en: "Bookshelves" },
  Burós: { es: "Burós", en: "Nightstands" },
  Cunas: { es: "Cunas", en: "Cribs" },
  Mesas: { es: "Mesas", en: "Tables" },
  Personalizado: { es: "Personalizado", en: "Custom" },
};
