"use client";

import { useLanguage } from "@/components/ui/language-toggle";
import { AuthCard, LoginForm } from "@/components/auth";

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: {
    es: "Iniciar sesión",
    en: "Sign in",
  },
  subtitle: {
    es: "Accede para ver tu cuenta y solicitudes.",
    en: "Access your account and requests.",
  },
};

export default function LoginPage() {
  const { lang } = useLanguage();

  const title = lang === "es" ? pageContent.title.es : pageContent.title.en;
  const subtitle =
    lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en;

  return (
    <AuthCard title={title} subtitle={subtitle}>
      <LoginForm />
    </AuthCard>
  );
}
