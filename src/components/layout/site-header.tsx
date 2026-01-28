"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { LanguageToggle, useLanguage } from "@/components/ui/language-toggle";
import {
  WhatsAppIcon,
  FacebookIcon,
  MenuIcon,
  CloseIcon,
} from "@/components/ui/icons";
import {
  navLinks,
  socialLinks,
  whatsappMessages,
  businessInfo,
} from "./nav-links";
import { useSession } from "@/lib/hooks/use-session";
import { isAdminEmail } from "@/lib/admin";

/* ═══════════════════════════════════════════════════════════════════════════
   SITE HEADER
   Sticky header with navigation, language toggle, and WhatsApp CTA
   ═══════════════════════════════════════════════════════════════════════════ */

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const { user, isLoading } = useSession();

  // Check if user is admin
  const isAdmin = user && isAdminEmail(user.email);

  // Close menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const whatsappUrl = socialLinks.whatsapp.withMessage(
    lang === "es" ? whatsappMessages.general.es : whatsappMessages.general.en
  );

  // Account link text
  const accountLinkText = user
    ? t("Mi cuenta", "My account")
    : t("Iniciar sesión", "Sign in");
  const accountLinkHref = user ? "/account" : "/auth/login";

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-bg/80 backdrop-blur-md",
        "border-b border-border/50",
        "transition-all duration-normal"
      )}
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 md:h-18"
          aria-label="Navegación principal"
        >
          {/* ─────────────────────────────────────────────────────────────────
              Logo
              ───────────────────────────────────────────────────────────────── */}
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2",
              "text-text font-serif font-semibold text-lg",
              "transition-opacity duration-fast hover:opacity-80",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 rounded-sm"
            )}
            aria-label={`${businessInfo.name} - ${t("Inicio", "Home")}`}
          >
            {/* Text Logo - Clean and elegant */}
            <span className="flex flex-col leading-none">
              <span className="text-h4 tracking-tight">Jenny Yax</span>
              <span className="text-[10px] text-text-muted font-sans font-normal uppercase tracking-widest">
                Mueblería
              </span>
            </span>
          </Link>

          {/* ─────────────────────────────────────────────────────────────────
              Desktop Navigation
              ───────────────────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={pathname === link.href}
              >
                {lang === "es" ? link.labelEs : link.labelEn}
              </NavLink>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Desktop Actions
              ───────────────────────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />

            {/* Admin Link (only for admins) */}
            {!isLoading && isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "px-3 py-2 rounded-md",
                  "text-small font-medium",
                  "transition-all duration-fast",
                  pathname.startsWith("/admin")
                    ? "text-brand bg-brand-subtle"
                    : "text-text-muted hover:text-text hover:bg-surface",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                )}
              >
                Admin
              </Link>
            )}

            {/* Account Link */}
            {!isLoading && (
              <Link
                href={accountLinkHref}
                className={cn(
                  "px-3 py-2 rounded-md",
                  "text-small font-medium",
                  "transition-all duration-fast",
                  pathname === "/account" || pathname.startsWith("/auth")
                    ? "text-brand bg-brand-subtle"
                    : "text-text-muted hover:text-text hover:bg-surface",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                )}
              >
                {accountLinkText}
              </Link>
            )}

            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "inline-flex items-center justify-center",
                "w-10 h-10 rounded-md",
                "text-text-muted hover:text-[#1877F2] hover:bg-surface",
                "transition-all duration-fast",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
              )}
              aria-label="Facebook"
            >
              <FacebookIcon size={20} />
            </a>

            {/* WhatsApp CTA */}
            <Button
              variant="whatsapp"
              size="sm"
              asChild
              leftIcon={<WhatsAppIcon size={18} />}
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t("Abrir WhatsApp", "Open WhatsApp")}
              >
                {t("Pedir", "Order")}
              </a>
            </Button>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Mobile Menu Button
              ───────────────────────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden",
              "inline-flex items-center justify-center",
              "w-12 h-12 -mr-2",
              "text-text",
              "rounded-md",
              "transition-colors duration-fast",
              "hover:bg-surface",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? t("Cerrar menú", "Close menu") : t("Abrir menú", "Open menu")}
          >
            {mobileMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
      </Container>

      {/* ═════════════════════════════════════════════════════════════════════
          Mobile Menu Panel
          ═════════════════════════════════════════════════════════════════════ */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          "fixed inset-x-0 top-16",
          "bg-bg/95 backdrop-blur-lg",
          "border-b border-border",
          "transition-all duration-normal ease-out-expo",
          "overflow-hidden",
          mobileMenuOpen
            ? "max-h-[calc(100vh-4rem)] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <Container>
          <div className="py-6 space-y-6">
            {/* Mobile Nav Links */}
            <nav className="space-y-1" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  active={pathname === link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {lang === "es" ? link.labelEs : link.labelEn}
                </MobileNavLink>
              ))}

              {/* Admin Link - Mobile (only for admins) */}
              {!isLoading && isAdmin && (
                <MobileNavLink
                  href="/admin"
                  active={pathname.startsWith("/admin")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </MobileNavLink>
              )}

              {/* Account Link - Mobile */}
              {!isLoading && (
                <MobileNavLink
                  href={accountLinkHref}
                  active={pathname === "/account" || pathname.startsWith("/auth")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {accountLinkText}
                </MobileNavLink>
              )}
            </nav>

            {/* Divider */}
            <div className="border-t border-border" />

            {/* Mobile Actions */}
            <div className="space-y-4">
              {/* Language Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-small text-text-muted">
                  {t("Idioma", "Language")}
                </span>
                <LanguageToggle />
              </div>

              {/* WhatsApp CTA - Full width */}
              <Button
                variant="whatsapp"
                size="lg"
                fullWidth
                leftIcon={<WhatsAppIcon size={20} />}
                asChild
              >
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t("Abrir WhatsApp", "Open WhatsApp")}
                >
                  {t("Hacer un pedido", "Place an order")}
                </a>
              </Button>

              {/* Facebook Link */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex items-center justify-center gap-2",
                  "w-full h-12",
                  "text-small font-medium text-text-muted",
                  "border border-border rounded-md",
                  "transition-all duration-fast",
                  "hover:text-[#1877F2] hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5"
                )}
              >
                <FacebookIcon size={18} />
                {t("Síguenos en Facebook", "Follow us on Facebook")}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 bg-black/20 md:hidden -z-10"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Desktop Nav Link
   ─────────────────────────────────────────────────────────────────────────── */

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-2 rounded-md",
        "text-small font-medium",
        "transition-all duration-fast",
        active
          ? "text-brand bg-brand-subtle"
          : "text-text-muted hover:text-text hover:bg-surface",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Mobile Nav Link
   ─────────────────────────────────────────────────────────────────────────── */

function MobileNavLink({
  href,
  active,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center",
        "w-full px-4 py-3 rounded-lg",
        "text-body font-medium",
        "transition-all duration-fast",
        active
          ? "text-brand bg-brand-subtle"
          : "text-text hover:bg-surface",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-focus"
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
