import { PageHero } from "@/components/shared/PageHero";
import { DownloadsExplorer } from "@/components/sections/DownloadsExplorer";
import { fetchDownloads } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Download Center",
  description:
    "Download company profile, katalog produk, brosur, datasheet, dan sertifikat kabel SUPREME dari PT Sinar Surabayasakti.",
  path: "/downloads",
  keywords: [
    "download katalog kabel supreme",
    "brosur kabel",
    "datasheet kabel",
  ],
});

export default async function DownloadsPage() {
  const documents = await fetchDownloads();

  return (
    <>
      <PageHero
        title="Download Center"
        description="Company profile, katalog produk, brosur, datasheet, dan dokumen pendukung lainnya."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Download Center" },
        ]}
      />
      <DownloadsExplorer documents={documents} />
    </>
  );
}
