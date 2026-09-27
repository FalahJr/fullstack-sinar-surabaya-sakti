/**
 * Site-wide configuration (SEO defaults, URLs, feature flags).
 * Ubah nilai default disini untuk perubahan global.
 * Lihat docs/SEO-CONFIGURATION.md untuk tuning keyword.
 */

export const siteConfig = {
  name: "PT Sinar Surabayasakti",
  shortName: "Sinar Surabayasakti",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sinarsurabayasakti.co.id",
  locale: "id_ID",
  language: "id",
  // Default SEO — dapat di-override per page via generateMetadata()
  defaultTitle: "PT Sinar Surabayasakti | Distributor Kabel SUPREME",
  titleTemplate: "%s | PT Sinar Surabayasakti",
  description:
    "PT Sinar Surabayasakti merupakan agen dan distributor kabel SUPREME yang menyediakan kebutuhan kabel listrik dan telekomunikasi untuk berbagai pelanggan di Indonesia sejak 1992.",
  keywords: [
    "PT Sinar Surabayasakti",
    "Sinar Surabayasakti",
    "Distributor Kabel",
    "Kabel SUPREME",
    "Kabel Listrik",
    "Kabel Telekomunikasi",
    "Distributor Kabel Surabaya",
    "Distributor Kabel Sidoarjo",
    "SUCACO",
    "Kabel PLN",
    "Kabel TELKOM",
  ],
  ogImage: "/og-default.jpg",
  themeColor: "#e00d30",
  author: "PT Sinar Surabayasakti",
  twitter: {
    card: "summary_large_image" as const,
    site: "@sinarsurabayasakti",
  },
  // Verification codes — isi saat sudah verify di search console
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
  },
  // Analytics
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;

export type SiteConfig = typeof siteConfig;
