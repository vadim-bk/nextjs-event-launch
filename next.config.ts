import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["cdn.builder.io"],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
