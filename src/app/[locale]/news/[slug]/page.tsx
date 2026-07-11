import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { articleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { newsArticles } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadNewsArticle } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return newsArticles.flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const article = await loadNewsArticle(localeParam, slug);
  if (!article) return {};
  return buildPageMetadata({
    path: `/news/${slug}`,
    locale: localeParam,
    seo: article.seo,
    fallbackTitle: `CPS — ${article.title}`,
    fallbackDescription: article.excerpt,
    fallbackOgImage: article.image,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const article = await loadNewsArticle(locale, slug);
  if (!article) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "رؤى" : "Insights";

  return (
    <>
        <JsonLd
          data={articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/news/${slug}`,
            locale,
            image: article.image,
            datePublished: article.publishedAt,
            author: article.author,
          })}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: hubLabel, href: "/news" },
            { label: article.title },
          ]}
        />
        <PageHero title={article.title} lead={article.excerpt} />

        <div className="site-container">
          <p className="text-sm text-muted">
            {article.author}
            {article.publishedAt
              ? ` · ${new Date(article.publishedAt).toLocaleDateString(locale)}`
              : ""}
            {` · ${article.readingTime} ${locale === "ar" ? "دقيقة قراءة" : "min read"}`}
          </p>
        </div>

        {article.image ? (
          <div className="site-container mt-8">
            <BleedImage
              src={article.image}
              alt={article.imageAlt}
              className="media-bleed-wide"
              priority
            />
          </div>
        ) : null}

        <section className="section-pad">
          <div className="site-container max-w-3xl grid gap-6">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="section-pad">
          <div className="site-container">
            <Link href={localizePath("/news", locale)} className="btn-secondary">
              {locale === "ar" ? "العودة إلى الرؤى" : "Back to insights"}
            </Link>
          </div>
        </section>
    </>
  );
}
