# SEO Configuration Guide

Dokumen ini menjelaskan cara mengubah dan menyesuaikan SEO website PT Sinar
Surabayasakti tanpa perlu ubah code yang complex. Setiap kali client meminta
perubahan keyword, title, deskripsi, atau tuning SEO — **mulailah dari sini**.

---

## 📍 File-File Penting

| File                         | Fungsi                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `src/config/site.ts`         | 🔑 **Master SEO config** — title default, description, keywords global, OG image |
| `src/lib/seo.ts`             | Helper `buildMetadata()` — factory metadata konsisten per page                   |
| `src/lib/structured-data.ts` | JSON-LD schemas (Organization, Product, Breadcrumb, etc)                         |
| `src/app/*/page.tsx`         | Setiap page punya `export const metadata` yang bisa di-override                  |
| `src/app/sitemap.ts`         | Dynamic sitemap — auto include semua halaman + produk                            |
| `src/app/robots.ts`          | Robots.txt config                                                                |

---

## 1️⃣ Ubah Title, Description, atau Keyword Global

Buka **`src/config/site.ts`** dan ubah:

```typescript
export const siteConfig = {
  defaultTitle: "PT Sinar Surabayasakti | Distributor Kabel SUPREME",
  //             ^^^^^^^ ubah di sini kalau ganti tagline utama

  description:
    "PT Sinar Surabayasakti merupakan agen dan distributor kabel SUPREME...",
  //  ^^^^^^^ ubah deskripsi default (dipakai untuk halaman yg tidak set sendiri)

  keywords: [
    "PT Sinar Surabayasakti",
    "Kabel SUPREME",
    // tambahkan keyword baru di sini
    "Distributor Kabel Jakarta", // contoh: keyword tambahan
  ],
};
```

**Setelah save → semua halaman otomatis update** (karena pakai template `%s | ...`).

---

## 2️⃣ Ubah SEO per Halaman (Home, About, Products, dll)

Setiap halaman ada blok `metadata` di file `page.tsx`. Contoh untuk halaman
About di `src/app/about/page.tsx`:

```typescript
export const metadata = buildMetadata({
  title: "Tentang Kami", // ← ganti judul
  description: "Sejarah dan profil...", // ← ganti deskripsi
  path: "/about", // ← canonical URL (jangan ubah)
  keywords: [
    // ← keyword TAMBAHAN utk halaman ini
    "tentang sinar surabayasakti",
    "sejarah distributor kabel",
  ],
});
```

**Keyword tambahan** di sini akan digabung dengan `siteConfig.keywords` global.
Jadi hanya perlu tulis keyword yang **spesifik untuk halaman itu**.

### Halaman yang bisa diedit:

| Halaman            | File                               |
| ------------------ | ---------------------------------- |
| Home               | `src/app/page.tsx`                 |
| About              | `src/app/about/page.tsx`           |
| Company Profile    | `src/app/company-profile/page.tsx` |
| Vision & Mission   | `src/app/vision-mission/page.tsx`  |
| Products (listing) | `src/app/products/page.tsx`        |
| Downloads          | `src/app/downloads/page.tsx`       |
| Contact            | `src/app/contact/page.tsx`         |

### Product Detail (dinamis)

Untuk detail produk, metadata di-generate otomatis dari data produk di
`src/app/products/[slug]/page.tsx`:

```typescript
export async function generateMetadata({ params }: Props) {
  const product = await fetchProduct(slug);
  return buildMetadata({
    title: product.name, // dari data produk
    description: product.description, // dari data produk
    path: `/products/${product.id}`,
    keywords: [product.name, product.categoryLabel, "kabel supreme"],
  });
}
```

**Setelah backend siap** → cukup update deskripsi produk di CMS Laravel,
metadata frontend otomatis ikut.

---

## 3️⃣ Ubah OG Image (Social Media Preview)

Open Graph image adalah gambar yang muncul saat link di-share di WhatsApp,
Facebook, LinkedIn, Twitter, dll.

1. Siapkan image **1200 × 630 px** (JPG/PNG)
2. Simpan di `public/og-default.jpg`
3. Referensi di `src/config/site.ts`:
   ```typescript
   ogImage: "/og-default.jpg",
   ```

Untuk OG image berbeda per halaman:

```typescript
export const metadata = buildMetadata({
  title: "About Us",
  image: "/og-about.jpg", // ← custom per halaman
});
```

---

## 4️⃣ Ubah Structured Data (JSON-LD)

File: **`src/lib/structured-data.ts`**

Website ini punya 4 schema utama yang muncul di setiap halaman:

- `organizationSchema()` — info perusahaan (nama, alamat, kontak)
- `localBusinessSchema()` — bisnis lokal (opening hours, contact)
- `websiteSchema()` — info website
- `productSchema(product)` — hanya di halaman detail produk
- `breadcrumbSchema(items)` — breadcrumb di detail produk

Ubah nilai di function sesuai kebutuhan. Contoh menambahkan social media links:

```typescript
export function organizationSchema() {
  return {
    // ...existing fields...
    sameAs: [
      "https://facebook.com/sinarsurabayasakti",
      "https://instagram.com/sinarsurabayasakti",
      "https://linkedin.com/company/sinarsurabayasakti",
    ],
  };
}
```

**Verify JSON-LD:** https://search.google.com/test/rich-results

---

## 5️⃣ Sitemap & Robots.txt

### Sitemap (`src/app/sitemap.ts`)

Dynamic sitemap otomatis include:

- Semua static routes (home, about, products, dll)
- Semua product detail pages (dari `fetchProducts()`)

Tinggal tambahkan route baru kalau ada halaman baru:

```typescript
const staticRoutes: MetadataRoute.Sitemap = [
  // ...existing routes...
  {
    url: `${base}/new-page`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  },
];
```

Akses di `https://your-domain.com/sitemap.xml`.

### Robots.txt (`src/app/robots.ts`)

Ubah rules di sini:

```typescript
return {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/"], // ← blok halaman ini
    },
  ],
  sitemap: `${siteConfig.url}/sitemap.xml`,
};
```

Akses di `https://your-domain.com/robots.txt`.

---

## 6️⃣ Google Search Console & Analytics

### Setup Search Console

1. Verify domain di https://search.google.com/search-console
2. Copy **HTML tag verification** value (bukan full tag, hanya content-nya)
3. Set di `.env.local`:
   ```bash
   NEXT_PUBLIC_GOOGLE_VERIFICATION=abcdef123456
   ```
4. Rebuild & deploy → tag otomatis inject di `<head>` semua halaman

### Setup Google Analytics 4

1. Buat property di https://analytics.google.com
2. Ambil **Measurement ID** (format: `G-XXXXXXXXXX`)
3. Set di `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
4. Script GA otomatis inject saat env variable diset

---

## 7️⃣ Workflow Saat Client Minta Perubahan Keyword

**Contoh case:** "Tolong tambahkan keyword 'kabel PLN Sidoarjo' di homepage dan halaman produk"

### Step-by-step:

1. **Homepage** → edit `src/app/page.tsx`:

   ```typescript
   export const metadata = buildMetadata({
     path: "/",
     keywords: [
       "kabel PLN Sidoarjo", // ← tambah keyword baru
       // keyword lain...
     ],
   });
   ```

2. **Product listing** → edit `src/app/products/page.tsx`:

   ```typescript
   export const metadata = buildMetadata({
     title: "Product Catalog",
     keywords: [
       "kabel PLN Sidoarjo", // ← tambah keyword baru
       // keyword lain...
     ],
   });
   ```

3. **Global (semua halaman)** → edit `src/config/site.ts`:

   ```typescript
   keywords: [
     "PT Sinar Surabayasakti",
     "kabel PLN Sidoarjo",  // ← tambah di sini kalau mau muncul di semua halaman
     // ...
   ],
   ```

4. Test build lokal:

   ```bash
   npm run build && npm start
   ```

5. Verify meta tags di browser DevTools (View Source → cari `<meta name="keywords"`)

6. Deploy ulang → tunggu Google re-crawl (biasanya 3-14 hari)

---

## 8️⃣ Testing & Validation Tools

| Tool                     | Fungsi                  | URL                                                    |
| ------------------------ | ----------------------- | ------------------------------------------------------ |
| Google Rich Results Test | Test JSON-LD schema     | https://search.google.com/test/rich-results            |
| Google PageSpeed         | Performance + SEO score | https://pagespeed.web.dev/                             |
| GTmetrix                 | Performance detail      | https://gtmetrix.com/                                  |
| Meta Tags Checker        | Preview OG tags         | https://metatags.io/                                   |
| Sitemap Validator        | Cek sitemap.xml         | https://www.xml-sitemaps.com/validate-xml-sitemap.html |
| Search Console           | Monitor keyword ranking | https://search.google.com/search-console               |

---

## 9️⃣ Setelah Integrasi Backend (Laravel API)

Saat data produk dinamis dari backend, SEO tetap ter-handle otomatis karena:

1. **Product detail** — `generateMetadata()` fetch produk dari API dan build
   metadata dari field `product.name`, `product.description`.

2. **Sitemap** — `fetchProducts()` di `sitemap.ts` akan return produk dari API,
   sehingga sitemap otomatis update saat produk baru ditambahkan di CMS.

3. **Structured data** — `productSchema(product)` juga generate dari data
   produk yang di-fetch.

### Yang perlu dipastikan admin CMS:

- Setiap produk **wajib** punya:
  - `name` (jelas & keyword-rich, contoh: "Kabel NYY 3x2.5mm PLN")
  - `description` (min 150 karakter, deskriptif)
  - `image` (WebP/JPG, 1200x900 recommended)
  - `categoryLabel`

- Untuk produk yang ingin di-boost SEO-nya, admin bisa isi custom fields:
  - `seoTitle` (optional override)
  - `seoDescription` (optional override)
  - `seoKeywords` (optional array)

📝 **TODO backend team:** Sediakan field-field SEO opsional ini di API response
untuk endpoint `/api/products/{slug}` — lihat `docs/API-INTEGRATION.md`.

---

## 🔟 Best Practices Ringkas

### DO ✅

- Title max 60 karakter (agar tidak terpotong di Google)
- Description 120-160 karakter (sweet spot)
- Keyword natural, jangan stuffing (max 10 per halaman)
- H1 unik per halaman
- Alt text di semua images
- Internal linking antar halaman terkait

### DON'T ❌

- Duplicate title/description antar halaman
- Keyword stuffing (spam)
- H1 lebih dari satu per halaman
- Image tanpa alt text
- URL query params sebagai canonical (gunakan clean URL)

---

## Perlu bantuan lebih lanjut?

Semua SEO tuning berpusat di 3 file:

1. `src/config/site.ts` — global
2. `src/app/*/page.tsx` — per halaman
3. `src/lib/structured-data.ts` — schema markup

Tidak perlu utak-atik file lain untuk perubahan SEO. 🎯
