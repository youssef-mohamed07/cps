import { getDictionaryLocal, type Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";
import type { SeoMeta } from "@/types/seo";
import { sanityFetch } from "@/sanity/fetch";
import { toSeoMeta } from "@/sanity/transformers/shared";

export type HubKind =
  | "services"
  | "boothTypes"
  | "work"
  | "industries"
  | "locations"
  | "news";

const HOME_PAGE_QUERY = `*[_type == "homePage" && language == $locale][0]{
  hero{ eyebrow, title, lead, primaryCta, secondaryCta },
  sections{ payload },
  seo
}`;

const ABOUT_PAGE_QUERY = `*[_type == "aboutPageDoc" && language == $locale][0]{
  eyebrow,
  title,
  lead,
  storyTitle,
  story,
  missionTitle,
  mission,
  visionTitle,
  vision,
  values[]{ title, description },
  process[]{ title, description },
  studioTitle,
  studioBody,
  faq[]{ question, answer },
  seo
}`;

const CONTACT_PAGE_QUERY = `*[_type == "contactPageDoc" && language == $locale][0]{
  eyebrow,
  title,
  lead,
  officeTitle,
  businessHours,
  briefForm{ payload },
  seo
}`;

const HUB_PAGES_QUERY = `*[_type == "hubPage" && language == $locale]{
  kind,
  eyebrow,
  title,
  lead,
  primaryCta,
  secondaryCta,
  detailTitle,
  faq[]{ question, answer },
  seo
}`;

type SeoDoc = { seo?: Parameters<typeof toSeoMeta>[0] };

type HomeDoc = SeoDoc & {
  hero?: {
    eyebrow?: string;
    title?: string;
    lead?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  sections?: { payload?: string };
};

type AboutDoc = SeoDoc & {
  eyebrow?: string;
  title?: string;
  lead?: string;
  storyTitle?: string;
  story?: string;
  missionTitle?: string;
  mission?: string;
  visionTitle?: string;
  vision?: string;
  values?: { title?: string; description?: string }[];
  process?: { title?: string; description?: string }[];
  studioTitle?: string;
  studioBody?: string;
  faq?: { question?: string; answer?: string }[];
};

type ContactDoc = SeoDoc & {
  eyebrow?: string;
  title?: string;
  lead?: string;
  officeTitle?: string;
  businessHours?: string;
  briefForm?: { payload?: string };
};

type HubDoc = SeoDoc & {
  kind?: HubKind;
  eyebrow?: string;
  title?: string;
  lead?: string;
  primaryCta?: string;
  secondaryCta?: string;
  detailTitle?: string;
  faq?: { question?: string; answer?: string }[];
};

export type HubPageChrome = {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta?: string;
  secondaryCta?: string;
  detailTitle?: string;
  faqItems?: { question: string; answer: string }[];
  seo?: SeoMeta;
};

function parseJson<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function localHubFallback(locale: Locale, kind: HubKind): HubPageChrome {
  const dict = getDictionaryLocal(locale);

  switch (kind) {
    case "services":
      return {
        eyebrow: dict.servicesPage.eyebrow,
        title: dict.servicesPage.title,
        lead: dict.servicesPage.lead,
        primaryCta: dict.servicesPage.primaryCta,
        secondaryCta: dict.servicesPage.secondaryCta,
        detailTitle: dict.servicesPage.detailTitle,
        faqItems: dict.servicesPage.faqItems,
      };
    case "boothTypes":
      return {
        eyebrow: dict.boothTypesPage.eyebrow,
        title: dict.boothTypesPage.title,
        lead: dict.boothTypesPage.lead,
      };
    case "work":
      return {
        eyebrow: dict.workPage.eyebrow,
        title: dict.workPage.title,
        lead: dict.workPage.lead,
      };
    case "industries":
      return { ...dict.industriesPage };
    case "locations":
      return { ...dict.locationsPage };
    case "news":
      return { ...dict.newsPage };
  }
}

/** Merge homePage singleton (hero + section JSON) onto dictionary chrome. */
export async function loadHomeDictionaryOverlay(
  locale: Locale,
): Promise<Partial<Dictionary>> {
  const remote = await sanityFetch<HomeDoc | null>({
    query: HOME_PAGE_QUERY,
    params: { locale },
    tags: ["homePage", `homePage-${locale}`],
  });
  if (!remote) return {};

  const sections = parseJson<Partial<Dictionary>>(remote.sections?.payload);
  const overlay: Partial<Dictionary> = { ...(sections ?? {}) };

  if (remote.hero) {
    overlay.hero = {
      badge: remote.hero.eyebrow,
      headline: remote.hero.title ?? "",
      support: remote.hero.lead ?? "",
      primaryCta: remote.hero.primaryCta ?? "",
      secondaryCta: remote.hero.secondaryCta ?? "",
    };
  }

  return overlay;
}

export async function loadHomeSeo(locale: Locale): Promise<SeoMeta | undefined> {
  const remote = await sanityFetch<HomeDoc | null>({
    query: HOME_PAGE_QUERY,
    params: { locale },
    tags: ["homePage", `homePage-${locale}`],
  });
  return toSeoMeta(remote?.seo);
}

export async function loadAboutPage(
  locale: Locale,
): Promise<Dictionary["aboutPage"]> {
  const local = getDictionaryLocal(locale).aboutPage;
  const remote = await sanityFetch<AboutDoc | null>({
    query: ABOUT_PAGE_QUERY,
    params: { locale },
    tags: ["aboutPageDoc", `aboutPageDoc-${locale}`],
  });
  if (!remote) return local;

  const storyParts = (remote.story ?? "").split(/\n\n+/).filter(Boolean);

  return {
    ...local,
    eyebrow: remote.eyebrow ?? local.eyebrow,
    title: remote.title ?? local.title,
    lead: remote.lead ?? local.lead,
    storyTitle: remote.storyTitle ?? local.storyTitle,
    story: storyParts[0] ?? remote.story ?? local.story,
    storySecond: storyParts[1] ?? local.storySecond,
    storyHeadline: local.storyHeadline,
    valuesTitle: remote.missionTitle ?? local.valuesTitle,
    valuesSupport: remote.mission ?? local.valuesSupport,
    values: remote.values?.length
      ? remote.values
          .filter((item) => item.title)
          .map((item) => ({
            title: item.title!,
            description: item.description ?? "",
          }))
      : local.values,
    studioTitle: remote.studioTitle ?? remote.visionTitle ?? local.studioTitle,
    studioSupport: remote.studioBody ?? remote.vision ?? local.studioSupport,
    studioItems: remote.process?.length
      ? remote.process
          .filter((item) => item.title)
          .map((item) => ({
            title: item.title!,
            description: item.description ?? "",
          }))
      : local.studioItems,
    faqItems: remote.faq?.length
      ? remote.faq
          .filter((item) => item.question)
          .map((item) => ({
            question: item.question!,
            answer: item.answer ?? "",
          }))
      : local.faqItems,
  };
}

export async function loadAboutSeo(locale: Locale): Promise<SeoMeta | undefined> {
  const remote = await sanityFetch<AboutDoc | null>({
    query: ABOUT_PAGE_QUERY,
    params: { locale },
    tags: ["aboutPageDoc", `aboutPageDoc-${locale}`],
  });
  return toSeoMeta(remote?.seo);
}

export async function loadContactPage(
  locale: Locale,
): Promise<Dictionary["contactPage"]> {
  const local = getDictionaryLocal(locale).contactPage;
  const remote = await sanityFetch<ContactDoc | null>({
    query: CONTACT_PAGE_QUERY,
    params: { locale },
    tags: ["contactPageDoc", `contactPageDoc-${locale}`],
  });
  if (!remote) return local;

  const fromBrief = parseJson<Dictionary["contactPage"]>(
    remote.briefForm?.payload,
  );

  return {
    ...local,
    ...(fromBrief ?? {}),
    eyebrow: remote.eyebrow ?? fromBrief?.eyebrow ?? local.eyebrow,
    title: remote.title ?? fromBrief?.title ?? local.title,
    lead: remote.lead ?? fromBrief?.lead ?? local.lead,
    info: {
      ...local.info,
      ...fromBrief?.info,
    },
    map: {
      ...local.map,
      ...fromBrief?.map,
      title: remote.officeTitle ?? fromBrief?.map?.title ?? local.map.title,
    },
  };
}

export async function loadContactSeo(
  locale: Locale,
): Promise<SeoMeta | undefined> {
  const remote = await sanityFetch<ContactDoc | null>({
    query: CONTACT_PAGE_QUERY,
    params: { locale },
    tags: ["contactPageDoc", `contactPageDoc-${locale}`],
  });
  return toSeoMeta(remote?.seo);
}

export async function loadHubPage(
  locale: Locale,
  kind: HubKind,
): Promise<HubPageChrome> {
  const local = localHubFallback(locale, kind);
  const remotes = await sanityFetch<HubDoc[]>({
    query: HUB_PAGES_QUERY,
    params: { locale },
    tags: ["hubPage", `hubPage-${locale}`],
  });
  const remote = remotes?.find((doc) => doc.kind === kind);
  if (!remote) return local;

  return {
    eyebrow: remote.eyebrow ?? local.eyebrow,
    title: remote.title ?? local.title,
    lead: remote.lead ?? local.lead,
    primaryCta: remote.primaryCta ?? local.primaryCta,
    secondaryCta: remote.secondaryCta ?? local.secondaryCta,
    detailTitle: remote.detailTitle ?? local.detailTitle,
    faqItems: remote.faq?.length
      ? remote.faq
          .filter((item) => item.question)
          .map((item) => ({
            question: item.question!,
            answer: item.answer ?? "",
          }))
      : local.faqItems,
    seo: toSeoMeta(remote.seo) ?? local.seo,
  };
}

/** Merge CMS hub chrome onto dictionary list-page sections. */
export async function loadHubDictionaryOverlay(
  locale: Locale,
): Promise<Partial<Dictionary>> {
  const [services, boothTypes, work, industries, locations, news] =
    await Promise.all([
      loadHubPage(locale, "services"),
      loadHubPage(locale, "boothTypes"),
      loadHubPage(locale, "work"),
      loadHubPage(locale, "industries"),
      loadHubPage(locale, "locations"),
      loadHubPage(locale, "news"),
    ]);

  return {
    servicesPage: {
      eyebrow: services.eyebrow,
      title: services.title,
      lead: services.lead,
      primaryCta: services.primaryCta ?? "",
      secondaryCta: services.secondaryCta ?? "",
      detailTitle: services.detailTitle ?? "",
      faqItems: services.faqItems ?? [],
    },
    boothTypesPage: {
      eyebrow: boothTypes.eyebrow,
      title: boothTypes.title,
      lead: boothTypes.lead,
    },
    workPage: {
      eyebrow: work.eyebrow,
      title: work.title,
      lead: work.lead,
    },
    industriesPage: {
      eyebrow: industries.eyebrow,
      title: industries.title,
      lead: industries.lead,
    },
    locationsPage: {
      eyebrow: locations.eyebrow,
      title: locations.title,
      lead: locations.lead,
    },
    newsPage: {
      eyebrow: news.eyebrow,
      title: news.title,
      lead: news.lead,
    },
  };
}
