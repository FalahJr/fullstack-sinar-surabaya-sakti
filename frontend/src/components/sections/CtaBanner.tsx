import Link from "next/link";
import { routes } from "@/config/routes";

interface Props {
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CtaBanner({
  title = "Butuh informasi produk atau penawaran kabel SUPREME?",
  ctaLabel = "Request Information",
  ctaHref = routes.contact,
}: Props) {
  return (
    <section
      className="py-16 md:py-20"
      style={{ background: "var(--color-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <h3 className="text-white text-xl md:text-2xl font-bold max-w-lg">
          {title}
        </h3>
        <div className="flex gap-3">
          <Link
            href={ctaHref}
            className="btn bg-white"
            style={{ color: "var(--color-primary)" }}
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
