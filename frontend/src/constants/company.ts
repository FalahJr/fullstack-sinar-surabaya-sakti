import type { CompanyInfo } from "@/types";

/**
 * Static company data. Nanti akan diganti dengan `fetchCompanyInfo()`
 * dari `@/lib/api` saat backend Laravel siap.
 * Lihat docs/API-INTEGRATION.md untuk step-by-step swap.
 */
export const companyInfo: CompanyInfo = {
  name: "PT Sinar Surabayasakti",
  shortName: "Sinar Surabayasakti",
  established: "30 October 1992",
  establishedYear: "1992",
  business: "Cable Distributor",
  mainProduct: "SUPREME Cable",
  distributorNote: "SUPREME Cable Distributor",
  supportedBy: "PT SUCACO Tbk (Supreme Cable Manufacturing Corporation Tbk)",
  location: "Sidoarjo, East Java",
  coverage: "Indonesia",
  address: {
    line1: "Jl. Kalijaten No. 65",
    line2: "Taman, Sidoarjo",
    line3: "Jawa Timur 61257, Indonesia",
  },
  phones: [
    "031-7881785",
    "031-7881786",
    "031-7881787",
    "031-7881788",
    "031-7881789",
  ],
  fax: ["031-7881322", "031-7884872"],
  email: "ptsinarsurabayasakti@gmail.com",
  whatsappNumber: "[WHATSAPP_NUMBER]", // TODO: ganti dgn nomor asli, format 6281234567890
  hours: {
    weekday: "Monday - Friday, 08:00 - 16:00",
    weekend: "Saturday, Sunday & public holidays: Closed",
  },
  mapsEmbedUrl: "", // TODO: paste Google Maps embed URL
  vision: "Vision statement will be provided by PT Sinar Surabayasakti.",
  mission: "Mission statement will be provided by PT Sinar Surabayasakti.",
  timeline: [
    {
      year: "1992",
      label: "Company Established",
      desc: "PT Sinar Surabayasakti was founded on 30 October 1992.",
    },
    {
      year: "1993",
      label: "Started Business Operations",
      desc: "Began operations in January 1993 as an agent/distributor of SUPREME cable, supported by PT SUCACO Tbk.",
    },
    {
      year: "Present",
      label: "Serving Customers Across Indonesia",
      desc: "Continuing to serve customers in Surabaya, Eastern Indonesia, and beyond.",
    },
  ],
  whyChooseUs: [
    {
      title: "Trusted Experience",
      desc: "Berpengalaman sejak 1992 dalam distribusi kabel SUPREME.",
    },
    {
      title: "Quality Products",
      desc: "Menyediakan produk kabel untuk kebutuhan kelistrikan dan telekomunikasi.",
    },
    {
      title: "Wide Customer Reach",
      desc: "Melayani kebutuhan pelanggan di Surabaya, Indonesia Timur, hingga wilayah Indonesia lainnya.",
    },
    {
      title: "Reliable Support",
      desc: "Memberikan dukungan untuk kebutuhan produk kabel pelanggan.",
    },
  ],
  industries: [
    "Contractors",
    "Electrical Stores",
    "Utilities (PT PLN)",
    "Telecommunications (PT TELKOM)",
    "Industrial Projects",
    "Infrastructure",
  ],
};

/** Helper: WhatsApp click-to-chat URL builder */
export function getWhatsAppUrl(message?: string): string {
  const number = (companyInfo.whatsappNumber || "").replace(/[^\d]/g, "");
  const text = encodeURIComponent(
    message || "Halo, saya ingin bertanya mengenai produk kabel SUPREME.",
  );
  if (!number) return "#";
  return `https://wa.me/${number}?text=${text}`;
}
