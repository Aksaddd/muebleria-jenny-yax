import { createServerClient } from "@/lib/supabase/server";
import { supabase } from "@/lib/supabase/client";
import type { DbProduct, DbProductInsert, DbProductUpdate } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTS DATA ACCESS
   Functions to fetch and manage products from Supabase
   ═══════════════════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────────────────
// PUBLIC QUERIES (Server-side)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get all active products (for catalog page)
 */
export async function getProducts(): Promise<DbProduct[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

/**
 * Get products by category
 */
export async function getProductsByCategory(category: string): Promise<DbProduct[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data || [];
}

/**
 * Get featured products (for homepage)
 */
export async function getFeaturedProducts(limit: number = 6): Promise<DbProduct[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data || [];
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<DbProduct | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // No rows found
      return null;
    }
    console.error("Error fetching product by slug:", error);
    return null;
  }

  return data;
}

/**
 * Get a single product by ID
 */
export async function getProductById(id: string): Promise<DbProduct | null> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching product by ID:", error);
    return null;
  }

  return data;
}

/**
 * Get related products (same category, excluding current)
 */
export async function getRelatedProducts(
  productId: string,
  category: string,
  limit: number = 3
): Promise<DbProduct[]> {
  const supabase = createServerClient();
  
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("category", category)
    .neq("id", productId)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  // If not enough same-category products, fill with others
  if (data && data.length < limit) {
    const { data: moreProducts } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .neq("id", productId)
      .neq("category", category)
      .limit(limit - data.length);

    return [...data, ...(moreProducts || [])];
  }

  return data || [];
}

// ───────────────────────────────────────────────────────────────────────────
// ADMIN QUERIES (Client-side with auth)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get all products for admin (including inactive)
 */
export async function getAdminProducts(): Promise<DbProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin products:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get a single product for admin (including inactive)
 */
export async function getAdminProductBySlug(slug: string): Promise<DbProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching admin product:", error);
    throw error;
  }

  return data;
}

/**
 * Create a new product
 */
export async function createProduct(product: DbProductInsert): Promise<DbProduct> {
  const { data, error } = await supabase
    .from("products")
    .insert(product)
    .select()
    .single();

  if (error) {
    console.error("Error creating product:", error);
    throw error;
  }

  return data;
}

/**
 * Update a product
 */
export async function updateProduct(
  id: string,
  updates: DbProductUpdate
): Promise<DbProduct> {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating product:", error);
    throw error;
  }

  return data;
}

/**
 * Delete a product (soft delete by setting active=false)
 */
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .update({ active: false })
    .eq("id", id);

  if (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

/**
 * Permanently delete a product
 */
export async function hardDeleteProduct(id: string): Promise<void> {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error hard deleting product:", error);
    throw error;
  }
}
