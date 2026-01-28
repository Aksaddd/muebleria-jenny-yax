"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useLanguage } from "@/components/ui/language-toggle";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN FORM
   Email/password login form
   ═══════════════════════════════════════════════════════════════════════════ */

const formContent = {
  email: {
    label: { es: "Correo electrónico", en: "Email" },
    placeholder: { es: "tu@correo.com", en: "your@email.com" },
  },
  password: {
    label: { es: "Contraseña", en: "Password" },
    placeholder: { es: "Tu contraseña", en: "Your password" },
  },
  submit: {
    es: "Continuar",
    en: "Continue",
  },
  submitting: {
    es: "Iniciando sesión...",
    en: "Signing in...",
  },
  noAccount: {
    es: "¿No tienes cuenta?",
    en: "Don't have an account?",
  },
  createAccount: {
    es: "Crear cuenta",
    en: "Create account",
  },
  errors: {
    invalidCredentials: {
      es: "Correo o contraseña incorrectos",
      en: "Invalid email or password",
    },
    generic: {
      es: "Ocurrió un error. Por favor intenta de nuevo.",
      en: "An error occurred. Please try again.",
    },
    notConfigured: {
      es: "El sistema de autenticación no está configurado.",
      en: "Authentication system is not configured.",
    },
  },
};

export function LoginForm() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const content = {
    email: {
      label: lang === "es" ? formContent.email.label.es : formContent.email.label.en,
      placeholder: lang === "es" ? formContent.email.placeholder.es : formContent.email.placeholder.en,
    },
    password: {
      label: lang === "es" ? formContent.password.label.es : formContent.password.label.en,
      placeholder: lang === "es" ? formContent.password.placeholder.es : formContent.password.placeholder.en,
    },
    submit: lang === "es" ? formContent.submit.es : formContent.submit.en,
    submitting: lang === "es" ? formContent.submitting.es : formContent.submitting.en,
    noAccount: lang === "es" ? formContent.noAccount.es : formContent.noAccount.en,
    createAccount: lang === "es" ? formContent.createAccount.es : formContent.createAccount.en,
    errors: {
      invalidCredentials: lang === "es" ? formContent.errors.invalidCredentials.es : formContent.errors.invalidCredentials.en,
      generic: lang === "es" ? formContent.errors.generic.es : formContent.errors.generic.en,
      notConfigured: lang === "es" ? formContent.errors.notConfigured.es : formContent.errors.notConfigured.en,
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isSupabaseConfigured()) {
      setError(content.errors.notConfigured);
      return;
    }

    setIsLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login credentials")) {
          setError(content.errors.invalidCredentials);
        } else {
          setError(content.errors.generic);
        }
        return;
      }

      // Success - redirect to account
      router.push("/account");
      router.refresh();
    } catch (err) {
      setError(content.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className={cn(
            "p-3 rounded-lg",
            "bg-error/10 border border-error/20",
            "text-small text-error"
          )}
        >
          {error}
        </div>
      )}

      {/* Email */}
      <div>
        <Label htmlFor="login-email">{content.email.label}</Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          placeholder={content.email.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="mt-1.5"
        />
      </div>

      {/* Password */}
      <div>
        <Label htmlFor="login-password">{content.password.label}</Label>
        <Input
          id="login-password"
          name="password"
          type="password"
          placeholder={content.password.placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="mt-1.5"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? content.submitting : content.submit}
      </Button>

      {/* Register Link */}
      <p className="text-center text-small text-text-muted">
        {content.noAccount}{" "}
        <Link
          href="/auth/register"
          className="text-brand hover:text-brand-hover font-medium transition-colors"
        >
          {content.createAccount}
        </Link>
      </p>
    </form>
  );
}
