"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { supabase } from "@/lib/supabase/client";

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE UPLOADER
   Admin component for uploading product images to Supabase Storage
   ═══════════════════════════════════════════════════════════════════════════ */

interface ImageUploaderProps {
  productId?: string;
  currentUrl?: string | null;
  onUploaded: (url: string) => void;
  onRemoved?: () => void;
}

const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-images";

const content = {
  selectImage: { es: "Seleccionar imagen", en: "Select image" },
  uploading: { es: "Subiendo...", en: "Uploading..." },
  uploadSuccess: { es: "Imagen subida", en: "Image uploaded" },
  uploadError: { es: "Error al subir imagen", en: "Error uploading image" },
  remove: { es: "Eliminar", en: "Remove" },
  replace: { es: "Reemplazar", en: "Replace" },
  dragDrop: { es: "Arrastra una imagen aquí o", en: "Drag an image here or" },
  maxSize: { es: "Máximo 5MB", en: "Max 5MB" },
  formats: { es: "PNG, JPG, WEBP", en: "PNG, JPG, WEBP" },
};

export function ImageUploader({
  productId,
  currentUrl,
  onUploaded,
  onRemoved,
}: ImageUploaderProps) {
  const { lang } = useLanguage();
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [preview, setPreview] = React.useState<string | null>(currentUrl || null);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const c = {
    selectImage: lang === "es" ? content.selectImage.es : content.selectImage.en,
    uploading: lang === "es" ? content.uploading.es : content.uploading.en,
    uploadSuccess: lang === "es" ? content.uploadSuccess.es : content.uploadSuccess.en,
    uploadError: lang === "es" ? content.uploadError.es : content.uploadError.en,
    remove: lang === "es" ? content.remove.es : content.remove.en,
    replace: lang === "es" ? content.replace.es : content.replace.en,
    dragDrop: lang === "es" ? content.dragDrop.es : content.dragDrop.en,
    maxSize: lang === "es" ? content.maxSize.es : content.maxSize.en,
    formats: lang === "es" ? content.formats.es : content.formats.en,
  };

  // Update preview when currentUrl changes
  React.useEffect(() => {
    setPreview(currentUrl || null);
  }, [currentUrl]);

  const sanitizeFileName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError(lang === "es" ? "Formato no válido" : "Invalid format");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError(lang === "es" ? "Archivo muy grande (máx 5MB)" : "File too large (max 5MB)");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Create unique filename
      const timestamp = Date.now();
      const ext = file.name.split(".").pop() || "webp";
      const sanitizedName = sanitizeFileName(file.name.replace(/\.[^/.]+$/, ""));
      const folder = productId || "new";
      const filePath = `products/${folder}/${timestamp}-${sanitizedName}.${ext}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(BUCKET_NAME)
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;
      
      // Update preview and notify parent
      setPreview(publicUrl);
      onUploaded(publicUrl);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(c.uploadError);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemoved?.();
  };

  return (
    <div className="space-y-3">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-label={c.selectImage}
      />

      {/* Upload zone / Preview */}
      {preview ? (
        // Preview mode
        <div className="relative">
          <div
            className={cn(
              "relative aspect-video rounded-xl overflow-hidden",
              "bg-surface border border-border"
            )}
          >
            <Image
              src={preview}
              alt="Preview"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>

          {/* Actions */}
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1"
            >
              {isUploading ? c.uploading : c.replace}
            </Button>
            {onRemoved && (
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleRemove}
                disabled={isUploading}
              >
                {c.remove}
              </Button>
            )}
          </div>
        </div>
      ) : (
        // Drop zone mode
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative cursor-pointer",
            "flex flex-col items-center justify-center",
            "min-h-[200px] p-6 rounded-xl",
            "border-2 border-dashed transition-all duration-200",
            isDragging
              ? "border-brand bg-brand-subtle/20"
              : "border-border hover:border-brand/50 hover:bg-surface/50",
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
              <UploadIcon />
              <p className="mt-3 text-small text-text-muted text-center">
                {c.dragDrop}
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-2"
                tabIndex={-1}
              >
                {c.selectImage}
              </Button>
              <p className="mt-3 text-caption text-text-subtle">
                {c.formats} • {c.maxSize}
              </p>
            </>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <p className="text-small text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      className="w-10 h-10 text-text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}
