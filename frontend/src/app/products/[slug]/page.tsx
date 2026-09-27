import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Download, FileText, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { fetchProduct, fetchProducts } from "@/lib/api";
import { buildMetadata } from "@/lib/seo";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";
import { getWhatsAppUrl } from "@/constants/company";
import { routes } from "@/config/routes";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Pre-generate all product routes at build time (SSG). */
export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      noIndex: true,
    });
  }
  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/products/${product.id}`,
    keywords: [product.name, product.categoryLabel, "kabel supreme"],
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const jsonLdProduct = productSchema(product);
  const jsonLdBreadcrumb = breadcrumbSchema([
    { name: "Home", url: routes.home },
    { name: "Products", url: routes.products },
    {
      name: product.categoryLabel,
      url: routes.productsByCategory(product.category),
    },
    { name: product.name, url: routes.productDetail(product.id) },
  ]);

  return (
    <>
      <PageHero
        title={product.name}
        eyebrow={product.categoryLabel}
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Products", href: routes.products },
          {
            label: product.categoryLabel,
            href: routes.productsByCategory(product.category),
          },
          { label: product.name },
        ]}
      />

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="reveal">
              <div className="aspect-[4/3] img-placeholder rounded-xl text-sm">
                [PRODUCT IMAGE]
              </div>
            </div>
            <div className="reveal">
              <span
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--color-secondary)" }}
              >
                {product.categoryLabel}
              </span>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
                {product.name}
              </h2>
              <p className="mt-5 text-[15px] text-[var(--color-ink-soft)] leading-relaxed">
                {product.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`${routes.contact}?product=${encodeURIComponent(product.name)}`}
                  className="btn btn-primary"
                >
                  Request Product Information
                </Link>
                <a
                  href={getWhatsAppUrl(
                    `Halo, saya ingin bertanya tentang produk ${product.name}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Specifications</h3>
              {product.specifications ? (
                <div
                  className="table-scroll"
                  dangerouslySetInnerHTML={{
                    __html: `<table class="w-full text-sm card-surface">${product.specifications}</table>`,
                  }}
                />
              ) : (
                <p className="text-sm text-[var(--color-ink-soft)] italic">
                  Technical specifications will be provided upon request.
                </p>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Applications</h3>
              {product.applications ? (
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  {product.applications}
                </p>
              ) : (
                <p className="text-sm text-[var(--color-ink-soft)] italic">
                  Application details will be provided upon request.
                </p>
              )}
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Available Documents</h3>
              {product.documents.length > 0 ? (
                <div className="space-y-2.5">
                  {product.documents.map((d) => (
                    <a
                      key={d.title}
                      href={d.fileUrl || "#"}
                      className="flex items-center justify-between card-surface rounded-xl px-4 py-3 hover:border-[var(--color-primary)] transition-colors"
                    >
                      <span className="flex items-center gap-3 text-sm font-medium">
                        <FileText
                          className="w-4 h-4"
                          style={{ color: "var(--color-primary)" }}
                        />
                        {d.title}
                      </span>
                      <Download className="w-4 h-4 text-gray-400" />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--color-ink-soft)] italic">
                  Documents will be made available in the Download Center once
                  provided.
                </p>
              )}
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-[var(--color-line)] text-center">
            <Link href={routes.contact} className="btn btn-outline-dark">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Script
        id={`ld-product-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
      />
      <Script
        id={`ld-breadcrumb-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
    </>
  );
}
