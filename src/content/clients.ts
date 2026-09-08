import type { Locale } from "@/lib/i18n";

export type ClientLogo = {
  name: string;
  src: string;
};

/** Blueprint Trusted By list (confirm with client before publish). */
export const blueprintClientLogos: ClientLogo[] = [
  { name: "Ajlan & Bros", src: "/clients/ajlan-bros.svg" },
  { name: "SNB", src: "/clients/snb.svg" },
  { name: "SAB", src: "/clients/sab.svg" },
  { name: "Sirar by STC", src: "/clients/sirar.svg" },
  { name: "Al Hilal", src: "/clients/al-hilal.svg" },
];

/** Extra logos available locally for a fuller home marquee. */
export const supportingClientLogos: ClientLogo[] = [
  { name: "stc", src: "/clients/stc.svg" },
  { name: "NEOM", src: "/clients/neom.svg" },
  { name: "Aramco", src: "/clients/saudi-aramco.png" },
  { name: "mobily", src: "/clients/mobily.svg" },
  { name: "Riyad Bank", src: "/clients/riyad-bank.png" },
  { name: "Almarai", src: "/clients/almarai.svg" },
];

export const clientLogos: ClientLogo[] = [
  ...blueprintClientLogos,
  ...supportingClientLogos,
];

export function logosEyebrow(locale: Locale) {
  return locale === "ar" ? "يثقون بنا" : "Trusted by";
}

export function logosSupport(locale: Locale) {
  return locale === "ar"
    ? "مجموعة من العملاء الذين نفذت لهم CPS."
    : "A selection of clients CPS has produced for.";
}
