import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

/**
 * PageHero — hero standar untuk semua halaman non-home
 * (About, Products, Contact, etc). Dark background dengan
 * breadcrumb + heading + description.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
}: Props) {
  return (
    <section className="page-hero-bg text-white pt-32 pb-16 md:pt-40 md:pb-20 relative overflow-hidden">
      <div className="absolute inset-0 industrial-grid opacity-40" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {breadcrumbs.length > 0 && (
          <nav
            className="flex items-center gap-1.5 text-xs text-white/60 mb-5"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((b, i) => (
              <span key={b.label} className="flex items-center gap-1.5">
                {b.href ? (
                  <Link
                    href={b.href}
                    className="hover:text-white transition-colors"
                  >
                    {b.label}
                  </Link>
                ) : (
                  <span>{b.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-3 h-3" />
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <p
            className="eyebrow mb-3"
            style={{ color: "var(--color-accent-yellow)" }}
          >
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 text-white/70 max-w-2xl text-[15px] md:text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
