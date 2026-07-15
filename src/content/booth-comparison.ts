export type BoothComparisonRow = {
  slug: string;
  label: { en: string; ar: string };
  indoor: boolean;
  outdoor: boolean;
  reusable: boolean;
  highCustomization: boolean;
  fastSetup: boolean;
};

/** Canonical comparison matrix — seeded into boothType docs and used as local fallback. */
export const BOOTH_COMPARISON_ROWS: BoothComparisonRow[] = [
  {
    slug: "custom",
    label: { en: "Custom-Built Booths", ar: "أجنحة مخصصة بالكامل" },
    indoor: true,
    outdoor: true,
    reusable: true,
    highCustomization: true,
    fastSetup: false,
  },
  {
    slug: "modular",
    label: { en: "Modular / System Booths", ar: "أجنحة معيارية / نظام" },
    indoor: true,
    outdoor: false,
    reusable: true,
    highCustomization: false,
    fastSetup: true,
  },
  {
    slug: "double-deck",
    label: { en: "Double-Deck Booths", ar: "أجنحة طابقين" },
    indoor: true,
    outdoor: false,
    reusable: true,
    highCustomization: true,
    fastSetup: false,
  },
  {
    slug: "portable",
    label: { en: "Portable & Pop-Up Displays", ar: "عروض محمولة و Pop-Up" },
    indoor: true,
    outdoor: true,
    reusable: true,
    highCustomization: false,
    fastSetup: true,
  },
  {
    slug: "kiosks",
    label: {
      en: "Kiosks & Small Footprint Stands",
      ar: "أكشاك ومساحات صغيرة",
    },
    indoor: true,
    outdoor: true,
    reusable: true,
    highCustomization: false,
    fastSetup: true,
  },
  {
    slug: "outdoor",
    label: {
      en: "Outdoor Structures & Activations",
      ar: "هياكل خارجية وتفعيلات",
    },
    indoor: false,
    outdoor: true,
    reusable: false,
    highCustomization: true,
    fastSetup: false,
  },
  {
    slug: "pavilions",
    label: {
      en: "Country / National Pavilions",
      ar: "أجنحة / أجنحة وطنية",
    },
    indoor: true,
    outdoor: false,
    reusable: true,
    highCustomization: true,
    fastSetup: false,
  },
  {
    slug: "sustainable",
    label: { en: "Sustainable / Eco Booths", ar: "أجنحة مستدامة / Eco" },
    indoor: true,
    outdoor: true,
    reusable: true,
    highCustomization: true,
    fastSetup: false,
  },
];

export const BOOTH_COMPARISON_COLUMNS = [
  { key: "indoor" as const, en: "Indoor", ar: "داخلي" },
  { key: "outdoor" as const, en: "Outdoor", ar: "خارجي" },
  { key: "reusable" as const, en: "Reusable", ar: "قابل لإعادة الاستخدام" },
  {
    key: "highCustomization" as const,
    en: "High Customization",
    ar: "تخصيص عالٍ",
  },
  { key: "fastSetup" as const, en: "Fast Setup", ar: "تركيب سريع" },
];

export function getBoothComparisonRow(slug: string) {
  return BOOTH_COMPARISON_ROWS.find((row) => row.slug === slug);
}
