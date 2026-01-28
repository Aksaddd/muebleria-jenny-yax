import { AdminGuard, AdminShell } from "@/components/admin";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN LAYOUT
   Wraps all /admin/* pages with auth guard and shell
   ═══════════════════════════════════════════════════════════════════════════ */

export const metadata = {
  title: "Admin | Mueblería Jenny Yax",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
