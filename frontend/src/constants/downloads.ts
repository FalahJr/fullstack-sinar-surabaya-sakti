import type { DownloadDocument } from "@/types";

/**
 * Static download center data. Nanti akan diganti dengan `fetchDownloads()`
 * dari `@/lib/api` saat backend Laravel siap.
 */

export const downloadCategories = [
  "All",
  "Catalog",
  "Brochure",
  "Datasheet",
  "Certificate",
  "Company Profile",
  "Other Documents",
] as const;

export type DownloadCategory = (typeof downloadCategories)[number];

export const downloadDocuments: DownloadDocument[] = [
  {
    id: "company-profile-pdf",
    title: "Company Profile",
    category: "Company Profile",
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    id: "product-catalog-pdf",
    title: "Product Catalog",
    category: "Catalog",
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    id: "product-brochure-pdf",
    title: "Product Brochure",
    category: "Brochure",
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    id: "product-datasheet-pdf",
    title: "Product Datasheet",
    category: "Datasheet",
    fileType: "PDF",
    fileUrl: "#",
  },
  {
    id: "certificates-pdf",
    title: "Certificates",
    category: "Certificate",
    fileType: "PDF",
    fileUrl: "#",
  },
];

export function getDownloadsByCategory(category?: string): DownloadDocument[] {
  if (!category || category === "All") return downloadDocuments;
  return downloadDocuments.filter((d) => d.category === category);
}
