import { getDictionaryLocal, type Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/fetch";

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

type HomeDoc = {
  hero?: {
    eyebrow?: string;
    title?: string;
    lead?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
  sections?: { payload?: string };
};

type AboutDoc = {
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

type ContactDoc = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  officeTitle?: string;
  businessHours?: string;
  briefForm?: { payload?: string };
};

function parseJson<T>(raw: string | undefined): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
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
