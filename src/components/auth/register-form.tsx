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
   REGISTER FORM
   Email/password registration form
   ═══════════════════════════════════════════════════════════════════════════ */

const formContent = {
  email: {
    label: { es: "Correo electrónico", en: "Email" },
    placeholder: { es: "tu@correo.com", en: "your@email.com" },
  },
  password: {
    label: { es: "Contraseña", en: "Password" },
    placeholder: { es: "Mínimo 6 caracteres", en: "Minimum 6 characters" },
  },
  confirmPassword: {
    label: { es: "Confirmar contraseña", en: "Confirm password" },
    placeholder: { es: "Repite tu contraseña", en: "Repeat your password" },
  },
  submit: {
    es: "Crear cuenta",
    en: "Create account",
  },
  submitting: {
    es: "Creando cuenta...",
    en: "Creating account...",
  },
  hasAccount: {
    es: "¿Ya tienes cuenta?",
    en: "Already have an account?",
  },
  login: {
    es: "Iniciar sesión",
    en: "Sign in",
  },
  success: {
    es: "¡Cuenta creada! Revisa tu correo para confirmar.",
    en: "Account created! Check your email to confirm.",
  },
  errors: {
    passwordMismatch: {
      es: "Las contraseñas no coinciden",
      en: "Passwords do not match",
    },
    passwordTooShort: {
      es: "La contraseña debe tener al menos 6 caracteres",
      en: "Password must be at least 6 characters",
    },
    emailInUse: {
      es: "Este correo ya está registrado",
      en: "This email is already registered",
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

export function RegisterForm() {
  const router = useRouter();
  const { lang } = useLanguage();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);
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
    confirmPassword: {
      label: lang === "es" ? formContent.confirmPassword.label.es : formContent.confirmPassword.label.en,
      placeholder: lang === "es" ? formContent.confirmPassword.placeholder.es : formContent.confirmPassword.placeholder.en,
    },
    submit: lang === "es" ? formContent.submit.es : formContent.submit.en,
    submitting: lang === "es" ? formContent.submitting.es : formContent.submitting.en,
    hasAccount: lang === "es" ? formContent.hasAccount.es : formContent.hasAccount.en,
    login: lang === "es" ? formContent.login.es : formContent.login.en,
    success: lang === "es" ? formContent.success.es : formContent.success.en,
    errors: {
      passwordMismatch: lang === "es" ? formContent.errors.passwordMismatch.es : formContent.errors.passwordMismatch.en,
      passwordTooShort: lang === "es" ? formContent.errors.passwordTooShort.es : formContent.errors.passwordTooShort.en,
      emailInUse: lang === "es" ? formContent.errors.emailInUse.es : formContent.errors.emailInUse.en,
      generic: lang === "es" ? formContent.errors.generic.es : formContent.errors.generic.en,
      notConfigured: lang === "es" ? formContent.errors.notConfigured.es : formContent.errors.notConfigured.en,
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isSupabaseConfigured()) {
      setError(content.errors.notConfigured);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError(content.errors.passwordTooShort);
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      setError(content.errors.passwordMismatch);
      return;
    }

    setIsLoading(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError(content.errors.emailInUse);
        } else {
          setError(content.errors.generic);
        }
        return;
      }

      // Success - show confirmation message
      setSuccess(true);

      // Redirect after short delay
      setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 2000);
    } catch (err) {
      setError(content.errors.generic);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Success Message */}
      {success && (
        <div
          role="status"
          className={cn(
            "p-3 rounded-lg",
            "bg-success/10 border border-success/20",
            "text-small text-success"
          )}
        >
          {content.success}
        </div>
      )}

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
        <Label htmlFor="register-email">{content.email.label}</Label>
        <Input
          id="register-email"
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
        <Label htmlFor="register-password">{content.password.label}</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          placeholder={content.password.placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={6}
          className="mt-1.5"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <Label htmlFor="register-confirm-password">
          {content.confirmPassword.label}
        </Label>
        <Input
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          placeholder={content.confirmPassword.placeholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="mt-1.5"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={isLoading || success}
      >
        {isLoading ? content.submitting : content.submit}
      </Button>

      {/* Login Link */}
      <p className="text-center text-small text-text-muted">
        {content.hasAccount}{" "}
        <Link
          href="/auth/login"
          className="text-brand hover:text-brand-hover font-medium transition-colors"
        >
          {content.login}
        </Link>
      </p>
    </form>
  );
}
