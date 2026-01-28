"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { ProductCard } from "./product-card";
import { type Product } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT GRID
   Responsive grid layout for product cards
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-body text-text-muted">
          {t(
            "No hay productos en esta categoría.",
            "No products in this category."
          )}
        </p>
      </div>
    );
  }

  return (
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
  );
}
