"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/ui/language-toggle";
import { getInquiries, updateInquiryStatus } from "@/lib/db/inquiries";
import type { DbInquiry } from "@/lib/db/types";

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN INQUIRIES PAGE
   View and manage contact form submissions
   ═══════════════════════════════════════════════════════════════════════════ */

const pageContent = {
  title: { es: "Solicitudes", en: "Inquiries" },
  subtitle: { es: "Mensajes del formulario de contacto", en: "Contact form messages" },
  loading: { es: "Cargando...", en: "Loading..." },
  error: { es: "Error al cargar solicitudes", en: "Error loading inquiries" },
  retry: { es: "Reintentar", en: "Retry" },
  noInquiries: { es: "No hay solicitudes", en: "No inquiries" },
  status: {
    new: { es: "Nuevo", en: "New" },
    reviewed: { es: "Revisado", en: "Reviewed" },
    archived: { es: "Archivado", en: "Archived" },
  },
  filters: {
    all: { es: "Todos", en: "All" },
    new: { es: "Nuevos", en: "New" },
    reviewed: { es: "Revisados", en: "Reviewed" },
    archived: { es: "Archivados", en: "Archived" },
  },
  actions: {
    markReviewed: { es: "Marcar revisado", en: "Mark reviewed" },
    markArchived: { es: "Archivar", en: "Archive" },
    markNew: { es: "Marcar nuevo", en: "Mark new" },
  },
  card: {
    contact: { es: "Contacto", en: "Contact" },
    product: { es: "Producto", en: "Product" },
    message: { es: "Mensaje", en: "Message" },
    received: { es: "Recibido", en: "Received" },
  },
};

type StatusFilter = "all" | "new" | "reviewed" | "archived";

export default function AdminInquiriesPage() {
  const { lang } = useLanguage();
  const [inquiries, setInquiries] = React.useState<DbInquiry[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");

  const c = {
    title: lang === "es" ? pageContent.title.es : pageContent.title.en,
    subtitle: lang === "es" ? pageContent.subtitle.es : pageContent.subtitle.en,
    loading: lang === "es" ? pageContent.loading.es : pageContent.loading.en,
    error: lang === "es" ? pageContent.error.es : pageContent.error.en,
    retry: lang === "es" ? pageContent.retry.es : pageContent.retry.en,
    noInquiries: lang === "es" ? pageContent.noInquiries.es : pageContent.noInquiries.en,
    status: {
      new: lang === "es" ? pageContent.status.new.es : pageContent.status.new.en,
      reviewed: lang === "es" ? pageContent.status.reviewed.es : pageContent.status.reviewed.en,
      archived: lang === "es" ? pageContent.status.archived.es : pageContent.status.archived.en,
    },
    filters: {
      all: lang === "es" ? pageContent.filters.all.es : pageContent.filters.all.en,
      new: lang === "es" ? pageContent.filters.new.es : pageContent.filters.new.en,
      reviewed: lang === "es" ? pageContent.filters.reviewed.es : pageContent.filters.reviewed.en,
      archived: lang === "es" ? pageContent.filters.archived.es : pageContent.filters.archived.en,
    },
    actions: {
      markReviewed: lang === "es" ? pageContent.actions.markReviewed.es : pageContent.actions.markReviewed.en,
      markArchived: lang === "es" ? pageContent.actions.markArchived.es : pageContent.actions.markArchived.en,
      markNew: lang === "es" ? pageContent.actions.markNew.es : pageContent.actions.markNew.en,
    },
    card: {
      contact: lang === "es" ? pageContent.card.contact.es : pageContent.card.contact.en,
      product: lang === "es" ? pageContent.card.product.es : pageContent.card.product.en,
      message: lang === "es" ? pageContent.card.message.es : pageContent.card.message.en,
      received: lang === "es" ? pageContent.card.received.es : pageContent.card.received.en,
    },
  };

  // Fetch inquiries
  const fetchInquiries = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      setError(c.error);
    } finally {
      setIsLoading(false);
    }
  }, [c.error]);

  React.useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Filter inquiries
  const filteredInquiries = React.useMemo(() => {
    if (statusFilter === "all") return inquiries;
    return inquiries.filter((i) => i.status === statusFilter);
  }, [inquiries, statusFilter]);

  // Update status
  const handleStatusChange = async (id: string, newStatus: "new" | "reviewed" | "archived") => {
    try {
      await updateInquiryStatus(id, newStatus);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === "es" ? "es-GT" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Count by status
  const statusCounts = React.useMemo(() => ({
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    reviewed: inquiries.filter((i) => i.status === "reviewed").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
  }), [inquiries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-display text-text">{c.title}</h1>
        <p className="mt-1 text-body text-text-muted">{c.subtitle}</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "new", "reviewed", "archived"] as StatusFilter[]).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              "px-4 py-2 rounded-full",
              "text-small font-medium",
              "transition-all duration-200",
              "min-h-[44px]",
              statusFilter === status
                ? "bg-brand text-white"
                : "bg-surface border border-border text-text-muted hover:text-text"
            )}
          >
            {c.filters[status]}
            <span className="ml-1.5 text-caption opacity-70">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-12 text-center">
          <p className="text-body text-text-muted">{c.loading}</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-12 text-center">
          <p className="text-body text-error mb-4">{error}</p>
          <Button variant="secondary" size="md" onClick={fetchInquiries}>
            {c.retry}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredInquiries.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-body text-text-muted">{c.noInquiries}</p>
        </div>
      )}

      {/* Inquiries List */}
      {!isLoading && !error && filteredInquiries.length > 0 && (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={cn(
                "p-5 rounded-xl",
                "bg-card border border-border",
                inquiry.status === "new" && "border-l-4 border-l-brand"
              )}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-body font-semibold text-text">{inquiry.name}</h3>
                  <p className="text-small text-text-muted">{inquiry.contact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex px-2.5 py-1 rounded-full text-caption font-medium",
                      inquiry.status === "new" && "bg-brand/10 text-brand",
                      inquiry.status === "reviewed" && "bg-success/10 text-success",
                      inquiry.status === "archived" && "bg-text-muted/10 text-text-muted"
                    )}
                  >
                    {c.status[inquiry.status]}
                  </span>
                </div>
              </div>

              {/* Product Category */}
              {inquiry.product_category && (
                <p className="mt-2 text-small text-text-muted">
                  <span className="font-medium">{c.card.product}:</span> {inquiry.product_category}
                </p>
              )}

              {/* Message */}
              <div className="mt-3 p-3 rounded-lg bg-surface/50">
                <p className="text-small text-text whitespace-pre-wrap">{inquiry.message}</p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-caption text-text-subtle">
                  {c.card.received}: {formatDate(inquiry.created_at)}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  {inquiry.status === "new" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleStatusChange(inquiry.id, "reviewed")}
                      className="min-h-[40px]"
                    >
                      {c.actions.markReviewed}
                    </Button>
                  )}
                  {inquiry.status === "reviewed" && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleStatusChange(inquiry.id, "new")}
                        className="min-h-[40px]"
                      >
                        {c.actions.markNew}
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleStatusChange(inquiry.id, "archived")}
                        className="min-h-[40px]"
                      >
                        {c.actions.markArchived}
                      </Button>
                    </>
                  )}
                  {inquiry.status === "archived" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleStatusChange(inquiry.id, "reviewed")}
                      className="min-h-[40px]"
                    >
                      {c.actions.markReviewed}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
