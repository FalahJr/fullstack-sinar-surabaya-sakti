import type { Product, ProductCategory } from "@/types";

/**
 * Static product data. Nanti akan diganti dengan `fetchProducts()`
 * dari `@/lib/api` saat backend Laravel siap.
 */

export const productCategories: ProductCategory[] = [
  {
    slug: "kabel-listrik",
    number: "01",
    name: "Kabel Listrik",
    nameEn: "Electrical Cable",
    description:
      "Bare Copper Conductor, Aluminium Conductor, PVC up to 6 KV, XLPE up to 150 KV, Lead Sheathed, Corrugated Metallic Sheathed, Multiplex, dan jenis lainnya.",
  },
  {
    slug: "kabel-telekomunikasi",
    number: "02",
    name: "Kabel Telekomunikasi",
    nameEn: "Telecommunication Cable",
    description:
      "Indoor, Burial, Drop Wire, Aerial Duct, Jelly Filled Armoured, Non Armoured, PCM, LAN, Optical Fibre, dan jenis lainnya.",
  },
];

export const products: Product[] = [
  {
    id: "bare-copper-conductor",
    name: "Bare Copper Conductor",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Bare copper conductor used as a base conductor for electrical power transmission and distribution applications.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "aluminium-conductor",
    name: "Aluminium Conductor",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Aluminium conductor commonly used for overhead power lines due to its favorable weight-to-conductivity ratio.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "pvc-cable",
    name: "PVC Cable (up to 6 KV)",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "PVC insulated power cable rated up to 6 KV for general electrical distribution needs.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "xlpe-cable",
    name: "XLPE Cable (up to 150 KV)",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Cross-linked polyethylene insulated cable rated up to 150 KV, suited for medium and high voltage applications.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "lead-sheathed-cable",
    name: "Lead Sheathed Cable",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Cable with a lead sheath layer for additional mechanical and moisture protection.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "corrugated-metallic-sheathed",
    name: "Corrugated Metallic Sheathed Cable",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Cable with a corrugated metallic sheath for enhanced mechanical protection in demanding installations.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "multiplex-cable",
    name: "Multiplex Cable",
    category: "kabel-listrik",
    categoryLabel: "Kabel Listrik",
    description:
      "Multi-core aerial cable assembly typically used for low voltage overhead distribution.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "indoor-telecom-cable",
    name: "Indoor Telecommunication Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Telecommunication cable designed for indoor installation and distribution.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "burial-cable",
    name: "Burial Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Direct-burial telecommunication cable built for underground installation.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "drop-wire",
    name: "Drop Wire",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Drop wire cable used for the final connection between distribution points and customer premises.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "aerial-duct-cable",
    name: "Aerial Duct Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Cable designed for aerial duct installation in telecommunication networks.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "jelly-filled-armoured",
    name: "Jelly Filled Armoured Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Jelly-filled armoured telecommunication cable offering protection against moisture ingress.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "non-armoured-cable",
    name: "Non Armoured Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Non-armoured telecommunication cable for standard indoor/outdoor use.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "pcm-cable",
    name: "PCM Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Cable used in pulse-code modulation telecommunication transmission systems.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "lan-cable",
    name: "LAN Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Local area network cable for structured data cabling installations.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
  {
    id: "optical-fibre-cable",
    name: "Optical Fibre Cable",
    category: "kabel-telekomunikasi",
    categoryLabel: "Kabel Telekomunikasi",
    description:
      "Optical fibre cable for high-capacity, long-distance telecommunication transmission.",
    image: null,
    specifications: null,
    applications: null,
    documents: [],
  },
];

export const featuredProductIds = [
  "bare-copper-conductor",
  "pvc-cable",
  "xlpe-cable",
  "indoor-telecom-cable",
  "lan-cable",
  "optical-fibre-cable",
];

/* ---------- Query helpers ---------- */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.id === slug);
}

export function getProductsByCategory(categorySlug?: string): Product[] {
  if (!categorySlug || categorySlug === "all") return products;
  return products.filter((p) => p.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return featuredProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p));
}

export function searchProducts(
  query?: string,
  categorySlug?: string,
): Product[] {
  const q = (query || "").trim().toLowerCase();
  const list = getProductsByCategory(categorySlug);
  if (!q) return list;
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      (p.description || "").toLowerCase().includes(q),
  );
}
