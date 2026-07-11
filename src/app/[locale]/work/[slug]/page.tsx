import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BleedImage } from "@/components/media/bleed-image";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { creativeWorkJsonLd, JsonLd } from "@/components/seo/json-ld";
import { projects } from "@/content/projects";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadProject, loadProjects } from "@/sanity/load-collections";
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
  await ensureSiteConfig();
  const project = await loadProject(localeParam, slug);
  if (!project) return {};
  return buildPageMetadata({
    path: `/work/${slug}`,
    locale: localeParam,
    seo: project.seo,
    fallbackTitle: `CPS — ${project.title}`,
    fallbackDescription: project.summary,
    fallbackOgImage: project.image,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const project = await loadProject(locale, slug);
  if (!project) notFound();

  const dictionary = await resolveDictionary(locale);
  const labels = dictionary.projectPage;
  const allProjects = await loadProjects(locale);
  const currentIndex = allProjects.findIndex((entry) => entry.slug === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length] ?? allProjects[0];
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
        <JsonLd
          data={creativeWorkJsonLd({
            name: project.title,
            description: project.summary,
            path: `/work/${slug}`,
            locale,
            image: project.image,
            dateCreated: project.year,
          })}
        />

        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: dictionary.workPage.title, href: "/work" },
            { label: project.title },
          ]}
        />

        <section className="project-hero">
          <div className="site-container">
            <Link href={localizePath("/work", locale)} className="btn-secondary">
              {labels.back}
            </Link>
            <h1 className="display mt-8 max-w-[14ch]">{project.title}</h1>
            <div className="project-meta">
              <span>{project.category}</span>
              <span>{project.year}</span>
              {project.event ? <span>{project.event}</span> : null}
              {project.size ? <span>{project.size}</span> : null}
            </div>
            <p className="lede mt-6 max-w-2xl">{project.summary}</p>
          </div>
        </section>

        <div className="site-container mt-10 sm:mt-12">
          <BleedImage
            src={project.image}
            alt={project.imageAlt}
            className="media-bleed-wide"
            priority
          />
        </div>

        <section className="section-pad">
          <div className="site-container">
            <div className="project-story">
              <article>
                <p className="eyebrow">{labels.challenge}</p>
                <p className="mt-4 text-base leading-7 text-muted">{project.challenge}</p>
              </article>
              <article>
                <p className="eyebrow">{labels.approach}</p>
                <p className="mt-4 text-base leading-7 text-muted">{project.solution}</p>
              </article>
              <article>
                <p className="eyebrow">{labels.outcome}</p>
                <p className="mt-4 text-base leading-7 text-muted">{project.result}</p>
              </article>
            </div>
          </div>
        </section>

        {project.gallery.length >= 3 ? (
          <section className="pb-[clamp(4.5rem,10vw,7rem)]">
            <div className="site-container">
              <p className="eyebrow">{labels.gallery}</p>
              <div className="gallery-grid mt-8">
                <BleedImage
                  src={project.gallery[0]}
                  alt={`${project.title} 01`}
                  className="gallery-feature"
                />
                <BleedImage src={project.gallery[1]} alt={`${project.title} 02`} />
                <BleedImage src={project.gallery[2]} alt={`${project.title} 03`} />
              </div>
            </div>
          </section>
        ) : null}

        {nextProject ? (
          <section className="section-rule section-pad">
            <div className="site-container">
              <p className="eyebrow">{labels.next}</p>
              <Link
                href={localizePath(`/work/${nextProject.slug}`, locale)}
                className="group mt-8 grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end"
              >
                <div>
                  <h2 className="display max-w-[12ch] transition group-hover:text-[#1f9fc8]">
                    {nextProject.title}
                  </h2>
                  <p className="mt-4 text-muted">
                    {nextProject.category} · {nextProject.year}
                  </p>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#d9e2e8]">
                  <Image
                    src={nextProject.image}
                    alt={nextProject.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </div>
          </section>
        ) : null}
    </>
  );
}
