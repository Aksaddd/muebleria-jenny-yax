"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useLanguage } from "@/components/ui/language-toggle";
import {
  type Product,
  type ProductCategory,
  productCategories,
  categoryLabels,
} from "@/data/products";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT FORM
   Create/Edit form for products with live preview
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductFormProps {
  product?: Product;
  mode: "create" | "edit";
}

const formContent = {
  nameLabel: { es: "Nombre", en: "Name" },
  namePlaceholder: { es: "Ej: Ropero Clásico", en: "E.g., Classic Wardrobe" },
  categoryLabel: { es: "Categoría", en: "Category" },
  descriptionLabel: { es: "Descripción corta", en: "Short description" },
  descriptionPlaceholder: { es: "Características principales del producto", en: "Main product features" },
  imageLabel: { es: "Imagen (ruta)", en: "Image (path)" },
  imagePlaceholder: { es: "/images/products/mi-imagen.webp", en: "/images/products/my-image.webp" },
  featuredLabel: { es: "Destacado", en: "Featured" },
  featuredHelp: { es: "Mostrar en la página principal", en: "Show on homepage" },
  availableLabel: { es: "Disponible", en: "Available" },
  availableHelp: { es: "Visible para los clientes", en: "Visible to customers" },
  submit: {
    create: { es: "Crear producto", en: "Create product" },
    edit: { es: "Guardar cambios", en: "Save changes" },
  },
  preview: { es: "Vista previa", en: "Preview" },
  demoNote: {
    es: "Guardado (modo demostración). En la siguiente fase se conectará a la base de datos.",
    en: "Saved (demo mode). Database connection will be added in the next phase.",
  },
};

export function ProductForm({ product, mode }: ProductFormProps) {
  const { lang } = useLanguage();
  const [showSuccess, setShowSuccess] = React.useState(false);

  // Form state
  const [name, setName] = React.useState(product?.name.es || "");
  const [nameEn, setNameEn] = React.useState(product?.name.en || "");
  const [category, setCategory] = React.useState<ProductCategory>(
    product?.category || "Roperos"
  );
  const [description, setDescription] = React.useState(
    product?.shortDescription.es || ""
  );
  const [descriptionEn, setDescriptionEn] = React.useState(
    product?.shortDescription.en || ""
  );
  const [imageSrc, setImageSrc] = React.useState(
    product?.image.src || "/images/hero/storefront.webp"
  );
  const [featured, setFeatured] = React.useState(false);
  const [available, setAvailable] = React.useState(product?.available ?? true);

  const c = {
    nameLabel: lang === "es" ? formContent.nameLabel.es : formContent.nameLabel.en,
    namePlaceholder: lang === "es" ? formContent.namePlaceholder.es : formContent.namePlaceholder.en,
    categoryLabel: lang === "es" ? formContent.categoryLabel.es : formContent.categoryLabel.en,
    descriptionLabel: lang === "es" ? formContent.descriptionLabel.es : formContent.descriptionLabel.en,
    descriptionPlaceholder: lang === "es" ? formContent.descriptionPlaceholder.es : formContent.descriptionPlaceholder.en,
    imageLabel: lang === "es" ? formContent.imageLabel.es : formContent.imageLabel.en,
    imagePlaceholder: lang === "es" ? formContent.imagePlaceholder.es : formContent.imagePlaceholder.en,
    featuredLabel: lang === "es" ? formContent.featuredLabel.es : formContent.featuredLabel.en,
    featuredHelp: lang === "es" ? formContent.featuredHelp.es : formContent.featuredHelp.en,
    availableLabel: lang === "es" ? formContent.availableLabel.es : formContent.availableLabel.en,
    availableHelp: lang === "es" ? formContent.availableHelp.es : formContent.availableHelp.en,
    submit: lang === "es" ? formContent.submit[mode].es : formContent.submit[mode].en,
    preview: lang === "es" ? formContent.preview.es : formContent.preview.en,
    demoNote: lang === "es" ? formContent.demoNote.es : formContent.demoNote.en,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save - show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  // Filter out "Todos" from categories
  const selectableCategories = productCategories.filter(
    (cat) => cat !== "Todos"
  ) as ProductCategory[];

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form - takes more space */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
        {/* Success Message */}
        {showSuccess && (
          <div
            role="status"
            className={cn(
              "p-4 rounded-lg",
              "bg-success/10 border border-success/20",
              "text-small text-success"
            )}
          >
            {c.demoNote}
          </div>
        )}

        {/* Name (Spanish) */}
        <div>
          <Label htmlFor="product-name">{c.nameLabel} (ES)</Label>
          <Input
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={c.namePlaceholder}
            required
            className="mt-1.5"
          />
        </div>

        {/* Name (English) */}
        <div>
          <Label htmlFor="product-name-en">{c.nameLabel} (EN)</Label>
          <Input
            id="product-name-en"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="E.g., Classic Wardrobe"
            className="mt-1.5"
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="product-category">{c.categoryLabel}</Label>
          <select
            id="product-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className={cn(
              "mt-1.5 w-full px-3 py-2.5 rounded-lg",
              "bg-bg border border-border",
              "text-body text-text",
              "transition-colors duration-fast",
              "focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent",
              "min-h-[44px]" // Touch target
            )}
          >
            {selectableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {lang === "es" ? categoryLabels[cat].es : categoryLabels[cat].en}
              </option>
            ))}
          </select>
        </div>

        {/* Description (Spanish) */}
        <div>
          <Label htmlFor="product-description">{c.descriptionLabel} (ES)</Label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={c.descriptionPlaceholder}
            rows={3}
            className={cn(
              "mt-1.5 w-full px-3 py-2.5 rounded-lg",
              "bg-bg border border-border",
              "text-body text-text",
              "placeholder:text-text-subtle",
              "transition-colors duration-fast",
              "focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent",
              "resize-none"
            )}
          />
        </div>

        {/* Description (English) */}
        <div>
          <Label htmlFor="product-description-en">{c.descriptionLabel} (EN)</Label>
          <textarea
            id="product-description-en"
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            placeholder="Main product features"
            rows={3}
            className={cn(
              "mt-1.5 w-full px-3 py-2.5 rounded-lg",
              "bg-bg border border-border",
              "text-body text-text",
              "placeholder:text-text-subtle",
              "transition-colors duration-fast",
              "focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent",
              "resize-none"
            )}
          />
        </div>

        {/* Image Path */}
        <div>
          <Label htmlFor="product-image">{c.imageLabel}</Label>
          <Input
            id="product-image"
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            placeholder={c.imagePlaceholder}
            className="mt-1.5"
          />
        </div>

        {/* Toggles - larger touch targets */}
        <div className="space-y-4 pt-2">
          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className={cn(
                "w-5 h-5 rounded border-border",
                "text-brand focus:ring-focus focus:ring-2"
              )}
            />
            <div>
              <span className="text-small font-medium text-text">{c.featuredLabel}</span>
              <p className="text-caption text-text-muted">{c.featuredHelp}</p>
            </div>
          </label>

          {/* Available */}
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className={cn(
                "w-5 h-5 rounded border-border",
                "text-brand focus:ring-focus focus:ring-2"
              )}
            />
            <div>
              <span className="text-small font-medium text-text">{c.availableLabel}</span>
              <p className="text-caption text-text-muted">{c.availableHelp}</p>
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button type="submit" variant="primary" size="lg" className="min-h-[48px]">
            {c.submit}
          </Button>
        </div>
      </form>

      {/* Preview - smaller, muted, sticky on desktop */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-20">
          <h3 className="text-caption font-semibold text-text-muted uppercase tracking-wide mb-3">
            {c.preview}
          </h3>
          <div
            className={cn(
              "p-3 rounded-xl",
              "bg-surface/50 border border-border-subtle"
            )}
          >
            {/* Preview Card - smaller scale */}
            <div
              className={cn(
                "bg-card rounded-xl overflow-hidden",
                "border border-border/50",
                "shadow-sm"
              )}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-surface">
                <Image
                  src={imageSrc || "/images/hero/storefront.webp"}
                  alt={name || "Preview"}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                {/* Category Badge */}
                <div
                  className={cn(
                    "absolute top-2 left-2",
                    "px-2 py-0.5 rounded-full",
                    "bg-bg/90 backdrop-blur-sm",
                    "border border-border/50",
                    "text-[10px] font-medium text-text-muted"
                  )}
                >
                  {lang === "es" ? categoryLabels[category].es : categoryLabels[category].en}
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h4 className="font-serif text-small font-semibold text-text line-clamp-1">
                  {name || (lang === "es" ? "Nombre del producto" : "Product name")}
                </h4>
                <p className="mt-1 text-caption text-text-muted line-clamp-2">
                  {description || (lang === "es" ? "Descripción del producto" : "Product description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
