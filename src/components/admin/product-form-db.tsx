"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useLanguage } from "@/components/ui/language-toggle";
import { supabase } from "@/lib/supabase/client";
import { PRODUCT_CATEGORIES, CATEGORY_LABELS, type ProductCategory, type DbProduct } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT FORM (Database Version) - FIXED
   Create/Edit form for products with image upload to Supabase Storage
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductFormDbProps {
  product?: DbProduct;
  mode: "create" | "edit";
}

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-images";

const formContent = {
  nameLabel: { es: "Nombre", en: "Name" },
  namePlaceholder: { es: "Ej: Ropero Clásico", en: "E.g., Classic Wardrobe" },
  slugLabel: { es: "Slug (URL)", en: "Slug (URL)" },
  slugPlaceholder: { es: "ropero-clasico", en: "classic-wardrobe" },
  slugHelp: { es: "Se genera automáticamente del nombre", en: "Auto-generated from name" },
  categoryLabel: { es: "Categoría", en: "Category" },
  descriptionLabel: { es: "Descripción corta", en: "Short description" },
  descriptionPlaceholder: { es: "Características principales del producto", en: "Main product features" },
  imageLabel: { es: "Imagen del producto", en: "Product image" },
  imageAltLabel: { es: "Texto alternativo", en: "Alt text" },
  imageAltPlaceholder: { es: "Descripción de la imagen", en: "Image description" },
  featuredLabel: { es: "Destacado", en: "Featured" },
  featuredHelp: { es: "Mostrar en la página principal", en: "Show on homepage" },
  activeLabel: { es: "Activo", en: "Active" },
  activeHelp: { es: "Visible para los clientes", en: "Visible to customers" },
  submit: {
    create: { es: "Crear producto", en: "Create product" },
    edit: { es: "Guardar cambios", en: "Save changes" },
  },
  saving: { es: "Guardando...", en: "Saving..." },
  preview: { es: "Vista previa", en: "Preview" },
  successCreate: { es: "Producto creado correctamente", en: "Product created successfully" },
  successUpdate: { es: "Producto actualizado correctamente", en: "Product updated successfully" },
  error: { es: "Error al guardar el producto", en: "Error saving product" },
  selectImage: { es: "Seleccionar imagen", en: "Select image" },
  uploading: { es: "Subiendo...", en: "Uploading..." },
  removeImage: { es: "Eliminar imagen", en: "Remove image" },
  changeImage: { es: "Cambiar imagen", en: "Change image" },
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProductFormDb({ product, mode }: ProductFormDbProps) {
  const router = useRouter();
  const { lang } = useLanguage();
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [message, setMessage] = React.useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form state
  const [name, setName] = React.useState(product?.name || "");
  const [nameEn, setNameEn] = React.useState(product?.name_en || "");
  const [slug, setSlug] = React.useState(product?.slug || "");
  const [category, setCategory] = React.useState<ProductCategory>(
    (product?.category as ProductCategory) || "Roperos"
  );
  const [description, setDescription] = React.useState(product?.short_description || "");
  const [descriptionEn, setDescriptionEn] = React.useState(product?.short_description_en || "");
  const [imageUrl, setImageUrl] = React.useState(product?.image_url || "");
  const [imageAlt, setImageAlt] = React.useState(product?.image_alt || "");
  const [imageAltEn, setImageAltEn] = React.useState(product?.image_alt_en || "");
  const [featured, setFeatured] = React.useState(product?.featured ?? false);
  const [active, setActive] = React.useState(product?.active ?? true);

  // Use ref to always have latest imageUrl in submit handler
  const imageUrlRef = React.useRef(imageUrl);
  React.useEffect(() => {
    imageUrlRef.current = imageUrl;
  }, [imageUrl]);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Auto-generate slug from name (only in create mode)
  React.useEffect(() => {
    if (mode === "create" && name) {
      setSlug(generateSlug(name));
    }
  }, [name, mode]);

  const c = {
    nameLabel: lang === "es" ? formContent.nameLabel.es : formContent.nameLabel.en,
    namePlaceholder: lang === "es" ? formContent.namePlaceholder.es : formContent.namePlaceholder.en,
    slugLabel: lang === "es" ? formContent.slugLabel.es : formContent.slugLabel.en,
    slugPlaceholder: lang === "es" ? formContent.slugPlaceholder.es : formContent.slugPlaceholder.en,
    slugHelp: lang === "es" ? formContent.slugHelp.es : formContent.slugHelp.en,
    categoryLabel: lang === "es" ? formContent.categoryLabel.es : formContent.categoryLabel.en,
    descriptionLabel: lang === "es" ? formContent.descriptionLabel.es : formContent.descriptionLabel.en,
    descriptionPlaceholder: lang === "es" ? formContent.descriptionPlaceholder.es : formContent.descriptionPlaceholder.en,
    imageLabel: lang === "es" ? formContent.imageLabel.es : formContent.imageLabel.en,
    imageAltLabel: lang === "es" ? formContent.imageAltLabel.es : formContent.imageAltLabel.en,
    imageAltPlaceholder: lang === "es" ? formContent.imageAltPlaceholder.es : formContent.imageAltPlaceholder.en,
    featuredLabel: lang === "es" ? formContent.featuredLabel.es : formContent.featuredLabel.en,
    featuredHelp: lang === "es" ? formContent.featuredHelp.es : formContent.featuredHelp.en,
    activeLabel: lang === "es" ? formContent.activeLabel.es : formContent.activeLabel.en,
    activeHelp: lang === "es" ? formContent.activeHelp.es : formContent.activeHelp.en,
    submit: lang === "es" ? formContent.submit[mode].es : formContent.submit[mode].en,
    saving: lang === "es" ? formContent.saving.es : formContent.saving.en,
    preview: lang === "es" ? formContent.preview.es : formContent.preview.en,
    successCreate: lang === "es" ? formContent.successCreate.es : formContent.successCreate.en,
    successUpdate: lang === "es" ? formContent.successUpdate.es : formContent.successUpdate.en,
    error: lang === "es" ? formContent.error.es : formContent.error.en,
    selectImage: lang === "es" ? formContent.selectImage.es : formContent.selectImage.en,
    uploading: lang === "es" ? formContent.uploading.es : formContent.uploading.en,
    removeImage: lang === "es" ? formContent.removeImage.es : formContent.removeImage.en,
    changeImage: lang === "es" ? formContent.changeImage.es : formContent.changeImage.en,
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: "error", text: lang === "es" ? "Formato no válido" : "Invalid format" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: lang === "es" ? "Archivo muy grande (máx 5MB)" : "File too large (max 5MB)" });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "jpg";
      const sanitizedName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
      const filePath = `products/${product?.id || "new"}/${timestamp}-${sanitizedName}.${ext}`;

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const newImageUrl = urlData.publicUrl;
      console.log("Image uploaded successfully:", newImageUrl);
      
      // Update state AND ref
      setImageUrl(newImageUrl);
      imageUrlRef.current = newImageUrl;
      
      // Auto-fill alt text
      if (!imageAlt && name) {
        setImageAlt(name);
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setMessage({ type: "error", text: lang === "es" ? "Error al subir imagen" : "Upload failed" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    imageUrlRef.current = "";
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit handler - uses ref to get latest imageUrl
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Get the current image URL from ref (most reliable)
    const currentImageUrl = imageUrlRef.current;
    
    console.log("Submitting with image URL:", currentImageUrl);

    try {
      const productData = {
        name,
        name_en: nameEn || null,
        slug,
        category,
        short_description: description,
        short_description_en: descriptionEn || null,
        image_url: currentImageUrl || null,
        image_alt: imageAlt || null,
        image_alt_en: imageAltEn || null,
        featured,
        active,
      };

      console.log("Product data to save:", productData);

      if (mode === "create") {
        const { data, error } = await supabase
          .from("products")
          .insert(productData)
          .select()
          .single();

        if (error) throw error;
        console.log("Product created:", data);
        
        setMessage({ type: "success", text: c.successCreate });
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else if (product?.id) {
        const { data, error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", product.id)
          .select()
          .single();

        if (error) throw error;
        console.log("Product updated:", data);
        
        setMessage({ type: "success", text: c.successUpdate });
        router.refresh();
      }
    } catch (error) {
      console.error("Error saving product:", error);
      setMessage({ type: "error", text: c.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
        {/* Status Message */}
        {message && (
          <div
            role="status"
            className={cn(
              "p-4 rounded-lg",
              message.type === "success"
                ? "bg-success/10 border border-success/20 text-success"
                : "bg-error/10 border border-error/20 text-error",
              "text-small"
            )}
          >
            {message.text}
          </div>
        )}

        {/* Name (Spanish) */}
        <div>
          <Label htmlFor="product-name">{c.nameLabel} (ES) *</Label>
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

        {/* Slug */}
        <div>
          <Label htmlFor="product-slug">{c.slugLabel} *</Label>
          <Input
            id="product-slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={c.slugPlaceholder}
            required
            className="mt-1.5"
          />
          <p className="mt-1 text-caption text-text-muted">{c.slugHelp}</p>
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="product-category">{c.categoryLabel} *</Label>
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
              "min-h-[44px]"
            )}
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {lang === "es" ? CATEGORY_LABELS[cat].es : CATEGORY_LABELS[cat].en}
              </option>
            ))}
          </select>
        </div>

        {/* Description (Spanish) */}
        <div>
          <Label htmlFor="product-description">{c.descriptionLabel} (ES) *</Label>
          <textarea
            id="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={c.descriptionPlaceholder}
            rows={3}
            required
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

        {/* IMAGE UPLOAD - INLINE (No separate component) */}
        <div>
          <Label>{c.imageLabel}</Label>
          <div className="mt-1.5">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />

            {imageUrl ? (
              // Show preview with change/remove buttons
              <div className="space-y-3">
                <div className="relative aspect-video w-full max-w-md rounded-xl overflow-hidden bg-surface border border-border">
                  <Image
                    src={imageUrl}
                    alt={imageAlt || "Preview"}
                    fill
                    sizes="400px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="md"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                  >
                    {isUploading ? c.uploading : c.changeImage}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    onClick={handleRemoveImage}
                    disabled={isUploading}
                  >
                    {c.removeImage}
                  </Button>
                </div>
                {/* Show the URL for debugging */}
                <p className="text-caption text-text-muted break-all">
                  URL: {imageUrl.substring(0, 80)}...
                </p>
              </div>
            ) : (
              // Show upload button
              <div
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "cursor-pointer flex flex-col items-center justify-center",
                  "min-h-[200px] p-6 rounded-xl",
                  "border-2 border-dashed border-border",
                  "hover:border-brand/50 hover:bg-surface/50",
                  "transition-all duration-200",
                  isUploading && "pointer-events-none opacity-60"
                )}
              >
                {isUploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    <span className="text-small text-text-muted">{c.uploading}</span>
                  </div>
                ) : (
                  <>
                    <svg className="w-10 h-10 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="mt-3 text-small text-text-muted">{c.selectImage}</p>
                    <p className="mt-1 text-caption text-text-subtle">PNG, JPG, WEBP • Max 5MB</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Image Alt (Spanish) */}
        <div>
          <Label htmlFor="product-image-alt">{c.imageAltLabel} (ES)</Label>
          <Input
            id="product-image-alt"
            value={imageAlt}
            onChange={(e) => setImageAlt(e.target.value)}
            placeholder={c.imageAltPlaceholder}
            className="mt-1.5"
          />
        </div>

        {/* Image Alt (English) */}
        <div>
          <Label htmlFor="product-image-alt-en">{c.imageAltLabel} (EN)</Label>
          <Input
            id="product-image-alt-en"
            value={imageAltEn}
            onChange={(e) => setImageAltEn(e.target.value)}
            placeholder="Image description"
            className="mt-1.5"
          />
        </div>

        {/* Toggles */}
        <div className="space-y-4 pt-2">
          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-border text-brand focus:ring-focus focus:ring-2"
            />
            <div>
              <span className="text-small font-medium text-text">{c.featuredLabel}</span>
              <p className="text-caption text-text-muted">{c.featuredHelp}</p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-5 h-5 rounded border-border text-brand focus:ring-focus focus:ring-2"
            />
            <div>
              <span className="text-small font-medium text-text">{c.activeLabel}</span>
              <p className="text-caption text-text-muted">{c.activeHelp}</p>
            </div>
          </label>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="min-h-[48px]"
            disabled={isSubmitting || isUploading}
          >
            {isSubmitting ? c.saving : c.submit}
          </Button>
        </div>
      </form>

      {/* Preview */}
      <div className="lg:col-span-2">
        <div className="lg:sticky lg:top-20">
          <h3 className="text-caption font-semibold text-text-muted uppercase tracking-wide mb-3">
            {c.preview}
          </h3>
          <div className={cn("p-3 rounded-xl", "bg-surface/50 border border-border-subtle")}>
            <div className={cn("bg-card rounded-xl overflow-hidden", "border border-border/50", "shadow-sm")}>
              <div className="relative aspect-[4/3] bg-surface">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={imageAlt || name || "Preview"}
                    fill
                    sizes="300px"
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-caption text-text-muted">
                      {lang === "es" ? "Sin imagen" : "No image"}
                    </span>
                  </div>
                )}
                <div className={cn("absolute top-2 left-2", "px-2 py-0.5 rounded-full", "bg-bg/90 backdrop-blur-sm", "border border-border/50", "text-[10px] font-medium text-text-muted")}>
                  {lang === "es" ? CATEGORY_LABELS[category].es : CATEGORY_LABELS[category].en}
                </div>
                {featured && (
                  <div className={cn("absolute top-2 right-2", "px-2 py-0.5 rounded-full", "bg-brand/90", "text-[10px] font-medium text-white")}>
                    {lang === "es" ? "Destacado" : "Featured"}
                  </div>
                )}
              </div>
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
