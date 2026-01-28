import Link from "next/link";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   GLOBAL 404 PAGE
   Premium not found page with helpful navigation
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ha sido movida.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <p className="text-[120px] md:text-[160px] font-serif font-bold text-brand/20 leading-none select-none">
          404
        </p>

        {/* Title */}
        <h1 className="mt-4 font-serif text-h2 text-text">
          Página no encontrada
        </h1>

        {/* Description */}
        <p className="mt-4 text-body text-text-muted">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Pero no te preocupes, puedes explorar nuestros productos o contactarnos directamente.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Home */}
          <Link
            href="/"
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-lg",
              "bg-brand text-white",
              "text-small font-semibold",
              "transition-all duration-200",
              "hover:bg-brand-hover",
              "min-h-[48px] min-w-[160px]"
            )}
          >
            Ir al inicio
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className={cn(
              "inline-flex items-center justify-center",
              "px-6 py-3 rounded-lg",
              "bg-surface border border-border",
              "text-small font-medium text-text",
              "transition-all duration-200",
              "hover:border-brand/30 hover:text-brand",
              "min-h-[48px] min-w-[160px]"
            )}
          >
            Ver productos
          </Link>
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-8 pt-8 border-t border-border-subtle">
          <p className="text-small text-text-muted mb-3">
            ¿Necesitas ayuda? Escríbenos directamente
          </p>
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
              "hover:bg-whatsapp-hover",
              "min-h-[48px]"
            )}
          >
            <WhatsAppIcon />
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
