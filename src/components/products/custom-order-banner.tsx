"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { WhatsAppIcon } from "@/components/ui/icons";
import { socialLinks } from "@/components/layout";

/* ═══════════════════════════════════════════════════════════════════════════
   CUSTOM ORDER BANNER
   Premium callout for custom/personalized orders
   ═══════════════════════════════════════════════════════════════════════════ */

const bannerContent = {
  title: {
    es: "¿No encuentras lo que buscas?",
    en: "Can't find what you're looking for?",
  },
  description: {
    es: "Fabricamos muebles a tu medida. Envíanos tus especificaciones y te damos una cotización.",
    en: "We build custom furniture. Send us your specifications and we'll give you a quote.",
  },
  cta: {
    es: "Solicitar diseño personalizado",
    en: "Request custom design",
  },
  features: {
    es: ["Medidas exactas", "Diseño único", "Cotización gratuita"],
    en: ["Exact measurements", "Unique design", "Free quote"],
  },
};

export function CustomOrderBanner() {
  const { lang, t } = useLanguage();

  const content = {
    title: lang === "es" ? bannerContent.title.es : bannerContent.title.en,
    description:
      lang === "es" ? bannerContent.description.es : bannerContent.description.en,
    cta: lang === "es" ? bannerContent.cta.es : bannerContent.cta.en,
    features:
      lang === "es" ? bannerContent.features.es : bannerContent.features.en,
  };

  const customOrderMessage =
    lang === "es"
      ? "Hola, me interesa un mueble personalizado. Mis especificaciones son: _____"
      : "Hello, I'm interested in custom furniture. My specifications are: _____";

  const whatsAppUrl = socialLinks.whatsapp.withMessage(customOrderMessage);

  return (
    <div
      className={cn(
        "p-6 md:p-8 rounded-2xl",
        "bg-surface border border-border",
        "ring-1 ring-black/5"
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-lg">
          <h3 className="font-serif text-h3 text-text">{content.title}</h3>
          <p className="mt-2 text-body text-text-muted">{content.description}</p>

          {/* Feature chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {content.features.map((feature, index) => (
              <span
                key={index}
                className={cn(
                  "inline-flex items-center gap-1",
                  "px-3 py-1 rounded-full",
                  "bg-brand-subtle/50 text-brand",
                  "text-caption font-medium"
                )}
              >
                <CheckIcon />
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0">
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
                "Abrir WhatsApp para pedido personalizado",
                "Open WhatsApp for custom order"
              )}
            >
              {content.cta}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
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
