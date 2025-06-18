/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings for known browser extension attributes
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Ensure CSS modules are properly processed
  webpack: (config) => {
    return config;
  },
  // Enable JIT mode for Tailwind
  swcMinify: true,
  // Allow image domains
  images: {
    domains: ['images.pexels.com', 'plus.unsplash.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
