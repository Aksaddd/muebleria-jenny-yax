import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   LAYOUT PRIMITIVES
   Consistent containers and section wrappers for vertical rhythm
   ═══════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────────────────
   Container — Centered content wrapper with max-width
   ─────────────────────────────────────────────────────────────────────────── */

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width variant */
  size?: "default" | "narrow" | "wide" | "full";
  /** Remove horizontal padding */
  noPadding?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", noPadding = false, ...props }, ref) => {
    const sizeClasses = {
      default: "max-w-container", // 1280px
      narrow: "max-w-narrow", // 672px
      wide: "max-w-7xl", // 1280px
      full: "max-w-none",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full",
          sizeClasses[size],
          !noPadding && "px-container-x",
          className
        )}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

/* ───────────────────────────────────────────────────────────────────────────
   Section — Vertical spacing wrapper with semantic element
   ─────────────────────────────────────────────────────────────────────────── */

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Semantic HTML element */
  as?: "section" | "div" | "article" | "aside" | "main";
  /** Vertical padding size */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Background variant */
  background?: "default" | "alt" | "surface" | "brand";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      as: Component = "section",
      spacing = "lg",
      background = "default",
      ...props
    },
    ref
  ) => {
    const spacingClasses = {
      none: "",
      sm: "py-section-y-sm",
      md: "py-12 md:py-16",
      lg: "py-section-y",
    };

    const backgroundClasses = {
      default: "bg-bg",
      alt: "bg-bg-alt",
      surface: "bg-surface",
      brand: "bg-brand-subtle",
    };

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          spacingClasses[spacing],
          backgroundClasses[background],
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

/* ───────────────────────────────────────────────────────────────────────────
   Section Header — Title + description for sections
   ─────────────────────────────────────────────────────────────────────────── */

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title: string;
  /** Optional subtitle/description */
  description?: string;
  /** Eyebrow text (small label above title) */
  eyebrow?: string;
  /** Alignment */
  align?: "left" | "center";
  /** Title heading level */
  titleAs?: "h1" | "h2" | "h3";
}

function SectionHeader({
  className,
  title,
  description,
  eyebrow,
  align = "center",
  titleAs: TitleTag = "h2",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-gap-2xl",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span className="text-overline uppercase tracking-wider text-brand mb-2 block">
          {eyebrow}
        </span>
      )}
      <TitleTag className="font-serif text-h2 text-text">{title}</TitleTag>
      {description && (
        <p className="mt-4 text-body-lg text-text-muted">{description}</p>
      )}
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Grid — Responsive grid layout helper
   ─────────────────────────────────────────────────────────────────────────── */

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at different breakpoints */
  cols?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
  /** Gap between items */
  gap?: "sm" | "md" | "lg" | "xl";
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = { default: 1, sm: 2, lg: 3 },
      gap = "lg",
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      sm: "gap-gap-sm",
      md: "gap-gap-md",
      lg: "gap-gap-lg",
      xl: "gap-gap-xl",
    };

    // Build responsive column classes
    const colClasses = [
      cols.default && `grid-cols-${cols.default}`,
      cols.sm && `sm:grid-cols-${cols.sm}`,
      cols.md && `md:grid-cols-${cols.md}`,
      cols.lg && `lg:grid-cols-${cols.lg}`,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={cn("grid", colClasses, gapClasses[gap], className)}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";

/* ───────────────────────────────────────────────────────────────────────────
   Stack — Vertical/horizontal flex layout
   ─────────────────────────────────────────────────────────────────────────── */

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction */
  direction?: "row" | "column";
  /** Gap between items */
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  /** Alignment */
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  /** Justify content */
  justify?: "start" | "center" | "end" | "between" | "around";
  /** Wrap items */
  wrap?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = "column",
      gap = "md",
      align = "stretch",
      justify = "start",
      wrap = false,
      ...props
    },
    ref
  ) => {
    const gapClasses = {
      xs: "gap-gap-xs",
      sm: "gap-gap-sm",
      md: "gap-gap-md",
      lg: "gap-gap-lg",
      xl: "gap-gap-xl",
      "2xl": "gap-gap-2xl",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "column" ? "flex-col" : "flex-row",
          gapClasses[gap],
          alignClasses[align],
          justifyClasses[justify],
          wrap && "flex-wrap",
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = "Stack";

/* ───────────────────────────────────────────────────────────────────────────
   Divider — Horizontal/vertical separator
   ─────────────────────────────────────────────────────────────────────────── */

interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  /** Orientation */
  orientation?: "horizontal" | "vertical";
  /** Decorative text in center */
  label?: string;
}

function Divider({
  className,
  orientation = "horizontal",
  label,
  ...props
}: DividerProps) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)}>
        <hr className="flex-1 border-t border-border" />
        <span className="text-small text-text-subtle">{label}</span>
        <hr className="flex-1 border-t border-border" />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        orientation === "horizontal"
          ? "border-t border-border w-full"
          : "border-l border-border h-full",
        className
      )}
      {...props}
    />
  );
}

export { Container, Section, SectionHeader, Grid, Stack, Divider };
