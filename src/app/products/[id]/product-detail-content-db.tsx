"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon, FacebookIcon } from "@/components/ui/icons";
import { socialLinks } from "@/components/layout";
import {
  ProductGallery,
  ProductSpecs,
  Breadcrumb,
  ProductGridDb,
  type BreadcrumbItem,
} from "@/components/products";
import type { DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT DETAIL CONTENT (Database Version)
   Client component for product detail page rendering
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductDetailContentDbProps {
  product: DbProduct;
  relatedProducts: DbProduct[];
  categoryLabel: { es: string; en: string };
}

// Placeholder image
const PLACEHOLDER_IMAGE = "/images/hero/storefront.webp";

// Page content - bilingual
const pageContent = {
  breadcrumbProducts: {
    es: "Productos",
    en: "Products",
  },
  trustChips: {
    es: ["Hecho a mano", "Pedidos personalizados", "Entrega coordinada"],
    en: ["Handcrafted", "Custom orders", "Coordinated delivery"],
  },
  whatsappCta: {
    es: "Pedir por WhatsApp",
    en: "Order via WhatsApp",
  },
  viewMoreProducts: {
    es: "Ver más productos",
    en: "View more products",
  },
  facebookLink: {
    es: "Ver en Facebook",
    en: "View on Facebook",
  },
  trustLine: {
    es: "Sin pagos en línea — coordinamos todo por WhatsApp.",
    en: "No online payments — we coordinate everything via WhatsApp.",
  },
  orderingTitle: {
    es: "¿Cómo pedir?",
    en: "How to order?",
  },
  orderingSteps: {
    es: [
      "Escríbenos por WhatsApp con el producto que te interesa",
      "Te confirmamos precio, medidas disponibles y tiempo de entrega",
      "Fabricamos y coordinamos la entrega contigo",
    ],
    en: [
      "Message us on WhatsApp with the product you're interested in",
      "We'll confirm price, available sizes, and delivery time",
      "We build and coordinate delivery with you",
    ],
  },
  relatedTitle: {
    es: "También te puede interesar",
    en: "You might also like",
  },
};

export function ProductDetailContentDb({
  product,
  relatedProducts,
  categoryLabel,
}: ProductDetailContentDbProps) {
  const { lang, t } = useLanguage();

  // Localized content
  const name = lang === "es" ? product.name : (product.name_en || product.name);
  const description =
    lang === "es"
      ? product.short_description
      : (product.short_description_en || product.short_description);
  const imageAlt =
    lang === "es"
      ? (product.image_alt || product.name)
      : (product.image_alt_en || product.image_alt || product.name);
  const category = lang === "es" ? categoryLabel.es : categoryLabel.en;

  const content = {
    breadcrumbProducts:
      lang === "es"
        ? pageContent.breadcrumbProducts.es
        : pageContent.breadcrumbProducts.en,
    trustChips:
      lang === "es" ? pageContent.trustChips.es : pageContent.trustChips.en,
    whatsappCta:
      lang === "es" ? pageContent.whatsappCta.es : pageContent.whatsappCta.en,
    viewMoreProducts:
      lang === "es"
        ? pageContent.viewMoreProducts.es
        : pageContent.viewMoreProducts.en,
    facebookLink:
      lang === "es" ? pageContent.facebookLink.es : pageContent.facebookLink.en,
    trustLine:
      lang === "es" ? pageContent.trustLine.es : pageContent.trustLine.en,
    orderingTitle:
      lang === "es" ? pageContent.orderingTitle.es : pageContent.orderingTitle.en,
    orderingSteps:
      lang === "es"
        ? pageContent.orderingSteps.es
        : pageContent.orderingSteps.en,
    relatedTitle:
      lang === "es" ? pageContent.relatedTitle.es : pageContent.relatedTitle.en,
  };

  // Breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: content.breadcrumbProducts, href: "/products" },
    { label: category, href: "/products" },
    { label: name },
  ];

  // WhatsApp message
  const whatsappMessage =
    lang === "es"
      ? `Hola, me interesa este producto: ${name}. ¿Me pueden dar precio, medidas disponibles y tiempo de entrega?`
      : `Hello, I'm interested in this product: ${name}. Can you give me the price, available sizes, and delivery time?`;

  const whatsAppUrl = socialLinks.whatsapp.withMessage(whatsappMessage);

  // Image URL with fallback
  const imageUrl = product.image_url || PLACEHOLDER_IMAGE;

  return (
    <>
      {/* Main Product Section */}
      <section className="py-6 md:py-12">
        <Container>
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left: Gallery */}
            <div>
              <ProductGallery
                images={[{ src: imageUrl, alt: imageAlt }]}
                productName={name}
              />
              
              {/* Mobile-only: WhatsApp CTA directly under image */}
              <div className="mt-6 lg:hidden">
                <Button
                  variant="whatsapp"
                  size="xl"
                  fullWidth
                  leftIcon={<WhatsAppIcon size={22} />}
                  asChild
                >
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${content.whatsappCta}: ${name}`}
                  >
                    {content.whatsappCta}
                  </a>
                </Button>
                <p className="mt-2 text-center text-caption text-text-subtle">
                  {content.trustLine}
                </p>
              </div>
            </div>

            {/* Right: Product Info */}
            <div>
              {/* Category Badge */}
              <span
                className={cn(
                  "inline-block px-2.5 py-1 rounded-full",
                  "bg-brand-subtle/50 text-brand",
                  "text-caption font-medium",
                  "mb-3"
                )}
              >
                {category}
              </span>

              {/* Product Name */}
              <h1 className="font-serif text-h2 md:text-display text-text">{name}</h1>

              {/* Description */}
              <p className="mt-3 md:mt-4 text-body md:text-body-lg text-text-muted leading-relaxed max-w-prose">
                {description}
              </p>

              {/* Trust Chips - quieter on mobile */}
              <div className="mt-4 md:mt-6 flex flex-wrap gap-x-3 gap-y-1">
                {content.trustChips.map((chip, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-flex items-center gap-1",
                      "text-caption md:text-small text-text-subtle"
                    )}
                  >
                    <CheckIcon />
                    {chip}
                  </span>
                ))}
              </div>

              {/* Desktop-only: CTAs */}
              <div className="hidden lg:block mt-8 space-y-3">
                {/* Primary: WhatsApp */}
                <Button
                  variant="whatsapp"
                  size="xl"
                  fullWidth
                  leftIcon={<WhatsAppIcon size={22} />}
                  asChild
                >
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${content.whatsappCta}: ${name}`}
                  >
                    {content.whatsappCta}
                  </a>
                </Button>

                {/* Secondary: View More */}
                <Button variant="secondary" size="lg" fullWidth asChild>
                  <Link href="/products">{content.viewMoreProducts}</Link>
                </Button>

                {/* Trust Line */}
                <p className="text-small text-text-subtle italic">
                  {content.trustLine}
                </p>
              </div>

              {/* Facebook Link */}
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "mt-4 inline-flex items-center gap-1.5",
                  "text-caption text-text-subtle",
                  "transition-colors duration-200",
                  "hover:text-[#1877F2]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                )}
              >
                <FacebookIcon size={14} />
                {content.facebookLink}
              </a>

              {/* Divider */}
              <div className="my-6 md:my-8 border-t border-border-subtle" />

              {/* Specs */}
              <ProductSpecs features={product.features || undefined} />

              {/* Divider */}
              <div className="my-6 md:my-8 border-t border-border-subtle" />

              {/* How to Order */}
              <div>
                <h3 className="text-caption md:text-small font-semibold text-text uppercase tracking-wide mb-3 md:mb-4">
                  {content.orderingTitle}
                </h3>
                <ol className="space-y-2 md:space-y-3">
                  {content.orderingSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span
                        className={cn(
                          "shrink-0 flex items-center justify-center",
                          "w-5 h-5 md:w-6 md:h-6 rounded-full",
                          "bg-brand-subtle text-brand",
                          "text-caption font-semibold"
                        )}
                      >
                        {index + 1}
                      </span>
                      <span className="text-caption md:text-small text-text-muted pt-0.5">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* Mobile: Secondary CTA at bottom */}
              <div className="mt-6 lg:hidden">
                <Button variant="secondary" size="lg" fullWidth asChild>
                  <Link href="/products">{content.viewMoreProducts}</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pb-12 md:pb-24">
          <Container>
            <h2 className="font-serif text-h3 text-text mb-8">
              {content.relatedTitle}
            </h2>
            <ProductGridDb products={relatedProducts} columns={3} />
          </Container>
        </section>
      )}
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 text-success shrink-0"
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
