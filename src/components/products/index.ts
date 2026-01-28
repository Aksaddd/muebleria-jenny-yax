/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS COMPONENTS — Barrel Export
   ═══════════════════════════════════════════════════════════════════════════ */

// Original static data components (for backward compatibility)
export { CategoryFilter } from "./category-filter";
export { ProductCard } from "./product-card";
export { ProductGrid } from "./product-grid";

// Database-backed components
export { ProductCardDb } from "./product-card-db";
export { ProductGridDb } from "./product-grid-db";

// Shared components
export { ProductGallery } from "./product-gallery";
export { ProductSpecs } from "./product-specs";
export { RelatedProducts } from "./related-products";
export { CustomOrderBanner } from "./custom-order-banner";
export { Breadcrumb } from "./breadcrumb";
export type { BreadcrumbItem } from "./breadcrumb";
