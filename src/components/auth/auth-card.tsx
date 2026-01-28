"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";

/* ═══════════════════════════════════════════════════════════════════════════
   AUTH CARD
   Shared layout wrapper for authentication pages
   ═══════════════════════════════════════════════════════════════════════════ */

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

export function AuthCard({ children, title, subtitle, footer }: AuthCardProps) {
  return (
    <section className="min-h-[calc(100vh-200px)] flex items-center py-12 md:py-16">
      <Container size="narrow">
        <div className="mx-auto max-w-md">
          {/* Logo/Brand Link */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-block font-serif text-h3 text-text hover:text-brand transition-colors"
            >
              Jenny Yax
            </Link>
          </div>

          {/* Card */}
          <div
            className={cn(
              "p-6 md:p-8 rounded-2xl",
              "bg-card border border-border",
              "shadow-elevation-2"
            )}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="font-serif text-h2 text-text">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-body text-text-muted">{subtitle}</p>
              )}
            </div>

            {/* Form Content */}
            {children}

            {/* Footer */}
            {footer && (
              <div className="mt-6 pt-6 border-t border-border-subtle text-center">
                {footer}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
