import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
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
          image={articles[0]?.image}
          imageAlt={articles[0]?.imageAlt}
          cta={{
            label: locale === "ar" ? "ابدأ مشروعك" : "Start your project",
            href: "#news-brief",
          }}
        />
        <CollectionGrid
          eyebrow={locale === "ar" ? "من أرض المعرض" : "From the show floor"}
          title={locale === "ar" ? "أفكار عملية لمساحات أقوى" : "Practical ideas for more powerful spaces"}
          ctaLabel={locale === "ar" ? "اقرأ المقال" : "Read article"}
          items={articles.map((article) => ({
            href: localizePath(`/news/${article.slug}`, locale),
            title: article.title,
            excerpt: article.excerpt,
            image: article.image,
            imageAlt: article.imageAlt,
            meta: `${article.category}${article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString(locale)}` : ""}`,
          }))}
        />
        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace="news"
        />
    </>
  );
}
