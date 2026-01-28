"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { ProductCard } from "./product-card";
import { type Product } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   RELATED PRODUCTS
   Show related products from same category
   ═══════════════════════════════════════════════════════════════════════════ */

interface RelatedProductsProps {
  products: Product[];
}

const sectionContent = {
  title: {
    es: "También te puede interesar",
    en: "You may also like",
  },
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  const { lang } = useLanguage();

  if (products.length === 0) return null;

  const title = lang === "es" ? sectionContent.title.es : sectionContent.title.en;

  return (
    <section className="py-12 md:py-16 border-t border-border-subtle">
      <h2 className="font-serif text-h3 text-text mb-8">{title}</h2>

      <div
        className={cn(
          "grid gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
