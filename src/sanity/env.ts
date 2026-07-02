export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
export const sanityReadToken = process.env.SANITY_API_READ_TOKEN;

export function isSanityConfigured(): boolean {
  return Boolean(sanityProjectId && sanityDataset);
}
