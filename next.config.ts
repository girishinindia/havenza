import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false, // hide the Next.js "N" badge in development
  images: { formats: ['image/avif', 'image/webp'] },
};

export default nextConfig;
