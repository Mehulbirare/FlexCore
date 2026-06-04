// Prefix a public/ asset path with the deploy base path.
//
// Next.js only applies `basePath` to <Link> and next/image. Plain <video>,
// <img>, AvatarImage, and CSS url() references to files in public/ are NOT
// rewritten, so on GitHub Pages (served under /FlexCore/) they would 404.
// Wrap every such path with asset() so it resolves correctly in production
// while staying root-relative during local dev (empty base path).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path: string) => `${basePath}${path}`;
