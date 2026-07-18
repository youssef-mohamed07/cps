import { getFooterLocal, type FooterConfig, type FooterLink, type FooterSocial } from "@/content/footer";
import type { Locale } from "@/lib/i18n";
import { getSiteConfig } from "@/lib/site-config";
import { sanityFetch } from "@/sanity/fetch";
import { FOOTER_QUERY } from "@/sanity/queries/collections";
import { toImageSrc } from "@/sanity/transformers/shared";

type SanityFooter = {
  logo?: { asset?: unknown; alt?: string };
  description?: string;
  certifications?: { label?: string; image?: { asset?: unknown; alt?: string } }[];
  qualityBadges?: { label?: string; image?: { asset?: unknown; alt?: string } }[];
  cta?: { label?: string; href?: string };
  servicesTitle?: string;
  showServices?: boolean;
  boothTypesTitle?: string;
  showBoothTypes?: boolean;
  companyLinksTitle?: string;
  companyLinks?: { label?: string; href?: string }[];
  contactTitle?: string;
  officeAddress?: string;
  phoneDisplay?: string;
  phoneHref?: string;
  email?: string;
  whatsappLabel?: string;
  businessHours?: string;
  mapsLabel?: string;
  mapsUrl?: string;
  socialLinks?: { platform?: string; url?: string; label?: string }[];
  newsletter?: {
    enabled?: boolean;
    headline?: string;
    description?: string;
    placeholder?: string;
    buttonLabel?: string;
    mailto?: string;
  };
  trust?: {
    enabled?: boolean;
    items?: { label?: string }[];
  };
  rights?: string;
  bottomLinks?: { label?: string; href?: string }[];
  createdBy?: string;
  locationsTitle?: string;
  locations?: { label?: string; href?: string }[];
};

function mapLinks(links?: { label?: string; href?: string }[]): FooterLink[] {
  return (links ?? [])
    .filter((link) => link.label && link.href)
    .map((link) => ({ label: link.label!, href: link.href! }));
}

function mapSocial(links?: { platform?: string; url?: string; label?: string }[]): FooterSocial[] {
  return (links ?? [])
    .filter((link) => link.platform && link.url)
    .map((link) => ({
      platform: link.platform!,
      url: link.url!,
      label: link.label,
    }));
}

function mapBadges(
  badges?: { label?: string; image?: { asset?: unknown; alt?: string } }[],
) {
  return (badges ?? [])
    .filter((badge) => badge.label)
    .map((badge) => ({
      label: badge.label!,
      image: toImageSrc(badge.image) || undefined,
      imageAlt: badge.image?.alt || badge.label!,
    }));
}

export async function resolveFooter(locale: Locale): Promise<FooterConfig> {
  const local = getFooterLocal(locale);
  const config = getSiteConfig();
  const remote = await sanityFetch<SanityFooter>({
    query: FOOTER_QUERY,
    params: { locale },
    tags: ["siteFooter", `siteFooter-${locale}`],
  });

  const siteSocial: FooterSocial[] = [];
  if (config.social.linkedin) {
    siteSocial.push({ platform: "linkedin", url: config.social.linkedin, label: "LinkedIn" });
  }
  if (config.social.instagram) {
    siteSocial.push({ platform: "instagram", url: config.social.instagram, label: "Instagram" });
  }
  if (config.social.x) {
    siteSocial.push({ platform: "x", url: config.social.x, label: "X" });
  }

  if (!remote) {
    return {
      ...local,
      logo: config.logo || local.logo,
      phoneDisplay: config.phoneDisplay || local.phoneDisplay,
      phoneHref: config.phone || local.phoneHref,
      email: config.email || local.email,
      officeAddress:
        local.officeAddress ||
        [config.address.city, config.address.countryName].filter(Boolean).join(", "),
      mapsUrl: config.googleMapsUrl || local.mapsUrl,
      socialLinks: local.socialLinks.length ? local.socialLinks : siteSocial,
    };
  }

  const remoteSocial = mapSocial(remote.socialLinks);

  return {
    logo: toImageSrc(remote.logo) || config.logo || local.logo,
    logoAlt: remote.logo?.alt || local.logoAlt,
    description: remote.description || local.description,
    certifications: mapBadges(remote.certifications).length
      ? mapBadges(remote.certifications)
      : local.certifications,
    qualityBadges: mapBadges(remote.qualityBadges).length
      ? mapBadges(remote.qualityBadges)
      : local.qualityBadges,
    cta:
      remote.cta?.label && remote.cta.href
        ? { label: remote.cta.label, href: remote.cta.href }
        : local.cta,
    servicesTitle: remote.servicesTitle || local.servicesTitle,
    showServices: remote.showServices ?? local.showServices,
    boothTypesTitle: remote.boothTypesTitle || local.boothTypesTitle,
    showBoothTypes: remote.showBoothTypes ?? local.showBoothTypes,
    companyLinksTitle: remote.companyLinksTitle || local.companyLinksTitle,
    companyLinks:
      mapLinks(remote.companyLinks).length >= local.companyLinks.length
        ? mapLinks(remote.companyLinks)
        : local.companyLinks,
    contactTitle: remote.contactTitle || local.contactTitle,
    officeAddress:
      remote.officeAddress ||
      local.officeAddress ||
      [config.address.city, config.address.countryName].filter(Boolean).join(", "),
    phoneDisplay: remote.phoneDisplay || config.phoneDisplay || local.phoneDisplay,
    phoneHref: remote.phoneHref || config.phone || local.phoneHref,
    email: remote.email || config.email || local.email,
    whatsappLabel: remote.whatsappLabel || local.whatsappLabel,
    businessHours: remote.businessHours || local.businessHours,
    mapsLabel: remote.mapsLabel || local.mapsLabel,
    mapsUrl: remote.mapsUrl || config.googleMapsUrl || local.mapsUrl,
    socialLinks: remoteSocial.length ? remoteSocial : local.socialLinks.length ? local.socialLinks : siteSocial,
    newsletter: {
      enabled: remote.newsletter?.enabled ?? local.newsletter.enabled,
      headline: remote.newsletter?.headline || local.newsletter.headline,
      description: remote.newsletter?.description || local.newsletter.description,
      placeholder: remote.newsletter?.placeholder || local.newsletter.placeholder,
      buttonLabel: remote.newsletter?.buttonLabel || local.newsletter.buttonLabel,
      mailto: remote.newsletter?.mailto || local.newsletter.mailto,
    },
    trust: {
      enabled: remote.trust?.enabled ?? local.trust.enabled,
      items:
        remote.trust?.items?.filter((item) => item.label).map((item) => ({ label: item.label! }))
          .length
          ? remote.trust!.items!.filter((item) => item.label).map((item) => ({ label: item.label! }))
          : local.trust.items,
    },
    rights: remote.rights || local.rights,
    bottomLinks: mapLinks(remote.bottomLinks).length
      ? mapLinks(remote.bottomLinks)
      : local.bottomLinks,
    createdBy: remote.createdBy || local.createdBy,
    locationsTitle: remote.locationsTitle || local.locationsTitle,
    locations: mapLinks(remote.locations).length
      ? mapLinks(remote.locations)
      : local.locations,
  };
}
