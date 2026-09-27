/**
 * API Client skeleton (PHASE 6).
 *
 * SEMENTARA: setiap fungsi return static data dari `@/constants/*`
 * NANTI: swap ke `fetch()` call ke Laravel backend.
 *
 * Contoh cara migrasi (baca docs/API-INTEGRATION.md):
 *
 *   // Sebelum:
 *   export async function fetchProducts() {
 *     return products;
 *   }
 *
 *   // Sesudah (saat backend ready):
 *   export async function fetchProducts() {
 *     const res = await fetch(`${API_BASE}/products`, {
 *       next: { revalidate: 3600 }, // ISR: 1 jam
 *     });
 *     const json: ApiResponse<Product[]> = await res.json();
 *     return json.data;
 *   }
 */

import { companyInfo } from "@/constants/company";
import {
  productCategories,
  products,
  getProductBySlug,
  getFeaturedProducts,
} from "@/constants/products";
import { downloadDocuments } from "@/constants/downloads";
import { homeBanners, type Banner } from "@/constants/banners";
import type {
  CompanyInfo,
  DownloadDocument,
  Product,
  ProductCategory,
} from "@/types";

// Base URL — nanti diisi dari env saat backend ready
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

/**
 * Wrapper generic fetch dengan error handling + ISR support.
 * Belum dipakai sekarang, tapi siap dipakai saat backend ada.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: {
    revalidate?: number | false;
    tags?: string[];
    method?: string;
    body?: unknown;
  } = {},
): Promise<T> {
  if (!API_BASE) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL not set. See .env.example");
  }
  const { revalidate = 3600, tags, method = "GET", body } = options;
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    next: revalidate === false ? undefined : { revalidate, tags },
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${endpoint}`);
  }
  const json = (await res.json()) as { data: T };
  return json.data;
}

/* ============================================================
   Public API functions — konsumsi dari page components
   ============================================================ */

export async function fetchCompanyInfo(): Promise<CompanyInfo> {
  // PHASE 6 (static):
  return companyInfo;
  // Nanti (real API):
  // return apiFetch<CompanyInfo>("/company", { revalidate: 86400 });
}

export async function fetchBanners(): Promise<Banner[]> {
  // PHASE 6 (static):
  return homeBanners;
  // Nanti: return apiFetch<Banner[]>("/banners", { revalidate: 3600 });
}

export async function fetchProductCategories(): Promise<ProductCategory[]> {
  // PHASE 6:
  return productCategories;
  // Nanti: return apiFetch<ProductCategory[]>("/product-categories", { revalidate: 21600 });
}

export async function fetchProducts(): Promise<Product[]> {
  // PHASE 6:
  return products;
  // Nanti: return apiFetch<Product[]>("/products", { revalidate: 21600 });
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  // PHASE 6:
  return getProductBySlug(slug) || null;
  // Nanti: return apiFetch<Product>(`/products/${slug}`, { revalidate: 21600 });
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  return getFeaturedProducts();
}

export async function fetchDownloads(): Promise<DownloadDocument[]> {
  // PHASE 6:
  return downloadDocuments;
  // Nanti: return apiFetch<DownloadDocument[]>("/downloads", { revalidate: 21600 });
}
