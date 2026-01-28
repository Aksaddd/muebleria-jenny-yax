"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon, ChevronRightIcon, FacebookIcon } from "@/components/ui/icons";
import { socialLinks } from "@/components/layout";
import type { DbProduct } from "@/lib/db/types";
import { CATEGORY_LABELS, type ProductCategory } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED PRODUCTS CONTENT
   Client component that renders featured products from database
   ═══════════════════════════════════════════════════════════════════════════ */

interface FeaturedProductsContentProps {
  products: DbProduct[];
}

// Placeholder image
const PLACEHOLDER_IMAGE = "/images/hero/storefront.webp";

// Section copy - bilingual
const sectionContent = {
  eyebrow: {
    es: "Nuestra colección",
    en: "Our collection",
  },
  title: {
    es: "Productos destacados",
    en: "Featured products",
  },
  description: {
    es: "Muebles hechos a mano con madera selecta. Pedidos personalizados disponibles.",
    en: "Handcrafted furniture with select wood. Custom orders available.",
  },
  viewAll: {
    es: "Ver todos los productos",
    en: "View all products",
  },
  noPayment: {
    es: "Sin pagos en línea — coordinamos todo por WhatsApp.",
    en: "No online payments — we coordinate everything via WhatsApp.",
  },
  facebookLink: {
    es: "Ver más trabajos en Facebook",
    en: "See more work on Facebook",
  },
  customOrder: {
    title: {
      es: "¿Buscas un diseño a medida?",
      en: "Looking for a custom design?",
    },
    description: {
      es: "Fabricamos muebles según tus especificaciones. Escríbenos y lo hacemos realidad.",
      en: "We build furniture to your specifications. Message us and we'll make it happen.",
    },
    cta: {
      es: "Solicitar diseño personalizado",
      en: "Request custom design",
    },
  },
  card: {
    viewDetails: {
      es: "Ver detalles",
      en: "View details",
    },
    orderWhatsApp: {
      es: "Pedir por WhatsApp",
      en: "Order via WhatsApp",
    },
  },
};

export function FeaturedProductsContent({ products }: FeaturedProductsContentProps) {
  const { lang, t } = useLanguage();

  const content = {
    eyebrow: lang === "es" ? sectionContent.eyebrow.es : sectionContent.eyebrow.en,
    title: lang === "es" ? sectionContent.title.es : sectionContent.title.en,
    description: lang === "es" ? sectionContent.description.es : sectionContent.description.en,
    viewAll: lang === "es" ? sectionContent.viewAll.es : sectionContent.viewAll.en,
    noPayment: lang === "es" ? sectionContent.noPayment.es : sectionContent.noPayment.en,
    facebookLink: lang === "es" ? sectionContent.facebookLink.es : sectionContent.facebookLink.en,
    customOrder: {
      title: lang === "es" ? sectionContent.customOrder.title.es : sectionContent.customOrder.title.en,
      description: lang === "es" ? sectionContent.customOrder.description.es : sectionContent.customOrder.description.en,
      cta: lang === "es" ? sectionContent.customOrder.cta.es : sectionContent.customOrder.cta.en,
    },
    card: {
      viewDetails: lang === "es" ? sectionContent.card.viewDetails.es : sectionContent.card.viewDetails.en,
      orderWhatsApp: lang === "es" ? sectionContent.card.orderWhatsApp.es : sectionContent.card.orderWhatsApp.en,
    },
  };

  // WhatsApp message for custom orders
  const customOrderMessage = lang === "es"
    ? "Hola, me interesa hacer un pedido personalizado. ¿Me pueden ayudar?"
    : "Hello, I'm interested in placing a custom order. Can you help me?";

  const customWhatsAppUrl = socialLinks.whatsapp.withMessage(customOrderMessage);

  return (
    <section
      className="py-20 md:py-28 bg-bg-alt"
      aria-labelledby="featured-products-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-xl mb-14 md:mb-18">
          <p className="text-overline uppercase tracking-wider text-text-subtle">
            {content.eyebrow}
          </p>
          <h2
            id="featured-products-heading"
            className="mt-3 font-serif text-h2 text-text"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-body text-text-muted/80 max-w-md leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {products.map((product) => (
            <FeaturedProductCard
              key={product.id}
              product={product}
              lang={lang}
              cardContent={content.card}
            />
          ))}
        </div>

        {/* Custom Order Banner */}
        <div
          className={cn(
            "mt-14 md:mt-18",
            "p-8 md:p-10 rounded-2xl",
            "bg-surface border border-border",
            "flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          )}
        >
          <div className="max-w-md">
            <h3 className="font-serif text-h3 text-text">
              {content.customOrder.title}
            </h3>
            <p className="mt-2 text-body text-text-muted">
              {content.customOrder.description}
            </p>
          </div>
          <div className="shrink-0">
            <Button
              variant="whatsapp"
              size="lg"
              leftIcon={<WhatsAppIcon size={20} />}
              asChild
            >
              <a
                href={customWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t(
                  "Abrir WhatsApp para pedido personalizado",
                  "Open WhatsApp for custom order"
                )}
              >
                {content.customOrder.cta}
              </a>
            </Button>
          </div>
        </div>

        {/* Footer: View All + Trust Line + Facebook */}
        <div className="mt-10 pt-8 border-t border-border-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/products"
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "text-body font-medium text-brand",
                  "transition-colors duration-fast",
                  "hover:text-brand-hover",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                )}
              >
                {content.viewAll}
                <ChevronRightIcon size={18} />
              </Link>

              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "text-small text-text-subtle",
                  "transition-colors duration-fast",
                  "hover:text-[#1877F2]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                )}
              >
                <FacebookIcon size={14} />
                {content.facebookLink}
              </a>
            </div>

            <p className="text-small text-text-subtle">
              {content.noPayment}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Featured Product Card Component
   ─────────────────────────────────────────────────────────────────────────── */

interface FeaturedProductCardProps {
  product: DbProduct;
  lang: "es" | "en";
  cardContent: {
    viewDetails: string;
    orderWhatsApp: string;
  };
}

function FeaturedProductCard({ product, lang, cardContent }: FeaturedProductCardProps) {
  const name = lang === "es" ? product.name : (product.name_en || product.name);
  const description = lang === "es" 
    ? product.short_description 
    : (product.short_description_en || product.short_description);
  const alt = lang === "es" 
    ? (product.image_alt || product.name) 
    : (product.image_alt_en || product.image_alt || product.name);

  const imageUrl = product.image_url || PLACEHOLDER_IMAGE;

  // WhatsApp message for this product
  const productMessage = lang === "es"
    ? `Hola, me interesa: ${name}. ¿Me pueden dar precio y disponibilidad?`
    : `Hello, I'm interested in: ${name}. Can you give me the price and availability?`;

  const whatsAppUrl = socialLinks.whatsapp.withMessage(productMessage);

  return (
    <article
      className={cn(
        "group relative",
        "bg-card rounded-2xl overflow-hidden",
        "border border-border/50",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-card-hover hover:border-border",
        "focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover",
            "transition-transform duration-300 ease-out",
            "group-hover:scale-[1.03]"
          )}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Product Name */}
        <h3 className="font-serif text-h4 text-text group-hover:text-brand transition-colors duration-200">
          {name}
        </h3>

        {/* Description - truncated */}
        <p className="mt-1.5 text-small text-text-subtle line-clamp-2">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {/* View Details - Primary action */}
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "inline-flex items-center justify-center",
              "w-full px-4 py-2.5 rounded-lg",
              "min-h-[44px]",
              "text-small font-medium",
              "bg-surface border border-border",
              "text-text",
              "transition-all duration-200",
              "hover:bg-brand-subtle hover:border-brand/20 hover:text-brand",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
          >
            {cardContent.viewDetails}
          </Link>

          {/* WhatsApp - Secondary action */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-1.5",
              "w-full px-4 py-2 rounded-lg",
              "min-h-[44px]",
              "text-small font-medium",
              "text-whatsapp",
              "transition-colors duration-200",
              "hover:bg-whatsapp/5",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
            aria-label={`${cardContent.orderWhatsApp}: ${name}`}
          >
            <WhatsAppIcon size={16} />
            {cardContent.orderWhatsApp}
          </a>
        </div>
      </div>
    </article>
  );
}
