import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Only redirect non-www to www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "henry-nunez.com",
          },
        ],
        destination: "https://www.henry-nunez.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
