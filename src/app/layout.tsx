import type { Metadata, Viewport } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/ui/language-toggle";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/* ═══════════════════════════════════════════════════════════════════════════
   FONT CONFIGURATION
   - Playfair Display: Elegant serif for headings
   - Source Sans 3: Clean, readable sans for body text
   ═══════════════════════════════════════════════════════════════════════════ */

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

/* ═══════════════════════════════════════════════════════════════════════════
   METADATA
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata: Metadata = {
  title: {
    default: "Mueblería Jenny Yax | Muebles de Madera Hechos a Mano",
    template: "%s | Mueblería Jenny Yax",
  },
  description:
    "Muebles de madera hechos a mano en Sololá, Guatemala. Roperos, trinchantes, libreros, burós, cunas y mesas. Pedidos por WhatsApp. Dios es bueno Todo el Tiempo.",
  keywords: [
    "muebles de madera",
    "muebles artesanales",
    "roperos",
    "trinchantes",
    "libreros",
    "burós",
    "cunas",
    "mesas",
    "muebles Guatemala",
    "carpintería",
    "muebles a medida",
    "Sololá",
    "San Andrés Semetabaj",
    "muebles hechos a mano",
  ],
  authors: [{ name: "Mueblería Jenny Yax" }],
  creator: "Flow Productions",
  metadataBase: new URL("https://muebleria-jenny-yax.vercel.app"),
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: "https://muebleria-jenny-yax.vercel.app",
    siteName: "Mueblería Jenny Yax",
    title: "Mueblería Jenny Yax | Muebles de Madera Hechos a Mano",
    description:
      "Muebles de madera hechos a mano en Sololá, Guatemala. Roperos, trinchantes, libreros, burós, cunas y mesas. Pedidos por WhatsApp.",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Mueblería Jenny Yax - Muebles de Madera Hechos a Mano en Guatemala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mueblería Jenny Yax | Muebles de Madera Hechos a Mano",
    description:
      "Muebles de madera hechos a mano en Sololá, Guatemala. Pedidos por WhatsApp.",
    images: ["/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1614" },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT LAYOUT
   ═══════════════════════════════════════════════════════════════════════════ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${playfairDisplay.variable} ${sourceSans3.variable}`}
      // Suppress hydration warning for theme class
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {/* 
          Theme script - runs before React hydration to prevent flash
          For now, we respect system preference. Dark mode toggle can be added later.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />

        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-brand focus:text-text-inverse focus:rounded-md"
        >
          Saltar al contenido principal
        </a>

        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
