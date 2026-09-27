# PT Sinar Surabayasakti — Frontend (Next.js 16)

Website company profile PT Sinar Surabayasakti (SUPREME Cable Distributor).
Dibangun dengan **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4**.

## 📚 Documentation

- 🔍 **[docs/SEO-CONFIGURATION.md](docs/SEO-CONFIGURATION.md)** — Panduan tuning SEO & keyword saat client request perubahan
- 🔌 **[docs/API-INTEGRATION.md](docs/API-INTEGRATION.md)** — Cara migrasi dari data statis ke API Laravel
- 🖼️ **[docs/IMAGE-OPTIMIZATION.md](docs/IMAGE-OPTIMIZATION.md)** — Aturan upload gambar untuk admin CMS
- 🚀 **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** — Deploy ke shared hosting via SSH
- 🏗️ **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — Struktur folder & keputusan arsitektur

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy env
cp .env.example .env.local

# Development server
npm run dev
# → http://localhost:3000

# Production build & start
npm run build
npm start
```

## 🧱 Tech Stack

| Layer     | Tech                                                          |
| --------- | ------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack)                            |
| Runtime   | React 19, TypeScript 5                                        |
| Styling   | Tailwind CSS v4 + CSS custom properties                       |
| Icons     | lucide-react                                                  |
| Fonts     | Plus Jakarta Sans (Google Fonts, self-hosted via `next/font`) |
| SEO       | Next Metadata API + JSON-LD structured data                   |

## 📁 Struktur Singkat

```
src/
├── app/                    # App Router pages
│   ├── layout.tsx          # Root layout (font, SEO, header, footer)
│   ├── page.tsx            # Home
│   ├── about/              # About Us
│   ├── company-profile/    # Company Profile
│   ├── vision-mission/     # Vision & Mission
│   ├── products/           # Product listing + [slug] detail (SSG)
│   ├── downloads/          # Download Center
│   ├── contact/            # Contact form
│   ├── sitemap.ts          # Dynamic sitemap
│   ├── robots.ts           # robots.txt config
│   └── not-found.tsx       # 404 page
├── components/
│   ├── shared/             # Header, Footer, Preloader, etc
│   ├── sections/           # Hero, WhyChooseUs, ContactForm, etc
│   └── ui/                 # Reusable UI primitives (future)
├── constants/              # Static data (company, products, downloads)
├── config/                 # site.ts, routes.ts
├── lib/
│   ├── api.ts              # API client skeleton (Phase 6)
│   ├── seo.ts              # buildMetadata helper
│   ├── structured-data.ts  # JSON-LD schemas
│   └── utils.ts            # cn(), absoluteUrl()
└── types/                  # Shared TypeScript interfaces
```

Lihat `docs/ARCHITECTURE.md` untuk penjelasan lengkap.

## 🎨 Fitur

- ✅ **Dark mode** — persist di `localStorage`, no-flash script di `<head>`
- ✅ **Preloader** — logo + progress bar dengan smooth reveal
- ✅ **Reveal-on-scroll** — animation via IntersectionObserver
- ✅ **Header adaptif** — transparent di home, solid di halaman lain, scroll-aware
- ✅ **Mobile menu** — slide-in aside dengan overlay
- ✅ **WhatsApp float button** — auto-generate wa.me URL
- ✅ **Product filter + search** — client-side, tab per kategori
- ✅ **Product detail SSG** — pre-generated di build time
- ✅ **SEO lengkap** — Metadata API, JSON-LD (Organization, LocalBusiness, Product, Breadcrumb, Website)
- ✅ **Dynamic sitemap + robots.txt**
- ✅ **Accessible** — semantic HTML, ARIA labels, keyboard nav

## 🔧 Scripts

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint
```

## 🌍 Environment Variables

Copy `.env.example` → `.env.local` dan isi sesuai kebutuhan:

- `NEXT_PUBLIC_SITE_URL` — Public URL untuk SEO (canonical, sitemap)
- `NEXT_PUBLIC_API_BASE_URL` — Backend Laravel URL (kosong untuk data statis)
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 ID (optional)
- `NEXT_PUBLIC_GOOGLE_VERIFICATION` — Search Console verification code
