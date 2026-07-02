import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { getSiteConfig } from "@/lib/site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/",
    locale: localeParam,
    fallbackTitle: `${getSiteConfig().name} — Coming Soon`,
    fallbackDescription: getSiteConfig().description,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const { comingSoon } = await getDictionary(locale);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="text-center">
        <h1 className="coming-soon-title text-white">{comingSoon.title}</h1>
        <p className="coming-soon-subtitle mt-8 sm:mt-10">{comingSoon.subtitle}</p>
      </div>
    </main>
  );
}
