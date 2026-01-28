"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle, useLanguage } from "@/components/ui/language-toggle";
import { useSession } from "@/lib/hooks/use-session";
import { supabase } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN TOPBAR
   Top bar for admin panel with user info and actions
   ═══════════════════════════════════════════════════════════════════════════ */

interface AdminTopbarProps {
  onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const router = useRouter();
  const { user } = useSession();
  const { t } = useLanguage();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "h-14 px-4",
        "bg-bg/80 backdrop-blur-md",
        "border-b border-border",
        "flex items-center justify-between gap-4"
      )}
    >
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={onMenuClick}
        className={cn(
          "lg:hidden",
          "inline-flex items-center justify-center",
          "w-10 h-10 rounded-md",
          "text-text hover:bg-surface",
          "transition-colors duration-fast",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        )}
        aria-label={t("Abrir menú", "Open menu")}
      >
        <MenuIcon />
      </button>

      {/* Spacer on desktop */}
      <div className="hidden lg:block" />

      {/* Right side */}
      <div className="flex items-center gap-3">
        <LanguageToggle />

        {/* User info */}
        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-border">
          <span className="text-small text-text-muted">{user?.email}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? t("Saliendo...", "Signing out...") : t("Salir", "Sign out")}
          </Button>
        </div>
      </div>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}
