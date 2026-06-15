import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/FlexCore",
  assetPrefix: "/FlexCore/",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
