/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION CONFIGURATION
   Single source of truth for all navigation links (header + footer)
   ═══════════════════════════════════════════════════════════════════════════ */

export type NavLink = {
  href: string;
  labelEs: string;
  labelEn: string;
};

export const navLinks: NavLink[] = [
  {
    href: "/",
    labelEs: "Inicio",
    labelEn: "Home",
  },
  {
    href: "/products",
    labelEs: "Productos",
    labelEn: "Products",
  },
  {
    href: "/about",
    labelEs: "Nosotros",
    labelEn: "About",
  },
  {
    href: "/contact",
    labelEs: "Contacto",
    labelEn: "Contact",
  },
];

/* ───────────────────────────────────────────────────────────────────────────
   Contact & Social Links
   ─────────────────────────────────────────────────────────────────────────── */

export const contactInfo = {
  phone: "+502 4033-7845",
  phoneRaw: "50240337845",
  email: "moisesyax46@gmail.com",
  address: {
    es: "San Andrés Semetabaj, Sololá, Guatemala",
    en: "San Andrés Semetabaj, Sololá, Guatemala",
  },
  hours: {
    es: "Lunes - Sábado: 8:00 AM - 6:00 PM",
    en: "Monday - Saturday: 8:00 AM - 6:00 PM",
  },
};

export const socialLinks = {
  facebook: "https://www.facebook.com/Jennyyax2012/",
  whatsapp: {
    base: "https://wa.me/50240337845",
    withMessage: (message: string) =>
      `https://wa.me/50240337845?text=${encodeURIComponent(message)}`,
  },
};

/* ───────────────────────────────────────────────────────────────────────────
   WhatsApp Pre-filled Messages
   ─────────────────────────────────────────────────────────────────────────── */

export const whatsappMessages = {
  general: {
    es: "Hola, me interesa hacer un pedido. ¿Me pueden ayudar?",
    en: "Hello, I'm interested in placing an order. Can you help me?",
  },
  product: (productName: string) => ({
    es: `Hola, me interesa el producto "${productName}". ¿Está disponible?`,
    en: `Hello, I'm interested in "${productName}". Is it available?`,
  }),
  custom: {
    es: "Hola, me gustaría hacer un pedido personalizado. ¿Pueden ayudarme?",
    en: "Hello, I'd like to make a custom order. Can you help me?",
  },
};

/* ───────────────────────────────────────────────────────────────────────────
   Business Info
   ─────────────────────────────────────────────────────────────────────────── */

export const businessInfo = {
  name: "Mueblería Jenny Yax",
  motto: {
    es: "Dios es bueno Todo el Tiempo",
    en: "God is Good All the Time",
  },
  tagline: {
    es: "Hecho a mano en Sololá, Guatemala",
    en: "Handcrafted in Sololá, Guatemala",
  },
  founded: 2019,
};
