/**
 * Shared TypeScript interfaces. Match the shape yang nanti akan dikirim
 * oleh backend Laravel API — sehingga saat swap ke real API, tidak
 * perlu ubah komponen.
 */

export interface CompanyAddress {
  line1: string;
  line2: string;
  line3: string;
}

export interface CompanyHours {
  weekday: string;
  weekend: string;
}

export interface TimelineItem {
  year: string;
  label: string;
  desc: string;
}

export interface WhyChooseUsItem {
  title: string;
  desc: string;
}

export interface CompanyInfo {
  name: string;
  shortName: string;
  established: string;
  establishedYear: string;
  business: string;
  mainProduct: string;
  distributorNote: string;
  supportedBy: string;
  location: string;
  coverage: string;
  address: CompanyAddress;
  phones: string[];
  fax: string[];
  email: string;
  whatsappNumber: string;
  hours: CompanyHours;
  mapsEmbedUrl: string;
  vision: string;
  mission: string;
  timeline: TimelineItem[];
  whyChooseUs: WhyChooseUsItem[];
  industries: string[];
}

export interface ProductCategory {
  slug: string;
  number: string;
  name: string;
  nameEn: string;
  description: string;
}

export interface ProductDocument {
  title: string;
  fileUrl: string;
  fileType: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string | null;
  specifications: string | null;
  applications: string | null;
  documents: ProductDocument[];
}

export interface DownloadDocument {
  id: string;
  title: string;
  category: string;
  fileType: string;
  fileUrl: string;
}

/**
 * API response envelope — backend Laravel biasanya wrap dalam:
 *   { data: ..., message: ..., success: boolean }
 * Sesuaikan saat integrasi.
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
