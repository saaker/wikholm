import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // When an image isn't found as a static file in public/images/,
  // fall through to the Blob-serving API route.
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/images/:path*",
          destination: "/api/images/serve/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
