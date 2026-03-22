import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  ...(isGhPages && {
    output: "export",
    basePath: "/wilkholm-orthodontics",
  }),
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? "/wilkholm-orthodontics" : "",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "swedishdental.com",
      },
    ],
  },
};

export default nextConfig;
