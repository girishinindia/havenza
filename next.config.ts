import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // hide the Next.js "N" badge in development
  // Photos are pre-sized and pre-converted to WebP, so skip Vercel's on-demand image optimisation
  // (keeps you well inside the free plan's image limits).
  images: { unoptimized: true },
};

export default nextConfig;
