import { sanityDataset, sanityProjectId } from "@/sanity/env";

type SanityFileField = {
  asset?: {
    _ref?: string;
    url?: string;
  } | null;
};

/** Resolve a Sanity file field to a CDN URL. */
export function fileUrl(file: SanityFileField | null | undefined): string | undefined {
  const asset = file?.asset;
  if (!asset) return undefined;
  if (asset.url) return asset.url;

  const ref = asset._ref;
  if (!ref?.startsWith("file-") || !sanityProjectId) return undefined;

  const idWithExt = ref.slice("file-".length);
  const lastDash = idWithExt.lastIndexOf("-");
  if (lastDash <= 0) return undefined;

  const id = idWithExt.slice(0, lastDash);
  const ext = idWithExt.slice(lastDash + 1);
  return `https://cdn.sanity.io/files/${sanityProjectId}/${sanityDataset}/${id}.${ext}`;
}
