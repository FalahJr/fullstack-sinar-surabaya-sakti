# Backend API Integration Guide

Panduan step-by-step untuk migrasi frontend dari **data statis (PHASE 6)**
ke **data dinamis dari Laravel API** ketika backend sudah ready.

---

## 📍 Konsep Arsitektur

Semua data-fetching di frontend melewati **`src/lib/api.ts`** — inilah
**single point of integration**. Komponen dan pages hanya panggil fungsi
seperti `fetchProducts()`, tidak tahu apakah datanya dari constants atau API.

```
Page/Component
    ↓ import { fetchProducts } from '@/lib/api'
lib/api.ts
    ├─ PHASE 6: return data dari @/constants/products.ts (STATIS)
    └─ PHASE 7+: return await apiFetch('/products')      (API LARAVEL)
```

Artinya saat swap ke API, **komponen tidak perlu diubah sama sekali** — hanya
implementasi di `lib/api.ts` yang berubah.

---

## 🔌 Endpoint yang Dibutuhkan dari Backend Laravel

Berikut kontrak API yang harus disediakan backend. Response harus follow
format standar dengan envelope `{ data: ... }`.

### 1. `GET /api/company` — Company Info

```json
{
  "data": {
    "name": "PT Sinar Surabayasakti",
    "shortName": "Sinar Surabayasakti",
    "established": "30 October 1992",
    "establishedYear": "1992",
    "business": "Cable Distributor",
    "mainProduct": "SUPREME Cable",
    "supportedBy": "PT SUCACO Tbk",
    "address": {
      "line1": "Jl. Kalijaten No. 65",
      "line2": "Taman, Sidoarjo",
      "line3": "Jawa Timur 61257, Indonesia"
    },
    "phones": ["031-7881785", "..."],
    "fax": ["031-7881322"],
    "email": "ptsinarsurabayasakti@gmail.com",
    "whatsappNumber": "6281234567890",
    "hours": {
      "weekday": "Monday - Friday, 08:00 - 16:00",
      "weekend": "Saturday, Sunday & holidays: Closed"
    },
    "mapsEmbedUrl": "https://www.google.com/maps/embed?...",
    "vision": "...",
    "mission": "...",
    "timeline": [{ "year": "1992", "label": "Established", "desc": "..." }],
    "whyChooseUs": [{ "title": "Trusted Experience", "desc": "..." }],
    "industries": ["Contractors", "PT PLN", "..."]
  }
}
```

**Referensi shape:** `src/types/index.ts` → `CompanyInfo`

### 2. `GET /api/banners` — Home Banners

```json
{
  "data": [
    {
      "id": "hero-1",
      "eyebrow": "SUPREME Cable Distributor · Est. 1992",
      "title": "Solusi Kabel Andal untuk Kebutuhan Kelistrikan & Telekomunikasi",
      "description": "PT Sinar Surabayasakti merupakan agen...",
      "ctaPrimary": { "label": "Explore Products", "href": "/products" },
      "ctaSecondary": { "label": "Contact Us", "href": "/contact" }
    }
  ]
}
```

### 3. `GET /api/product-categories` — Kategori Produk

```json
{
  "data": [
    {
      "slug": "kabel-listrik",
      "number": "01",
      "name": "Kabel Listrik",
      "nameEn": "Electrical Cable",
      "description": "Bare Copper Conductor, PVC, XLPE..."
    }
  ]
}
```

### 4. `GET /api/products` — List Semua Produk

```json
{
  "data": [
    {
      "id": "pvc-cable",
      "name": "PVC Cable (up to 6 KV)",
      "category": "kabel-listrik",
      "categoryLabel": "Kabel Listrik",
      "description": "PVC insulated power cable...",
      "image": "https://cdn.sinarsurabayasakti.co.id/products/pvc.webp",
      "specifications": "<tr>...</tr>",
      "applications": "Text applications...",
      "documents": [
        {
          "title": "Datasheet PVC Cable",
          "fileUrl": "https://cdn.../datasheet-pvc.pdf",
          "fileType": "PDF"
        }
      ]
    }
  ]
}
```

### 5. `GET /api/products/{slug}` — Detail Produk

Sama seperti item di list, tapi 1 object. Optional field SEO:

```json
{
  "data": {
    "id": "pvc-cable",
    "name": "PVC Cable (up to 6 KV)",
    // ... field lainnya ...
    "seoTitle": "PVC Cable SUPREME 6 KV — Distributor Resmi",
    "seoDescription": "PVC insulated cable 6 KV untuk...",
    "seoKeywords": ["kabel pvc 6kv", "kabel listrik pvc supreme"]
  }
}
```

### 6. `GET /api/downloads` — Download Center

```json
{
  "data": [
    {
      "id": "company-profile-pdf",
      "title": "Company Profile",
      "category": "Company Profile",
      "fileType": "PDF",
      "fileUrl": "https://cdn.../company-profile.pdf"
    }
  ]
}
```

---

## 🛠️ Cara Swap: Static → API

### Step 1: Set Environment Variable

Di `.env.local` (dan environment production di hosting):

```bash
NEXT_PUBLIC_API_BASE_URL=https://api.sinarsurabayasakti.co.id/api
```

### Step 2: Update `lib/api.ts`

Ubah dari:

```typescript
export async function fetchProducts(): Promise<Product[]> {
  return products; // ← static dari constants
}
```

Menjadi:

```typescript
export async function fetchProducts(): Promise<Product[]> {
  return apiFetch<Product[]>("/products", { revalidate: 21600 });
}
```

Function `apiFetch()` sudah tersedia dan handle:

- Base URL dari env
- ISR revalidation (via `next: { revalidate: N }`)
- Error handling
- Envelope unwrap (`{ data: ... }` → `...`)

### Step 3: Ulangi untuk fungsi lain

Lakukan hal sama untuk `fetchCompanyInfo`, `fetchBanners`, `fetchProductCategories`,
`fetchProduct`, `fetchDownloads`.

### Step 4: Recommended ISR intervals

| Endpoint              | Revalidate     | Alasan                       |
| --------------------- | -------------- | ---------------------------- |
| `/company`            | 86400 (1 hari) | Jarang berubah               |
| `/banners`            | 3600 (1 jam)   | Client mungkin update sering |
| `/product-categories` | 21600 (6 jam)  | Stabil                       |
| `/products`           | 21600 (6 jam)  | Update produk terjadwal      |
| `/products/{slug}`    | 21600 (6 jam)  | Sama                         |
| `/downloads`          | 21600 (6 jam)  | Update dokumen               |

### Step 5: Setup On-Demand Revalidation (Optional)

Jika ingin update **instant** saat data berubah di CMS Laravel (bukan tunggu
revalidate interval), setup webhook:

1. **Frontend:** Buat API route `src/app/api/revalidate/route.ts`:

   ```typescript
   import { NextRequest, NextResponse } from "next/server";
   import { revalidateTag, revalidatePath } from "next/cache";

   export async function POST(request: NextRequest) {
     const secret = request.headers.get("x-revalidate-secret");
     if (secret !== process.env.REVALIDATE_SECRET) {
       return NextResponse.json({ error: "unauthorized" }, { status: 401 });
     }
     const { path, tag } = await request.json();
     if (path) revalidatePath(path);
     if (tag) revalidateTag(tag);
     return NextResponse.json({ revalidated: true });
   }
   ```

2. **Backend Laravel:** Setelah save produk, trigger webhook:

   ```php
   Http::withHeaders(['x-revalidate-secret' => env('FRONTEND_REVALIDATE_SECRET')])
       ->post(env('FRONTEND_URL') . '/api/revalidate', [
           'path' => "/products/{$product->slug}",
       ]);
   ```

3. **Env vars:**
   ```bash
   # .env.local frontend
   REVALIDATE_SECRET=random-secret-key

   # .env backend Laravel
   FRONTEND_URL=https://sinarsurabayasakti.co.id
   FRONTEND_REVALIDATE_SECRET=random-secret-key
   ```

---

## 🧪 Testing Integration

### 1. Test dengan Mock Data Dulu

Sebelum backend production ready, bisa test integrasi dengan mock server:

```bash
# Terminal 1: Mock backend
npx json-server --watch mock-db.json --port 8000

# Terminal 2: Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 npm run dev
```

Contoh `mock-db.json`:

```json
{
  "products": [
    { "id": "pvc-cable", "name": "PVC Cable", ... }
  ]
}
```

### 2. Test Error Handling

Di `lib/api.ts`, `apiFetch()` throw error jika response tidak OK. Handle di
component dengan Error Boundary atau try/catch di page:

```typescript
// src/app/products/page.tsx
export default async function ProductsPage() {
  let products: Product[] = [];
  try {
    products = await fetchProducts();
  } catch (e) {
    console.error("Failed to fetch products", e);
    // fallback ke empty atau show error state
  }
  return <ProductsExplorer products={products} />;
}
```

### 3. Test Cache Behavior

Cek header response di browser DevTools:

- Static generation: `x-nextjs-cache: HIT`
- ISR fresh: `x-nextjs-cache: STALE` → `HIT` after regen
- Runtime: `x-nextjs-cache: MISS`

---

## 🚨 Backward Compatibility

Selama migrasi, **jangan hapus constants** di `src/constants/*`. Fungsi
statis (seperti `getProductBySlug`, `searchProducts`) masih dipakai jika
diperlukan sebagai fallback.

Setelah semua endpoint API sudah bekerja stabil di production selama 1-2
minggu, baru bisa cleanup constants (opsional).

---

## 📋 Checklist Migrasi (per endpoint)

Copy-paste checklist ini per endpoint:

```
Endpoint: [nama, misal /api/products]
- [ ] Backend Laravel implement endpoint sesuai contract shape
- [ ] Test dengan Postman: response 200 + shape sesuai
- [ ] Test CORS: bisa dipanggil dari domain frontend
- [ ] Update lib/api.ts untuk endpoint ini
- [ ] Set ISR revalidate interval yg sesuai
- [ ] Test di frontend dev: data tampil dengan benar
- [ ] Test edge case: empty result, network error
- [ ] Setup on-demand revalidation webhook (opsional)
- [ ] Deploy frontend ke production
- [ ] Monitor Sentry/logs 24-48 jam pertama
```

---

## 🆘 Troubleshooting

**Q: Data tidak update setelah save di CMS**

- Cek ISR revalidate interval — mungkin masih dalam cache
- Force revalidate via API `/api/revalidate` (jika sudah setup)
- Atau redeploy frontend

**Q: CORS error di dev**

- Backend Laravel harus set header `Access-Control-Allow-Origin: *` (atau
  specific frontend domain) di config CORS.

**Q: API timeout saat build**

- ISR fetches saat build → jika API lambat, build fail
- Solution: gunakan `dynamic = 'force-dynamic'` untuk halaman tsb, atau
  tambahkan `signal: AbortSignal.timeout(5000)` di fetch

**Q: Sitemap tidak include produk baru**

- Sitemap regenerate saat halaman diakses (revalidate). Bisa force via
  `/api/revalidate` dengan `path: '/sitemap.xml'`
