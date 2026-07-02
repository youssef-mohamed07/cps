import type { Locale } from "@/lib/i18n";

/** Merge Arabic overlays onto English base records. */
export function withLocaleOverlay<T>(
  base: T,
  locale: Locale,
  overlay: Partial<T> | undefined,
): T {
  if (locale !== "ar" || !overlay) return base;
  return { ...base, ...overlay };
}
