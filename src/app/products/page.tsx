import type { Metadata } from "next";
import { getProducts } from "@/lib/db/products";
import { ProductsCatalogContent } from "./products-catalog-content";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS CATALOG PAGE
   Server component that fetches products from Supabase
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora nuestra colección de muebles de madera hechos a mano. Roperos, trinchantes, libreros, burós, cunas y mesas. Pedidos por WhatsApp en Guatemala.",
  openGraph: {
    title: "Productos | Mueblería Jenny Yax",
    description:
      "Roperos, trinchantes, libreros, burós, cunas y mesas hechos a mano en Sololá, Guatemala.",
    images: ["/api/og?title=Nuestros%20Productos&subtitle=Muebles%20de%20Madera%20Hechos%20a%20Mano"],
  },
};

// Revalidate every 60 seconds - balances freshness with performance
// Products don't change frequently, but admins expect updates within a minute
export const revalidate = 60;

export default async function ProductsPage() {
  // Fetch products from Supabase (server-side)
  const products = await getProducts();

  return <ProductsCatalogContent products={products} />;
}
