import { createClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════════════════════════
   SUPABASE CLIENT
   Browser client for Supabase Auth and data operations
   ═══════════════════════════════════════════════════════════════════════════ */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Dev-friendly error if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  if (typeof window !== "undefined") {
    console.error(
      "⚠️ Supabase environment variables missing!\n" +
        "Please create a .env.local file with:\n" +
        "  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n" +
        "  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key\n" +
        "Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api"
    );
  }
}

// Create client (with fallback empty strings to avoid runtime errors during build)
export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

// Helper to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}
