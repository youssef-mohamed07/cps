import { getDictionary, getDictionaryLocal } from "@/content/dictionaries";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";
import { resolveNavigation } from "@/lib/navigation";
import {
  loadAboutPage,
  loadContactPage,
  loadHomeDictionaryOverlay,
  loadHubDictionaryOverlay,
} from "@/sanity/load-pages";

function mergeSection<T extends Record<string, unknown>>(
  local: T,
  remote: Partial<T> | undefined,
  itemsKey?: keyof T,
): T {
  const merged = { ...local, ...(remote ?? {}) } as T;
  if (itemsKey && Array.isArray(local[itemsKey])) {
    const remoteItems = remote?.[itemsKey];
    if (!Array.isArray(remoteItems) || remoteItems.length === 0) {
      merged[itemsKey] = local[itemsKey];
    }
  }
  return merged;
}

/** Merge remote CMS copy onto local defaults so pages never lose required fields. */
export async function resolveDictionary(locale: Locale): Promise<Dictionary> {
  const local = getDictionaryLocal(locale);
  const [remote, navigation, homeOverlay, hubOverlay, aboutPage, contactPage] =
    await Promise.all([
      getDictionary(locale),
      resolveNavigation(locale),
      loadHomeDictionaryOverlay(locale),
      loadHubDictionaryOverlay(locale),
      loadAboutPage(locale),
      loadContactPage(locale),
    ]);

  const sectionSource = { ...remote, ...homeOverlay, ...hubOverlay };

  return {
    ...local,
    ...remote,
    ...homeOverlay,
    nav: {
      ...local.nav,
      ...remote.nav,
      items: navigation.items.map((item) => ({
        label: item.label,
        href: item.href,
      })),
      cta: navigation.cta.label,
      langLabel: navigation.langLabel,
      langHrefLocale: navigation.langHrefLocale,
    },
    hero: {
      ...local.hero,
      ...remote.hero,
      ...homeOverlay.hero,
    },
    lifecycle: mergeSection(
      local.lifecycle,
      sectionSource.lifecycle,
      "items",
    ),
    stats: mergeSection(local.stats, sectionSource.stats, "items"),
    clients: mergeSection(local.clients, sectionSource.clients, "items"),
    about: { ...local.about, ...sectionSource.about },
    aboutPage: {
      ...aboutPage,
      industriesItems: remote.aboutPage?.industriesItems?.length
        ? remote.aboutPage.industriesItems
        : aboutPage.industriesItems,
    },
    services: mergeSection(local.services, sectionSource.services, "items"),
    boothTypes: mergeSection(
      local.boothTypes,
      sectionSource.boothTypes,
      "items",
    ),
    boothTypesPage: {
      ...local.boothTypesPage,
      ...remote.boothTypesPage,
      ...hubOverlay.boothTypesPage,
    },
    whyCps: {
      ...local.whyCps,
      ...sectionSource.whyCps,
      primary: {
        ...local.whyCps.primary,
        ...sectionSource.whyCps?.primary,
      },
      secondary: {
        ...local.whyCps.secondary,
        ...sectionSource.whyCps?.secondary,
      },
      images: {
        ...local.whyCps.images,
        ...sectionSource.whyCps?.images,
      },
    },
    beforeAfter: {
      ...local.beforeAfter,
      ...sectionSource.beforeAfter,
      beforeItems: sectionSource.beforeAfter?.beforeItems?.length
        ? sectionSource.beforeAfter.beforeItems
        : local.beforeAfter.beforeItems,
      afterItems: sectionSource.beforeAfter?.afterItems?.length
        ? sectionSource.beforeAfter.afterItems
        : local.beforeAfter.afterItems,
    },
    faq: mergeSection(local.faq, sectionSource.faq, "items"),
    servicesPage: {
      ...local.servicesPage,
      ...remote.servicesPage,
      ...hubOverlay.servicesPage,
      faqItems: hubOverlay.servicesPage?.faqItems?.length
        ? hubOverlay.servicesPage.faqItems
        : remote.servicesPage?.faqItems?.length
          ? remote.servicesPage.faqItems
          : local.servicesPage.faqItems,
    },
    process: {
      ...local.process,
      ...sectionSource.process,
      steps: sectionSource.process?.steps?.length
        ? sectionSource.process.steps
        : local.process.steps,
    },
    work: {
      ...local.work,
      ...sectionSource.work,
      items: sectionSource.work?.items?.length
        ? sectionSource.work.items
        : local.work.items,
      viewAll: sectionSource.work?.viewAll ?? local.work.viewAll,
    },
    workPage: {
      ...local.workPage,
      ...remote.workPage,
      ...hubOverlay.workPage,
    },
    industriesPage: {
      ...local.industriesPage,
      ...remote.industriesPage,
      ...hubOverlay.industriesPage,
    },
    locationsPage: {
      ...local.locationsPage,
      ...remote.locationsPage,
      ...hubOverlay.locationsPage,
    },
    newsPage: {
      ...local.newsPage,
      ...remote.newsPage,
      ...hubOverlay.newsPage,
    },
    projectPage: { ...local.projectPage, ...remote.projectPage },
    contact: { ...local.contact, ...sectionSource.contact },
    briefForm: {
      ...local.briefForm,
      ...sectionSource.briefForm,
    },
    contactPage,
    footer: {
      ...local.footer,
      ...remote.footer,
      locations: remote.footer?.locations?.length
        ? remote.footer.locations
        : local.footer.locations,
    },
  };
}
