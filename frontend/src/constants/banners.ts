/**
 * Static banner data untuk home hero. Nanti akan diganti dengan
 * `fetchBanners()` dari `@/lib/api` saat backend siap.
 */

export interface Banner {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export const homeBanners: Banner[] = [
  {
    id: "hero-default",
    eyebrow: "SUPREME Cable Distributor · Est. 1992",
    title: "Solusi Kabel Andal untuk Kebutuhan Kelistrikan & Telekomunikasi",
    description:
      "PT Sinar Surabayasakti merupakan agen dan distributor kabel SUPREME yang melayani kebutuhan pelanggan di berbagai sektor sejak 1992.",
    ctaPrimary: { label: "Explore Products", href: "/products" },
    ctaSecondary: { label: "Contact Us", href: "/contact" },
  },
];
