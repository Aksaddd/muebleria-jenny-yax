"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { products, productCategories } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN DASHBOARD
   Overview page with stats and quick actions
   ═══════════════════════════════════════════════════════════════════════════ */

const dashboardContent = {
  title: { es: "Resumen", en: "Dashboard" },
  subtitle: { es: "Panel de administración", en: "Admin panel" },
  stats: {
    products: { es: "Productos", en: "Products" },
    featured: { es: "Destacados", en: "Featured" },
    categories: { es: "Categorías", en: "Categories" },
  },
  quickActions: { es: "Acciones rápidas", en: "Quick actions" },
  newProduct: { es: "Nuevo producto", en: "New product" },
  viewProducts: { es: "Ver productos", en: "View products" },
  recentActivity: { es: "Actividad reciente", en: "Recent activity" },
  noActivity: { es: "Sin actividad reciente", en: "No recent activity" },
};

// Mock activity data
const mockActivity = [
  { id: 1, action: "Producto actualizado", item: "Ropero Clásico", time: "Hace 2 horas" },
  { id: 2, action: "Producto creado", item: "Mesa de Comedor", time: "Hace 1 día" },
  { id: 3, action: "Producto actualizado", item: "Trinchante Tradicional", time: "Hace 3 días" },
];

export default function AdminDashboardPage() {
  const { lang, t } = useLanguage();

  const c = {
    title: lang === "es" ? dashboardContent.title.es : dashboardContent.title.en,
    subtitle: lang === "es" ? dashboardContent.subtitle.es : dashboardContent.subtitle.en,
    stats: {
      products: lang === "es" ? dashboardContent.stats.products.es : dashboardContent.stats.products.en,
      featured: lang === "es" ? dashboardContent.stats.featured.es : dashboardContent.stats.featured.en,
      categories: lang === "es" ? dashboardContent.stats.categories.es : dashboardContent.stats.categories.en,
    },
    quickActions: lang === "es" ? dashboardContent.quickActions.es : dashboardContent.quickActions.en,
    newProduct: lang === "es" ? dashboardContent.newProduct.es : dashboardContent.newProduct.en,
    viewProducts: lang === "es" ? dashboardContent.viewProducts.es : dashboardContent.viewProducts.en,
    recentActivity: lang === "es" ? dashboardContent.recentActivity.es : dashboardContent.recentActivity.en,
    noActivity: lang === "es" ? dashboardContent.noActivity.es : dashboardContent.noActivity.en,
  };

  // Calculate stats
  const totalProducts = products.length;
  const featuredCount = products.filter((p) => p.available).length; // Using available as proxy
  const categoryCount = productCategories.filter((c) => c !== "Todos").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-text">{c.title}</h1>
        <p className="mt-1 text-body text-text-muted">{c.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label={c.stats.products}
          value={totalProducts}
          icon={<ProductsIcon />}
        />
        <StatCard
          label={c.stats.featured}
          value={featuredCount}
          icon={<StarIcon />}
        />
        <StatCard
          label={c.stats.categories}
          value={categoryCount}
          icon={<CategoryIcon />}
        />
      </div>

      {/* Quick Actions */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-card border border-border"
        )}
      >
        <h2 className="text-small font-semibold text-text-muted uppercase tracking-wide mb-4">
          {c.quickActions}
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" asChild>
            <Link href="/admin/products/new">{c.newProduct}</Link>
          </Button>
          <Button variant="secondary" size="md" asChild>
            <Link href="/admin/products">{c.viewProducts}</Link>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        className={cn(
          "p-6 rounded-xl",
          "bg-card border border-border"
        )}
      >
        <h2 className="text-small font-semibold text-text-muted uppercase tracking-wide mb-4">
          {c.recentActivity}
        </h2>
        {mockActivity.length > 0 ? (
          <ul className="space-y-3">
            {mockActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between py-2 border-b border-border-subtle last:border-0"
              >
                <div>
                  <p className="text-small text-text">{activity.action}</p>
                  <p className="text-caption text-text-muted">{activity.item}</p>
                </div>
                <span className="text-caption text-text-subtle">{activity.time}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-body text-text-muted">{c.noActivity}</p>
        )}
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "p-5 rounded-xl",
        "bg-card border border-border",
        "flex items-center gap-4"
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-lg",
          "bg-brand-subtle",
          "flex items-center justify-center",
          "text-brand"
        )}
      >
        {icon}
      </div>
      <div>
        <p className="text-display text-text">{value}</p>
        <p className="text-small text-text-muted">{label}</p>
      </div>
    </div>
  );
}

// Icons
function ProductsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

function CategoryIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}
