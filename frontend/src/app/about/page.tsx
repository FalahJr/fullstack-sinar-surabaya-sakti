import { Calendar, Cable, Globe, MapPin } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { fetchCompanyInfo } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Tentang Kami",
  description:
    "Sejarah dan profil PT Sinar Surabayasakti, distributor kabel SUPREME sejak 1992 dengan cakupan layanan di seluruh Indonesia.",
  path: "/about",
  keywords: ["tentang sinar surabayasakti", "sejarah distributor kabel"],
});

export default async function AboutPage() {
  const company = await fetchCompanyInfo();

  return (
    <>
      <PageHero
        title="About PT Sinar Surabayasakti"
        description="Distributor kabel SUPREME terpercaya, melayani kebutuhan kelistrikan dan telekomunikasi di Indonesia sejak 1992."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "About Us" },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-5 gap-14">
          <div className="md:col-span-3 reveal">
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
              Berdiri Sejak 1992, Berkomitmen pada Kualitas
            </h2>
            <p className="mt-6 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
              PT Sinar Surabayasakti didirikan pada tanggal 30 Oktober 1992 dan
              bergerak di bidang penyediaan kabel merk SUPREME sebagai
              agen/distributor, berkedudukan di Surabaya. Perusahaan memulai
              kegiatan usaha pada awal Januari 1993 dengan dukungan dari PT
              SUCACO (Supreme Cable Manufacturing Corporation Tbk).
            </p>
            <p className="mt-4 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
              Sejak awal berdirinya, perusahaan menjalin kerja sama dengan
              pelanggan potensial di Surabaya dan sekitarnya, serta wilayah
              Indonesia bagian timur &mdash; melayani kontraktor, toko-toko
              elektrik, badan usaha milik negara seperti PT PLN dan PT TELKOM,
              hingga pelanggan dari berbagai wilayah di Indonesia.
            </p>
          </div>
          <div className="md:col-span-2 reveal">
            <div className="aspect-[3/4] img-placeholder rounded-xl text-sm">
              [COMPANY IMAGE]
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="max-w-xl reveal">
            <p className="eyebrow mb-3">Milestones</p>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              Company Timeline
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden md:grid mt-16 grid-cols-3 gap-8 relative">
            <div className="absolute top-[7px] left-0 right-0 h-0.5 timeline-line" />
            {company.timeline.map((t) => (
              <div key={t.year + t.label} className="relative reveal">
                <div className="timeline-dot mb-6" />
                <p
                  className="text-2xl font-extrabold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t.year}
                </p>
                <p className="mt-2 font-bold text-[15px]">{t.label}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden mt-12 relative pl-8">
            <div className="absolute top-1 bottom-1 left-[5px] w-0.5 timeline-line" />
            {company.timeline.map((t) => (
              <div
                key={t.year + t.label}
                className="relative pb-10 last:pb-0 reveal"
              >
                <div className="timeline-dot absolute -left-8 top-1" />
                <p
                  className="text-xl font-extrabold"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t.year}
                </p>
                <p className="mt-1 font-bold text-[15px]">{t.label}</p>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              Icon: Calendar,
              title: "1992",
              sub: "Established",
            },
            {
              Icon: Cable,
              title: "SUPREME",
              sub: "Cable Distributor",
            },
            {
              Icon: MapPin,
              title: "Sidoarjo",
              sub: "East Java, Indonesia",
            },
            {
              Icon: Globe,
              title: "Indonesia",
              sub: "Service Coverage",
            },
          ].map(({ Icon, title, sub }) => (
            <div
              key={title}
              className="reveal lift-card card-surface rounded-xl p-6 text-center"
            >
              <Icon
                className="w-6 h-6 mx-auto"
                style={{ color: "var(--color-primary)" }}
              />
              <p className="mt-3 font-bold text-lg">{title}</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
