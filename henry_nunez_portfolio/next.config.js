/** @type {import('next').NextConfig} */
const nextConfig = {
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

module.exports = nextConfig;
