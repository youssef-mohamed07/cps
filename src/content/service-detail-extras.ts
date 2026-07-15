import type { ServiceCover, ServiceDesigns } from "@/content/catalog";

type ServiceProcessStep = {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
};

type ServiceDetailExtrasLocale = {
  cover: ServiceCover;
  designs: ServiceDesigns;
  process: ServiceProcessStep[];
};

/** Optional per-service overrides merged in localizeService. Prefer catalog when complete. */
export const serviceDetailExtras: Record<
  string,
  { en: ServiceDetailExtrasLocale; ar: ServiceDetailExtrasLocale }
> = {};
