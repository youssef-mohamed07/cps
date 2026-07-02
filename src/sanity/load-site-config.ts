import { cache } from "react";
import { sanityFetch } from "@/sanity/fetch";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import { toSiteConfig } from "@/sanity/transformers";
import { setSiteConfig } from "@/lib/site-config";

export const ensureSiteConfig = cache(async () => {
  await loadSiteConfig();
});

export async function loadSiteConfig(): Promise<void> {
  const data = await sanityFetch<Parameters<typeof toSiteConfig>[0]>({
    query: SITE_SETTINGS_QUERY,
    tags: ["siteSettings"],
  });

  const config = toSiteConfig(data);
  if (config) {
    setSiteConfig(config);
  }
}
