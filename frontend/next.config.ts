import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization — WebP/AVIF prioritas, cache 1 hari
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    // Whitelist domain untuk API images nanti (Laravel backend / CDN)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Compression (gzip/brotli via reverse proxy biasanya, tapi enable at Next level)
  compress: true,

  // Response headers untuk static assets caching
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, must-revalidate",
          },
        ],
      },
      {
        // Security headers global
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Aktifkan production source map hanya jika perlu debugging
  productionBrowserSourceMaps: false,

  // Powered by header off (kecil, tapi ok untuk SEO/security)
  poweredByHeader: false,
};

export default nextConfig;
