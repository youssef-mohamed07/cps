import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceArchitecturePage } from "@/components/sections/service-architecture-page";
import { getServiceArchitecture, localizeText, serviceArchitecture, type LocalizedText } from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { loadProjects, loadService } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { loadProjectLaunch } from "@/sanity/load-pages";

type PageProps = { params: Promise<{ locale: string; serviceSlug: string }> };

export function generateStaticParams() {
  return serviceArchitecture.flatMap((service) => (["en", "ar"] as const).map((locale) => ({ locale, serviceSlug: service.slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: value, serviceSlug } = await params;
  if (!isLocale(value)) return {};
  const service = getServiceArchitecture(serviceSlug);
  if (!service) return {};
  await ensureSiteConfig();
  return buildPageMetadata({ path: `/services/${serviceSlug}`, locale: value, fallbackTitle: `CPS — ${localizeText(service.title, value)}`, fallbackDescription: localizeText(service.excerpt, value), fallbackOgImage: service.image });
}

export default async function ServicePage({ params }: PageProps) {
  const { locale: value, serviceSlug } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const localService = getServiceArchitecture(serviceSlug);
  const [cmsService, projectLaunch] = await Promise.all([
    loadService(locale, serviceSlug),
    loadProjectLaunch(locale),
  ]);
  const cmsCopyReady = cmsService?.blueprintVersion === 5;
  const overlayText = (fallback: LocalizedText, next?: string): LocalizedText =>
    next ? { ...fallback, [locale]: next } : fallback;
  const service = localService
    ? {
        ...localService,
        ...(cmsService?.image ? { image: cmsService.image } : {}),
        ...(cmsCopyReady && cmsService?.title
          ? { title: { ...localService.title, [locale]: cmsService.title } }
          : {}),
        ...(cmsCopyReady && cmsService?.excerpt
          ? { excerpt: { ...localService.excerpt, [locale]: cmsService.excerpt } }
          : {}),
        hero: {
          ...localService.hero,
          headline: overlayText(
            localService.hero.headline,
            cmsCopyReady ? cmsService?.overviewTitle : undefined,
          ),
          bullets: cmsCopyReady && cmsService?.overviewBullets?.length
            ? cmsService.overviewBullets.map((item, index) =>
                overlayText(
                  localService.hero.bullets[index] ?? { en: "", ar: "" },
                  item.title || item.description,
                ),
              )
            : localService.hero.bullets,
          ...(cmsCopyReady && cmsService?.heroLead
            ? { support: { ...localService.hero.support, [locale]: cmsService.heroLead } }
            : {}),
        },
        showcase: cmsCopyReady && cmsService?.designs?.items.length
          ? {
              title: overlayText(localService.showcase.title, cmsService.designs.title),
              items: cmsService.designs.items.map((item, index) => ({
                title: overlayText(
                  localService.showcase.items[index]?.title ?? { en: "", ar: "" },
                  item.title,
                ),
                description: overlayText(
                  localService.showcase.items[index]?.description ?? { en: "", ar: "" },
                  item.description,
                ),
              })),
            }
          : localService.showcase,
        why: cmsCopyReady && cmsService?.why?.items.length
          ? {
              headline: overlayText(localService.why.headline, cmsService.why.title),
              support: overlayText(localService.why.support, cmsService.why.support),
              items: cmsService.why.items.map((item, index) =>
                overlayText(
                  localService.why.items[index] ?? { en: "", ar: "" },
                  item.title || item.description,
                ),
              ),
            }
          : localService.why,
        benefits: cmsCopyReady && cmsService?.benefits.length
          ? cmsService.benefits.map((item, index) =>
              overlayText(
                localService.benefits[index] ?? { en: "", ar: "" },
                item.title || item.description,
              ),
            )
          : localService.benefits,
        ...(cmsCopyReady && cmsService?.faq?.length
          ? {
              faq: cmsService.faq.map((item, index) => ({
                question: overlayText(
                  localService.faq[index]?.question ?? { en: "", ar: "" },
                  item.question,
                ),
                answer: overlayText(
                  localService.faq[index]?.answer ?? { en: "", ar: "" },
                  item.answer,
                ),
              })),
            }
          : {}),
      }
    : null;
  if (!service) notFound();
  const projects = await loadProjects(locale);
  return <><Breadcrumbs locale={locale} items={[{ label: locale === "ar" ? "الرئيسية" : "Home", href: "/" }, { label: locale === "ar" ? "الخدمات" : "Services", href: "/services" }, { label: localizeText(service.title, locale) }]} /><ServiceArchitecturePage locale={locale} service={service} projects={projects} projectLaunch={projectLaunch} /></>;
}
