"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import { FacebookIcon } from "@/components/ui/icons";
import { socialLinks } from "@/components/layout";
import {
  CategoryFilter,
  ProductGridDb,
  CustomOrderBanner,
} from "@/components/products";
import type { DbProduct, ProductCategory } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS CATALOG CONTENT
   Client component with filtering (receives products from server)
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductsCatalogContentProps {
  products: DbProduct[];
}

// Page content - bilingual
const pageContent = {
  title: {
    es: "Productos",
    en: "Products",
  },
  subtitle: {
    es: "Muebles hechos a mano. Pedidos por WhatsApp.",
    en: "Handcrafted furniture. Orders via WhatsApp.",
  },
  trustLine: {
    es: "Sin pagos en línea — coordinamos todo por WhatsApp.",
    en: "No online payments — we coordinate everything via WhatsApp.",
  },
  facebookLink: {
    es: "Ver más en Facebook",
    en: "See more on Facebook",
  },
  resultsCount: {
    es: (count: number) =>
      count === 1 ? "1 producto" : `${count} productos`,
    en: (count: number) =>
      count === 1 ? "1 product" : `${count} products`,
  },
  noProducts: {
    es: "No hay productos en esta categoría.",
    en: "No products in this category.",
  },
};

export function ProductsCatalogContent({ products }: ProductsCatalogContentProps) {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<
    ProductCategory | "Todos"
  >("Todos");

  const content = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    subtitle: lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en,
    trustLine:
      lang === "es" ? pageContent.trustLine.es : pageContent.trustLine.en,
    facebookLink:
      lang === "es" ? pageContent.facebookLink.es : pageContent.facebookLink.en,
    resultsCount:
      lang === "es" ? pageContent.resultsCount.es : pageContent.resultsCount.en,
    noProducts:
      lang === "es" ? pageContent.noProducts.es : pageContent.noProducts.en,
  };

  // Filter products by selected category (client-side)
  const filteredProducts = React.useMemo(() => {
    if (selectedCategory === "Todos") {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <>
      {/* Page Hero */}
      <section className="py-12 md:py-16 bg-bg-alt border-b border-border-subtle">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-serif text-display text-text">
              {content.title}
            </h1>
            <p className="mt-4 text-body-lg text-text-muted">
              {content.subtitle}
            </p>

            {/* Trust line + Facebook link */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-small text-text-subtle italic">
                {content.trustLine}
              </p>
              <span className="hidden sm:block text-border">•</span>
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-1.5",
                  "text-small text-text-subtle",
                  "transition-colors duration-200",
                  "hover:text-[#1877F2]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-sm"
                )}
              >
                <FacebookIcon size={14} />
                {content.facebookLink}
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Catalog Section */}
      <section className="py-12 md:py-16">
        <Container>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            {/* Results Count */}
            <p className="text-small text-text-muted">
              {content.resultsCount(filteredProducts.length)}
            </p>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <ProductGridDb products={filteredProducts} />
          ) : (
            <div className="py-16 text-center">
              <p className="text-body text-text-muted mb-4">{content.noProducts}</p>
              <a
                href="https://wa.me/50240337845?text=Hola%2C%20quisiera%20información%20sobre%20sus%20muebles."
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center justify-center gap-2",
                  "px-6 py-3 rounded-lg",
                  "bg-whatsapp text-white",
                  "text-small font-semibold",
                  "transition-all duration-200",
                  "hover:bg-whatsapp-hover"
                )}
              >
                {lang === "es" ? "Contáctanos por WhatsApp" : "Contact us on WhatsApp"}
              </a>
            </div>
          )}

          {/* Custom Order Banner */}
          <div className="mt-16">
            <CustomOrderBanner />
          </div>
        </Container>
      </section>
    </>
  );
}
