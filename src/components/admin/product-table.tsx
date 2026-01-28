"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { type Product, categoryLabels } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT TABLE
   Responsive table/card list for admin product management
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductTableProps {
  products: Product[];
}

const tableContent = {
  columns: {
    image: { es: "Imagen", en: "Image" },
    name: { es: "Nombre", en: "Name" },
    category: { es: "Categoría", en: "Category" },
    status: { es: "Estado", en: "Status" },
    actions: { es: "Acciones", en: "Actions" },
  },
  status: {
    active: { es: "Activo", en: "Active" },
    inactive: { es: "Inactivo", en: "Inactive" },
  },
  edit: { es: "Editar", en: "Edit" },
  noProducts: { es: "No hay productos", en: "No products" },
};

export function ProductTable({ products }: ProductTableProps) {
  const { lang } = useLanguage();

  const c = {
    columns: {
      image: lang === "es" ? tableContent.columns.image.es : tableContent.columns.image.en,
      name: lang === "es" ? tableContent.columns.name.es : tableContent.columns.name.en,
      category: lang === "es" ? tableContent.columns.category.es : tableContent.columns.category.en,
      status: lang === "es" ? tableContent.columns.status.es : tableContent.columns.status.en,
      actions: lang === "es" ? tableContent.columns.actions.es : tableContent.columns.actions.en,
    },
    status: {
      active: lang === "es" ? tableContent.status.active.es : tableContent.status.active.en,
      inactive: lang === "es" ? tableContent.status.inactive.es : tableContent.status.inactive.en,
    },
    edit: lang === "es" ? tableContent.edit.es : tableContent.edit.en,
    noProducts: lang === "es" ? tableContent.noProducts.es : tableContent.noProducts.en,
  };

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-body text-text-muted">{c.noProducts}</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="px-4 py-3 text-left text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.image}
              </th>
              <th className="px-4 py-3 text-left text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.name}
              </th>
              <th className="px-4 py-3 text-left text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.category}
              </th>
              <th className="px-4 py-3 text-left text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.status}
              </th>
              <th className="px-4 py-3 text-right text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-surface/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface">
                    <Image
                      src={product.image.src}
                      alt={lang === "es" ? product.image.alt.es : product.image.alt.en}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-small font-medium text-text">
                    {lang === "es" ? product.name.es : product.name.en}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-small text-text-muted">
                    {lang === "es"
                      ? categoryLabels[product.category].es
                      : categoryLabels[product.category].en}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-caption font-medium",
                      product.available
                        ? "bg-success/10 text-success"
                        : "bg-text-muted/10 text-text-muted"
                    )}
                  >
                    {product.available ? c.status.active : c.status.inactive}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/products/${product.slug}`}>{c.edit}</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={cn(
              "p-4 rounded-xl",
              "bg-card border border-border",
              "flex items-center gap-4"
            )}
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-surface shrink-0">
              <Image
                src={product.image.src}
                alt={lang === "es" ? product.image.alt.es : product.image.alt.en}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-small font-medium text-text truncate">
                {lang === "es" ? product.name.es : product.name.en}
              </h3>
              <p className="text-caption text-text-muted">
                {lang === "es"
                  ? categoryLabels[product.category].es
                  : categoryLabels[product.category].en}
              </p>
              <span
                className={cn(
                  "inline-flex mt-1 px-2 py-0.5 rounded-full text-caption font-medium",
                  product.available
                    ? "bg-success/10 text-success"
                    : "bg-text-muted/10 text-text-muted"
                )}
              >
                {product.available ? c.status.active : c.status.inactive}
              </span>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/products/${product.slug}`}>{c.edit}</Link>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
