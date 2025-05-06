import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "henry-nunez.com",
          },
        ],
        destination: "https://www.henry-nunez.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "http://www.henry-nunez.com",
          },
        ],
        destination: "https://www.henry-nunez.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
