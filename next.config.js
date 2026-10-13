/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  async rewrites() {
    return [
      {
        source: "/products/:slug",
        destination: "/product/:slug",
      },
      {
        source: "/categories/:slug",
        destination: "/category/:slug",
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/categories",
        destination: "/#সব-পণ্য",
        permanent: false,
      },
      {
        source: "/products",
        destination: "/#সব-পণ্য",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
