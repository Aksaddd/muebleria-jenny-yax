import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   BUTTON COMPONENT
   Premium, accessible buttons with smooth micro-interactions
   ═══════════════════════════════════════════════════════════════════════════ */

const buttonVariants = cva(
  // Base styles — all buttons share these
  [
    "inline-flex items-center justify-center gap-2",
    "font-sans font-semibold text-small",
    "whitespace-nowrap select-none",
    "rounded-md",
    "transition-all duration-normal ease-out-expo",
    // Minimum touch target
    "min-h-touch",
    // Focus ring
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
    // Active press effect
    "active:scale-[0.98]",
  ],
  {
    variants: {
      variant: {
        // Primary — Brand amber, high emphasis
        primary: [
          "bg-brand text-text-inverse",
          "hover:bg-brand-hover",
          "active:bg-brand-active",
          "shadow-elevation-2 hover:shadow-elevation-3",
        ],

        // Secondary — Outlined, medium emphasis
        secondary: [
          "bg-transparent text-brand",
          "border-2 border-brand",
          "hover:bg-brand-subtle hover:border-brand-hover",
          "active:bg-brand-muted/20",
        ],

        // Ghost — Minimal, low emphasis
        ghost: [
          "bg-transparent text-text",
          "hover:bg-surface hover:text-brand",
          "active:bg-surface-raised",
        ],

        // WhatsApp — Social CTA
        whatsapp: [
          "bg-whatsapp text-white",
          "hover:bg-whatsapp-hover",
          "shadow-elevation-2 hover:shadow-elevation-3",
        ],

        // Danger — Destructive actions
        danger: [
          "bg-danger text-white",
          "hover:bg-danger/90",
          "shadow-elevation-2",
        ],

        // Link — Text-only, inline
        link: [
          "bg-transparent text-brand underline-offset-4",
          "hover:underline hover:text-brand-hover",
          "p-0 h-auto min-h-0",
        ],
      },

      size: {
        sm: "h-10 px-3 text-small min-h-[40px]",
        md: "h-11 px-5 text-body min-h-[44px]",
        lg: "h-12 px-7 text-body-lg min-h-[48px]",
        xl: "h-14 px-8 text-body-lg min-h-[56px]",
        icon: "h-11 w-11 p-0 min-h-[44px]",
        "icon-sm": "h-10 w-10 p-0 min-h-[40px]",
        "icon-lg": "h-12 w-12 p-0 min-h-[48px]",
      },

      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component (for links styled as buttons) */
  asChild?: boolean;
  /** Loading state */
  isLoading?: boolean;
  /** Icon to show before text */
  leftIcon?: React.ReactNode;
  /** Icon to show after text */
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <LoadingSpinner />
            <span className="sr-only">Cargando...</span>
          </>
        ) : (
          <>
            {leftIcon && (
              <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

/* ───────────────────────────────────────────────────────────────────────────
   Loading Spinner
   ─────────────────────────────────────────────────────────────────────────── */

function LoadingSpinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

export { Button, buttonVariants };
