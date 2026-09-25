import type { NextConfig } from "next";

const basePath = "/agbeta";

const nextConfig: NextConfig = {
  reactCompiler: true,
  devIndicators: false,
  basePath,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
