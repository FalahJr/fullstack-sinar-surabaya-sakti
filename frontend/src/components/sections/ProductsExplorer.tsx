"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Search, SearchX } from "lucide-react";
import type { Product, ProductCategory } from "@/types";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface Props {
  categories: ProductCategory[];
  products: Product[];
}

export function ProductsExplorer({ categories, products }: Props) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.category === activeCategory);
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeCategory, query, products]);

  return (
    <>
      <section
        className="py-10 border-b sticky top-0 z-30"
        style={{
          borderColor: "var(--color-line)",
          background: "var(--color-bg)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              <CatTab
                label="All Products"
                value="all"
                active={activeCategory === "all"}
                onClick={setActiveCategory}
              />
              {categories.map((c) => (
                <CatTab
                  key={c.slug}
                  label={c.name}
                  value={c.slug}
                  active={activeCategory === c.slug}
                  onClick={setActiveCategory}
                />
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="form-field w-full pl-10 pr-4 py-2.5 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="text-sm text-[var(--color-ink-soft)] mb-6">
            {results.length} product{results.length === 1 ? "" : "s"} found
          </p>
          {results.length === 0 ? (
            <div className="text-center py-24">
              <SearchX className="w-10 h-10 mx-auto text-gray-300" />
              <p className="mt-4 text-[var(--color-ink-soft)]">
                No products found.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((p) => (
                <Link
                  key={p.id}
                  href={routes.productDetail(p.id)}
                  className="lift-card block card-surface rounded-xl overflow-hidden"
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
          )}
        </div>
      </section>
    </>
  );
}

function CatTab({
  label,
  value,
  active,
  onClick,
}: {
  label: string;
  value: string;
  active: boolean;
  onClick: (v: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "px-4 py-2 text-sm font-semibold rounded-sm border transition-colors tab-btn",
        active
          ? "text-white"
          : "text-[var(--color-ink-soft)] border-[var(--color-line)] hover:border-[var(--color-ink)]",
      )}
      style={
        active
          ? {
              background: "var(--color-primary)",
              borderColor: "var(--color-primary)",
            }
          : undefined
      }
    >
      {label}
    </button>
  );
}
