# Architecture Guide

Dokumentasi struktur folder dan keputusan arsitektur untuk frontend Next.js 16.

---

## 🎯 Design Principles

1. **Separation of Concerns** — data, presentation, logic terpisah rapi
2. **Single Source of Truth** — data statis di `constants/`, config di `config/`
3. **API-Ready** — semua data-fetching via `lib/api.ts` (mudah swap ke real API)
4. **Component Composability** — components dipecah jadi shared / sections / ui
5. **SEO-First** — metadata & structured data di helper, mudah tune
6. **Type-Safe** — TypeScript strict, interfaces di `types/index.ts`

---

## 📁 Folder Structure

```
frontend/
├── docs/                           # Dokumentasi (SEO, API, Deploy, Image)
├── public/                         # Static assets (images, og image, favicon)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout — font, SEO, header, footer, JSON-LD
│   │   ├── page.tsx                # Home
│   │   ├── globals.css             # Global styles + design tokens
│   │   ├── not-found.tsx           # 404 page
│   │   ├── sitemap.ts              # Dynamic sitemap.xml
│   │   ├── robots.ts               # Robots.txt config
│   │   ├── about/page.tsx
│   │   ├── company-profile/page.tsx
│   │   ├── vision-mission/page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx            # Listing dengan filter
│   │   │   └── [slug]/page.tsx     # Detail (SSG via generateStaticParams)
│   │   ├── downloads/page.tsx
│   │   └── contact/page.tsx
│   │
│   ├── components/
│   │   ├── shared/                 # Dipakai di banyak page
│   │   │   ├── Header.tsx          # Client — scroll aware, mobile menu
│   │   │   ├── Footer.tsx          # Server component
│   │   │   ├── Preloader.tsx       # Client — timer + progress
│   │   │   ├── PageHero.tsx        # Server — reusable page hero
│   │   │   ├── RevealOnScroll.tsx  # Client — IntersectionObserver
│   │   │   ├── ThemeScript.tsx     # Inline theme apply (prevent FOUC)
│   │   │   ├── ThemeToggle.tsx     # Client — dark mode toggle
│   │   │   └── WhatsAppFloat.tsx   # Server — float button
│   │   │
│   │   ├── sections/               # Page-specific sections
│   │   │   ├── Hero.tsx            # Client — hero + cursor ambience
│   │   │   ├── CompanyIntro.tsx
│   │   │   ├── ProductCategories.tsx
│   │   │   ├── WhyChooseUs.tsx
│   │   │   ├── Industries.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── CtaBanner.tsx
│   │   │   ├── ProductsExplorer.tsx  # Client — filter + search
│   │   │   ├── DownloadsExplorer.tsx # Client — tab filter
│   │   │   └── ContactForm.tsx       # Client — form validation
│   │   │
│   │   └── ui/                     # Reusable primitives (future — Button, Card, dll)
│   │
│   ├── constants/                  # Static data (Phase 6 — nanti dari API)
│   │   ├── index.ts                # Re-exports
│   │   ├── company.ts              # CompanyInfo + getWhatsAppUrl
│   │   ├── products.ts             # Products, categories, helpers
│   │   ├── downloads.ts            # Download documents
│   │   └── banners.ts              # Hero banners
│   │
│   ├── config/
│   │   ├── site.ts                 # SEO defaults, URLs, brand config
│   │   └── routes.ts               # Route paths + navigation structure
│   │
│   ├── lib/
│   │   ├── api.ts                  # API client (skeleton — static → real API)
│   │   ├── seo.ts                  # buildMetadata() factory
│   │   ├── structured-data.ts      # JSON-LD schemas (Organization, Product, etc)
│   │   └── utils.ts                # cn() (className), absoluteUrl()
│   │
│   └── types/
│       └── index.ts                # Shared TypeScript interfaces
│
├── .env.example                    # Env variable template
├── next.config.ts                  # Next.js config (images, headers, security)
├── postcss.config.mjs              # PostCSS (Tailwind v4)
├── tsconfig.json                   # TypeScript config
└── package.json
```

---

## 🧩 Component Patterns

### Server vs Client Components

Default di Next.js App Router: **Server Component**. Client Component hanya
untuk yang butuh state, effect, atau browser API.

**Server Components (mayoritas):**

- `Footer.tsx`, `PageHero.tsx`, `CompanyIntro.tsx`, etc
- Semua `page.tsx` (kecuali punya interactive UI khusus)
- Fetch data langsung di server, no client JS

**Client Components (dengan `"use client"`):**

- `Header.tsx` — scroll aware, mobile menu state
- `Preloader.tsx` — timer & animation
- `ThemeToggle.tsx` — localStorage & UI state
- `Hero.tsx` — mouse tracking effect
- `ProductsExplorer.tsx`, `DownloadsExplorer.tsx` — filter/search state
- `ContactForm.tsx` — form state & validation
- `RevealOnScroll.tsx` — IntersectionObserver

### Data Flow

```
Page (Server Component)
  ↓ await fetchProducts()      ← from lib/api.ts
  ↓ pass as prop
Component (Server or Client)
  ↓ render
```

Kalau perlu interactivity, wrap section jadi Client Component. Data tetap
di-fetch di parent Server Component.

---

## 🎨 Styling Approach

### Tailwind CSS v4 + CSS Custom Properties

Tailwind v4 sudah support modern config lewat `@theme` di CSS:

```css
/* src/app/globals.css */
@theme {
  --color-brand-primary: #e00d30;
  --font-sans: "Plus Jakarta Sans", ...;
}
```

### Design Tokens

Semua warna & spacing pakai CSS custom properties untuk dark mode support:

```css
:root {
  --color-primary: #e00d30;
  --color-ink: #14181f;
  /* ... */
}

[data-theme="dark"] {
  --color-primary: #e00d30; /* sama */
  --color-ink: #edf0f4; /* invert */
  /* ... */
}
```

Digunakan di component:

```tsx
<div style={{ background: "var(--color-primary)" }}>...</div>
// atau via utility classes:
<h1 className="text-[var(--color-ink)]">...</h1>
```

### Component Classes

Reusable class defined di `globals.css`:

- `.btn`, `.btn-primary`, `.btn-outline-dark`, `.btn-secondary`
- `.card-surface`, `.lift-card`
- `.form-field`, `.nav-link`, `.nav-dropdown`
- `.eyebrow`, `.hero-bg-dark`, `.page-hero-bg`, `.section-dark-bg`
- `.reveal`, `.timeline-line`, `.timeline-dot`

---

## 🔒 Type Safety

### Type Definitions

Semua interface data di `src/types/index.ts`:

```typescript
export interface Product {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  image: string | null;
  specifications: string | null;
  applications: string | null;
  documents: ProductDocument[];
}
```

Shape ini **harus match dengan response API Laravel** nanti — sudah dokumentasi
di `docs/API-INTEGRATION.md`.

### Strict Mode

TypeScript strict mode aktif di `tsconfig.json`. Tidak ada `any` implicit.

---

## 🚀 Rendering Strategy

| Page                                            | Rendering                          | Why                                 |
| ----------------------------------------------- | ---------------------------------- | ----------------------------------- |
| `/` (Home)                                      | Static                             | Data statis, jarang berubah         |
| `/about`, `/company-profile`, `/vision-mission` | Static                             | Content stable                      |
| `/products`                                     | Static                             | Data statis Phase 6, akan ISR nanti |
| `/products/[slug]`                              | **SSG** via `generateStaticParams` | Pre-generate semua produk di build  |
| `/downloads`                                    | Static                             | List statis                         |
| `/contact`                                      | Static                             | Form-only, no dynamic data          |
| `/sitemap.xml`, `/robots.txt`                   | Static                             | Generated at build                  |

**Setelah integrasi API (Phase 7+):**

- Semua page akan pakai **ISR** (Incremental Static Regeneration)
- Revalidate interval per endpoint (lihat `docs/API-INTEGRATION.md`)

---

## 🎯 Performance Optimizations

### Applied Optimizations

1. **Font Loading** — `next/font/google` untuk Plus Jakarta Sans (auto self-host)
2. **Image Optimization** — `next/image` dengan AVIF/WebP, responsive sizes
3. **Code Splitting** — automatic per route via App Router
4. **Server Components** — mayoritas server-side, mengurangi JS bundle
5. **Turbopack** — bundler baru Next.js 16, jauh lebih cepat
6. **JSON-LD** — inject via `next/script` dengan `strategy="afterInteractive"`
7. **CSS Custom Properties** — no runtime JS untuk theming
8. **HTTP Headers** — cache & security headers di `next.config.ts`
9. **Preloader** — non-blocking, self-cleanup
10. **IntersectionObserver** — lazy reveal, single observer per page

### Expected Metrics (Target)

| Metric                         | Target                  |
| ------------------------------ | ----------------------- |
| Lighthouse Performance         | ≥ 90 (mobile & desktop) |
| Lighthouse SEO                 | ≥ 95                    |
| Lighthouse Accessibility       | ≥ 90                    |
| LCP (Largest Contentful Paint) | < 2.5s                  |
| FID (First Input Delay)        | < 100ms                 |
| CLS (Cumulative Layout Shift)  | < 0.1                   |
| First Load JS                  | < 200KB gzipped         |
| GTmetrix Grade                 | A                       |

---

## 🔮 Future Considerations

### Ready-to-Add Features

1. **Multi-language (i18n)** — folder structure siap untuk `app/[lang]/`
   - Recommended: `next-intl` library

2. **CMS Preview Mode** — untuk admin preview draft content
   - Setup: `src/app/api/preview/route.ts` + `draftMode()` dari Next

3. **Search Analytics** — track query di `/products` search
   - GA4 custom events atau Sentry Replay

4. **Product Variants** — jika produk punya varian (size, color, dll)
   - Extend `Product` type dengan `variants: Variant[]`

5. **Product Compare** — compare 2-3 produk side by side
   - Client-side state via `zustand` atau Context

### API Migration Path

1. Backend Laravel implement endpoints (lihat `docs/API-INTEGRATION.md`)
2. Update `lib/api.ts` — swap dari constants ke `apiFetch()`
3. Test tiap endpoint dengan Postman + di frontend dev
4. Setup revalidation webhook (optional, untuk instant updates)
5. Deploy & monitor

**Yang tidak perlu diubah:**

- Component props
- Page structure
- Types definition (kecuali nambah field baru)
- SEO metadata setup

---

## 📖 Decision Log

### Why App Router (bukan Pages Router)?

- Server Components default → less JS bundle
- Better metadata API (typed, dynamic)
- Better data fetching (native async/await di component)
- Future-proof (Pages Router legacy)

### Why Tailwind v4 (bukan v3)?

- Native CSS-in-CSS config (`@theme`)
- Faster (Lightning CSS engine)
- Smaller CSS bundle
- Backward compatible untuk migration

### Why NOT shadcn/ui atau library besar?

- Untuk keep bundle size minimal
- Full control atas styling brand-specific
- lucide-react cukup untuk icons
- Component simple, tidak perlu library heavy

### Why `constants/` for static data (bukan JSON)?

- Type-safe (TypeScript inference)
- Import tree-shakeable
- Helper functions co-located (getProductBySlug, dll)
- Easy swap ke API di `lib/api.ts`

### Why JSON-LD schema di `lib/structured-data.ts`?

- Reusable across pages
- Type-safe
- Easy update dari 1 tempat kalau branding berubah

---

## 🧪 Testing (Future Setup)

Belum di-setup, tapi recommended stack saat expand:

- **Unit tests:** Vitest + Testing Library
- **E2E:** Playwright
- **Visual regression:** Chromatic atau Percy
- **API mocking:** MSW (Mock Service Worker) untuk dev
