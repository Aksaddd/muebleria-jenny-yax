"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { ProductFormDb } from "@/components/admin";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN NEW PRODUCT PAGE
   Create a new product
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: { es: "Nuevo producto", en: "New product" },
  subtitle: { es: "Crear un nuevo producto para el catálogo", en: "Create a new product for the catalog" },
  back: { es: "← Volver a productos", en: "← Back to products" },
};

export default function AdminNewProductPage() {
  const { lang } = useLanguage();

  const c = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    subtitle: lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en,
    back: lang === "es" ? pageContent.back.es : pageContent.back.en,
  };

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
        <p className="mt-1 text-body text-text-muted">{c.subtitle}</p>
      </div>

      {/* Form */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-card border border-border"
        )}
      >
        <ProductFormDb mode="create" />
      </div>
    </div>
  );
}
