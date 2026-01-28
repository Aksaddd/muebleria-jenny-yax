"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT GALLERY
   Image gallery for product detail page (structured for multiple images later)
   ═══════════════════════════════════════════════════════════════════════════ */

interface ProductGalleryProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  // For now we only have one image, but structure supports multiple
  const mainImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className={cn(
          "relative aspect-square md:aspect-[4/3]",
          "rounded-2xl overflow-hidden",
          "bg-surface",
          "ring-1 ring-black/5",
          "shadow-elevation-2"
        )}
      >
        <Image
          src={mainImage.src}
          alt={mainImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Thumbnail Strip (shown only if multiple images) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                "ring-2 transition-all duration-200",
                index === selectedIndex
                  ? "ring-brand"
                  : "ring-transparent hover:ring-border"
              )}
              aria-label={`Ver imagen ${index + 1} de ${productName}`}
              aria-pressed={index === selectedIndex}
            >
              <Image
                src={image.src}
                alt={`${productName} - imagen ${index + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
