"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon, FacebookIcon } from "@/components/ui/icons";
import { socialLinks, businessInfo } from "@/components/layout";

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
   Builds trust through story, process clarity, and local legitimacy
   ═══════════════════════════════════════════════════════════════════════════ */

// Section copy - bilingual
const sectionContent = {
  eyebrow: {
    es: "Nuestra historia",
    en: "Our story",
  },
  title: {
    es: "Nosotros",
    en: "About Us",
  },
  description: {
    es: "Desde 2019, en San Andrés Semetabaj (Sololá), fabricamos muebles de madera hechos a mano — resistentes, elegantes y pensados para durar. Trabajamos roperos, trinchantes, libreros, burós, cunas y mesas. También realizamos pedidos personalizados.",
    en: "Since 2019, in San Andrés Semetabaj (Sololá), we craft handmade wooden furniture — durable, elegant, and built to last. We make wardrobes, sideboards, bookshelves, nightstands, cribs, and tables. We also take custom orders.",
  },
  trustPoints: [
    {
      es: "Hecho a mano con atención al detalle",
      en: "Handcrafted with attention to detail",
    },
    {
      es: "Pedidos a medida según tu espacio",
      en: "Custom orders tailored to your space",
    },
    {
      es: "Coordinación clara por WhatsApp (sin pagos en línea)",
      en: "Clear coordination via WhatsApp (no online payments)",
    },
  ],
  howItWorks: {
    title: {
      es: "Cómo funciona",
      en: "How it works",
    },
    steps: [
      {
        number: "1",
        es: "Escríbenos por WhatsApp con lo que necesitas",
        en: "Message us on WhatsApp with what you need",
      },
      {
        number: "2",
        es: "Te confirmamos diseño, precio y tiempo de entrega",
        en: "We confirm design, price, and delivery time",
      },
      {
        number: "3",
        es: "Fabricamos y coordinamos la entrega",
        en: "We build and coordinate delivery",
      },
    ],
  },
  cta: {
    primary: {
      es: "Hablar por WhatsApp",
      en: "Chat on WhatsApp",
    },
    secondary: {
      es: "Ver Facebook",
      en: "View Facebook",
    },
  },
  imageAlt: {
    es: "Taller de carpintería con roperos de madera siendo terminados a mano",
    en: "Carpentry workshop with wooden wardrobes being hand-finished",
  },
};

export function AboutSection() {
  const { lang, t } = useLanguage();

  const content = {
    eyebrow: lang === "es" ? sectionContent.eyebrow.es : sectionContent.eyebrow.en,
    title: lang === "es" ? sectionContent.title.es : sectionContent.title.en,
    description: lang === "es" ? sectionContent.description.es : sectionContent.description.en,
    trustPoints: sectionContent.trustPoints.map((point) =>
      lang === "es" ? point.es : point.en
    ),
    howItWorks: {
      title: lang === "es" ? sectionContent.howItWorks.title.es : sectionContent.howItWorks.title.en,
      steps: sectionContent.howItWorks.steps.map((step) => ({
        number: step.number,
        text: lang === "es" ? step.es : step.en,
      })),
    },
    cta: {
      primary: lang === "es" ? sectionContent.cta.primary.es : sectionContent.cta.primary.en,
      secondary: lang === "es" ? sectionContent.cta.secondary.es : sectionContent.cta.secondary.en,
    },
    imageAlt: lang === "es" ? sectionContent.imageAlt.es : sectionContent.imageAlt.en,
    motto: lang === "es" ? businessInfo.motto.es : businessInfo.motto.en,
  };

  // WhatsApp message for quote request
  const quoteMessage = lang === "es"
    ? "Hola, quisiera cotizar un mueble. ¿Me pueden ayudar?"
    : "Hello, I'd like to get a quote for furniture. Can you help me?";

  const whatsAppUrl = socialLinks.whatsapp.withMessage(quoteMessage);

  return (
    <section
      className="py-20 md:py-28 bg-bg"
      aria-labelledby="about-section-heading"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ─────────────────────────────────────────────────────────────────
              Left Column: Content
              ───────────────────────────────────────────────────────────────── */}
          <div className="order-2 lg:order-1">
            {/* Header */}
            <p className="text-overline uppercase tracking-wider text-text-subtle">
              {content.eyebrow}
            </p>
            <h2
              id="about-section-heading"
              className="mt-3 font-serif text-h2 text-text"
            >
              {content.title}
            </h2>

            {/* Description — constrained for readability */}
            <p className="mt-5 text-body text-text-muted leading-relaxed max-w-xl">
              {content.description}
            </p>

            {/* Trust Points */}
            <ul className="mt-8 space-y-3">
              {content.trustPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0">
                    <CheckCircleIcon />
                  </span>
                  <span className="text-body text-text-muted">{point}</span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="my-10 border-t border-border-subtle" />

            {/* How It Works */}
            <div>
              <h3 className="font-serif text-h4 text-text">
                {content.howItWorks.title}
              </h3>

              <ol className="mt-6 space-y-4">
                {content.howItWorks.steps.map((step) => (
                  <li key={step.number} className="flex items-start gap-4">
                    <span
                      className={cn(
                        "shrink-0 flex items-center justify-center",
                        "w-8 h-8 rounded-full",
                        "bg-brand-subtle text-brand",
                        "text-small font-semibold"
                      )}
                    >
                      {step.number}
                    </span>
                    <span className="text-body text-text-muted pt-1">
                      {step.text}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Motto */}
            <p className="mt-10 text-small text-text-subtle italic">
              <span className="text-brand/60 mr-1">✝</span>
              "{content.motto}"
            </p>

            {/* CTAs — clear separation from process steps */}
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                leftIcon={<WhatsAppIcon size={20} />}
                asChild
              >
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t(
                    "Abrir WhatsApp para cotización",
                    "Open WhatsApp for quote"
                  )}
                >
                  {content.cta.primary}
                </a>
              </Button>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-4 py-3",
                  "text-small font-medium text-text-muted",
                  "transition-colors duration-200",
                  "hover:text-[#1877F2]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md"
                )}
              >
                <FacebookIcon size={18} />
                {content.cta.secondary}
              </a>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Right Column: Image
              ───────────────────────────────────────────────────────────────── */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div
                className={cn(
                  "relative aspect-[4/3] lg:aspect-[3/4]",
                  "rounded-2xl overflow-hidden",
                  "ring-1 ring-black/5",
                  "shadow-elevation-3"
                )}
              >
                <Image
                  src="/images/hero/workshop-roperos.webp"
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Secondary Image - subtle overlap */}
              <div
                className={cn(
                  "absolute -bottom-6 -right-4 lg:-bottom-8 lg:-right-6",
                  "w-32 h-24 sm:w-40 sm:h-32 lg:w-48 lg:h-36",
                  "rounded-xl overflow-hidden",
                  "ring-4 ring-bg",
                  "shadow-elevation-4",
                  "hidden sm:block"
                )}
              >
                <Image
                  src="/images/workshop/lumber-yard.webp"
                  alt={t(
                    "Madera de calidad secándose para fabricación de muebles",
                    "Quality wood drying for furniture production"
                  )}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>

              {/* Years Badge */}
              <div
                className={cn(
                  "absolute top-4 left-4",
                  "px-3 py-1.5 rounded-full",
                  "bg-bg/90 backdrop-blur-sm",
                  "border border-border/50",
                  "text-caption font-medium text-text-muted"
                )}
              >
                {t("Desde 2019", "Since 2019")}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Check Circle Icon
   ─────────────────────────────────────────────────────────────────────────── */

function CheckCircleIcon() {
  return (
    <svg
      className="w-5 h-5 text-success"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
