import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { creativeWorkJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import {
  ProjectDetailSections,
  type ProjectDetailItem,
} from "@/components/sections/project-detail-sections";
import { projects } from "@/content/projects";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
  loadIndustries,
  loadLocations,
  loadProject,
  loadProjects,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function toDetailItem(
  project: Awaited<ReturnType<typeof loadProject>>,
  labels: {
    industry?: string;
    boothType?: string;
    location?: string;
  } = {},
): ProjectDetailItem | null {
  if (!project) return null;
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    category: project.category ?? "",
    year: project.year,
    challenge: project.challenge,
    solution: project.solution,
    result: project.result,
    image: project.image,
    imageAlt: project.imageAlt,
    gallery: project.gallery,
    event: project.event,
    size: project.size,
    technologies: project.technologies,
    industryLabel: labels.industry,
    boothTypeLabel: labels.boothType,
    locationLabel: labels.location,
  };
}

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
  const [project, dictionary, allProjects, boothTypes, industries, locations] =
    await Promise.all([
      loadProject(locale, slug),
      resolveDictionary(locale),
      loadProjects(locale),
      loadBoothTypes(locale),
      loadIndustries(locale),
      loadLocations(locale),
    ]);

  if (!project) notFound();

  const labels = dictionary.projectPage;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  const detail = toDetailItem(project, {
    industry: industries.find((item) => item.slug === project.industrySlug)?.title,
    boothType: boothTypes.find((item) => item.slug === project.boothTypeSlug)?.title,
    location: locations.find((item) => item.slug === project.locationSlug)?.title,
  })!;

  const currentIndex = allProjects.findIndex((entry) => entry.slug === slug);
  const nextSource =
    allProjects[(currentIndex + 1) % allProjects.length] ?? allProjects[0];
  const nextProject =
    nextSource && nextSource.slug !== slug
      ? toDetailItem(nextSource, {
          industry: industries.find((item) => item.slug === nextSource.industrySlug)
            ?.title,
          boothType: boothTypes.find((item) => item.slug === nextSource.boothTypeSlug)
            ?.title,
          location: locations.find((item) => item.slug === nextSource.locationSlug)
            ?.title,
        })
      : null;

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

      <PageHero
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
        image={project.image}
        imageAlt={project.imageAlt}
        meta={[project.year, project.event, project.size].filter(Boolean).join(" · ")}
        cta={{
          label: dictionary.nav.cta,
          href: localizePath("/contact", locale),
        }}
      />

      <ProjectDetailSections
        locale={locale}
        project={detail}
        labels={labels}
        nextProject={nextProject}
      />
    </>
  );
}
