"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ProductCardDb } from "./product-card-db";
import type { DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT GRID (Database Version)
   Responsive grid for products from Supabase
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductGridDbProps {
  products: DbProduct[];
  columns?: 2 | 3 | 4;
}

export function ProductGridDb({ products, columns = 3 }: ProductGridDbProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div
      className={cn(
        "grid gap-6",
        gridCols[columns]
      )}
    >
      {products.map((product) => (
        <ProductCardDb key={product.id} product={product} />
      ))}
    </div>
  );
}
