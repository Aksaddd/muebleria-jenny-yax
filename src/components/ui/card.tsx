import * as React from "react";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   CARD COMPONENTS
   Flexible card system with subtle warmth and premium feel
   ═══════════════════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────────────────
   Base Card — Container with subtle elevation
   ─────────────────────────────────────────────────────────────────────────── */

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Make the card interactive (hover effects) */
  interactive?: boolean;
  /** Remove padding (for custom layouts) */
  noPadding?: boolean;
  /** Elevation level */
  elevation?: 1 | 2 | 3;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      interactive = false,
      noPadding = false,
      elevation = 1,
      ...props
    },
    ref
  ) => {
    const elevationClasses = {
      1: "shadow-elevation-1",
      2: "shadow-elevation-2",
      3: "shadow-elevation-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          "rounded-lg border border-border bg-card",
          elevationClasses[elevation],
          // Padding
          !noPadding && "p-gap-lg",
          // Interactive states
          interactive && [
            "transition-all duration-normal ease-out-expo",
            "hover:bg-card-hover hover:shadow-card-hover hover:border-border-strong",
            "hover:-translate-y-0.5",
            "cursor-pointer",
          ],
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

/* ───────────────────────────────────────────────────────────────────────────
   Card Header
   ─────────────────────────────────────────────────────────────────────────── */

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-gap-xs", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ───────────────────────────────────────────────────────────────────────────
   Card Title
   ─────────────────────────────────────────────────────────────────────────── */

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-serif text-h4 text-text", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ───────────────────────────────────────────────────────────────────────────
   Card Description
   ─────────────────────────────────────────────────────────────────────────── */

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-small text-text-muted", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ───────────────────────────────────────────────────────────────────────────
   Card Content — Main body area
   ─────────────────────────────────────────────────────────────────────────── */

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

/* ───────────────────────────────────────────────────────────────────────────
   Card Footer
   ─────────────────────────────────────────────────────────────────────────── */

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-gap-md pt-gap-md border-t border-border-subtle mt-gap-lg",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* ───────────────────────────────────────────────────────────────────────────
   Card Image — For product cards, etc.
   ─────────────────────────────────────────────────────────────────────────── */

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Aspect ratio */
  aspect?: "square" | "video" | "portrait" | "auto";
}

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, aspect = "square", children, ...props }, ref) => {
    const aspectClasses = {
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
      auto: "",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-t-lg -mx-gap-lg -mt-gap-lg mb-gap-lg",
          "bg-surface",
          aspectClasses[aspect],
          // Image styling applied to children
          "[&>img]:object-cover [&>img]:w-full [&>img]:h-full",
          "[&>img]:transition-transform [&>img]:duration-slow [&>img]:ease-out-expo",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardImage.displayName = "CardImage";

/* ───────────────────────────────────────────────────────────────────────────
   Interactive Product Card — Full composition for product listings
   ─────────────────────────────────────────────────────────────────────────── */

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product image element */
  image: React.ReactNode;
  /** Category label */
  category?: string;
  /** Product title */
  title: string;
  /** Product description */
  description?: string;
  /** Formatted price */
  price: string;
  /** Availability badge */
  status?: "available" | "sold" | "pending" | "custom";
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    { className, image, category, title, description, price, status, ...props },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        interactive
        noPadding
        className={cn("group overflow-hidden", className)}
        {...props}
      >
        {/* Image with hover zoom */}
        <div className="relative aspect-[4/5] overflow-hidden bg-surface">
          <div className="absolute inset-0 transition-transform duration-slow ease-out-expo group-hover:scale-105">
            {image}
          </div>
          {/* Status badge */}
          {status && (
            <div className="absolute top-3 left-3">
              <StatusBadge status={status} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-gap-lg">
          {category && (
            <span className="text-overline uppercase text-text-muted tracking-wide">
              {category}
            </span>
          )}
          <h3 className="font-serif text-h4 text-text mt-1 group-hover:text-brand transition-colors duration-fast">
            {title}
          </h3>
          {description && (
            <p className="text-small text-text-muted mt-2 line-clamp-2">
              {description}
            </p>
          )}
          <p className="text-body-lg font-semibold text-brand mt-3">{price}</p>
        </div>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";

/* ───────────────────────────────────────────────────────────────────────────
   Status Badge Helper
   ─────────────────────────────────────────────────────────────────────────── */

function StatusBadge({
  status,
}: {
  status: "available" | "sold" | "pending" | "custom";
}) {
  const variants = {
    available: "bg-success text-white",
    sold: "bg-danger text-white",
    pending: "bg-warning text-text",
    custom: "bg-brand-2 text-white",
  };

  const labels = {
    available: "Disponible",
    sold: "Vendido",
    pending: "Apartado",
    custom: "A Medida",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-md text-overline uppercase",
        variants[status]
      )}
    >
      {labels[status]}
    </span>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  ProductCard,
};
