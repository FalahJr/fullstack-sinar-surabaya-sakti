import { Suspense } from "react";
import { PageHero } from "@/components/shared/PageHero";
import { ProductsExplorer } from "@/components/sections/ProductsExplorer";
import { fetchProductCategories, fetchProducts } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Product Catalog",
  description:
    "Katalog lengkap kabel SUPREME — kabel listrik dan telekomunikasi untuk kebutuhan kontraktor, industri, PLN, TELKOM, dan infrastruktur.",
  path: "/products",
  keywords: [
    "katalog kabel supreme",
    "kabel listrik supreme",
    "kabel telekomunikasi supreme",
  ],
});

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([
    fetchProductCategories(),
    fetchProducts(),
  ]);

  return (
    <>
      <PageHero
        title="Product Catalog"
        description="Kabel listrik dan kabel telekomunikasi merk SUPREME untuk berbagai kebutuhan industri."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Products" },
        ]}
      />
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
            <p className="text-sm text-[var(--color-ink-soft)]">
              Loading products...
            </p>
          </div>
        }
      >
        <ProductsExplorer categories={categories} products={products} />
      </Suspense>
    </>
  );
}
