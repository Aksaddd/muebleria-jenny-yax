import { getFeaturedProducts } from "@/lib/db/products";
import { FeaturedProductsContent } from "./featured-products-content";

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED PRODUCTS SECTION (Server Component)
   Fetches featured products from Supabase
   ═══════════════════════════════════════════════════════════════════════════ */

export async function FeaturedProductsDb() {
  const products = await getFeaturedProducts(4);
  return <FeaturedProductsContent products={products} />;
}
