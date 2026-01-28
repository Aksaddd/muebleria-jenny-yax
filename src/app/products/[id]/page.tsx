import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetailContentDb } from "./product-detail-content-db";
import { getProductBySlug, getRelatedProducts, getProducts } from "@/lib/db/products";
import { CATEGORY_LABELS, type ProductCategory } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT DETAIL PAGE
   Dynamic route for individual product pages
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductPageProps {
  params: { id: string };
}

export const revalidate = 60; // Revalidate every 60 seconds

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.id);

  if (!product) {
    return {
      title: "Producto no encontrado | Mueblería Jenny Yax",
      description: "El producto que buscas no está disponible.",
    };
  }

  const title = `${product.name} | Mueblería Jenny Yax`;
  const description = `${product.short_description} Pedidos por WhatsApp. Hecho a mano en Sololá, Guatemala.`;
  const imageUrl = product.image_url || "/images/hero/storefront.webp";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: product.image_alt || product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category, 3);
  const categoryLabel = CATEGORY_LABELS[product.category as ProductCategory] || {
    es: product.category,
    en: product.category,
  };

  return (
    <ProductDetailContentDb
      product={product}
      relatedProducts={relatedProducts}
      categoryLabel={categoryLabel}
    />
  );
}
