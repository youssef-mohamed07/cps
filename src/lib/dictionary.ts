import { getDictionary, getDictionaryLocal } from "@/content/dictionaries";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";
import { resolveNavigation } from "@/lib/navigation";

/** Merge remote CMS copy onto local defaults so pages never lose required fields. */
export async function resolveDictionary(locale: Locale): Promise<Dictionary> {
  const local = getDictionaryLocal(locale);
  const remote = await getDictionary(locale);
  const navigation = await resolveNavigation(locale);

  return {
    ...local,
    ...remote,
    nav: {
      ...local.nav,
      ...remote.nav,
      items: navigation.items.map((item) => ({ label: item.label, href: item.href })),
      cta: navigation.cta.label,
      langLabel: navigation.langLabel,
      langHrefLocale: navigation.langHrefLocale,
    },
    hero: { ...local.hero, ...remote.hero },
    lifecycle: {
      ...local.lifecycle,
      ...remote.lifecycle,
      items: remote.lifecycle?.items?.length ? remote.lifecycle.items : local.lifecycle.items,
    },
    stats: {
      ...local.stats,
      ...remote.stats,
      items: remote.stats?.items?.length ? remote.stats.items : local.stats.items,
    },
    clients: {
      ...local.clients,
      ...remote.clients,
      items: remote.clients?.items?.length ? remote.clients.items : local.clients.items,
    },
    about: { ...local.about, ...remote.about },
    aboutPage: { ...local.aboutPage, ...remote.aboutPage },
    services: {
      ...local.services,
      ...remote.services,
      items: remote.services?.items?.length ? remote.services.items : local.services.items,
    },
    boothTypes: {
      ...local.boothTypes,
      ...remote.boothTypes,
      items: remote.boothTypes?.items?.length ? remote.boothTypes.items : local.boothTypes.items,
    },
    boothTypesPage: { ...local.boothTypesPage, ...remote.boothTypesPage },
    whyCps: {
      ...local.whyCps,
      ...remote.whyCps,
      primary: { ...local.whyCps.primary, ...remote.whyCps?.primary },
      secondary: { ...local.whyCps.secondary, ...remote.whyCps?.secondary },
      images: { ...local.whyCps.images, ...remote.whyCps?.images },
    },
    beforeAfter: {
      ...local.beforeAfter,
      ...remote.beforeAfter,
      beforeItems: remote.beforeAfter?.beforeItems?.length
        ? remote.beforeAfter.beforeItems
        : local.beforeAfter.beforeItems,
      afterItems: remote.beforeAfter?.afterItems?.length
        ? remote.beforeAfter.afterItems
        : local.beforeAfter.afterItems,
    },
    faq: {
      ...local.faq,
      ...remote.faq,
      items: remote.faq?.items?.length ? remote.faq.items : local.faq.items,
    },
    servicesPage: { ...local.servicesPage, ...remote.servicesPage },
    process: {
      ...local.process,
      ...remote.process,
      steps: remote.process?.steps?.length ? remote.process.steps : local.process.steps,
    },
    work: {
      ...local.work,
      ...remote.work,
      items: remote.work?.items?.length ? remote.work.items : local.work.items,
      viewAll: remote.work?.viewAll ?? local.work.viewAll,
    },
    workPage: { ...local.workPage, ...remote.workPage },
    projectPage: { ...local.projectPage, ...remote.projectPage },
    contact: { ...local.contact, ...remote.contact },
    briefForm: { ...local.briefForm, ...remote.briefForm },
    contactPage: { ...local.contactPage, ...remote.contactPage },
    footer: {
      ...local.footer,
      ...remote.footer,
      locations: remote.footer?.locations?.length
        ? remote.footer.locations
        : local.footer.locations,
    },
  };
}
