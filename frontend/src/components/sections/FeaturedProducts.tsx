import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types";
import { routes } from "@/config/routes";

interface Props {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
}

export function FeaturedProducts({
  products,
  title = "Featured Products",
  showViewAll = true,
}: Props) {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 reveal">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Catalog</p>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              {title}
            </h2>
          </div>
          {showViewAll && (
            <Link href={routes.products} className="btn btn-outline-dark">
              View All Products
            </Link>
          )}
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={routes.productDetail(p.id)}
              className="lift-card block card-surface rounded-xl overflow-hidden reveal"
            >
              <div className="aspect-[4/3] img-placeholder text-xs">
                [PRODUCT IMAGE]
              </div>
              <div className="p-5">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {p.categoryLabel}
                </span>
                <h3 className="mt-1.5 font-bold text-[15px]">{p.name}</h3>
                <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-2">
                  {p.description}
                </p>
                <span
                  className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold"
                  style={{ color: "var(--color-primary)" }}
                >
                  View Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
