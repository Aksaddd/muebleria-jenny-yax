"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { useLanguage } from "@/components/ui/language-toggle";
import {
  WhatsAppIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
} from "@/components/ui/icons";
import {
  navLinks,
  contactInfo,
  socialLinks,
  businessInfo,
  whatsappMessages,
} from "./nav-links";

/* ═══════════════════════════════════════════════════════════════════════════
   SITE FOOTER
   Warm, grounded footer with business info, links, and contact
   ═══════════════════════════════════════════════════════════════════════════ */

export function SiteFooter() {
  const { lang, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const whatsappUrl = socialLinks.whatsapp.withMessage(
    lang === "es" ? whatsappMessages.general.es : whatsappMessages.general.en
  );

  return (
    <footer className="bg-brand-2 text-text-inverse" role="contentinfo">
      {/* Main Footer Content */}
      <div className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* ─────────────────────────────────────────────────────────────────
                Column 1: Brand & Motto
                ───────────────────────────────────────────────────────────────── */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className={cn(
                  "inline-block",
                  "transition-opacity duration-fast hover:opacity-80",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                )}
              >
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-h3 tracking-tight text-white">
                    Jenny Yax
                  </span>
                  <span className="text-[11px] text-white/60 font-sans font-normal uppercase tracking-widest mt-1">
                    Mueblería
                  </span>
                </span>
              </Link>

              {/* Motto */}
              <p className="mt-4 text-body text-white/70 italic">
                "{lang === "es" ? businessInfo.motto.es : businessInfo.motto.en}"
              </p>

              {/* Tagline */}
              <p className="mt-4 text-small text-white/50">
                {t(
                  `Desde ${businessInfo.founded} • ${businessInfo.tagline.es}`,
                  `Since ${businessInfo.founded} • ${businessInfo.tagline.en}`
                )}
              </p>
            </div>

            {/* ─────────────────────────────────────────────────────────────────
                Column 2: Quick Links
                ───────────────────────────────────────────────────────────────── */}
            <div>
              <h3 className="font-serif text-h4 text-white mb-4">
                {t("Enlaces", "Links")}
              </h3>
              <nav aria-label={t("Enlaces del pie de página", "Footer links")}>
                <ul className="space-y-2">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          "inline-block py-1",
                          "text-small text-white/70",
                          "transition-colors duration-fast",
                          "hover:text-white",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                        )}
                      >
                        {lang === "es" ? link.labelEs : link.labelEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ─────────────────────────────────────────────────────────────────
                Column 3: Contact Info
                ───────────────────────────────────────────────────────────────── */}
            <div>
              <h3 className="font-serif text-h4 text-white mb-4">
                {t("Contacto", "Contact")}
              </h3>
              <ul className="space-y-3">
                {/* Phone / WhatsApp */}
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-start gap-3",
                      "text-small text-white/70",
                      "transition-colors duration-fast",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    )}
                  >
                    <PhoneIcon size={18} className="mt-0.5 shrink-0" />
                    <span>{contactInfo.phone}</span>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={cn(
                      "flex items-start gap-3",
                      "text-small text-white/70",
                      "transition-colors duration-fast",
                      "hover:text-white",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm"
                    )}
                  >
                    <MailIcon size={18} className="mt-0.5 shrink-0" />
                    <span>{contactInfo.email}</span>
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3 text-small text-white/70">
                  <MapPinIcon size={18} className="mt-0.5 shrink-0" />
                  <span>
                    {lang === "es"
                      ? contactInfo.address.es
                      : contactInfo.address.en}
                  </span>
                </li>

                {/* Hours */}
                <li className="flex items-start gap-3 text-small text-white/70">
                  <ClockIcon size={18} className="mt-0.5 shrink-0" />
                  <span>
                    {lang === "es" ? contactInfo.hours.es : contactInfo.hours.en}
                  </span>
                </li>
              </ul>
            </div>

            {/* ─────────────────────────────────────────────────────────────────
                Column 4: Social & CTA
                ───────────────────────────────────────────────────────────────── */}
            <div>
              <h3 className="font-serif text-h4 text-white mb-4">
                {t("Síguenos", "Follow Us")}
              </h3>

              {/* Social Links */}
              <div className="flex gap-3">
                {/* Facebook */}
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-11 h-11 rounded-lg",
                    "bg-white/10 text-white",
                    "transition-all duration-fast",
                    "hover:bg-[#1877F2] hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  )}
                  aria-label="Facebook"
                >
                  <FacebookIcon size={22} />
                </a>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-11 h-11 rounded-lg",
                    "bg-white/10 text-white",
                    "transition-all duration-fast",
                    "hover:bg-whatsapp hover:text-white",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  )}
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon size={22} />
                </a>
              </div>

              {/* Call to Action */}
              <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-small text-white/80 mb-3">
                  {t(
                    "¿Listo para tu mueble ideal?",
                    "Ready for your ideal furniture?"
                  )}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-4 py-2 rounded-md",
                    "bg-whatsapp text-white text-small font-semibold",
                    "transition-all duration-fast",
                    "hover:bg-whatsapp-hover",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  )}
                >
                  <WhatsAppIcon size={18} />
                  {t("Contáctanos", "Contact Us")}
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-caption text-white/50">
              © {currentYear} {businessInfo.name}.{" "}
              {t("Todos los derechos reservados.", "All rights reserved.")}
            </p>
            <p className="text-caption text-white/40">
              {t(businessInfo.tagline.es, businessInfo.tagline.en)}
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
