/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect non-www to www (both HTTP and HTTPS)
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
      // Redirect HTTP www to HTTPS www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.henry-nunez.com",
          },
        ],
        permanent: true,
        destination: "https://www.henry-nunez.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
