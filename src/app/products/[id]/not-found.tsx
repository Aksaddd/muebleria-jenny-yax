"use client";

import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT NOT FOUND PAGE
   Clean 404 state for missing products
   ═══════════════════════════════════════════════════════════════════════════ */

const content = {
  title: {
    es: "Producto no encontrado",
    en: "Product not found",
  },
  description: {
    es: "El producto que buscas no está disponible o ha sido eliminado.",
    en: "The product you're looking for is not available or has been removed.",
  },
  cta: {
    es: "Ver todos los productos",
    en: "View all products",
  },
};

export default function ProductNotFound() {
  const { lang } = useLanguage();

  return (
    <section className="py-20 md:py-32">
      <Container size="narrow">
        <div className="text-center">
          <p className="text-display text-text-subtle mb-4">404</p>
          <h1 className="font-serif text-h2 text-text">
            {lang === "es" ? content.title.es : content.title.en}
          </h1>
          <p className="mt-4 text-body text-text-muted">
            {lang === "es" ? content.description.es : content.description.en}
          </p>
          <div className="mt-8">
            <Button variant="primary" size="lg" asChild>
              <Link href="/products">
                {lang === "es" ? content.cta.es : content.cta.en}
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
