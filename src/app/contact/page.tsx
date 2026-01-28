import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT PAGE — CONTACTO
   Premium contact page focused on WhatsApp conversion
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos por WhatsApp para cotizar tu mueble. Mueblería Jenny Yax en San Andrés Semetabaj, Sololá, Guatemala. Sin pagos en línea, coordinamos todo por WhatsApp.",
  openGraph: {
    title: "Contacto | Mueblería Jenny Yax",
    description:
      "Escríbenos por WhatsApp. Te respondemos rápido y sin compromiso.",
    images: ["/api/og?title=Contáctanos&subtitle=Estamos%20para%20ayudarte"],
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <Container>
          <div className="max-w-2xl">
            <p className="text-overline uppercase tracking-wider text-brand">
              Contacto
            </p>
            <h1 className="mt-4 font-serif text-display text-text">
              Hablemos de tu próximo mueble
            </h1>
            <p className="mt-6 text-body-lg text-text-muted leading-relaxed">
              ¿Tienes una idea? ¿Necesitas medidas específicas? ¿Quieres ver más 
              trabajos? Escríbenos. Te respondemos rápido y sin compromiso.
            </p>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTACT METHODS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* ─────────────────────────────────────────────────────────────
                WHATSAPP CARD — PRIMARY
                ───────────────────────────────────────────────────────────── */}
            <div
              className={cn(
                "lg:col-span-2",
                "p-8 md:p-10 rounded-2xl",
                "bg-whatsapp/5 border-2 border-whatsapp/20",
                "relative overflow-hidden"
              )}
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-whatsapp/10 rounded-full blur-3xl" />
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-whatsapp flex items-center justify-center mb-6">
                  <WhatsAppIcon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h2 className="font-serif text-h2 text-text">
                  WhatsApp
                </h2>
                <p className="mt-2 text-small text-text-muted uppercase tracking-wide">
                  La forma más rápida de contactarnos
                </p>

                <p className="mt-6 text-body text-text-muted leading-relaxed max-w-lg">
                  Envíanos tus medidas, una foto de referencia o simplemente cuéntanos 
                  qué necesitas. Te respondemos con precio y tiempo de entrega.
                </p>

                {/* Phone number display */}
                <p className="mt-6 font-mono text-h3 text-text">
                  +502 4033-7845
                </p>

                {/* CTA */}
                <div className="mt-6">
                  <Button
                    variant="whatsapp"
                    size="xl"
                    className="min-w-[280px]"
                    asChild
                  >
                    <a
                      href="https://wa.me/50240337845?text=Hola%2C%20quisiera%20cotizar%20un%20mueble.%20%C2%BFMe%20pueden%20ayudar%3F"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <WhatsAppIcon className="w-5 h-5 mr-2" />
                      Abrir WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Quick prompts */}
                <div className="mt-8 pt-6 border-t border-whatsapp/20">
                  <p className="text-caption text-text-muted mb-3">
                    Ideas para tu mensaje:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <a
                        key={index}
                        href={`https://wa.me/50240337845?text=${encodeURIComponent(prompt.message)}`}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(
                          "px-3 py-1.5 rounded-full",
                          "bg-whatsapp/10 text-whatsapp",
                          "text-caption font-medium",
                          "transition-colors",
                          "hover:bg-whatsapp/20",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                        )}
                      >
                        {prompt.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                SECONDARY CONTACTS
                ───────────────────────────────────────────────────────────── */}
            <div className="space-y-6">
              {/* Email Card */}
              <div
                className={cn(
                  "p-6 rounded-2xl",
                  "bg-card border border-border"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-4">
                  <EmailIcon className="w-6 h-6 text-text-muted" />
                </div>

                <h3 className="font-serif text-h4 text-text">
                  Correo electrónico
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  Para consultas formales o documentos
                </p>

                <a
                  href="mailto:moisesyax46@gmail.com"
                  className={cn(
                    "mt-4 inline-flex items-center",
                    "text-body font-medium text-brand",
                    "hover:text-brand-hover transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
                  )}
                >
                  moisesyax46@gmail.com
                </a>
              </div>

              {/* Facebook Card */}
              <div
                className={cn(
                  "p-6 rounded-2xl",
                  "bg-card border border-border"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-[#1877F2]/10 flex items-center justify-center mb-4">
                  <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                </div>

                <h3 className="font-serif text-h4 text-text">
                  Facebook
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  Mira más fotos de nuestros trabajos
                </p>

                <a
                  href="https://www.facebook.com/Jennyyax2012/"
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "mt-4 inline-flex items-center gap-1",
                    "text-body font-medium text-[#1877F2]",
                    "hover:text-[#1877F2]/80 transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded"
                  )}
                >
                  @Jennyyax2012
                  <ExternalLinkIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Location Card */}
              <div
                className={cn(
                  "p-6 rounded-2xl",
                  "bg-card border border-border"
                )}
              >
                <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center mb-4">
                  <LocationIcon className="w-6 h-6 text-text-muted" />
                </div>

                <h3 className="font-serif text-h4 text-text">
                  Ubicación
                </h3>
                <p className="mt-2 text-body text-text-muted">
                  San Andrés Semetabaj,<br />
                  Sololá, Guatemala 🇬🇹
                </p>
                <p className="mt-3 text-caption text-text-subtle italic">
                  Visitas con cita previa por WhatsApp
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TRUST SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-bg-alt">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-h3 text-text">
              Cómo trabajamos
            </h2>
            <p className="mt-4 text-body text-text-muted leading-relaxed">
              <strong className="text-text">Sin pagos en línea.</strong> Coordinamos 
              todo por WhatsApp: medidas, diseño, precio y entrega. Así hemos trabajado 
              desde 2019, con confianza y transparencia.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "px-4 py-2 rounded-full",
                    "bg-surface border border-border",
                    "text-small text-text-muted"
                  )}
                >
                  <span className="text-success">✓</span>
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-h2 text-text text-center mb-12">
              Preguntas frecuentes
            </h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-6 rounded-2xl",
                    "bg-card border border-border"
                  )}
                >
                  <h3 className="font-serif text-h4 text-text">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-body text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-brand">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-h2 md:text-display text-white">
              ¿Tienes preguntas?
            </h2>
            <p className="mt-4 text-body-lg text-white/80">
              No dudes en escribirnos. Estamos aquí para ayudarte.
            </p>

            <div className="mt-8">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-brand hover:bg-white/90 min-w-[280px]"
                asChild
              >
                <a
                  href="https://wa.me/50240337845?text=Hola%2C%20tengo%20una%20pregunta."
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon className="w-5 h-5 mr-2" />
                  Escríbenos por WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const quickPrompts = [
  { label: "Cotizar ropero", message: "Hola, quisiera cotizar un ropero." },
  { label: "Mueble a medida", message: "Hola, necesito un mueble con medidas específicas." },
  { label: "Ver más trabajos", message: "Hola, me gustaría ver fotos de sus trabajos." },
  { label: "Consulta general", message: "Hola, tengo una pregunta." },
];

const trustBadges = [
  "Respuesta rápida",
  "Sin compromiso",
  "Precio transparente",
  "Entrega coordinada",
];

const faqs = [
  {
    question: "¿Cómo puedo hacer un pedido?",
    answer:
      "Escríbenos por WhatsApp con las medidas que necesitas, una foto de referencia si la tienes, y te damos precio y tiempo de entrega. Así de simple.",
  },
  {
    question: "¿Hacen envíos a toda Guatemala?",
    answer:
      "Sí, coordinamos entregas a diferentes partes del país. El costo varía según la distancia. Consúltanos por WhatsApp para darte un estimado.",
  },
  {
    question: "¿Cuánto tiempo tarda un mueble?",
    answer:
      "Depende del tipo y tamaño del mueble. Generalmente entre 1 y 3 semanas. Te damos un tiempo estimado cuando cotizamos.",
  },
  {
    question: "¿Puedo ver el mueble antes de recibirlo?",
    answer:
      "Claro. Te enviamos fotos del avance por WhatsApp. Si estás cerca, puedes visitarnos con cita previa para verlo en persona.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function LocationIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}
