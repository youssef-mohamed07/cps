import type { Locale } from "@/lib/i18n";

export type RegionKey = "central" | "qassim" | "eastern" | "western" | "southern" | "northern";

/** Display order and labels for Saudi regions used to group city links. */
export const regions: { key: RegionKey; en: string; ar: string }[] = [
  { key: "central", en: "Central Region", ar: "المنطقة الوسطى" },
  { key: "qassim", en: "Qassim", ar: "القصيم" },
  { key: "eastern", en: "Eastern Province", ar: "المنطقة الشرقية" },
  { key: "western", en: "Western Region", ar: "المنطقة الغربية" },
  { key: "southern", en: "Southern Region", ar: "المنطقة الجنوبية" },
  { key: "northern", en: "Northern Region", ar: "المنطقة الشمالية" },
];

export const cityRegion: Record<string, RegionKey> = {
  riyadh: "central",
  "al-kharj": "central",
  "al-qassim": "qassim",
  buraidah: "qassim",
  unaizah: "qassim",
  dammam: "eastern",
  khobar: "eastern",
  dhahran: "eastern",
  jubail: "eastern",
  qatif: "eastern",
  "al-ahsa": "eastern",
  jeddah: "western",
  makkah: "western",
  madinah: "western",
  taif: "western",
  yanbu: "western",
  alula: "western",
  abha: "southern",
  "khamis-mushait": "southern",
  "al-baha": "southern",
  jazan: "southern",
  hail: "northern",
  tabuk: "northern",
  neom: "northern",
};

export function regionLabel(key: RegionKey, locale: Locale) {
  const region = regions.find((item) => item.key === key);
  return region ? region[locale] : key;
}
