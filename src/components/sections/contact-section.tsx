"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Input, Textarea, Select, Label } from "@/components/ui/input";
import { useLanguage } from "@/components/ui/language-toggle";
import {
  WhatsAppIcon,
  FacebookIcon,
  PhoneIcon,
  MailIcon,
} from "@/components/ui/icons";
import { socialLinks, contactInfo } from "@/components/layout";

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT SECTION
   WhatsApp-first conversion with helper chips and fallback form
   Primary goal: Make contacting effortless
   ═══════════════════════════════════════════════════════════════════════════ */

// Section copy - bilingual
const sectionContent = {
  eyebrow: {
    es: "Contacto",
    en: "Contact",
  },
  title: {
    es: "Contacto",
    en: "Contact",
  },
  description: {
    es: "¿Listo para cotizar o hacer un pedido? Escríbenos por WhatsApp y te respondemos.",
    en: "Ready to get a quote or place an order? Message us on WhatsApp and we'll respond.",
  },
  whatsappCard: {
    title: {
      es: "Pedir por WhatsApp",
      en: "Order via WhatsApp",
    },
    description: {
      es: "Envíanos una foto o medidas y te confirmamos precio y tiempo de entrega.",
      en: "Send us a photo or measurements and we'll confirm price and delivery time.",
    },
    cta: {
      es: "Abrir WhatsApp",
      en: "Open WhatsApp",
    },
    chips: {
      es: ["Cotización", "Pedido personalizado", "Tiempo de entrega"],
      en: ["Quote", "Custom order", "Delivery time"],
    },
  },
  contactDetails: {
    title: {
      es: "Otros medios",
      en: "Other channels",
    },
  },
  trustLine: {
    es: "Sin pagos en línea — coordinamos todo por WhatsApp.",
    en: "No online payments — we coordinate everything via WhatsApp.",
  },
  form: {
    title: {
      es: "Solicitar cotización",
      en: "Request a quote",
    },
    fields: {
      name: {
        label: { es: "Nombre", en: "Name" },
        placeholder: { es: "Tu nombre", en: "Your name" },
      },
      phone: {
        label: { es: "Teléfono o WhatsApp", en: "Phone or WhatsApp" },
        placeholder: { es: "+502 0000-0000", en: "+502 0000-0000" },
      },
      product: {
        label: { es: "Producto", en: "Product" },
        placeholder: { es: "Seleccionar...", en: "Select..." },
        options: {
          es: ["Ropero", "Trinchante", "Librero", "Buró", "Cuna", "Mesa", "Otro"],
          en: ["Wardrobe", "Sideboard", "Bookshelf", "Nightstand", "Crib", "Table", "Other"],
        },
      },
      message: {
        label: { es: "Mensaje", en: "Message" },
        placeholder: {
          es: "Describe lo que necesitas (medidas, estilo, etc.)...",
          en: "Describe what you need (measurements, style, etc.)...",
        },
      },
    },
    submit: {
      es: "Enviar por WhatsApp",
      en: "Send via WhatsApp",
    },
    note: {
      es: "Tu mensaje se abrirá en WhatsApp para envío directo.",
      en: "Your message will open in WhatsApp for direct sending.",
    },
  },
};

// Product options for select
const productOptions = [
  { value: "ropero", labelEs: "Ropero", labelEn: "Wardrobe" },
  { value: "trinchante", labelEs: "Trinchante", labelEn: "Sideboard" },
  { value: "librero", labelEs: "Librero", labelEn: "Bookshelf" },
  { value: "buro", labelEs: "Buró", labelEn: "Nightstand" },
  { value: "cuna", labelEs: "Cuna", labelEn: "Crib" },
  { value: "mesa", labelEs: "Mesa", labelEn: "Table" },
  { value: "otro", labelEs: "Otro", labelEn: "Other" },
];

export function ContactSection() {
  const { lang, t } = useLanguage();

  // Form state
  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    product: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const content = {
    eyebrow: lang === "es" ? sectionContent.eyebrow.es : sectionContent.eyebrow.en,
    title: lang === "es" ? sectionContent.title.es : sectionContent.title.en,
    description: lang === "es" ? sectionContent.description.es : sectionContent.description.en,
    whatsappCard: {
      title: lang === "es" ? sectionContent.whatsappCard.title.es : sectionContent.whatsappCard.title.en,
      description: lang === "es" ? sectionContent.whatsappCard.description.es : sectionContent.whatsappCard.description.en,
      cta: lang === "es" ? sectionContent.whatsappCard.cta.es : sectionContent.whatsappCard.cta.en,
      chips: lang === "es" ? sectionContent.whatsappCard.chips.es : sectionContent.whatsappCard.chips.en,
    },
    contactDetails: {
      title: lang === "es" ? sectionContent.contactDetails.title.es : sectionContent.contactDetails.title.en,
    },
    trustLine: lang === "es" ? sectionContent.trustLine.es : sectionContent.trustLine.en,
    form: {
      title: lang === "es" ? sectionContent.form.title.es : sectionContent.form.title.en,
      fields: {
        name: {
          label: lang === "es" ? sectionContent.form.fields.name.label.es : sectionContent.form.fields.name.label.en,
          placeholder: lang === "es" ? sectionContent.form.fields.name.placeholder.es : sectionContent.form.fields.name.placeholder.en,
        },
        phone: {
          label: lang === "es" ? sectionContent.form.fields.phone.label.es : sectionContent.form.fields.phone.label.en,
          placeholder: lang === "es" ? sectionContent.form.fields.phone.placeholder.es : sectionContent.form.fields.phone.placeholder.en,
        },
        product: {
          label: lang === "es" ? sectionContent.form.fields.product.label.es : sectionContent.form.fields.product.label.en,
          placeholder: lang === "es" ? sectionContent.form.fields.product.placeholder.es : sectionContent.form.fields.product.placeholder.en,
        },
        message: {
          label: lang === "es" ? sectionContent.form.fields.message.label.es : sectionContent.form.fields.message.label.en,
          placeholder: lang === "es" ? sectionContent.form.fields.message.placeholder.es : sectionContent.form.fields.message.placeholder.en,
        },
      },
      submit: lang === "es" ? sectionContent.form.submit.es : sectionContent.form.submit.en,
      note: lang === "es" ? sectionContent.form.note.es : sectionContent.form.note.en,
    },
  };

  // WhatsApp deep link with detailed prefilled message
  const whatsappMessage = lang === "es"
    ? "Hola, quisiera cotizar un mueble. Tengo estas medidas: _____ y busco un diseño similar a: _____."
    : "Hello, I'd like to get a quote for furniture. My measurements are: _____ and I'm looking for a design similar to: _____.";

  const whatsAppUrl = socialLinks.whatsapp.withMessage(whatsappMessage);

  // Compose WhatsApp message from form data
  const composeWhatsAppMessage = () => {
    const productLabel = productOptions.find((p) => p.value === formData.product);
    const productName = productLabel
      ? lang === "es"
        ? productLabel.labelEs
        : productLabel.labelEn
      : formData.product;

    const messageParts = [];

    if (lang === "es") {
      messageParts.push("Hola, quisiera cotizar un mueble.");
      if (formData.name) messageParts.push(`Mi nombre es ${formData.name}.`);
      if (formData.phone) messageParts.push(`Mi teléfono es ${formData.phone}.`);
      if (productName) messageParts.push(`Me interesa: ${productName}.`);
      if (formData.message) messageParts.push(`Detalles: ${formData.message}`);
    } else {
      messageParts.push("Hello, I'd like to get a furniture quote.");
      if (formData.name) messageParts.push(`My name is ${formData.name}.`);
      if (formData.phone) messageParts.push(`My phone is ${formData.phone}.`);
      if (productName) messageParts.push(`I'm interested in: ${productName}.`);
      if (formData.message) messageParts.push(`Details: ${formData.message}`);
    }

    return messageParts.join(" ");
  };

  // Handle form submission — save to DB then open WhatsApp
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Import dynamically to avoid bundling issues
      const { submitInquiry } = await import("@/lib/db/inquiries");
      
      const productLabel = productOptions.find((p) => p.value === formData.product);
      const productName = productLabel
        ? lang === "es"
          ? productLabel.labelEs
          : productLabel.labelEn
        : formData.product || null;

      // Save to database
      await submitInquiry({
        name: formData.name,
        contact: formData.phone,
        product_category: productName,
        message: formData.message || composeWhatsAppMessage(),
        source: "website",
      });

      setSubmitStatus("success");
      
      // Open WhatsApp
      const message = composeWhatsAppMessage();
      const url = socialLinks.whatsapp.withMessage(message);
      window.open(url, "_blank");

      // Reset form after short delay
      setTimeout(() => {
        setFormData({ name: "", phone: "", product: "", message: "" });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus("error");
      
      // Still open WhatsApp even if DB save fails
      const message = composeWhatsAppMessage();
      const url = socialLinks.whatsapp.withMessage(message);
      window.open(url, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="py-20 md:py-28 bg-bg-alt"
      aria-labelledby="contact-section-heading"
    >
      <Container>
        {/* Section Header */}
        <div className="max-w-xl mb-12">
          <p className="text-overline uppercase tracking-wider text-text-subtle">
            {content.eyebrow}
          </p>
          <h2
            id="contact-section-heading"
            className="mt-3 font-serif text-h2 text-text"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-body-lg text-text-muted leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ─────────────────────────────────────────────────────────────────
              Left Column: WhatsApp Card + Contact Details
              ───────────────────────────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* WhatsApp Conversion Card */}
            <div
              className={cn(
                "p-6 md:p-8 rounded-2xl",
                "bg-whatsapp/5 border border-whatsapp/20",
                "ring-1 ring-whatsapp/10"
              )}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-whatsapp flex items-center justify-center">
                  <WhatsAppIcon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-h4 text-text">
                    {content.whatsappCard.title}
                  </h3>
                  <p className="mt-2 text-body text-text-muted">
                    {content.whatsappCard.description}
                  </p>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="mt-6">
                <Button
                  variant="whatsapp"
                  size="lg"
                  fullWidth
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
                    {content.whatsappCard.cta}
                  </a>
                </Button>
              </div>

              {/* Helper Chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {content.whatsappCard.chips.map((chip, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-flex items-center",
                      "px-3 py-1 rounded-full",
                      "bg-whatsapp/10 text-whatsapp",
                      "text-caption font-medium"
                    )}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-small font-semibold text-text uppercase tracking-wide mb-4">
                {content.contactDetails.title}
              </h3>

              <ul className="space-y-3">
                {/* Phone/WhatsApp */}
                <li>
                  <a
                    href={`tel:${contactInfo.phoneRaw}`}
                    className={cn(
                      "flex items-center gap-3",
                      "p-3 rounded-lg",
                      "bg-surface border border-border/50",
                      "text-body text-text-muted",
                      "transition-all duration-200",
                      "hover:border-brand/30 hover:text-brand",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    )}
                  >
                    <PhoneIcon size={18} className="shrink-0 text-text-subtle" />
                    <span>{contactInfo.phone}</span>
                  </a>
                </li>

                {/* Email */}
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className={cn(
                      "flex items-center gap-3",
                      "p-3 rounded-lg",
                      "bg-surface border border-border/50",
                      "text-body text-text-muted",
                      "transition-all duration-200",
                      "hover:border-brand/30 hover:text-brand",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    )}
                  >
                    <MailIcon size={18} className="shrink-0 text-text-subtle" />
                    <span>{contactInfo.email}</span>
                  </a>
                </li>

                {/* Facebook */}
                <li>
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-center gap-3",
                      "p-3 rounded-lg",
                      "bg-surface border border-border/50",
                      "text-body text-text-muted",
                      "transition-all duration-200",
                      "hover:border-[#1877F2]/30 hover:text-[#1877F2]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                    )}
                  >
                    <FacebookIcon size={18} className="shrink-0 text-text-subtle" />
                    <span>Facebook</span>
                  </a>
                </li>
              </ul>

              {/* Trust Line */}
              <p className="mt-6 text-small text-text-subtle italic">
                {content.trustLine}
              </p>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────
              Right Column: Quote Request Form
              ───────────────────────────────────────────────────────────────── */}
          <div>
            <div
              className={cn(
                "p-6 md:p-8 rounded-2xl",
                "bg-card border border-border",
                "ring-1 ring-black/5",
                "shadow-elevation-2"
              )}
            >
              <h3 className="font-serif text-h4 text-text">
                {content.form.title}
              </h3>
              <p className="mt-2 text-small text-text-muted">
                {content.form.note}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Name */}
                <div>
                  <Label htmlFor="contact-name">
                    {content.form.fields.name.label}
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder={content.form.fields.name.placeholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="contact-phone">
                    {content.form.fields.phone.label}
                  </Label>
                  <Input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    placeholder={content.form.fields.phone.placeholder}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Product */}
                <div>
                  <Label htmlFor="contact-product">
                    {content.form.fields.product.label}
                  </Label>
                  <Select
                    id="contact-product"
                    name="product"
                    value={formData.product}
                    onChange={(e) =>
                      setFormData({ ...formData, product: e.target.value })
                    }
                    className="mt-1.5"
                  >
                    <option value="">
                      {content.form.fields.product.placeholder}
                    </option>
                    {productOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {lang === "es" ? option.labelEs : option.labelEn}
                      </option>
                    ))}
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="contact-message">
                    {content.form.fields.message.label}
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder={content.form.fields.message.placeholder}
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="mt-1.5"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={<WhatsAppIcon size={18} />}
                >
                  {content.form.submit}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
