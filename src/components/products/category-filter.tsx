"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { PRODUCT_CATEGORIES, CATEGORY_LABELS, type ProductCategory } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   CATEGORY FILTER
   Pill buttons for filtering products by category
   ═══════════════════════════════════════════════════════════════════════════ */

interface CategoryFilterProps {
  selected: ProductCategory | "Todos";
  onSelect: (category: ProductCategory | "Todos") => void;
}

// All categories including "Todos"
const allCategories: (ProductCategory | "Todos")[] = ["Todos", ...PRODUCT_CATEGORIES];

// Labels including "Todos"
const allLabels: Record<ProductCategory | "Todos", { es: string; en: string }> = {
  Todos: { es: "Todos", en: "All" },
  ...CATEGORY_LABELS,
};

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { lang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={lang === "es" ? "Filtrar por categoría" : "Filter by category"}
      className="flex flex-wrap gap-2"
    >
      {allCategories.map((category) => {
        const isSelected = selected === category;
        const label =
          lang === "es"
            ? allLabels[category].es
            : allLabels[category].en;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            aria-pressed={isSelected}
            className={cn(
              // Base styles
              "px-4 py-2 rounded-full",
              "text-small font-medium",
              "transition-all duration-200 ease-out",
              // Touch target
              "min-h-[44px]",
              // States
              isSelected
                ? "bg-brand text-text-inverse shadow-sm"
                : "bg-surface border border-border text-text-muted hover:border-brand/30 hover:text-text hover:bg-brand-subtle/30",
              // Focus
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
