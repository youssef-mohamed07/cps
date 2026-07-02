import type { Locale } from "@/lib/i18n";
import { isSanityConfigured } from "@/sanity/env";

export async function withSanityFallback<T>(
  fetcher: () => Promise<T | null | undefined>,
  fallback: () => T,
): Promise<T> {
  if (!isSanityConfigured()) {
    return fallback();
  }

  try {
    const result = await fetcher();
    if (result === null || result === undefined) {
      return fallback();
    }

    if (Array.isArray(result) && result.length === 0) {
      return fallback();
    }

    return result;
  } catch {
    return fallback();
  }
}

export function cacheKey(locale: Locale, suffix: string): string {
  return `${locale}:${suffix}`;
}
