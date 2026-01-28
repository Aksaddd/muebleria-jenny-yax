"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon } from "@/components/ui/icons";
import { socialLinks } from "@/components/layout";
import { type Product, categoryLabels } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT CARD
   Premium card for product catalog display
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t } = useLanguage();

  const name = lang === "es" ? product.name.es : product.name.en;
  const description =
    lang === "es" ? product.shortDescription.es : product.shortDescription.en;
  const alt = lang === "es" ? product.image.alt.es : product.image.alt.en;
  const categoryLabel =
    lang === "es"
      ? categoryLabels[product.category].es
      : categoryLabels[product.category].en;

  // WhatsApp message for this product
  const whatsappMessage =
    lang === "es"
      ? `Hola, me interesa este producto: ${name}. ¿Me pueden dar precio y tiempo de entrega?`
      : `Hello, I'm interested in this product: ${name}. Can you give me the price and delivery time?`;

  const whatsAppUrl = socialLinks.whatsapp.withMessage(whatsappMessage);

  return (
    <article
      className={cn(
        "group relative flex flex-col",
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
          src={product.image.src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={cn(
            "object-cover",
            "transition-transform duration-300 ease-out",
            "group-hover:scale-[1.03]"
          )}
        />

        {/* Category Badge */}
        <div
          className={cn(
            "absolute top-3 left-3",
            "px-2.5 py-1 rounded-full",
            "bg-bg/90 backdrop-blur-sm",
            "border border-border/50",
            "text-caption font-medium text-text-muted"
          )}
        >
          {categoryLabel}
        </div>

        {/* Availability Badge (if not available) */}
        {!product.available && (
          <div
            className={cn(
              "absolute top-3 right-3",
              "px-2.5 py-1 rounded-full",
              "bg-warning/90 backdrop-blur-sm",
              "text-caption font-medium text-white"
            )}
          >
            {t("Agotado", "Sold Out")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 md:p-5">
        {/* Product Name */}
        <h3 className="font-serif text-body md:text-h4 font-semibold text-text group-hover:text-brand transition-colors duration-200">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 md:mt-2 text-caption md:text-small text-text-muted line-clamp-2 flex-1">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-4 flex flex-col gap-2">
          {/* WhatsApp - Primary action - min 48px touch target */}
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "inline-flex items-center justify-center gap-2",
              "w-full px-4 py-3 rounded-lg",
              "min-h-[48px]",
              "bg-whatsapp text-white",
              "text-small font-semibold",
              "transition-all duration-200",
              "hover:bg-whatsapp-hover",
              "active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
            aria-label={`${t("Pedir por WhatsApp", "Order via WhatsApp")}: ${name}`}
          >
            <WhatsAppIcon size={18} />
            {t("Pedir por WhatsApp", "Order via WhatsApp")}
          </a>

          {/* View Details - Secondary action - min 48px touch target */}
          <Link
            href={`/products/${product.slug}`}
            className={cn(
              "inline-flex items-center justify-center",
              "w-full px-4 py-3 rounded-lg",
              "min-h-[48px]",
              "text-small font-medium",
              "bg-surface border border-border",
              "text-text-muted",
              "transition-all duration-200",
              "hover:border-brand/30 hover:text-brand hover:bg-brand-subtle/30",
              "active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            )}
          >
            {t("Ver detalles", "View details")}
          </Link>
        </div>
      </div>
    </article>
  );
}
