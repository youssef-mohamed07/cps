import type { Locale } from "@/lib/i18n";

export type ClientLogo = {
  name: string;
  src: string;
};

export const clientLogos: ClientLogo[] = [
  { name: "NEOM", src: "/clients/neom.svg" },
  { name: "stc", src: "/clients/stc.svg" },
  { name: "Aramco", src: "/clients/saudi-aramco.png" },
  { name: "mobily", src: "/clients/mobily.svg" },
  { name: "Riyad Bank", src: "/clients/riyad-bank.png" },
  { name: "Almarai", src: "/clients/almarai.svg" },
  { name: "Hikma", src: "/clients/hikma.svg" },
];

export function logosEyebrow(locale: Locale) {
  return locale === "ar" ? "عملاؤنا" : "Trusted by";
}
