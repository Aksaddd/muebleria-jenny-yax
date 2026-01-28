import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   BADGE COMPONENT
   Small labels for categories, status, and tags
   ═══════════════════════════════════════════════════════════════════════════ */

const badgeVariants = cva(
  // Base styles
  [
    "inline-flex items-center justify-center gap-1.5",
    "font-sans font-semibold",
    "whitespace-nowrap select-none",
    "rounded-md",
    "transition-colors duration-fast",
  ],
  {
    variants: {
      variant: {
        // Default — neutral
        default: "bg-surface-raised border border-border text-text-muted",

        // Brand — primary accent
        brand: "bg-brand-subtle text-brand border border-brand/20",

        // Secondary — wood brown
        secondary: "bg-brand-2-muted/20 text-brand-2 border border-brand-2/20",

        // Success — available/in-stock
        success: "bg-success-muted text-success border border-success/20",

        // Warning — pending/low-stock
        warning: "bg-warning-muted text-text border border-warning/30",

        // Danger — sold/out-of-stock
        danger: "bg-danger-muted text-danger border border-danger/20",

        // Solid variants (higher emphasis)
        "solid-brand": "bg-brand text-text-inverse",
        "solid-success": "bg-success text-white",
        "solid-warning": "bg-warning text-text",
        "solid-danger": "bg-danger text-white",
        "solid-secondary": "bg-brand-2 text-white",

        // Outline — minimal
        outline: "bg-transparent border border-border-strong text-text-muted",
      },

      size: {
        sm: "text-caption px-2 py-0.5 text-[11px]",
        md: "text-overline px-2.5 py-1",
        lg: "text-small px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon before text */
  icon?: React.ReactNode;
  /** Make badge interactive (for filters) */
  interactive?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, interactive, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        badgeVariants({ variant, size }),
        interactive && [
          "cursor-pointer",
          "hover:opacity-80",
          "active:scale-95",
        ],
        className
      )}
      {...props}
    >
      {icon && (
        <span className="shrink-0 [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>
      )}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

/* ───────────────────────────────────────────────────────────────────────────
   Chip — Interactive badge for filters/selections
   ─────────────────────────────────────────────────────────────────────────── */

interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Chip label */
  children: React.ReactNode;
  /** Selected state */
  selected?: boolean;
  /** Show remove button */
  removable?: boolean;
  /** Callback when remove is clicked */
  onRemove?: () => void;
}

const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  (
    { className, children, selected, removable, onRemove, onClick, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          // Base
          "inline-flex items-center gap-1.5",
          "font-sans text-small font-medium",
          "px-3 py-1.5 rounded-full",
          "border",
          "transition-all duration-fast",
          "cursor-pointer",
          "min-h-[36px]", // Touch target
          // States
          selected
            ? "bg-brand text-text-inverse border-brand hover:bg-brand-hover"
            : "bg-surface border-border text-text-muted hover:border-border-strong hover:text-text",
          // Focus
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2",
          // Active
          "active:scale-95",
          className
        )}
        onClick={onClick}
        aria-pressed={selected}
        {...props}
      >
        {children}
        {removable && (
          <span
            role="button"
            tabIndex={-1}
            className={cn(
              "shrink-0 ml-1 -mr-1",
              "rounded-full p-0.5",
              "hover:bg-white/20",
              "transition-colors duration-fast"
            )}
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            aria-label="Eliminar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </span>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

/* ───────────────────────────────────────────────────────────────────────────
   Category Badge — Pre-styled for product categories
   ─────────────────────────────────────────────────────────────────────────── */

type CategoryType =
  | "roperos"
  | "trinchantes"
  | "gaveteros"
  | "libreros"
  | "buros"
  | "cunas"
  | "mesas"
  | "personalizados";

const categoryLabels: Record<CategoryType, string> = {
  roperos: "Roperos",
  trinchantes: "Trinchantes",
  gaveteros: "Gaveteros",
  libreros: "Libreros",
  buros: "Burós",
  cunas: "Cunas",
  mesas: "Mesas",
  personalizados: "Personalizados",
};

interface CategoryBadgeProps extends Omit<BadgeProps, "children"> {
  category: CategoryType;
}

function CategoryBadge({ category, ...props }: CategoryBadgeProps) {
  return (
    <Badge variant="brand" size="sm" {...props}>
      {categoryLabels[category]}
    </Badge>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Status Badge — Pre-styled for product status
   ─────────────────────────────────────────────────────────────────────────── */

type StatusType = "available" | "sold" | "pending" | "custom";

const statusConfig: Record<
  StatusType,
  { label: string; variant: VariantProps<typeof badgeVariants>["variant"] }
> = {
  available: { label: "Disponible", variant: "solid-success" },
  sold: { label: "Vendido", variant: "solid-danger" },
  pending: { label: "Apartado", variant: "solid-warning" },
  custom: { label: "A Medida", variant: "solid-secondary" },
};

interface StatusBadgeProps extends Omit<BadgeProps, "children" | "variant"> {
  status: StatusType;
}

function StatusBadge({ status, ...props }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} size="sm" {...props}>
      {config.label}
    </Badge>
  );
}

export { Badge, badgeVariants, Chip, CategoryBadge, StatusBadge };
export type { CategoryType, StatusType };
