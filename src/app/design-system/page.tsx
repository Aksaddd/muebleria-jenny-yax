"use client";

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Chip,
  StatusBadge,
  Input,
  Textarea,
  Select,
  FormField,
  Container,
  Section,
  SectionHeader,
  Stack,
  Divider,
} from "@/components/ui";
import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM DEMO PAGE
   Remove this in production — for development/review only
   ═══════════════════════════════════════════════════════════════════════════ */

export default function DesignSystemPage() {
  const [selectedChip, setSelectedChip] = useState("all");

  return (
    <main id="main-content">
      {/* Hero */}
      <Section background="brand" spacing="md">
        <Container>
          <div className="text-center py-8">
            <h1 className="font-serif text-display text-text">
              Design System v1.0
            </h1>
            <p className="mt-4 text-body-lg text-text-muted max-w-2xl mx-auto">
              Mueblería Jenny Yax — Warm, wood-inspired tokens & components
            </p>
          </div>
        </Container>
      </Section>

      {/* Colors */}
      <Section spacing="lg">
        <Container>
          <SectionHeader title="Colores" eyebrow="Tokens" />
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            <ColorSwatch name="brand" className="bg-brand" />
            <ColorSwatch name="brand-2" className="bg-brand-2" />
            <ColorSwatch name="success" className="bg-success" />
            <ColorSwatch name="warning" className="bg-warning" />
            <ColorSwatch name="danger" className="bg-danger" />
            <ColorSwatch name="whatsapp" className="bg-whatsapp" />
            <ColorSwatch name="bg-alt" className="bg-bg-alt border" />
            <ColorSwatch name="surface" className="bg-surface border" />
          </div>
        </Container>
      </Section>

      <Divider className="max-w-container mx-auto" />

      {/* Typography */}
      <Section spacing="lg" background="alt">
        <Container>
          <SectionHeader title="Tipografía" eyebrow="Escalas" />
          <Stack gap="lg">
            <p className="font-serif text-display">Display — Hero headlines</p>
            <p className="font-serif text-h1">H1 — Page titles</p>
            <p className="font-serif text-h2">H2 — Section headers</p>
            <p className="font-serif text-h3">H3 — Card titles</p>
            <p className="font-serif text-h4">H4 — Small headers</p>
            <Divider />
            <p className="text-body-lg">Body Large — Introductory text</p>
            <p className="text-body">Body — Standard paragraph text for descriptions and content.</p>
            <p className="text-small text-text-muted">Small — Secondary info</p>
            <p className="text-caption text-text-subtle">Caption — Metadata</p>
            <p className="text-overline uppercase text-brand">Overline — Labels</p>
          </Stack>
        </Container>
      </Section>

      <Divider className="max-w-container mx-auto" />

      {/* Buttons */}
      <Section spacing="lg">
        <Container>
          <SectionHeader title="Botones" eyebrow="Interacción" />
          
          <Stack gap="xl">
            <div>
              <p className="text-small text-text-muted mb-3">Variantes</p>
              <Stack direction="row" gap="md" wrap>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="whatsapp">WhatsApp</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="link">Link</Button>
              </Stack>
            </div>

            <div>
              <p className="text-small text-text-muted mb-3">Tamaños</p>
              <Stack direction="row" gap="md" align="center" wrap>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </Stack>
            </div>

            <div>
              <p className="text-small text-text-muted mb-3">Estados</p>
              <Stack direction="row" gap="md" wrap>
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider className="max-w-container mx-auto" />

      {/* Badges & Chips */}
      <Section spacing="lg" background="alt">
        <Container>
          <SectionHeader title="Badges & Chips" eyebrow="Etiquetas" />
          
          <Stack gap="xl">
            <div>
              <p className="text-small text-text-muted mb-3">Badge Variants</p>
              <Stack direction="row" gap="sm" wrap>
                <Badge>Default</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="outline">Outline</Badge>
              </Stack>
            </div>

            <div>
              <p className="text-small text-text-muted mb-3">Solid Badges</p>
              <Stack direction="row" gap="sm" wrap>
                <Badge variant="solid-brand">Solid Brand</Badge>
                <Badge variant="solid-success">Solid Success</Badge>
                <Badge variant="solid-warning">Solid Warning</Badge>
                <Badge variant="solid-danger">Solid Danger</Badge>
                <Badge variant="solid-secondary">Solid Secondary</Badge>
              </Stack>
            </div>

            <div>
              <p className="text-small text-text-muted mb-3">Status Badges</p>
              <Stack direction="row" gap="sm" wrap>
                <StatusBadge status="available" />
                <StatusBadge status="sold" />
                <StatusBadge status="pending" />
                <StatusBadge status="custom" />
              </Stack>
            </div>

            <div>
              <p className="text-small text-text-muted mb-3">Chips (Interactive)</p>
              <Stack direction="row" gap="sm" wrap>
                {["all", "roperos", "trinchantes", "libreros"].map((cat) => (
                  <Chip
                    key={cat}
                    selected={selectedChip === cat}
                    onClick={() => setSelectedChip(cat)}
                  >
                    {cat === "all" ? "Todos" : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Chip>
                ))}
                <Chip selected removable onRemove={() => {}}>
                  Removable
                </Chip>
              </Stack>
            </div>
          </Stack>
        </Container>
      </Section>

      <Divider className="max-w-container mx-auto" />

      {/* Cards */}
      <Section spacing="lg">
        <Container>
          <SectionHeader title="Cards" eyebrow="Contenedores" />
          
          <div className="grid md:grid-cols-3 gap-gap-lg">
            <Card>
              <CardHeader>
                <CardTitle>Card Básica</CardTitle>
                <CardDescription>Una tarjeta simple con título y descripción</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-muted">
                  Contenido de la tarjeta con texto de ejemplo.
                </p>
              </CardContent>
            </Card>

            <Card interactive>
              <CardHeader>
                <CardTitle>Card Interactiva</CardTitle>
                <CardDescription>Hover para ver el efecto</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-muted">
                  Esta tarjeta tiene efectos de hover.
                </p>
              </CardContent>
            </Card>

            <Card elevation={3}>
              <CardHeader>
                <CardTitle>Card Elevada</CardTitle>
                <CardDescription>Mayor profundidad visual</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body text-text-muted">
                  Elevation level 3 para más énfasis.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Divider className="max-w-container mx-auto" />

      {/* Forms */}
      <Section spacing="lg" background="alt">
        <Container size="narrow">
          <SectionHeader title="Formularios" eyebrow="Inputs" />
          
          <Card>
            <CardContent>
              <form className="space-y-6">
                <FormField
                  id="name"
                  label="Nombre completo"
                  required
                  helpText="Como aparecerá en tu pedido"
                >
                  <Input placeholder="Ej: Juan Pérez" />
                </FormField>

                <FormField
                  id="email"
                  label="Correo electrónico"
                  required
                >
                  <Input type="email" placeholder="correo@ejemplo.com" />
                </FormField>

                <FormField
                  id="email-error"
                  label="Campo con error"
                  error="Este campo es requerido"
                >
                  <Input placeholder="Muestra estado de error" />
                </FormField>

                <FormField id="category" label="Categoría de producto">
                  <Select>
                    <option value="">Seleccionar...</option>
                    <option value="roperos">Roperos</option>
                    <option value="trinchantes">Trinchantes</option>
                    <option value="libreros">Libreros</option>
                    <option value="custom">Pedido a medida</option>
                  </Select>
                </FormField>

                <FormField
                  id="message"
                  label="Mensaje"
                  helpText="Describe tu pedido o consulta"
                >
                  <Textarea
                    placeholder="Cuéntanos qué mueble necesitas..."
                    rows={4}
                  />
                </FormField>

                <Stack direction="row" gap="md" justify="end">
                  <Button variant="ghost">Cancelar</Button>
                  <Button type="submit">Enviar consulta</Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Section>

      {/* Footer */}
      <Section spacing="sm" background="surface">
        <Container>
          <p className="text-center text-small text-text-muted">
            Design System v1.0 — Mueblería Jenny Yax — Flow Productions
          </p>
        </Container>
      </Section>
    </main>
  );
}

/* ───────────────────────────────────────────────────────────────────────────
   Color Swatch Helper Component
   ─────────────────────────────────────────────────────────────────────────── */

function ColorSwatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="text-center">
      <div
        className={`h-16 rounded-lg shadow-elevation-2 ${className}`}
        title={name}
      />
      <p className="text-caption text-text-subtle mt-2">{name}</p>
    </div>
  );
}
