import { Eye, Info, Target } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { fetchCompanyInfo } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Vision & Mission",
  description:
    "Visi dan misi PT Sinar Surabayasakti sebagai distributor kabel SUPREME di Indonesia.",
  path: "/vision-mission",
});

export default async function VisionMissionPage() {
  const company = await fetchCompanyInfo();

  return (
    <>
      <PageHero
        title="Vision & Mission"
        description="Arah dan komitmen PT Sinar Surabayasakti dalam melayani kebutuhan kabel di Indonesia."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Vision & Mission" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-6">
          <div className="reveal card-surface rounded-xl p-10">
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
              style={{ background: "rgba(224,13,48,0.1)" }}
            >
              <Eye
                className="w-6 h-6"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <h2 className="text-xl font-extrabold">Vision</h2>
            <p className="mt-4 text-[15px] text-[var(--color-ink-soft)] leading-relaxed italic">
              {company.vision}
            </p>
          </div>
          <div className="reveal card-surface rounded-xl p-10">
            <div
              className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
              style={{ background: "rgba(69,150,241,0.1)" }}
            >
              <Target
                className="w-6 h-6"
                style={{ color: "var(--color-secondary)" }}
              />
            </div>
            <h2 className="text-xl font-extrabold">Mission</h2>
            <p className="mt-4 text-[15px] text-[var(--color-ink-soft)] leading-relaxed italic">
              {company.mission}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 mt-8">
          <div
            className="flex items-start gap-3 border border-dashed rounded-sm p-5"
            style={{ borderColor: "var(--color-line)" }}
          >
            <Info
              className="w-5 h-5 shrink-0 mt-0.5"
              style={{ color: "var(--color-secondary)" }}
            />
            <p className="text-sm text-[var(--color-ink-soft)]">
              Pernyataan visi dan misi resmi akan diperbarui setelah disediakan
              oleh pihak PT Sinar Surabayasakti.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
