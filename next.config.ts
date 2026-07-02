import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/studio",
        destination: "/studio",
        permanent: false,
      },
      {
        source: "/:locale(en|ar)/studio/:path*",
        destination: "/studio/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      ...(sanityProjectId
        ? [
            {
              protocol: "https" as const,
              hostname: "cdn.sanity.io",
              pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
