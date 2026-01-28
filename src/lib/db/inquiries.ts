import { supabase } from "@/lib/supabase/client";
import type { DbInquiry, DbInquiryInsert, DbInquiryUpdate } from "./types";

/* ═══════════════════════════════════════════════════════════════════════════
   INQUIRIES DATA ACCESS
   Functions to manage contact form submissions
   ═══════════════════════════════════════════════════════════════════════════ */

// ───────────────────────────────────────────────────────────────────────────
// PUBLIC MUTATIONS (Anyone can submit)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Submit a new inquiry (contact form)
 */
export async function submitInquiry(inquiry: DbInquiryInsert): Promise<DbInquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .insert({
      ...inquiry,
      source: inquiry.source || "website",
    })
    .select()
    .single();

  if (error) {
    console.error("Error submitting inquiry:", error);
    throw error;
  }

  return data;
}

// ───────────────────────────────────────────────────────────────────────────
// ADMIN QUERIES (Requires auth)
// ───────────────────────────────────────────────────────────────────────────

/**
 * Get all inquiries for admin
 */
export async function getInquiries(): Promise<DbInquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get inquiries by status
 */
export async function getInquiriesByStatus(
  status: "new" | "reviewed" | "archived"
): Promise<DbInquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching inquiries by status:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get new inquiries count (for badge)
 */
export async function getNewInquiriesCount(): Promise<number> {
  const { count, error } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  if (error) {
    console.error("Error counting new inquiries:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Update inquiry status
 */
export async function updateInquiryStatus(
  id: string,
  status: "new" | "reviewed" | "archived"
): Promise<DbInquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating inquiry status:", error);
    throw error;
  }

  return data;
}

/**
 * Delete an inquiry
 */
export async function deleteInquiry(id: string): Promise<void> {
  const { error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting inquiry:", error);
    throw error;
  }
}
