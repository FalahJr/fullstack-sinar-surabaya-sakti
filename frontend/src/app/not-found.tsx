import Link from "next/link";
import { PackageX } from "lucide-react";
import { routes } from "@/config/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Halaman tidak ditemukan",
  noIndex: true,
});

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 pt-24">
      <div className="text-center max-w-md">
        <PackageX
          className="w-14 h-14 mx-auto"
          style={{ color: "var(--color-primary)" }}
        />
        <p
          className="mt-6 text-6xl font-extrabold"
          style={{ color: "var(--color-primary)" }}
        >
          404
        </p>
        <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-[15px] text-[var(--color-ink-soft)]">
          Alamat yang Anda tuju tidak tersedia. Silakan kembali ke beranda atau
          jelajahi katalog produk kami.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <Link href={routes.home} className="btn btn-primary">
            Kembali ke Beranda
          </Link>
          <Link href={routes.products} className="btn btn-outline-dark">
            Lihat Produk
          </Link>
        </div>
      </div>
    </section>
  );
}
