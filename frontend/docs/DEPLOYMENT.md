# Deployment Guide — Shared Hosting with SSH

Panduan deploy Next.js 16 ke shared hosting yang support Node.js via SSH.

---

## 🎯 Prerequisites

Pastikan shared hosting Anda memiliki:

- ✅ **Node.js 20+** (Next.js 16 requires Node ≥ 20)
- ✅ **SSH access** (untuk run build & start commands)
- ✅ **npm** atau **pnpm**
- ✅ **Domain/subdomain** yang dipointing ke direktori app
- ✅ **Persistent process manager** (PM2, atau equivalent)

### Cek Node version di hosting

```bash
ssh user@yourhost.com
node -v   # harus ≥ 20.x
npm -v
```

Jika versi lama, hubungi provider untuk upgrade atau gunakan `nvm`.

---

## 🚀 Deployment Options

### Option A: Standalone Node Server (Recommended)

Ini deploy paling standar untuk Next.js production.

#### Step 1: Prepare di Lokal

```bash
cd frontend
npm ci                    # clean install
npm run build             # produce .next/ folder
```

#### Step 2: Upload ke Hosting

Upload folder-folder berikut ke hosting via SFTP/rsync:

```
frontend/
├── .next/               ← hasil build (WAJIB)
├── public/              ← static assets (WAJIB)
├── package.json         ← WAJIB
├── package-lock.json    ← WAJIB
├── next.config.ts       ← WAJIB
├── node_modules/        ← optional (bisa install di server)
└── .env.production      ← environment untuk production (JANGAN commit ke git)
```

Contoh dengan `rsync`:

```bash
rsync -avz --exclude 'node_modules' --exclude '.git' \
  ./frontend/ user@yourhost.com:/home/user/apps/sinarsurabayasakti/
```

#### Step 3: Install Dependencies di Hosting

SSH ke hosting:

```bash
ssh user@yourhost.com
cd /home/user/apps/sinarsurabayasakti/
npm ci --production=false  # install semua deps (Next perlu beberapa dev deps runtime)
```

#### Step 4: Setup Environment Variables

Buat `.env.production` (atau `.env.local`):

```bash
nano .env.production
```

Isi:

```bash
NEXT_PUBLIC_SITE_URL=https://sinarsurabayasakti.co.id
NEXT_PUBLIC_API_BASE_URL=https://api.sinarsurabayasakti.co.id/api
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=abc123
NODE_ENV=production
PORT=3000
```

#### Step 5: Start dengan PM2

Install PM2 global (kalau belum):

```bash
npm install -g pm2
```

Buat file `ecosystem.config.js` di root:

```javascript
module.exports = {
  apps: [
    {
      name: "sinarsurabayasakti",
      script: "npm",
      args: "start",
      cwd: "/home/user/apps/sinarsurabayasakti",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
```

Start:

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # generate systemd command, run yang dikasih
```

Verify:

```bash
pm2 status
pm2 logs sinarsurabayasakti
```

Akses via `http://yourhost.com:3000` — kalau OK, lanjut setup reverse proxy.

#### Step 6: Setup Reverse Proxy (Apache/Nginx)

Karena shared hosting biasanya sudah punya Apache/LiteSpeed running di port 80/443,
routing dari domain ke port 3000 via reverse proxy.

**Nginx** (jika akses config):

```nginx
server {
    listen 80;
    server_name sinarsurabayasakti.co.id www.sinarsurabayasakti.co.id;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Apache** (via `.htaccess` di public_html):

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]

# Websocket support (untuk HMR di dev, tidak perlu untuk production)
```

Atau kalau provider punya "Setup Node.js App" (cPanel LiteSpeed):

1. cPanel → Setup Node.js App
2. Application root: `/home/user/apps/sinarsurabayasakti`
3. Startup file: `node_modules/next/dist/bin/next start`
4. Node version: 20.x
5. Klik "Create"

#### Step 7: Enable HTTPS

Via cPanel: Enable Let's Encrypt SSL untuk domain.

Atau via Certbot:

```bash
sudo certbot --nginx -d sinarsurabayasakti.co.id -d www.sinarsurabayasakti.co.id
```

---

### Option B: Static Export (Jika Benar-Benar Static)

Kalau nanti semua data statis (no API, no dynamic routes), bisa export ke pure HTML:

#### Enable static export di `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true }, // Image optimization butuh server
};
```

#### Build & upload

```bash
npm run build
# → outputnya di folder `out/`
```

Upload folder `out/` ke `public_html` di shared hosting biasa (tanpa Node).
Tidak perlu PM2, tidak perlu reverse proxy. Bisa di hosting cPanel biasa.

**Trade-off:**

- ✅ Pro: Lebih cepat, lebih murah, tidak perlu Node server
- ❌ Con: Hilang fitur ISR, dynamic revalidation, Image optimization, dan API routes
- ❌ Con: Product detail pages tetap SSG (tidak masalah), tapi form contact perlu external service (Formspree, dll)

**Kapan pilih Option B?** Kalau backend Laravel akan lama ready dan client
mau hemat hosting cost.

---

## 🔄 Continuous Deployment (Optional)

### Setup Git-based Deploy

Di hosting:

```bash
cd /home/user/apps
git clone git@github.com:your-repo/fullstack-sinar-surabaya-sakti-github.git
cd fullstack-sinar-surabaya-sakti-github/frontend
npm ci
npm run build
pm2 start ecosystem.config.js
```

Untuk update:

```bash
cd /home/user/apps/fullstack-sinar-surabaya-sakti-github
git pull
cd frontend
npm ci
npm run build
pm2 restart sinarsurabayasakti
```

### Automated dengan GitHub Actions (Optional)

Buat `.github/workflows/deploy.yml`:

```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths: ["frontend/**"]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
        working-directory: frontend
      - run: npm run build
        working-directory: frontend
      - name: Deploy via SSH
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /home/user/apps/fullstack-sinar-surabaya-sakti-github
            git pull
            cd frontend
            npm ci
            npm run build
            pm2 restart sinarsurabayasakti
```

---

## 📊 Post-Deployment Checklist

Setelah deploy, verify:

- [ ] Homepage accessible: `https://sinarsurabayasakti.co.id`
- [ ] SSL certificate valid (padlock icon di browser)
- [ ] Semua pages accessible: `/about`, `/products`, `/contact`, etc
- [ ] Product detail SSG working: `/products/pvc-cable`
- [ ] Sitemap accessible: `/sitemap.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] 404 page shows for invalid URL
- [ ] Dark mode toggle works
- [ ] Mobile menu works
- [ ] WhatsApp button link works (setelah isi nomor asli)
- [ ] Contact form validation works
- [ ] PageSpeed Insights score ≥ 90 for mobile & desktop
- [ ] Search Console: submit sitemap, verify ownership
- [ ] Google Analytics: pastikan tracking berjalan

---

## 🐛 Troubleshooting

**Q: Command `next` not found**

```bash
cd /path/to/app
npx next start
# atau
./node_modules/.bin/next start
```

**Q: EADDRINUSE port 3000 already in use**

```bash
lsof -i :3000              # find process
kill -9 PID                # kill it
# atau ganti port di ecosystem.config.js: PORT=3001
```

**Q: Build sukses tapi runtime error "Module not found"**

- Ensure `node_modules` completely uploaded / installed di server
- Ensure Node version di server sama dengan lokal
- `rm -rf node_modules .next && npm ci && npm run build`

**Q: 502 Bad Gateway dari reverse proxy**

- PM2 process crashed. Check `pm2 logs`
- Restart: `pm2 restart sinarsurabayasakti`

**Q: Halaman lama tetap muncul setelah deploy**

- Clear CDN cache (Cloudflare purge cache)
- Restart PM2: `pm2 restart sinarsurabayasakti`
- Hard refresh browser: `Ctrl+Shift+R`

**Q: Image optimization tidak jalan**

- Pastikan pakai Option A (Node server), bukan Option B (static export)
- Ensure `sharp` terinstall: `npm install sharp`

---

## 🔐 Security Notes

- **JANGAN commit `.env.local` atau `.env.production`** ke git
- Set file permission `.env`: `chmod 600 .env.production`
- Regularly update dependencies: `npm audit && npm update`
- Enable rate limiting di reverse proxy untuk `/api/*` routes
- Setup log rotation untuk PM2: `pm2 install pm2-logrotate`

---

## 📈 Monitoring

Recommended untuk production:

- **UptimeRobot** — free uptime monitoring
- **Sentry** — error tracking (`npm install @sentry/nextjs`)
- **PM2 Plus** — process monitoring (paid tier)
- **Google Search Console** — SEO health monitoring

---

## 💡 Performance Tips

1. Enable Brotli/Gzip di reverse proxy
2. Set cache headers untuk static assets (`.next/static/*` immutable 1 year)
3. Use CDN untuk images (Cloudflare/BunnyCDN)
4. Enable HTTP/2 di web server
5. Monitor Core Web Vitals di Google Search Console
