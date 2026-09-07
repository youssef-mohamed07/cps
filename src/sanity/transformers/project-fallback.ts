import type { CmsProject } from "./collections";

const legacyIndustrySlugs: Record<string, string> = {
  technology: "technology-electronics",
  healthcare: "healthcare-pharmaceutical",
  finance: "banking-financial-services",
  government: "government-public-sector",
  retail: "retail-shopping-malls",
};

/** Fill missing fields on known seed projects without replacing editorial CMS copy. */
export function mergeProjectFallback(
  remote: CmsProject,
  local: CmsProject | null,
): CmsProject {
  const industry = remote.industrySlug?.trim() || local?.industrySlug;
  return {
    ...remote,
    serviceSlug: remote.serviceSlug?.trim() || local?.serviceSlug,
    industrySlug: industry ? legacyIndustrySlugs[industry] ?? industry : undefined,
    scopeOfWork: remote.scopeOfWork?.trim() ? remote.scopeOfWork : local?.scopeOfWork ?? "",
    image: remote.image || local?.image || "",
    imageAlt: remote.imageAlt || local?.imageAlt || remote.title,
    gallery: remote.gallery.length ? remote.gallery : local?.gallery ?? [],
    motionVideo: remote.motionVideo || local?.motionVideo,
  };
}
