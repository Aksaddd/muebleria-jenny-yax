"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon, FacebookIcon } from "@/components/ui/icons";
import { socialLinks, whatsappMessages, businessInfo } from "@/components/layout";

/* ═══════════════════════════════════════════════════════════════════════════
   HOME HERO
   Premium, Apple-like hero section with 2-column layout
   Communicates handcrafted quality, trust, and local legitimacy
   ═══════════════════════════════════════════════════════════════════════════ */

// Hero copy - bilingual (refined for brevity + authority)
const heroContent = {
  eyebrow: {
    es: `Desde ${businessInfo.founded} • San Andrés Semetabaj, Sololá`,
    en: `Since ${businessInfo.founded} • San Andrés Semetabaj, Sololá`,
  },
  // Short, declarative headline — premium feel
  headline: {
    es: "Muebles de madera, hechos para durar.",
    en: "Wooden furniture, built to last.",
  },
  // Expanded subheadline with product details
  subheadline: {
    es: "Roperos, trinchantes, libreros, burós, cunas y mesas — fabricados a mano en Guatemala. Pedidos personalizados por WhatsApp.",
    en: "Wardrobes, sideboards, bookshelves, nightstands, cribs, and tables — handcrafted in Guatemala. Custom orders via WhatsApp.",
  },
  motto: {
    es: businessInfo.motto.es,
    en: businessInfo.motto.en,
  },
  ctaPrimary: {
    es: "Pedir por WhatsApp",
    en: "Order via WhatsApp",
  },
  ctaSecondary: {
    es: "Ver productos",
    en: "View products",
  },
  noPayment: {
    es: "Sin pagos en línea — coordinamos todo por WhatsApp.",
    en: "No online payments — we coordinate everything via WhatsApp.",
  },
  // Quieter trust signals
  trustSignals: {
    es: ["Hecho a mano", "Pedidos a medida", "Entrega coordinada"],
    en: ["Handcrafted", "Custom orders", "Coordinated delivery"],
  },
  imageAlt: {
    es: "Artesanos de Mueblería Jenny Yax trabajando en roperos de madera con las montañas de Sololá al fondo",
    en: "Jenny Yax Furniture craftsmen working on wooden wardrobes with Sololá mountains in background",
  },
};

export function HomeHero() {
  const { lang, t } = useLanguage();

  const whatsappUrl = socialLinks.whatsapp.withMessage(
    lang === "es" ? whatsappMessages.general.es : whatsappMessages.general.en
  );

  const content = {
    eyebrow: lang === "es" ? heroContent.eyebrow.es : heroContent.eyebrow.en,
    headline: lang === "es" ? heroContent.headline.es : heroContent.headline.en,
    subheadline: lang === "es" ? heroContent.subheadline.es : heroContent.subheadline.en,
    motto: lang === "es" ? heroContent.motto.es : heroContent.motto.en,
    ctaPrimary: lang === "es" ? heroContent.ctaPrimary.es : heroContent.ctaPrimary.en,
    ctaSecondary: lang === "es" ? heroContent.ctaSecondary.es : heroContent.ctaSecondary.en,
    noPayment: lang === "es" ? heroContent.noPayment.es : heroContent.noPayment.en,
    trustSignals: lang === "es" ? heroContent.trustSignals.es : heroContent.trustSignals.en,
    imageAlt: lang === "es" ? heroContent.imageAlt.es : heroContent.imageAlt.en,
  };

  return (
    <section
      className="relative overflow-hidden bg-bg"
      aria-labelledby="hero-heading"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-subtle/20 via-transparent to-transparent" />

      <Container>
        <div className="relative py-12 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* ─────────────────────────────────────────────────────────────────
                Left Column: Content
                ───────────────────────────────────────────────────────────────── */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow */}
              <p className="text-overline uppercase tracking-wider text-text-muted">
                {content.eyebrow}
              </p>

              {/* Headline — short, declarative, authoritative */}
              <h1
                id="hero-heading"
                className="mt-4 font-serif text-display text-text"
              >
                {content.headline}
              </h1>

              {/* Subheadline — constrained width, relaxed line-height */}
              <p className="mt-5 text-body-lg text-text-muted max-w-md leading-relaxed">
                {content.subheadline}
              </p>

              {/* Trust Signals — quieter, whisper not shout */}
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1">
                {content.trustSignals.map((signal, index) => (
                  <TrustSignal key={index}>{signal}</TrustSignal>
                ))}
              </div>

              {/* CTA Cluster — grouped as one decision unit */}
              <div className="mt-8 space-y-3">
                {/* Primary + Secondary buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="whatsapp"
                    size="lg"
                    leftIcon={<WhatsAppIcon size={20} />}
                    asChild
                  >
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t(
                        "Abrir WhatsApp para hacer un pedido",
                        "Open WhatsApp to place an order"
                      )}
                    >
                      {content.ctaPrimary}
                    </a>
                  </Button>

                  <Button variant="secondary" size="lg" asChild>
                    <Link href="/products">{content.ctaSecondary}</Link>
                  </Button>
                </div>

                {/* No payment friction line — directly under CTAs */}
                <p className="text-small text-text-subtle">
                  {content.noPayment}
                </p>
              </div>

              {/* Motto + Facebook — subtle footer */}
              <div className="mt-10 pt-6 border-t border-border-subtle">
                <p className="text-small text-text-muted italic">
                  <span className="text-brand/70 mr-1">✝</span>
                  "{content.motto}"
                </p>

                {/* Facebook link — tertiary, quiet */}
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "mt-3 inline-flex items-center gap-1.5",
                    "text-caption text-text-subtle",
                    "transition-colors duration-fast",
                    "hover:text-[#1877F2]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                  )}
                >
                  <FacebookIcon size={14} />
                  {t("Síguenos en Facebook", "Follow us on Facebook")}
                </a>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────────
                Right Column: Single Hero Image
                One strong image = confidence
                ───────────────────────────────────────────────────────────────── */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                {/* Main Hero Image — single, confident */}
                <div
                  className={cn(
                    "relative aspect-[4/3]",
                    "rounded-2xl overflow-hidden",
                    "ring-1 ring-black/5",
                    "shadow-elevation-4",
                    "bg-surface"
                  )}
                >
                  <Image
                    src="/images/hero/workshop-roperos.webp"
                    alt={content.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Years badge — positioned subtly */}
                <div
                  className={cn(
                    "absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4",
                    "px-3 py-1.5 rounded-full",
                    "bg-bg border border-border",
                    "text-caption font-medium text-text-muted",
                    "shadow-elevation-2"
                  )}
                >
                  {t("6+ años de experiencia", "6+ years of experience")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Trust Signal — quieter, no border, muted
   These whisper, not shout
   ─────────────────────────────────────────────────────────────────────────── */

function TrustSignal({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 text-small text-text-subtle">
      <CheckIcon />
      {children}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5 text-success/70"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}
