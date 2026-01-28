"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { useSession } from "@/lib/hooks/use-session";
import { isAdminEmail } from "@/lib/admin";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN GUARD
   Protects admin routes - only allows access to admin emails
   ═══════════════════════════════════════════════════════════════════════════ */

interface AdminGuardProps {
  children: React.ReactNode;
}

const content = {
  loading: {
    es: "Verificando acceso...",
    en: "Verifying access...",
  },
  restricted: {
    title: {
      es: "Acceso restringido",
      en: "Restricted access",
    },
    notLoggedIn: {
      es: "Debes iniciar sesión para acceder al panel de administración.",
      en: "You must sign in to access the admin panel.",
    },
    notAuthorized: {
      es: "No tienes permisos para acceder al panel de administración.",
      en: "You don't have permission to access the admin panel.",
    },
    loginCta: {
      es: "Iniciar sesión",
      en: "Sign in",
    },
    homeCta: {
      es: "Volver al inicio",
      en: "Back to home",
    },
  },
};

export function AdminGuard({ children }: AdminGuardProps) {
  const { user, isLoading } = useSession();
  const { lang } = useLanguage();

  const c = {
    loading: lang === "es" ? content.loading.es : content.loading.en,
    restricted: {
      title: lang === "es" ? content.restricted.title.es : content.restricted.title.en,
      notLoggedIn: lang === "es" ? content.restricted.notLoggedIn.es : content.restricted.notLoggedIn.en,
      notAuthorized: lang === "es" ? content.restricted.notAuthorized.es : content.restricted.notAuthorized.en,
      loginCta: lang === "es" ? content.restricted.loginCta.es : content.restricted.loginCta.en,
      homeCta: lang === "es" ? content.restricted.homeCta.es : content.restricted.homeCta.en,
    },
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-body text-text-muted">{c.loading}</p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Container size="narrow">
          <div
            className={cn(
              "max-w-md mx-auto p-8 rounded-2xl text-center",
              "bg-card border border-border shadow-elevation-2"
            )}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-warning/10 flex items-center justify-center">
              <LockIcon />
            </div>
            <h1 className="font-serif text-h2 text-text">{c.restricted.title}</h1>
            <p className="mt-3 text-body text-text-muted">{c.restricted.notLoggedIn}</p>
            <div className="mt-6 space-y-3">
              <Button variant="primary" size="lg" fullWidth asChild>
                <Link href="/auth/login">{c.restricted.loginCta}</Link>
              </Button>
              <Button variant="ghost" size="md" fullWidth asChild>
                <Link href="/">{c.restricted.homeCta}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdminEmail(user.email)) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Container size="narrow">
          <div
            className={cn(
              "max-w-md mx-auto p-8 rounded-2xl text-center",
              "bg-card border border-border shadow-elevation-2"
            )}
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-error/10 flex items-center justify-center">
              <LockIcon />
            </div>
            <h1 className="font-serif text-h2 text-text">{c.restricted.title}</h1>
            <p className="mt-3 text-body text-text-muted">{c.restricted.notAuthorized}</p>
            <p className="mt-2 text-small text-text-subtle">
              {user.email}
            </p>
            <div className="mt-6">
              <Button variant="secondary" size="lg" fullWidth asChild>
                <Link href="/">{c.restricted.homeCta}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Authorized - render children
  return <>{children}</>;
}

function LockIcon() {
  return (
    <svg
      className="w-6 h-6 text-text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}
