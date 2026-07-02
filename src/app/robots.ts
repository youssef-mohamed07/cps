import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexingAllowed } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // When global indexing is disabled (pre-launch / preview / staging), block
  // all crawling outright and omit the sitemap so crawlers aren't invited in.
  if (!isIndexingAllowed()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: getSiteUrl("/sitemap.xml"),
    host: getSiteUrl(),
  };
}
