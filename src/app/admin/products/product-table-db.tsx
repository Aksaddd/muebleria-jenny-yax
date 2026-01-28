"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { CATEGORY_LABELS, type ProductCategory, type DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT TABLE (Database Version)
   Responsive table/card list for admin product management
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductTableDbProps {
  products: DbProduct[];
}

const PLACEHOLDER_IMAGE = "/images/hero/storefront.webp";

const tableContent = {
  columns: {
    image: { es: "Imagen", en: "Image" },
    name: { es: "Nombre", en: "Name" },
    category: { es: "Categoría", en: "Category" },
    status: { es: "Estado", en: "Status" },
    featured: { es: "Destacado", en: "Featured" },
    actions: { es: "Acciones", en: "Actions" },
  },
  status: {
    active: { es: "Activo", en: "Active" },
    inactive: { es: "Inactivo", en: "Inactive" },
  },
  featured: {
    yes: { es: "Sí", en: "Yes" },
    no: { es: "No", en: "No" },
  },
  edit: { es: "Editar", en: "Edit" },
  noProducts: { es: "No hay productos", en: "No products" },
};

export function ProductTableDb({ products }: ProductTableDbProps) {
  const { lang } = useLanguage();

  const c = {
    columns: {
      image: lang === "es" ? tableContent.columns.image.es : tableContent.columns.image.en,
      name: lang === "es" ? tableContent.columns.name.es : tableContent.columns.name.en,
      category: lang === "es" ? tableContent.columns.category.es : tableContent.columns.category.en,
      status: lang === "es" ? tableContent.columns.status.es : tableContent.columns.status.en,
      featured: lang === "es" ? tableContent.columns.featured.es : tableContent.columns.featured.en,
      actions: lang === "es" ? tableContent.columns.actions.es : tableContent.columns.actions.en,
    },
    status: {
      active: lang === "es" ? tableContent.status.active.es : tableContent.status.active.en,
      inactive: lang === "es" ? tableContent.status.inactive.es : tableContent.status.inactive.en,
    },
    featured: {
      yes: lang === "es" ? tableContent.featured.yes.es : tableContent.featured.yes.en,
      no: lang === "es" ? tableContent.featured.no.es : tableContent.featured.no.en,
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
              <th className="px-4 py-3 text-left text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.featured}
              </th>
              <th className="px-4 py-3 text-right text-caption font-semibold text-text-muted uppercase tracking-wide">
                {c.columns.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => {
              const categoryLabel = CATEGORY_LABELS[product.category as ProductCategory]
                ? (lang === "es"
                    ? CATEGORY_LABELS[product.category as ProductCategory].es
                    : CATEGORY_LABELS[product.category as ProductCategory].en)
                : product.category;

              return (
                <tr key={product.id} className="hover:bg-surface/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface">
                      <Image
                        src={product.image_url || PLACEHOLDER_IMAGE}
                        alt={product.image_alt || product.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-small font-medium text-text">
                      {lang === "es" ? product.name : (product.name_en || product.name)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-small text-text-muted">
                      {categoryLabel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded-full text-caption font-medium",
                        product.active
                          ? "bg-success/10 text-success"
                          : "bg-text-muted/10 text-text-muted"
                      )}
                    >
                      {product.active ? c.status.active : c.status.inactive}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex px-2 py-0.5 rounded-full text-caption font-medium",
                        product.featured
                          ? "bg-brand/10 text-brand"
                          : "bg-text-muted/10 text-text-muted"
                      )}
                    >
                      {product.featured ? c.featured.yes : c.featured.no}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/products/${product.slug}`}>{c.edit}</Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {products.map((product) => {
          const categoryLabel = CATEGORY_LABELS[product.category as ProductCategory]
            ? (lang === "es"
                ? CATEGORY_LABELS[product.category as ProductCategory].es
                : CATEGORY_LABELS[product.category as ProductCategory].en)
            : product.category;

          return (
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
                  src={product.image_url || PLACEHOLDER_IMAGE}
                  alt={product.image_alt || product.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-small font-medium text-text truncate">
                  {lang === "es" ? product.name : (product.name_en || product.name)}
                </h3>
                <p className="text-caption text-text-muted">
                  {categoryLabel}
                </p>
                <div className="mt-1 flex gap-2">
                  <span
                    className={cn(
                      "inline-flex px-2 py-0.5 rounded-full text-caption font-medium",
                      product.active
                        ? "bg-success/10 text-success"
                        : "bg-text-muted/10 text-text-muted"
                    )}
                  >
                    {product.active ? c.status.active : c.status.inactive}
                  </span>
                  {product.featured && (
                    <span className="inline-flex px-2 py-0.5 rounded-full text-caption font-medium bg-brand/10 text-brand">
                      {c.featured.yes}
                    </span>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" asChild className="min-h-[44px]">
                <Link href={`/admin/products/${product.slug}`}>{c.edit}</Link>
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
