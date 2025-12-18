import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  experimental: {
    optimizePackageImports: ["react", "react-dom"],
    optimizeCss: true,
  },

  // Compiler optimizations - modern JavaScript output
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Transpile only for modern browsers
  transpilePackages: [],

  // Production optimizations
  productionBrowserSourceMaps: false,

  // Allow ACME challenge requests to pass through
  async headers() {
    return [
      {
        source: "/.well-known/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
      // Optimize static assets caching
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Preload critical resources
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
