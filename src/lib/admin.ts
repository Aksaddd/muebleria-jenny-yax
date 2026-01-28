/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN UTILITIES
   Helper functions for admin access control
   ═══════════════════════════════════════════════════════════════════════════ */

// Get admin emails from environment
export function getAdminEmails(): string[] {
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || "";
  return adminEmails
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

// Check if an email is an admin
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = getAdminEmails();
  return adminEmails.includes(email.toLowerCase());
}
