import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  experimental: {
    optimizePackageImports: ["react", "react-dom"],
    optimizeCss: true,
  },

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
    ];
  },
};

export default nextConfig;
