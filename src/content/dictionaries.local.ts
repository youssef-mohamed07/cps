import type { Locale } from "@/lib/i18n";

export interface ComingSoonContent {
  title: string;
  subtitle: string;
}

export interface Dictionary {
  comingSoon: ComingSoonContent;
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    comingSoon: {
      title: "CPS",
      subtitle: "COMING SOON",
    },
  },
  ar: {
    comingSoon: {
      title: "CPS",
      subtitle: "قريباً",
    },
  },
};

export function getDictionaryLocal(locale: Locale): Dictionary {
  return dictionaries[locale];
}
