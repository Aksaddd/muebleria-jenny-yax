import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT PAGE — NOSOTROS
   Compelling story of a Guatemalan family furniture business
   Premium editorial feel with strong storytelling
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce a Mueblería Jenny Yax. Desde 2019, Moses y Francisca Yax fabrican muebles de madera hechos a mano en San Andrés Semetabaj, Sololá, Guatemala. Calidad, tradición y fe en cada pieza.",
  openGraph: {
    title: "Nosotros | Mueblería Jenny Yax",
    description:
      "Conoce nuestra historia. Muebles de madera hechos a mano con amor y dedicación en Guatemala.",
    images: ["/api/og?title=Nuestra%20Historia&subtitle=Desde%202019%20en%20Guatemala"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-16 md:py-24 bg-bg-alt overflow-hidden">
        <Container>
          <div className="max-w-3xl">
            <p className="text-overline uppercase tracking-wider text-brand">
              Nuestra historia
            </p>
            <h1 className="mt-4 font-serif text-display md:text-[3.5rem] text-text leading-tight">
              Muebles con alma,<br className="hidden sm:block" /> hechos a mano
            </h1>
            <p className="mt-6 text-body-lg text-text-muted leading-relaxed max-w-2xl">
              Somos Moses y Francisca Yax, una familia guatemalteca dedicada a crear 
              muebles de madera que duran generaciones. Desde 2019, cada pieza que sale 
              de nuestro taller lleva nuestra fe, nuestro esfuerzo y nuestro compromiso 
              con la calidad.
            </p>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          STORY SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface order-2 lg:order-1">
              <Image
                src="/images/hero/workshop-roperos.webp"
                alt="Roperos siendo terminados a mano en nuestro taller"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <h2 className="font-serif text-h2 text-text">
                Una tradición que comenzó en 2019
              </h2>
              <div className="mt-6 space-y-4 text-body text-text-muted leading-relaxed max-w-prose">
                <p>
                  En San Andrés Semetabaj, Sololá, rodeados de los paisajes del altiplano 
                  guatemalteco, decidimos convertir nuestra pasión por la carpintería en 
                  algo más: un negocio familiar que honra la tradición artesanal de nuestra tierra.
                </p>
                <p>
                  No somos una fábrica. Somos un taller donde cada mueble recibe atención 
                  personal. Donde conocemos a nuestros clientes por nombre. Donde una promesa 
                  es una promesa.
                </p>
                <p>
                  Trabajamos con madera seleccionada, herramientas que conocemos como extensiones 
                  de nuestras manos, y una filosofía simple: hacer las cosas bien, aunque tome 
                  más tiempo.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          VALUES SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="font-serif text-h2 text-text">
              Lo que nos guía
            </h2>
            <p className="mt-4 text-body-lg text-text-muted">
              Más que un negocio, somos una familia con valores que se reflejan en cada pieza.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={cn(
                  "p-6 rounded-2xl",
                  "bg-card border border-border/50",
                  "text-center"
                )}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-brand-subtle flex items-center justify-center text-2xl">
                  {value.icon}
                </div>
                <h3 className="mt-4 font-serif text-h4 text-text">
                  {value.title}
                </h3>
                <p className="mt-2 text-small text-text-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Motto */}
          <div className="mt-12 md:mt-16 text-center">
            <blockquote className="relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-brand/20 font-serif">
                "
              </span>
              <p className="font-serif text-h3 md:text-h2 text-text italic">
                Dios es bueno Todo el Tiempo
              </p>
              <footer className="mt-4 text-small text-text-muted">
                — Nuestro lema familiar
              </footer>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROCESS SECTION — CÓMO TRABAJAMOS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mb-12 md:mb-16">
            <h2 className="font-serif text-h2 text-text">
              Cómo trabajamos
            </h2>
            <p className="mt-4 text-body-lg text-text-muted">
              Un proceso transparente, sin sorpresas. Así es como convertimos tu idea en realidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line (hidden on mobile, shown between items on desktop) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+24px)] w-[calc(100%-48px)] h-px bg-border" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Step number */}
                  <div
                    className={cn(
                      "w-16 h-16 rounded-full",
                      "bg-brand text-white",
                      "flex items-center justify-center",
                      "font-serif text-h3 font-bold"
                    )}
                  >
                    {index + 1}
                  </div>
                  
                  <h3 className="mt-4 font-serif text-h4 text-text">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-small text-text-muted max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust note */}
          <div className="mt-12 p-6 rounded-2xl bg-surface border border-border-subtle text-center">
            <p className="text-body text-text-muted">
              <strong className="text-text">Sin pagos en línea.</strong> Coordinamos todo por WhatsApp: 
              medidas, diseño, precio y entrega. Así trabajamos, con confianza y transparencia.
            </p>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRODUCTS SECTION — LO QUE FABRICAMOS
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="font-serif text-h2 text-text">
              Lo que fabricamos
            </h2>
            <p className="mt-4 text-body-lg text-text-muted">
              Cada categoría con el mismo estándar de calidad. Si no lo ves aquí, pregúntanos.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="/products"
                className={cn(
                  "group p-6 rounded-2xl",
                  "bg-card border border-border/50",
                  "text-center",
                  "transition-all duration-200",
                  "hover:border-brand/30 hover:shadow-card-hover hover:-translate-y-0.5",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
                )}
              >
                <span className="text-3xl">{category.icon}</span>
                <h3 className="mt-3 font-serif text-body font-semibold text-text group-hover:text-brand transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/products">
                Ver todos los productos
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          WORKSHOP IMAGE
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-surface">
            <Image
              src="/images/hero/storefront.webp"
              alt="Frente de Mueblería Jenny Yax con muebles exhibidos"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <p className="font-serif text-h3 md:text-h2 text-white">
                San Andrés Semetabaj, Sololá
              </p>
              <p className="mt-2 text-body text-white/80">
                Guatemala 🇬🇹
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CTA SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-brand">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-h2 md:text-display text-white">
              ¿Listo para tu próximo mueble?
            </h2>
            <p className="mt-4 text-body-lg text-white/80">
              Cuéntanos qué necesitas. Te respondemos rápido y sin compromiso.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="xl"
                className="bg-white text-brand hover:bg-white/90 min-w-[200px]"
                asChild
              >
                <a
                  href="https://wa.me/50240337845?text=Hola%2C%20vi%20su%20página%20y%20me%20gustaría%20cotizar%20un%20mueble."
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon />
                  Escríbenos ahora
                </a>
              </Button>

              <a
                href="https://www.facebook.com/Jennyyax2012/"
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "inline-flex items-center gap-2",
                  "text-white/80 hover:text-white",
                  "text-small font-medium",
                  "transition-colors"
                )}
              >
                <FacebookIcon />
                Síguenos en Facebook
              </a>
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

const values = [
  {
    icon: "🪵",
    title: "Calidad",
    description: "Madera seleccionada y acabados que resisten el tiempo.",
  },
  {
    icon: "🤝",
    title: "Confianza",
    description: "Hacemos lo que prometemos. Sin sorpresas, sin letra pequeña.",
  },
  {
    icon: "✝️",
    title: "Fe",
    description: "Nuestra fe guía nuestro trabajo y nuestras relaciones.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Familia",
    description: "Cada cliente es parte de nuestra familia extendida.",
  },
];

const processSteps = [
  {
    title: "Conversamos",
    description: "Nos cuentas qué necesitas por WhatsApp. Medidas, ideas, fotos de referencia—todo sirve.",
  },
  {
    title: "Cotizamos",
    description: "Te damos precio, tiempo de entrega y opciones. Sin compromiso, sin presión.",
  },
  {
    title: "Fabricamos",
    description: "Manos a la obra. Te mantenemos informado del avance de tu mueble.",
  },
  {
    title: "Entregamos",
    description: "Coordinamos la entrega. Tú recibes un mueble hecho con orgullo.",
  },
];

const categories = [
  { name: "Roperos", icon: "🚪" },
  { name: "Trinchantes", icon: "🍽️" },
  { name: "Libreros", icon: "📚" },
  { name: "Burós", icon: "🛏️" },
  { name: "Cunas", icon: "👶" },
  { name: "Mesas", icon: "🪑" },
  { name: "Personalizados", icon: "✨" },
  { name: "Y más...", icon: "➕" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════════════════════════════════ */

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}
