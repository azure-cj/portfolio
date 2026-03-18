import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Add external hostname strings here if you ever use next/image
    // with a remote src, e.g. "images.unsplash.com".
    // No external image sources are used by default.
    remotePatterns: [],
  },

  // Recommended: strip X-Powered-By header
  poweredByHeader: false,
};

export default nextConfig;
