import { Hero } from "@/components/sections/Hero";
import { CompanyIntro } from "@/components/sections/CompanyIntro";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Industries } from "@/components/sections/Industries";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CtaBanner } from "@/components/sections/CtaBanner";
import {
  fetchBanners,
  fetchCompanyInfo,
  fetchFeaturedProducts,
  fetchProductCategories,
} from "@/lib/api";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
  description:
    "PT Sinar Surabayasakti — agen dan distributor kabel SUPREME sejak 1992. Menyediakan kabel listrik & telekomunikasi untuk kebutuhan kontraktor, PLN, TELKOM, industri, dan infrastruktur di seluruh Indonesia.",
  keywords: [
    "distributor kabel supreme surabaya",
    "agen kabel supreme sidoarjo",
    "kabel listrik terpercaya",
    "kabel telekomunikasi indonesia",
  ],
});

export default async function HomePage() {
  // PHASE 6: semua data masih statis via lib/api → constants.
  // Nanti swap tinggal ganti implementasi di lib/api.ts saja.
  const [banners, company, categories, featured] = await Promise.all([
    fetchBanners(),
    fetchCompanyInfo(),
    fetchProductCategories(),
    fetchFeaturedProducts(),
  ]);

  const heroBanner = banners[0];

  return (
    <>
      {heroBanner && <Hero banner={heroBanner} />}
      <CompanyIntro />
      <ProductCategories categories={categories} />
      <WhyChooseUs items={company.whyChooseUs} />
      <Industries industries={company.industries} />
      <FeaturedProducts products={featured} />
      <CtaBanner />
    </>
  );
}
