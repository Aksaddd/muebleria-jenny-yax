"use client";

import { useLanguage } from "@/components/ui/language-toggle";
import { AuthCard, RegisterForm } from "@/components/auth";

/* ═══════════════════════════════════════════════════════════════════════════
   REGISTER PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: {
    es: "Crear cuenta",
    en: "Create account",
  },
  subtitle: {
    es: "Guarda tus datos para futuras cotizaciones.",
    en: "Save your info for future quotes.",
  },
};

export default function RegisterPage() {
  const { lang } = useLanguage();

  const title = lang === "es" ? pageContent.title.es : pageContent.title.en;
  const subtitle =
    lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en;

  return (
    <AuthCard title={title} subtitle={subtitle}>
      <RegisterForm />
    </AuthCard>
  );
}
