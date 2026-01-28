"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN SIDEBAR
   Navigation sidebar for admin panel
   ═══════════════════════════════════════════════════════════════════════════ */

const navItems = [
  {
    href: "/admin",
    labelEs: "Resumen",
    labelEn: "Dashboard",
    icon: DashboardIcon,
  },
  {
    href: "/admin/products",
    labelEs: "Productos",
    labelEn: "Products",
    icon: ProductsIcon,
  },
  {
    href: "/admin/inquiries",
    labelEs: "Solicitudes",
    labelEn: "Inquiries",
    icon: InquiriesIcon,
  },
];

interface AdminSidebarProps {
  onNavClick?: () => void;
}

export function AdminSidebar({ onNavClick }: AdminSidebarProps) {
  const pathname = usePathname();
  const { lang, t } = useLanguage();

  return (
    <aside
      className={cn(
        "flex flex-col h-full",
        "bg-bg-alt border-r border-border"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link
          href="/admin"
          className="flex items-center gap-2"
          onClick={onNavClick}
        >
          <span className="font-serif text-h4 text-text">Jenny Yax</span>
          <span className="text-caption text-text-muted uppercase tracking-wider">
            Admin
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavClick}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "text-small font-medium",
                "transition-all duration-fast",
                isActive
                  ? "bg-brand text-white"
                  : "text-text-muted hover:text-text hover:bg-surface"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" />
              {lang === "es" ? item.labelEs : item.labelEn}
            </Link>
          );
        })}
      </nav>

      {/* Back to Site */}
      <div className="p-3 border-t border-border">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg",
            "text-small font-medium text-text-muted",
            "transition-all duration-fast",
            "hover:text-text hover:bg-surface"
          )}
        >
          <BackIcon className="w-5 h-5" />
          {t("Volver al sitio", "Back to site")}
        </Link>
      </div>
    </aside>
  );
}

// Icons
function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}

function ProductsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}

function BackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
  );
}

function InquiriesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
