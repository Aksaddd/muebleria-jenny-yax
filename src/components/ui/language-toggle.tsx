"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   LANGUAGE CONTEXT
   Simple ES/EN toggle with localStorage persistence
   ═══════════════════════════════════════════════════════════════════════════ */

type Language = "es" | "en";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (es: string, en: string) => string;
};

const LanguageContext = React.createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Language>("es");
  const [mounted, setMounted] = React.useState(false);

  // Load from localStorage on mount
  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("lang") as Language | null;
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    }
  }, []);

  const setLang = React.useCallback((newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  // Translation helper
  const t = React.useCallback(
    (es: string, en: string) => (lang === "es" ? es : en),
    [lang]
  );

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: "es", setLang, t }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LANGUAGE TOGGLE COMPONENT
   Minimal segmented toggle button
   ═══════════════════════════════════════════════════════════════════════════ */

interface LanguageToggleProps {
  className?: string;
  /** Compact mode for mobile */
  compact?: boolean;
}

export function LanguageToggle({ className, compact = false }: LanguageToggleProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Seleccionar idioma"
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface p-0.5",
        "transition-colors duration-fast",
        className
      )}
    >
      <ToggleButton
        active={lang === "es"}
        onClick={() => setLang("es")}
        compact={compact}
      >
        ES
      </ToggleButton>
      <ToggleButton
        active={lang === "en"}
        onClick={() => setLang("en")}
        compact={compact}
      >
        EN
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
  compact,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  compact: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        // Base
        "font-sans font-semibold text-caption uppercase tracking-wide",
        "rounded transition-all duration-fast",
        // Size
        compact ? "px-2 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]",
        // States
        active
          ? "bg-brand text-text-inverse shadow-sm"
          : "bg-transparent text-text-muted hover:text-text hover:bg-surface-raised",
        // Focus
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-1"
      )}
    >
      {children}
    </button>
  );
}
