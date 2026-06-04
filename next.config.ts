import type { NextConfig } from "next";

// On GitHub Pages the site is served from https://<user>.github.io/FlexCore/,
// so a base path is required in production. Set NEXT_PUBLIC_BASE_PATH=/FlexCore
// in the deploy workflow; leave it empty for local dev (served from root).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` so it can be hosted on GitHub Pages.
  output: "export",
  basePath,
  assetPrefix: basePath,
  // next/image optimization needs a server; static export requires unoptimized.
  images: { unoptimized: true },
  // Emit each route as a folder with index.html (better for static hosts).
  trailingSlash: true,
};

export default nextConfig;
