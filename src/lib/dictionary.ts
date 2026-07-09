import { getDictionary, getDictionaryLocal } from "@/content/dictionaries";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";

/** Merge remote CMS copy onto local defaults so pages never lose required fields. */
export async function resolveDictionary(locale: Locale): Promise<Dictionary> {
  const local = getDictionaryLocal(locale);
  const remote = await getDictionary(locale);

  return {
    ...local,
    ...remote,
    nav: { ...local.nav, ...remote.nav },
    hero: { ...local.hero, ...remote.hero },
    about: { ...local.about, ...remote.about },
    aboutPage: { ...local.aboutPage, ...remote.aboutPage },
    services: {
      ...local.services,
      ...remote.services,
      items: remote.services?.items?.length ? remote.services.items : local.services.items,
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
    contactPage: { ...local.contactPage, ...remote.contactPage },
    footer: { ...local.footer, ...remote.footer },
  };
}
