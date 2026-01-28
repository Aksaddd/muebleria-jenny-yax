"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/ui/icons";

/* ═══════════════════════════════════════════════════════════════════════════
   BREADCRUMB
   Navigation breadcrumb for product pages
   Quiet on mobile, subtle visual hierarchy
   ═══════════════════════════════════════════════════════════════════════════ */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 md:mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-caption md:text-small opacity-70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "text-text-muted py-1",
                    "transition-colors duration-200",
                    "hover:text-brand hover:opacity-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(
                    "py-1",
                    isLast ? "text-text-muted font-medium" : "text-text-muted"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRightIcon
                  size={12}
                  className="mx-1 text-text-subtle/50 shrink-0"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
