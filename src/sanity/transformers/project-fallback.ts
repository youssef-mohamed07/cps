import type { CmsProject } from "./collections";

const legacyIndustrySlugs: Record<string, string> = {
  technology: "technology-electronics",
  healthcare: "healthcare-pharmaceutical",
  finance: "banking-financial-services",
  government: "government-public-sector",
  retail: "retail-shopping-malls",
  energy: "technology-electronics",
};

function normalizeIndustrySlug(value?: string) {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  return legacyIndustrySlugs[trimmed] ?? trimmed;
}

/** Fill missing fields on known seed projects without replacing editorial CMS copy. */
export function mergeProjectFallback(
  remote: CmsProject,
  local: CmsProject | null,
): CmsProject {
  const remoteIndustryRaw = remote.industrySlug?.trim();
  const remoteIndustry = normalizeIndustrySlug(remoteIndustryRaw);
  const localIndustry = normalizeIndustrySlug(local?.industrySlug);
  const remoteLooksLegacy =
    Boolean(remoteIndustryRaw) && Boolean(legacyIndustrySlugs[remoteIndustryRaw!]);

  return {
    ...remote,
    // Prefer local blueprint taxonomy for known seed projects when CMS is empty or legacy.
    serviceSlug:
      local?.serviceSlug ||
      remote.serviceSlug?.trim() ||
      undefined,
    industrySlug: remoteLooksLegacy
      ? localIndustry || remoteIndustry
      : remoteIndustry || localIndustry,
    scopeOfWork: remote.scopeOfWork?.trim()
      ? remote.scopeOfWork
      : local?.scopeOfWork ?? "",
    image: remote.image || local?.image || "",
    imageAlt: remote.imageAlt || local?.imageAlt || remote.title,
    gallery: remote.gallery.length ? remote.gallery : local?.gallery ?? [],
    motionVideo: remote.motionVideo || local?.motionVideo,
  };
}
