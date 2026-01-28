import { Suspense } from "react";
import { HomeHero, FeaturedProductsDb, FeaturedProducts, AboutSection, ContactSection } from "@/components/sections";
import { getFeaturedProducts } from "@/lib/db/products";
import { FeaturedProductsContent } from "@/components/sections/featured-products-content";

/* ═══════════════════════════════════════════════════════════════════════════
   HOMEPAGE
   Hero + Featured Products + About + Contact
   Clean section rhythm with subtle visual breaks
   ═══════════════════════════════════════════════════════════════════════════ */

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch featured products from Supabase
  const featuredProducts = await getFeaturedProducts(4);

  return (
    <>
      {/* Hero Section */}
      <HomeHero />

      {/* Featured Products Section - from DB if available, fallback to static */}
      {featuredProducts.length > 0 ? (
        <FeaturedProductsContent products={featuredProducts} />
      ) : (
        <FeaturedProducts />
      )}

      {/* About Section */}
      <AboutSection />

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-6 md:mx-12" />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
