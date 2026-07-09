import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteChrome } from "@/components/layout/site-chrome";
import { BleedImage } from "@/components/media/bleed-image";
import {
  getLocalizedProject,
  getProject,
  projects,
} from "@/content/projects";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((project) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  const project = getProject(slug);
  if (!project) return {};
  await ensureSiteConfig();
  const localized = getLocalizedProject(project, localeParam);
  return buildPageMetadata({
    path: `/work/${slug}`,
    locale: localeParam,
    fallbackTitle: `CPS — ${localized.title}`,
    fallbackDescription: localized.summary,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const project = getProject(slug);
  if (!project) notFound();

  const dictionary = await resolveDictionary(locale);
  const labels = dictionary.projectPage;
  const localized = getLocalizedProject(project, locale);
  const currentIndex = projects.findIndex((entry) => entry.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const nextLocalized = getLocalizedProject(nextProject, locale);

  return (
    <SiteChrome locale={locale} dictionary={dictionary}>
      <section className="project-hero">
        <div className="site-container">
          <Link href={localizePath("/work", locale)} className="btn-secondary">
            {labels.back}
          </Link>
          <h1 className="display mt-8 max-w-[14ch]">{localized.title}</h1>
          <div className="project-meta">
            <span>{localized.category}</span>
            <span>{localized.year}</span>
          </div>
          <p className="lede mt-6 max-w-2xl">{localized.summary}</p>
        </div>
      </section>

      <div className="site-container mt-10 sm:mt-12">
        <BleedImage
          src={localized.image}
          alt={localized.imageAlt}
          className="media-bleed-wide"
          priority
        />
      </div>

      <section className="section-pad">
        <div className="site-container">
          <div className="project-story">
            <article>
              <p className="eyebrow">{labels.challenge}</p>
              <p className="mt-4 text-base leading-7 text-muted">{localized.challenge}</p>
            </article>
            <article>
              <p className="eyebrow">{labels.approach}</p>
              <p className="mt-4 text-base leading-7 text-muted">{localized.approach}</p>
            </article>
            <article>
              <p className="eyebrow">{labels.outcome}</p>
              <p className="mt-4 text-base leading-7 text-muted">{localized.outcome}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pb-[clamp(4.5rem,10vw,7rem)]">
        <div className="site-container">
          <p className="eyebrow">{labels.gallery}</p>
          <div className="gallery-grid mt-8">
            <BleedImage
              src={localized.gallery[0]}
              alt={`${localized.title} 01`}
              className="gallery-feature"
            />
            <BleedImage src={localized.gallery[1]} alt={`${localized.title} 02`} />
            <BleedImage src={localized.gallery[2]} alt={`${localized.title} 03`} />
          </div>
        </div>
      </section>

      <section className="section-rule section-pad">
        <div className="site-container">
          <p className="eyebrow">{labels.next}</p>
          <Link
            href={localizePath(`/work/${nextProject.slug}`, locale)}
            className="group mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end"
          >
            <div>
              <h2 className="display max-w-[12ch] transition group-hover:text-[#1f9fc8]">
                {nextLocalized.title}
              </h2>
              <p className="mt-4 text-muted">
                {nextLocalized.category} · {nextLocalized.year}
              </p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
              <Image
                src={nextLocalized.image}
                alt={nextLocalized.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
          </Link>
        </div>
      </section>
    </SiteChrome>
  );
}
