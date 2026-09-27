import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Preloader } from "@/components/shared/Preloader";
import { WhatsAppFloat } from "@/components/shared/WhatsAppFloat";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { ThemeScript } from "@/components/shared/ThemeScript";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import {
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
} from "@/lib/structured-data";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const orgSchema = organizationSchema();
  const businessSchema = localBusinessSchema();
  const siteSchema = websiteSchema();

  return (
    <html
      lang={siteConfig.language}
      className={`${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2214%22 fill=%22%23E00D30%22/><text x=%2250%22 y=%2268%22 font-size=%2260%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22bold%22 text-anchor=%22middle%22>S</text></svg>"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
      >
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <RevealOnScroll />

        {/* JSON-LD structured data */}
        <Script
          id="ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Script
          id="ld-local-business"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <Script
          id="ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />

        {/* Google Analytics — hanya inject jika GA_ID diset di env */}
        {siteConfig.gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${siteConfig.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
