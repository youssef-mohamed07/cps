export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  companyName,
  legalName,
  tagline,
  description,
  logo{ asset, alt },
  icon{ asset, alt },
  favicon{ asset, alt },
  portfolio{
    enabled,
    labelEn,
    labelAr,
    externalUrl,
    "fileUrl": file.asset->url
  },
  email,
  phone,
  phoneDisplay,
  whatsappMessage,
  addressCity,
  addressCountry,
  addressCountryName,
  googleMapsUrl,
  socialLinks[]{ platform, url, label },
  brandColors,
  googleAnalyticsId,
  googleTagManagerId,
  defaultSeo,
  defaultKeywords,
  defaultSeoByLocale,
  ogImage{ asset, alt },
  homeHero{ asset, alt },
  homeHeroVideo{ asset->{ url } },
  homeFloatingImages[]{ asset, alt },
  productionImage{ asset, alt },
  footerExploreLinks[]{ label, href }
}`;

export const DICTIONARY_QUERY = `*[_type == "dictionary" && locale == $locale][0]{
  content,
  comingSoon{
    title,
    subtitle
  }
}`;

export const NOT_FOUND_QUERY = `*[_type == "notFoundPage" && locale == $locale][0]{
  title,
  description,
  headline,
  body,
  ctaLabel,
  ctaHref
}`;
