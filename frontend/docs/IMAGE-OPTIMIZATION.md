# Image Optimization Guide

Panduan optimasi gambar untuk admin CMS Laravel dan developer.
Gambar adalah faktor terbesar dalam performa Core Web Vitals — mengelola
dengan benar akan boost Lighthouse score dan kecepatan website.

---

## 📏 Rules untuk Admin CMS

### Ukuran & Dimensi

| Tipe Image              | Recommended Dimensi           | Max File Size |
| ----------------------- | ----------------------------- | ------------- |
| Product image           | 1200 × 900 px (4:3)           | 500 KB        |
| Hero banner             | 1920 × 1080 px (16:9)         | 800 KB        |
| Company/warehouse image | 1200 × 1600 px (3:4)          | 500 KB        |
| OG default image        | 1200 × 630 px (1.91:1)        | 300 KB        |
| Logo                    | 512 × 512 px (SVG lebih baik) | 100 KB        |

### Format File — Rekomendasi

**Priority Order:**

1. **WebP** — recommended default (~30% lebih kecil dari JPG dengan kualitas sama)
2. **JPG/JPEG** — untuk foto/screenshot dengan warna banyak
3. **PNG** — hanya untuk gambar dengan transparansi
4. **SVG** — untuk logo & icon (jika vector)
5. ❌ **JANGAN pakai:** BMP, TIFF, GIF (untuk selain animation)

### Rekomendasi Setup Backend Laravel

Backend admin CMS **wajib** validasi upload:

```php
// Contoh validation di controller upload
$request->validate([
    'image' => [
        'required',
        'image',
        'mimes:webp,jpg,jpeg,png',    // hanya format yang efisien
        'max:2048',                    // max 2MB (dalam KB)
        'dimensions:max_width=3000,max_height=3000',
    ],
]);
```

**Auto-processing on upload** (recommended di backend):

```php
use Intervention\Image\Facades\Image;

$img = Image::make($request->file('image'));

// Resize kalau terlalu besar
if ($img->width() > 1920) {
    $img->resize(1920, null, function ($c) {
        $c->aspectRatio();
        $c->upsize();
    });
}

// Convert ke WebP dengan quality 85
$img->encode('webp', 85);
$img->save(storage_path('app/public/products/' . $filename . '.webp'));
```

---

## 🎯 Frontend Optimization (Sudah Setup)

### 1. Next.js Image Component

Sudah dikonfigurasi di `next.config.ts`:

```typescript
images: {
  formats: ["image/avif", "image/webp"],  // auto convert output
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 86400,
}
```

**Cara pakai** di component (nanti saat integrasi backend):

```tsx
import Image from "next/image";

<Image
  src={product.image} // URL dari API
  alt={product.name} // SEO + accessibility
  width={1200}
  height={900}
  quality={85}
  loading="lazy" // default lazy untuk below-fold
  priority={isAboveFold} // true untuk hero/LCP images
  sizes="(max-width: 768px) 100vw, 50vw" // responsive
  className="w-full h-full object-cover"
/>;
```

### 2. Priority Loading (LCP Optimization)

Image yang menjadi LCP (Largest Contentful Paint) — biasanya hero image —
**wajib** pakai `priority={true}` agar preload:

```tsx
<Image src="/hero.webp" alt="Hero" priority width={1920} height={1080} />
```

### 3. Placeholder Strategy

Untuk image yang loading dari CDN, gunakan blur placeholder:

```tsx
<Image
  src={product.image}
  alt={product.name}
  placeholder="blur"
  blurDataURL={product.blurDataURL} // dari backend, generate saat upload
  width={1200}
  height={900}
/>
```

Backend Laravel bisa generate `blurDataURL` (base64 tiny preview) saat upload:

```php
// Contoh generate blur placeholder (base64 20x15 blur)
$blurImg = Image::make($file)
    ->resize(20, 15)
    ->blur(20)
    ->encode('jpg', 40);
$blurDataURL = 'data:image/jpg;base64,' . base64_encode($blurImg);
```

---

## 🖼️ CDN Setup (Recommended untuk Production)

Untuk performa maksimal, serve images dari CDN (bukan dari server Laravel langsung):

### Option 1: Cloudflare CDN (Free tier cukup)

1. Setup domain di Cloudflare
2. Upload gambar ke `images.sinarsurabayasakti.co.id`
3. Cloudflare auto-cache di edge server
4. Update `next.config.ts`:
   ```typescript
   remotePatterns: [
     { protocol: "https", hostname: "images.sinarsurabayasakti.co.id" },
   ],
   ```

### Option 2: BunnyCDN, DigitalOcean Spaces, dll

Similar setup — whitelist hostname di `remotePatterns`.

### Option 3: Cloudinary (Auto-optimization)

```typescript
// Cloudinary auto-format + auto-quality
const url = `https://res.cloudinary.com/sinarsurabayasakti/image/upload/f_auto,q_auto/${publicId}`;
```

---

## 🏷️ Alt Text — SEO Best Practice

**JANGAN kosongkan alt text.** Setiap image harus punya alt text descriptive:

### ✅ GOOD

```tsx
<Image
  src="/products/pvc-cable.webp"
  alt="Kabel PVC SUPREME 6 KV untuk aplikasi kelistrikan distribusi"
/>
```

### ❌ BAD

```tsx
<Image src="/products/pvc-cable.webp" alt="" />
<Image src="/products/pvc-cable.webp" alt="image1" />
<Image src="/products/pvc-cable.webp" alt="cable" />
```

**Rekomendasi format:** `[Nama Produk] SUPREME [tipe] untuk [aplikasi]`

### Setup di CMS

Field `alt_text` di database produk **wajib diisi admin** saat upload.
Kalau kosong, fallback ke `product.name`:

```tsx
<Image src={product.image} alt={product.altText || product.name} />
```

---

## 🚀 Performance Testing Checklist

Setelah setup image optimization, test dengan:

1. **Google PageSpeed Insights** — https://pagespeed.web.dev
   - Target LCP < 2.5s
   - Target CLS < 0.1

2. **GTmetrix** — https://gtmetrix.com
   - Grade A untuk LCP

3. **WebPageTest** — https://webpagetest.org
   - Waterfall analysis untuk image loading

4. **Chrome DevTools Lighthouse**
   ```
   F12 → Lighthouse tab → Analyze page load
   ```
   - Target Performance ≥ 90

### Common Issues & Solutions

| Issue                       | Solution                                                |
| --------------------------- | ------------------------------------------------------- |
| Large hero image LCP > 2.5s | Add `priority` prop, preload via `<link rel="preload">` |
| Layout shift (CLS > 0.1)    | Selalu set `width` & `height` di Image component        |
| Slow initial load           | Enable AVIF, lazy load below-fold images                |
| Blurry images on retina     | Set `sizes` prop dengan responsive breakpoints          |
| Placeholder blocking render | Use `placeholder="blur"` dengan `blurDataURL` kecil     |

---

## 📝 Checklist untuk Admin CMS Backend

Ini yang harus di-implement di backend Laravel untuk optimal:

- [ ] Validation: hanya accept WebP, JPG, PNG (max 2MB)
- [ ] Auto-resize: max width 1920px
- [ ] Auto-convert to WebP saat upload
- [ ] Generate blur placeholder (base64) dan store di DB
- [ ] Wajib field `alt_text` saat create/edit produk
- [ ] Simpan multiple sizes (thumbnail, medium, large) — opsional untuk gallery
- [ ] Return image URL absolute (dengan CDN domain kalau ada)
- [ ] Response API include `blurDataURL` field untuk placeholder
- [ ] Setup CDN untuk serving (Cloudflare/BunnyCDN)

---

## 🎨 Frontend Developer Checklist

- [ ] Selalu pakai `<Image>` dari `next/image`, bukan `<img>`
- [ ] Set `width` & `height` explicit (untuk mencegah CLS)
- [ ] Set `alt` text yang meaningful
- [ ] Set `priority` untuk hero/LCP image
- [ ] Set `sizes` untuk responsive images
- [ ] Set `loading="lazy"` untuk below-fold (default sudah lazy)
- [ ] Test di Lighthouse: image optimization score ≥ 90
- [ ] Test di connection 3G throttle di DevTools
