import Link from "next/link";
import { headers } from "next/headers";
import { getDictionaryLocal } from "@/content/dictionaries.local";
import {
  defaultLocale,
  getLocaleFromPathname,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { sanityFetch } from "@/sanity/fetch";
import { NOT_FOUND_QUERY } from "@/sanity/queries";

async function resolveLocale(): Promise<Locale> {
  const headerStore = await headers();
  const fromHeader = headerStore.get("x-site-locale");
  if (fromHeader && isLocale(fromHeader)) return fromHeader;

  const referer = headerStore.get("referer");
  if (referer) {
    try {
      const pathname = new URL(referer).pathname;
      return getLocaleFromPathname(pathname);
    } catch {
      /* ignore invalid referer */
    }
  }

  return defaultLocale;
}

export async function generateMetadata() {
  const locale = await resolveLocale();
  const cms = await sanityFetch<{ title?: string; description?: string }>({
    query: NOT_FOUND_QUERY,
    params: { locale },
    tags: ["notFoundPage", `notFoundPage-${locale}`],
  });

  return buildMetadata({
    title: cms?.title ?? "Page not found",
    description: cms?.description ?? "The page you requested could not be found.",
    path: "/404",
    locale,
    noIndex: true,
  });
}

export default async function NotFound() {
  const locale = await resolveLocale();
  const cms = await sanityFetch<{
    headline?: string;
    body?: string;
    ctaLabel?: string;
    ctaHref?: string;
  }>({
    query: NOT_FOUND_QUERY,
    params: { locale },
    tags: ["notFoundPage", `notFoundPage-${locale}`],
  });

  const headline = cms?.headline ?? (locale === "ar" ? "الصفحة غير موجودة" : "Page not found");
  const body =
    cms?.body ??
    (locale === "ar"
      ? "قد تكون الصفحة التي تبحث عنها قد نُقلت أو لم تعد متاحة."
      : "The page you are looking for may have moved or no longer exists.");
  const ctaLabel = cms?.ctaLabel ?? (locale === "ar" ? "العودة للرئيسية" : "Back to home");
  const ctaHref = cms?.ctaHref ?? localizePath("/", locale);

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6 text-center"
      lang={locale}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">404</p>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{headline}</h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-white/70">{body}</p>
        <Link
          href={ctaHref}
          className="mt-8 inline-flex text-sm font-semibold text-accent hover:underline"
        >
          {ctaLabel}
        </Link>
      </div>
    </main>
  );
}
