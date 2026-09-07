import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceArchitecturePage } from "@/components/sections/service-architecture-page";
import { getServiceArchitecture, localizeText, serviceArchitecture } from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, type Locale } from "@/lib/i18n";
import { loadProjects } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

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
  const service = getServiceArchitecture(serviceSlug);
  if (!service) notFound();
  const projects = await loadProjects(locale);
  return <><Breadcrumbs locale={locale} items={[{ label: locale === "ar" ? "الرئيسية" : "Home", href: "/" }, { label: locale === "ar" ? "الخدمات" : "Services", href: "/services" }, { label: localizeText(service.title, locale) }]} /><ServiceArchitecturePage locale={locale} service={service} projects={projects} /></>;
}

