"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { useSession } from "@/lib/hooks/use-session";
import { supabase } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════════════════════
   ACCOUNT PAGE
   User account dashboard (placeholder for future features)
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: {
    es: "Mi cuenta",
    en: "My account",
  },
  welcome: {
    es: "Bienvenido",
    en: "Welcome",
  },
  email: {
    es: "Correo electrónico",
    en: "Email",
  },
  logout: {
    es: "Cerrar sesión",
    en: "Sign out",
  },
  loggingOut: {
    es: "Cerrando sesión...",
    en: "Signing out...",
  },
  ordersNote: {
    es: "Tus pedidos aparecerán aquí cuando habilitemos el seguimiento.",
    en: "Your orders will appear here when we enable tracking.",
  },
  notLoggedIn: {
    title: {
      es: "No has iniciado sesión",
      en: "Not signed in",
    },
    description: {
      es: "Inicia sesión para ver tu cuenta y solicitudes.",
      en: "Sign in to view your account and requests.",
    },
    loginCta: {
      es: "Iniciar sesión",
      en: "Sign in",
    },
    registerCta: {
      es: "Crear cuenta",
      en: "Create account",
    },
  },
  loading: {
    es: "Cargando...",
    en: "Loading...",
  },
};

export default function AccountPage() {
  const router = useRouter();
  const { lang, t } = useLanguage();
  const { user, isLoading, isConfigured } = useSession();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const content = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    welcome: lang === "es" ? pageContent.welcome.es : pageContent.welcome.en,
    email: lang === "es" ? pageContent.email.es : pageContent.email.en,
    logout: lang === "es" ? pageContent.logout.es : pageContent.logout.en,
    loggingOut: lang === "es" ? pageContent.loggingOut.es : pageContent.loggingOut.en,
    ordersNote: lang === "es" ? pageContent.ordersNote.es : pageContent.ordersNote.en,
    notLoggedIn: {
      title: lang === "es" ? pageContent.notLoggedIn.title.es : pageContent.notLoggedIn.title.en,
      description: lang === "es" ? pageContent.notLoggedIn.description.es : pageContent.notLoggedIn.description.en,
      loginCta: lang === "es" ? pageContent.notLoggedIn.loginCta.es : pageContent.notLoggedIn.loginCta.en,
      registerCta: lang === "es" ? pageContent.notLoggedIn.registerCta.es : pageContent.notLoggedIn.registerCta.en,
    },
    loading: lang === "es" ? pageContent.loading.es : pageContent.loading.en,
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <div className="text-center">
            <p className="text-body text-text-muted">{content.loading}</p>
          </div>
        </Container>
      </section>
    );
  }

  // Not logged in state
  if (!user) {
    return (
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <div className="mx-auto max-w-md text-center">
            <div
              className={cn(
                "p-8 rounded-2xl",
                "bg-card border border-border",
                "shadow-elevation-2"
              )}
            >
              <h1 className="font-serif text-h2 text-text">
                {content.notLoggedIn.title}
              </h1>
              <p className="mt-3 text-body text-text-muted">
                {content.notLoggedIn.description}
              </p>

              <div className="mt-8 space-y-3">
                <Button variant="primary" size="lg" fullWidth asChild>
                  <Link href="/auth/login">{content.notLoggedIn.loginCta}</Link>
                </Button>
                <Button variant="secondary" size="lg" fullWidth asChild>
                  <Link href="/auth/register">
                    {content.notLoggedIn.registerCta}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Logged in state
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="max-w-2xl">
          {/* Header */}
          <h1 className="font-serif text-display text-text">{content.title}</h1>
          <p className="mt-2 text-body-lg text-text-muted">
            {content.welcome}
          </p>

          {/* Account Info Card */}
          <div
            className={cn(
              "mt-8 p-6 rounded-2xl",
              "bg-card border border-border",
              "shadow-elevation-1"
            )}
          >
            <div className="space-y-4">
              {/* Email */}
              <div>
                <p className="text-small text-text-muted">{content.email}</p>
                <p className="text-body text-text font-medium">{user.email}</p>
              </div>

              {/* Logout Button */}
              <div className="pt-4 border-t border-border-subtle">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? content.loggingOut : content.logout}
                </Button>
              </div>
            </div>
          </div>

          {/* Orders Placeholder */}
          <div
            className={cn(
              "mt-6 p-6 rounded-2xl",
              "bg-surface border border-border-subtle"
            )}
          >
            <p className="text-body text-text-muted italic">
              {content.ordersNote}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
