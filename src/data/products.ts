/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCT DATA
   Static product catalog (will be replaced with Supabase in Phase 11)
   ═══════════════════════════════════════════════════════════════════════════ */

export type ProductCategory =
  | "Roperos"
  | "Trinchantes"
  | "Libreros"
  | "Burós"
  | "Cunas"
  | "Mesas"
  | "Personalizado";

export type Product = {
  id: string;
  slug: string;
  name: {
    es: string;
    en: string;
  };
  category: ProductCategory;
  shortDescription: {
    es: string;
    en: string;
  };
  image: {
    src: string;
    alt: {
      es: string;
      en: string;
    };
  };
  features?: string[];
  available: boolean;
};

// Category labels for filter UI
export const categoryLabels: Record<ProductCategory | "Todos", { es: string; en: string }> = {
  Todos: { es: "Todos", en: "All" },
  Roperos: { es: "Roperos", en: "Wardrobes" },
  Trinchantes: { es: "Trinchantes", en: "Sideboards" },
  Libreros: { es: "Libreros", en: "Bookshelves" },
  Burós: { es: "Burós", en: "Nightstands" },
  Cunas: { es: "Cunas", en: "Cribs" },
  Mesas: { es: "Mesas", en: "Tables" },
  Personalizado: { es: "Personalizado", en: "Custom" },
};

// All available categories for filter
export const productCategories: (ProductCategory | "Todos")[] = [
  "Todos",
  "Roperos",
  "Trinchantes",
  "Libreros",
  "Burós",
  "Cunas",
  "Mesas",
  "Personalizado",
];

// Static product data
export const products: Product[] = [
  {
    id: "1",
    slug: "ropero-clasico",
    name: {
      es: "Ropero Clásico",
      en: "Classic Wardrobe",
    },
    category: "Roperos",
    shortDescription: {
      es: "Madera maciza con acabado brillante. Amplio espacio interior.",
      en: "Solid wood with polished finish. Spacious interior.",
    },
    image: {
      src: "/images/hero/workshop-roperos.webp",
      alt: {
        es: "Ropero clásico de madera con acabado brillante",
        en: "Classic wooden wardrobe with polished finish",
      },
    },
    features: ["Madera de pino", "Acabado brillante", "Espejos opcionales"],
    available: true,
  },
  {
    id: "2",
    slug: "ropero-dos-puertas",
    name: {
      es: "Ropero Dos Puertas",
      en: "Two-Door Wardrobe",
    },
    category: "Roperos",
    shortDescription: {
      es: "Diseño compacto ideal para espacios medianos. Cajones inferiores.",
      en: "Compact design ideal for medium spaces. Lower drawers.",
    },
    image: {
      src: "/images/7397155016960105935.webp",
      alt: {
        es: "Ropero de dos puertas con cajones",
        en: "Two-door wardrobe with drawers",
      },
    },
    features: ["Dos puertas", "Cajones inferiores", "Barra para colgar"],
    available: true,
  },
  {
    id: "3",
    slug: "trinchante-tradicional",
    name: {
      es: "Trinchante Tradicional",
      en: "Traditional Sideboard",
    },
    category: "Trinchantes",
    shortDescription: {
      es: "Diseño clásico guatemalteco. Vidrio decorativo y múltiples compartimentos.",
      en: "Classic Guatemalan design. Decorative glass and multiple compartments.",
    },
    image: {
      src: "/images/hero/storefront.webp",
      alt: {
        es: "Trinchante tradicional con vidrio decorativo",
        en: "Traditional sideboard with decorative glass",
      },
    },
    features: ["Vidrio decorativo", "Compartimentos", "Cajones"],
    available: true,
  },
  {
    id: "4",
    slug: "librero-pino",
    name: {
      es: "Librero de Pino",
      en: "Pine Bookshelf",
    },
    category: "Libreros",
    shortDescription: {
      es: "Estantes amplios para libros y decoración. Madera de pino natural.",
      en: "Spacious shelves for books and decor. Natural pine wood.",
    },
    image: {
      src: "/images/1472360117443877582.webp",
      alt: {
        es: "Librero de pino con estantes amplios",
        en: "Pine bookshelf with spacious shelves",
      },
    },
    features: ["5 estantes", "Madera de pino", "Altura ajustable"],
    available: true,
  },
  {
    id: "5",
    slug: "buro-clasico",
    name: {
      es: "Buró Clásico",
      en: "Classic Nightstand",
    },
    category: "Burós",
    shortDescription: {
      es: "Compacto y funcional. Cajón y espacio de almacenamiento.",
      en: "Compact and functional. Drawer and storage space.",
    },
    image: {
      src: "/images/678719326111886872.webp",
      alt: {
        es: "Buró clásico de madera con cajón",
        en: "Classic wooden nightstand with drawer",
      },
    },
    features: ["Un cajón", "Estante inferior", "Acabado natural"],
    available: true,
  },
  {
    id: "6",
    slug: "cuna-bebe",
    name: {
      es: "Cuna para Bebé",
      en: "Baby Crib",
    },
    category: "Cunas",
    shortDescription: {
      es: "Segura y resistente. Barandales ajustables y acabado no tóxico.",
      en: "Safe and sturdy. Adjustable rails and non-toxic finish.",
    },
    image: {
      src: "/images/7711001662288611009.webp",
      alt: {
        es: "Cuna de madera para bebé con barandales",
        en: "Wooden baby crib with rails",
      },
    },
    features: ["Barandales ajustables", "Acabado seguro", "Ruedas con freno"],
    available: true,
  },
  {
    id: "7",
    slug: "mesa-comedor",
    name: {
      es: "Mesa de Comedor",
      en: "Dining Table",
    },
    category: "Mesas",
    shortDescription: {
      es: "Para 6 personas. Madera sólida con acabado resistente.",
      en: "For 6 people. Solid wood with durable finish.",
    },
    image: {
      src: "/images/hero/storefront.webp",
      alt: {
        es: "Mesa de comedor de madera para 6 personas",
        en: "Wooden dining table for 6 people",
      },
    },
    features: ["6 personas", "Madera sólida", "Acabado resistente"],
    available: true,
  },
  {
    id: "8",
    slug: "mueble-personalizado",
    name: {
      es: "Mueble Personalizado",
      en: "Custom Furniture",
    },
    category: "Personalizado",
    shortDescription: {
      es: "Diseñamos y fabricamos según tus especificaciones exactas.",
      en: "We design and build to your exact specifications.",
    },
    image: {
      src: "/images/workshop/lumber-yard.webp",
      alt: {
        es: "Madera lista para fabricación de muebles personalizados",
        en: "Wood ready for custom furniture production",
      },
    },
    features: ["A tu medida", "Diseño único", "Consulta gratuita"],
    available: true,
  },
];

// Helper to get product by ID or slug
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

// Helper to filter products by category
export function getProductsByCategory(category: ProductCategory | "Todos"): Product[] {
  if (category === "Todos") return products;
  return products.filter((p) => p.category === category);
}

// Helper to get related products (same category, excluding current)
export function getRelatedProducts(currentId: string, limit: number = 3): Product[] {
  const current = getProductById(currentId);
  if (!current) return products.slice(0, limit);

  // Get products from same category, excluding current
  const sameCategory = products.filter(
    (p) => p.category === current.category && p.id !== current.id && p.slug !== currentId
  );

  // If not enough, fill with products from other categories
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const others = products.filter(
    (p) => p.category !== current.category && p.id !== current.id && p.slug !== currentId
  );

  return [...sameCategory, ...others].slice(0, limit);
}
