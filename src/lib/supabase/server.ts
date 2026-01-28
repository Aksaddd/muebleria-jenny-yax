import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/* ═══════════════════════════════════════════════════════════════════════════
   SUPABASE SERVER CLIENT
   For use in Server Components, Server Actions, and Route Handlers
   ═══════════════════════════════════════════════════════════════════════════ */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a server-side Supabase client
export function createServerClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Supabase environment variables are missing");
    throw new Error("Supabase configuration missing");
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

// Get the storage bucket name
export function getStorageBucket(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "product-images";
}

// Get public URL for a storage object
export function getPublicUrl(path: string): string {
  if (!supabaseUrl) return "";
  const bucket = getStorageBucket();
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
