import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/config/routes";

/** Section 2: Company Introduction — server component */
export function CompanyIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 items-center">
        <div className="reveal order-2 md:order-1">
          <div className="aspect-[4/3] img-placeholder rounded-xl text-sm font-medium">
            [COMPANY / WAREHOUSE IMAGE]
          </div>
        </div>
        <div className="reveal order-1 md:order-2">
          <p className="eyebrow mb-3">About Us</p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Trusted Cable Distributor Since 1992
          </h2>
          <p className="mt-5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
            Didirikan pada 30 Oktober 1992, PT Sinar Surabayasakti memulai
            kegiatan usaha pada awal Januari 1993 sebagai agen/distributor kabel
            merk SUPREME, didukung oleh PT SUCACO Tbk. Perusahaan menjalin kerja
            sama dengan pelanggan di Surabaya dan sekitarnya, serta wilayah
            Indonesia bagian timur.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
            <div
              className="border-l-2 pl-3"
              style={{ borderColor: "var(--color-primary)" }}
            >
              <p className="text-xl font-extrabold">1992</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                Established
              </p>
            </div>
            <div
              className="border-l-2 pl-3"
              style={{ borderColor: "var(--color-secondary)" }}
            >
              <p className="text-xl font-extrabold">SUPREME</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                Distributor
              </p>
            </div>
            <div
              className="border-l-2 pl-3"
              style={{ borderColor: "var(--color-accent-orange)" }}
            >
              <p className="text-xl font-extrabold">ID</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">
                Coverage
              </p>
            </div>
          </div>
          <Link
            href={routes.about}
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Learn more about us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
