import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Company Profile",
  description:
    "Company profile PT Sinar Surabayasakti — sejarah, area bisnis, kategori produk kabel, dan cakupan pasar sebagai distributor kabel SUPREME.",
  path: "/company-profile",
});

const sections = [
  {
    n: "01",
    title: "Company Overview",
    body: "PT Sinar Surabayasakti adalah perusahaan yang bergerak dalam penyediaan kabel, khususnya kabel merk SUPREME yang didukung oleh PT SUCACO Tbk. Perusahaan berkedudukan di Sidoarjo, Jawa Timur, dan berperan sebagai agen/distributor resmi produk kabel SUPREME.",
  },
  {
    n: "02",
    title: "Company History",
    body: "Didirikan pada 30 Oktober 1992, PT Sinar Surabayasakti memulai kegiatan usahanya pada awal Januari 1993. Sejak saat itu, perusahaan konsisten menjalin kerja sama dengan pelanggan di Surabaya, wilayah Indonesia bagian timur, dan berbagai wilayah lainnya di Indonesia.",
  },
  {
    n: "03",
    title: "Business Area",
    body: "Sebagai agen/distributor kabel SUPREME, PT Sinar Surabayasakti melayani kontraktor, toko-toko elektrik, badan usaha seperti PT PLN dan PT TELKOM, serta pelanggan lain yang membutuhkan produk kabel kelistrikan maupun telekomunikasi.",
  },
  {
    n: "05",
    title: "Market Coverage",
    body: "PT Sinar Surabayasakti melayani konsumen di Surabaya dan sekitarnya, wilayah Indonesia bagian timur, serta pelanggan dari berbagai wilayah lain di Indonesia.",
  },
];

const facts = [
  { label: "Established", value: "30 October 1992" },
  { label: "Business", value: "Cable Distributor" },
  { label: "Main Product", value: "SUPREME Cable" },
  { label: "Location", value: "Sidoarjo, East Java" },
  { label: "Coverage", value: "Indonesia" },
];

export default function CompanyProfilePage() {
  return (
    <>
      <PageHero
        title="Company Profile"
        description="Ringkasan profil, sejarah, dan cakupan bisnis PT Sinar Surabayasakti."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Company Profile" },
        ]}
      />

      {/* Fact grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px card-surface"
            style={{ background: "var(--color-line)" }}
          >
            {facts.map((f) => (
              <div
                key={f.label}
                className="p-6"
                style={{ background: "var(--color-card)" }}
              >
                <p className="text-xs text-[var(--color-ink-soft)] mb-1.5">
                  {f.label}
                </p>
                <p className="font-bold text-[15px]">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {sections.slice(0, 3).map((s) => (
        <SectionRow key={s.n} {...s} />
      ))}

      {/* Section 04 — Product Categories */}
      <div className="section-divider max-w-7xl mx-auto" />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-2">04</p>
            <h2 className="text-xl font-extrabold">Product Categories</h2>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-6">
            <div className="card-surface rounded-xl p-6">
              <h3 className="font-bold text-[15px]">Kabel Listrik</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Bare Copper Conductor, Aluminium Conductor, PVC, XLPE, Lead
                Sheathed, Corrugated Metallic Sheathed, Multiplex, dan lainnya.
              </p>
            </div>
            <div className="card-surface rounded-xl p-6">
              <h3 className="font-bold text-[15px]">Kabel Telekomunikasi</h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                Indoor, Burial, Drop Wire, Aerial Duct, Jelly Filled Armoured,
                Non Armoured, PCM, LAN, Optical Fibre, dan lainnya.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-7xl mx-auto" />
      <SectionRow {...sections[3]} />

      <section className="py-16" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <h3 className="text-white text-xl md:text-2xl font-bold">
            Ingin company profile lengkap dalam format PDF?
          </h3>
          <Link
            href={routes.downloads}
            className="btn bg-white"
            style={{ color: "var(--color-primary)" }}
          >
            Download Center
          </Link>
        </div>
      </section>
    </>
  );
}

function SectionRow({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <>
      <div className="section-divider max-w-7xl mx-auto" />
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-2">{n}</p>
            <h2 className="text-xl font-extrabold">{title}</h2>
          </div>
          <div className="md:col-span-8 text-[15px] text-[var(--color-ink-soft)] leading-relaxed space-y-4">
            <p>{body}</p>
          </div>
        </div>
      </section>
    </>
  );
}
