export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) {
    const rest = `/${segments.slice(1).join("/")}`;
    return rest === "/" ? "/" : rest;
  }
  return pathname || "/";
}

export function localizePath(path: string, locale: Locale): string {
  if (!path || path === "/") return `/${locale}`;

  if (path.startsWith("#")) return `/${locale}${path}`;
  if (path.startsWith("/#")) return `/${locale}${path.slice(1)}`;

  const normalized = stripLocale(path.startsWith("/") ? path : `/${path}`);
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  // Separate the hash fragment before locale-stripping so "#contact" in
  // "/ar#contact" doesn't get fused with the locale segment.
  const hashIndex = pathname.indexOf("#");
  const hash = hashIndex !== -1 ? pathname.slice(hashIndex) : "";
  const path = hashIndex !== -1 ? pathname.slice(0, hashIndex) : pathname;
  return localizePath(stripLocale(path), locale) + hash;
}
