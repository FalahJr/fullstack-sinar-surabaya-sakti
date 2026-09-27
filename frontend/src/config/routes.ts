/**
 * Centralized route paths — single source of truth untuk internal links.
 */

export const routes = {
  home: "/",
  about: "/about",
  companyProfile: "/company-profile",
  visionMission: "/vision-mission",
  products: "/products",
  productDetail: (slug: string) => `/products/${slug}`,
  productsByCategory: (category: string) => `/products?category=${category}`,
  downloads: "/downloads",
  contact: "/contact",
} as const;

export const navigation = {
  main: [
    { label: "Home", href: routes.home, id: "home" },
    { label: "About Us", href: routes.about, id: "about" },
    {
      label: "Company",
      id: "company",
      children: [
        { label: "Company Profile", href: routes.companyProfile },
        { label: "Vision & Mission", href: routes.visionMission },
      ],
    },
    {
      label: "Products",
      id: "products",
      children: [
        {
          label: "Kabel Listrik",
          href: routes.productsByCategory("kabel-listrik"),
        },
        {
          label: "Kabel Telekomunikasi",
          href: routes.productsByCategory("kabel-telekomunikasi"),
        },
        { label: "View All Products", href: routes.products, primary: true },
      ],
    },
    {
      label: "Download Center",
      href: routes.downloads,
      id: "downloads",
    },
    { label: "Contact", href: routes.contact, id: "contact" },
  ],
} as const;
