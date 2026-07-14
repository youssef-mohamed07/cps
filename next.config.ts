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
      {
        source: "/:locale(en|ar)/portfolio",
        destination: "/:locale/work",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/blog",
        destination: "/:locale/news",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/services/:slug",
        destination: "/:locale/locations/riyadh/services/:slug",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/booth-types/:slug",
        destination: "/:locale/locations/riyadh/booth-types/:slug",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/saudi-arabia/:path*",
        destination: "/:locale/locations/riyadh/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/uae/:path*",
        destination: "/:locale/locations/jeddah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/qatar/:path*",
        destination: "/:locale/locations/dammam/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/kuwait/:path*",
        destination: "/:locale/locations/khobar/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/bahrain/:path*",
        destination: "/:locale/locations/makkah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/oman/:path*",
        destination: "/:locale/locations/madinah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/egypt/:path*",
        destination: "/:locale/locations/neom/:path*",
        permanent: true,
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
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
