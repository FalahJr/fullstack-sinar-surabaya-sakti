import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ProductCategory } from "@/types";
import { routes } from "@/config/routes";

interface Props {
  categories: ProductCategory[];
}

export function ProductCategories({ categories }: Props) {
  return (
    <section
      className="py-20 md:py-28"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-xl reveal">
          <p className="eyebrow mb-3">Products</p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
            Our Product Categories
          </h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={routes.productsByCategory(c.slug)}
              className="lift-card group block card-surface rounded-xl p-8 reveal"
            >
              <span className="num-badge">{c.number}</span>
              <h3 className="mt-4 text-xl font-bold">{c.name}</h3>
              <p className="mt-3 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {c.description}
              </p>
              <span
                className="inline-flex items-center gap-2 mt-6 text-sm font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                View Products
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
