import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Native Kelvin still opens the original .html legal URLs.
    return ["privacy", "eula", "notes"].map(page => ({
      source: `/${page}.html`, destination: `/ru/${page}`, permanent: true,
    }));
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80],
    // panel screenshots are tall and narrow — limit generated widths
    // so the optimizer doesn't emit oversized variants
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24,
  },
};

export default withNextIntl(nextConfig);
