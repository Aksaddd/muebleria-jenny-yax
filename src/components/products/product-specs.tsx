"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/ui/language-toggle";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT SPECS
   Specifications table for product details
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductSpecsProps {
  features?: string[];
}

// Default specs when specific data is not available
const defaultSpecs = {
  es: [
    { label: "Material", value: "Madera (según disponibilidad)" },
    { label: "Acabado", value: "A elección" },
    { label: "Medidas", value: "Se confirma por WhatsApp" },
    { label: "Tiempo de entrega", value: "Se confirma por WhatsApp" },
  ],
  en: [
    { label: "Material", value: "Wood (subject to availability)" },
    { label: "Finish", value: "Your choice" },
    { label: "Dimensions", value: "Confirmed via WhatsApp" },
    { label: "Delivery time", value: "Confirmed via WhatsApp" },
  ],
};

const sectionContent = {
  title: {
    es: "Detalles",
    en: "Details",
  },
  featuresTitle: {
    es: "Características",
    en: "Features",
  },
};

export function ProductSpecs({ features }: ProductSpecsProps) {
  const { lang } = useLanguage();

  const specs = lang === "es" ? defaultSpecs.es : defaultSpecs.en;
  const title = lang === "es" ? sectionContent.title.es : sectionContent.title.en;
  const featuresTitle =
    lang === "es" ? sectionContent.featuresTitle.es : sectionContent.featuresTitle.en;

  return (
    <div className="space-y-6">
      {/* Features (if available) */}
      {features && features.length > 0 && (
        <div>
          <h3 className="text-small font-semibold text-text uppercase tracking-wide mb-3">
            {featuresTitle}
          </h3>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-body text-text-muted">
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Specs Table */}
      <div>
        <h3 className="text-small font-semibold text-text uppercase tracking-wide mb-3">
          {title}
        </h3>
        <dl className="space-y-3">
          {specs.map((spec, index) => (
            <div
              key={index}
              className={cn(
                "flex justify-between py-2",
                index !== specs.length - 1 && "border-b border-border-subtle"
              )}
            >
              <dt className="text-small text-text-muted">{spec.label}</dt>
              <dd className="text-small text-text font-medium">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
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
