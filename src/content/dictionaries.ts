export type { Dictionary } from "./dictionaries.local";

import type { Locale } from "@/lib/i18n";
import { cache } from "react";
import { sanityFetch } from "@/sanity/fetch";
import { DICTIONARY_QUERY } from "@/sanity/queries";
import { toDictionary } from "@/sanity/transformers";
import type { Dictionary } from "./dictionaries.local";
import { getDictionaryLocal } from "./dictionaries.local";

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return getDictionaryCached(locale);
}

const getDictionaryCached = cache(async (locale: Locale): Promise<Dictionary> => {
  const data = await sanityFetch<Parameters<typeof toDictionary>[0]>({
    query: DICTIONARY_QUERY,
    params: { locale },
    tags: ["dictionary", `dictionary-${locale}`],
  });

  const dictionary = toDictionary(data, locale);
  if (dictionary) return dictionary;

  return getDictionaryLocal(locale);
});

export { getDictionaryLocal } from "./dictionaries.local";
