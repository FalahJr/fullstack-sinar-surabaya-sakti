import { companyInfo } from "@/constants/company";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types";
import { absoluteUrl } from "./utils";

/**
 * JSON-LD structured data schemas. Include di page dengan:
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
 *   />
 */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyInfo.name,
    alternateName: companyInfo.shortName,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
    foundingDate: "1992-10-30",
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.line1,
      addressLocality: "Sidoarjo",
      addressRegion: "Jawa Timur",
      postalCode: "61257",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: companyInfo.phones[0],
      contactType: "sales",
      email: companyInfo.email,
      areaServed: "ID",
      availableLanguage: ["Indonesian", "English"],
    },
    sameAs: [] as string[], // Isi dengan URL social media saat tersedia
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#business"),
    name: companyInfo.name,
    image: absoluteUrl("/og-default.jpg"),
    url: siteConfig.url,
    telephone: companyInfo.phones[0],
    email: companyInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.address.line1,
      addressLocality: "Sidoarjo",
      addressRegion: "Jawa Timur",
      postalCode: "61257",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.categoryLabel,
    brand: {
      "@type": "Brand",
      name: "SUPREME",
    },
    manufacturer: {
      "@type": "Organization",
      name: "PT SUCACO Tbk",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: companyInfo.name,
      },
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
  };
}
