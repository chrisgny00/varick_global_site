import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.repliers.io" },
      { protocol: "https", hostname: "photos.repliers.io" },
      { protocol: "https", hostname: "*.repliers.io" },
      // MLS photo CDNs
      { protocol: "https", hostname: "*.miamimlsidx.com" },
      { protocol: "https", hostname: "*.mlsmatrix.com" },
      { protocol: "https", hostname: "*.listingmedia.com" },
      { protocol: "https", hostname: "*.rapattoni.com" },
      { protocol: "https", hostname: "*.realtymx.net" },
    ],
  },
};

export default nextConfig;
