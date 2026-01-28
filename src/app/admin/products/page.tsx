"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/components/ui/language-toggle";
import { ProductTableDb } from "./product-table-db";
import { getAdminProducts } from "@/lib/db/products";
import { PRODUCT_CATEGORIES, CATEGORY_LABELS, type ProductCategory, type DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN PRODUCTS PAGE
   Product list with search and filter - fetches from Supabase
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: { es: "Productos", en: "Products" },
  subtitle: { es: "Administra tu catálogo de productos", en: "Manage your product catalog" },
  newProduct: { es: "Nuevo producto", en: "New product" },
  search: { es: "Buscar productos...", en: "Search products..." },
  allCategories: { es: "Todas las categorías", en: "All categories" },
  showing: { es: "Mostrando", en: "Showing" },
  of: { es: "de", en: "of" },
  products: { es: "productos", en: "products" },
  loading: { es: "Cargando...", en: "Loading..." },
  error: { es: "Error al cargar productos", en: "Error loading products" },
  retry: { es: "Reintentar", en: "Retry" },
};

export default function AdminProductsPage() {
  const { lang } = useLanguage();
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState<ProductCategory | "Todos">("Todos");
  const [products, setProducts] = React.useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const c = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    subtitle: lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en,
    newProduct: lang === "es" ? pageContent.newProduct.es : pageContent.newProduct.en,
    search: lang === "es" ? pageContent.search.es : pageContent.search.en,
    allCategories: lang === "es" ? pageContent.allCategories.es : pageContent.allCategories.en,
    showing: lang === "es" ? pageContent.showing.es : pageContent.showing.en,
    of: lang === "es" ? pageContent.of.es : pageContent.of.en,
    products: lang === "es" ? pageContent.products.es : pageContent.products.en,
    loading: lang === "es" ? pageContent.loading.es : pageContent.loading.en,
    error: lang === "es" ? pageContent.error.es : pageContent.error.en,
    retry: lang === "es" ? pageContent.retry.es : pageContent.retry.en,
  };

  // Fetch products
  const fetchProducts = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(c.error);
    } finally {
      setIsLoading(false);
    }
  }, [c.error]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products
  const filteredProducts = React.useMemo(() => {
    let result = products;

    // Category filter
    if (categoryFilter !== "Todos") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Search filter
    if (search.trim()) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          (p.name_en && p.name_en.toLowerCase().includes(searchLower))
      );
    }

    return result;
  }, [products, search, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-display text-text">{c.title}</h1>
          <p className="mt-1 text-body text-text-muted">{c.subtitle}</p>
        </div>
        <Button variant="primary" size="md" asChild>
          <Link href="/admin/products/new">
            <PlusIcon />
            {c.newProduct}
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div
        className={cn(
          "p-4 rounded-xl",
          "bg-card border border-border",
          "flex flex-col sm:flex-row gap-4"
        )}
      >
        {/* Search */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder={c.search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as ProductCategory | "Todos")}
          className={cn(
            "px-3 py-2.5 rounded-lg",
            "bg-bg border border-border",
            "text-body text-text",
            "transition-colors duration-fast",
            "focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent",
            "sm:w-48"
          )}
        >
          <option value="Todos">{c.allCategories}</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {lang === "es" ? CATEGORY_LABELS[cat].es : CATEGORY_LABELS[cat].en}
            </option>
          ))}
        </select>
      </div>

      {/* Results Count */}
      <p className="text-small text-text-muted">
        {c.showing} {filteredProducts.length} {c.of} {products.length} {c.products}
      </p>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center">
          <p className="text-body text-text-muted">{c.loading}</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-12 text-center">
          <p className="text-body text-error mb-4">{error}</p>
          <Button variant="secondary" size="md" onClick={fetchProducts}>
            {c.retry}
          </Button>
        </div>
      )}

      {/* Product Table */}
      {!isLoading && !error && (
        <ProductTableDb products={filteredProducts} />
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
