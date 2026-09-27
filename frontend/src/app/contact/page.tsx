import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { fetchCompanyInfo } from "@/lib/api";
import { getWhatsAppUrl } from "@/constants/company";
import { buildMetadata } from "@/lib/seo";
import { routes } from "@/config/routes";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Hubungi PT Sinar Surabayasakti untuk informasi produk kabel SUPREME, penawaran harga, atau kerja sama distribusi kabel di Indonesia.",
  path: "/contact",
});

export default async function ContactPage() {
  const company = await fetchCompanyInfo();

  return (
    <>
      <PageHero
        title="Contact Us"
        description="Hubungi kami untuk informasi produk, penawaran harga, atau kerja sama."
        breadcrumbs={[
          { label: "Home", href: routes.home },
          { label: "Contact" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-5 gap-14">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-extrabold mb-1">{company.name}</h2>
            <p className="text-sm text-[var(--color-ink-soft)] mb-8">
              SUPREME Cable Distributor
            </p>

            <div className="space-y-6">
              <InfoRow Icon={MapPin} title="Address">
                {company.address.line1}, {company.address.line2},{" "}
                {company.address.line3}
              </InfoRow>
              <InfoRow Icon={Phone} title="Phone">
                {company.phones.map((p) => (
                  <span key={p} className="block">
                    {p}
                  </span>
                ))}
              </InfoRow>
              <InfoRow Icon={Mail} title="Email">
                {company.email}
              </InfoRow>
              <InfoRow Icon={Clock} title="Business Hours">
                {company.hours.weekday}
                <br />
                {company.hours.weekend}
              </InfoRow>

              <div className="flex gap-4">
                <div
                  className="w-10 h-10 shrink-0 rounded-sm flex items-center justify-center"
                  style={{ background: "rgba(37,211,102,0.1)" }}
                >
                  <MessageCircle
                    className="w-5 h-5"
                    style={{ color: "#25D366" }}
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold">WhatsApp</p>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm mt-1 inline-block font-medium"
                    style={{ color: "var(--color-primary)" }}
                  >
                    Chat via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Suspense
              fallback={
                <div className="card-surface rounded-xl p-8">Loading form…</div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          {company.mapsEmbedUrl ? (
            <iframe
              src={company.mapsEmbedUrl}
              className="w-full aspect-[16/6] rounded-xl border-0"
              loading="lazy"
              title="Company location map"
            />
          ) : (
            <div className="aspect-[16/6] w-full rounded-xl img-placeholder text-sm">
              [GOOGLE MAPS EMBED]
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function InfoRow({
  Icon,
  title,
  children,
}: {
  Icon: typeof MapPin;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="w-10 h-10 shrink-0 rounded-sm flex items-center justify-center"
        style={{ background: "rgba(224,13,48,0.08)" }}
      >
        <Icon className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-[var(--color-ink-soft)] mt-1 leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
}
