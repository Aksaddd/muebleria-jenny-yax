"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { ProductFormDb } from "@/components/admin";
import { getAdminProductBySlug } from "@/lib/db/products";
import type { DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN EDIT PRODUCT PAGE
   Edit an existing product
   ═══════════════════════════════════════════════════════════════════════════ */

interface EditProductPageProps {
  params: { id: string };
}

const pageContent = {
  title: { es: "Editar producto", en: "Edit product" },
  subtitle: { es: "Modificar información del producto", en: "Modify product information" },
  back: { es: "← Volver a productos", en: "← Back to products" },
  notFound: {
    title: { es: "Producto no encontrado", en: "Product not found" },
    description: { es: "El producto que buscas no existe.", en: "The product you're looking for doesn't exist." },
  },
  loading: { es: "Cargando...", en: "Loading..." },
};

export default function AdminEditProductPage({ params }: EditProductPageProps) {
  const { lang } = useLanguage();
  const [product, setProduct] = React.useState<DbProduct | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [notFound, setNotFound] = React.useState(false);

  const c = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    subtitle: lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en,
    back: lang === "es" ? pageContent.back.es : pageContent.back.en,
    notFound: {
      title: lang === "es" ? pageContent.notFound.title.es : pageContent.notFound.title.en,
      description: lang === "es" ? pageContent.notFound.description.es : pageContent.notFound.description.en,
    },
    loading: lang === "es" ? pageContent.loading.es : pageContent.loading.en,
  };

  // Fetch product
  React.useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      try {
        const data = await getAdminProductBySlug(params.id);
        if (data) {
          setProduct(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/products"
          className={cn(
            "inline-flex items-center",
            "text-small text-text-muted",
            "hover:text-brand transition-colors"
          )}
        >
          {c.back}
        </Link>
        <div className="py-12 text-center">
          <p className="text-body text-text-muted">{c.loading}</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="space-y-6">
        <Link
          href="/admin/products"
          className={cn(
            "inline-flex items-center",
            "text-small text-text-muted",
            "hover:text-brand transition-colors"
          )}
        >
          {c.back}
        </Link>

        <div className="py-12 text-center">
          <h1 className="font-serif text-h2 text-text">{c.notFound.title}</h1>
          <p className="mt-2 text-body text-text-muted">{c.notFound.description}</p>
        </div>
      </div>
    );
  }

  const productName = lang === "es" ? product.name : (product.name_en || product.name);

  return (
    <div className="space-y-6">
      {/* Back Link */}
      <Link
        href="/admin/products"
        className={cn(
          "inline-flex items-center",
          "text-small text-text-muted",
          "hover:text-brand transition-colors"
        )}
      >
        {c.back}
      </Link>

      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-text">{c.title}</h1>
        <p className="mt-1 text-body text-text-muted">
          {productName} — {c.subtitle}
        </p>
      </div>

      {/* Form */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-card border border-border"
        )}
      >
        <ProductFormDb product={product} mode="edit" />
      </div>
    </div>
  );
}
