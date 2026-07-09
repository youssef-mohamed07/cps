import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { PageHero } from "@/components/sections/page-hero";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const dictionary = await resolveDictionary(localeParam);
  return buildPageMetadata({
    path: "/work",
    locale: localeParam,
    fallbackTitle: `CPS — ${dictionary.workPage.title}`,
    fallbackDescription: dictionary.workPage.lead,
  });
}

export default async function WorkPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const page = dictionary.workPage;

  return (
    <SiteChrome locale={locale} dictionary={dictionary}>
      <PageHero eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="pb-[clamp(4.5rem,10vw,7rem)]">
        <div className="site-container work-index">
          {dictionary.work.items.map((item) => (
            <Link
              key={item.slug}
              href={localizePath(`/work/${item.slug}`, locale)}
              className="work-index-item group"
            >
              <div className="work-index-media">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="work-index-copy">
                <p className="text-sm text-muted">
                  {item.category} · {item.year}
                </p>
                <h2 className="mt-3">{item.title}</h2>
                <p>{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteChrome>
  );
}
