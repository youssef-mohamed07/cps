import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadNews } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const title = localeParam === "ar" ? "رؤى" : "Insights";
  const description =
    localeParam === "ar"
      ? "مقالات ورؤى حول تصميم وإنتاج أجنحة المعارض."
      : "Articles and insights on exhibition booth design and production.";
  return buildPageMetadata({
    path: "/news",
    locale: localeParam,
    fallbackTitle: `CPS — ${title}`,
    fallbackDescription: description,
  });
}

export default async function NewsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const articles = await loadNews(locale);
  const title = locale === "ar" ? "رؤى" : "Insights";
  const lead =
    locale === "ar"
      ? "أفكار عملية من أرض المعارض وورشة الإنتاج."
      : "Practical thinking from the show floor and the production floor.";
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: title },
          ]}
        />
        <PageHero
          eyebrow={locale === "ar" ? "المدونة" : "News"}
          title={title}
          lead={lead}
        />
        <section className="section-pad">
          <div className="site-container grid gap-10 md:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={localizePath(`/news/${article.slug}`, locale)}
                className="group grid gap-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted">
                    {article.category}
                    {article.publishedAt
                      ? ` · ${new Date(article.publishedAt).toLocaleDateString(locale)}`
                      : ""}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{article.title}</h2>
                  <p className="mt-3 text-base leading-7 text-muted">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
    </>
  );
}
