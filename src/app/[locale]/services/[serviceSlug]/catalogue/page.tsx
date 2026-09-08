import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CatalogueBrowser } from "@/components/sections/catalogue-browser";
import { PageHero } from "@/components/sections/page-hero";
import { getServiceArchitecture, localizeText, serviceArchitecture, servicePath } from "@/content/service-architecture";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; serviceSlug: string }>;
  searchParams: Promise<{ item?: string | string[]; city?: string | string[] }>;
};
const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
export function generateStaticParams() { return serviceArchitecture.flatMap((service) => (["en", "ar"] as const).map((locale) => ({ locale, serviceSlug: service.slug }))); }
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> { const { locale, serviceSlug } = await params; if (!isLocale(locale)) return {}; const service = getServiceArchitecture(serviceSlug); if (!service) return {}; const query = await searchParams; const itemSlug = first(query.item); const citySlug = first(query.city); const cityAnchor = service.catalogue.categories.flatMap((category) => category.items).find((item) => item.slug === itemSlug)?.cityAnchors?.find((city) => city.slug === citySlug); await ensureSiteConfig(); return buildPageMetadata({ path: `/services/${serviceSlug}/catalogue`, locale, fallbackTitle: cityAnchor ? `CPS — ${localizeText(cityAnchor.seoTitle, locale)}` : `CPS — ${localizeText(service.catalogue.title, locale)}`, fallbackDescription: cityAnchor ? localizeText(cityAnchor.seoDescription, locale) : localizeText(service.catalogue.support, locale), fallbackOgImage: service.image }); }
export default async function CataloguePage({ params, searchParams }: PageProps) {
  const { locale: value, serviceSlug } = await params;
  const query = await searchParams;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const service = getServiceArchitecture(serviceSlug);
  if (!service) notFound();
  return <><Breadcrumbs locale={locale} items={[{ label: locale === "ar" ? "الرئيسية" : "Home", href: "/" }, { label: locale === "ar" ? "الخدمات" : "Services", href: "/services" }, { label: localizeText(service.title, locale), href: servicePath(service.slug) }, { label: localizeText(service.catalogue.title, locale) }]} /><PageHero eyebrow={localizeText(service.title, locale)} title={localizeText(service.catalogue.title, locale)} lead={localizeText(service.catalogue.support, locale)} image={service.image} imageAlt={localizeText(service.title, locale)} cta={{ label: locale === "ar" ? "ابدأ مشروعاً" : "Start a Project", href: localizePath(`${servicePath(service.slug)}#quote`, locale) }} /><section className="catalogue-section section-pad"><div className="site-container"><CatalogueBrowser locale={locale} serviceSlug={service.slug} serviceImage={service.image} categories={service.catalogue.categories} layoutFilters={service.catalogue.layoutFilters} searchable={service.catalogue.searchable} highlightedItem={first(query.item)} selectedCity={first(query.city)} /><div className="catalogue-bottom"><h2>{locale === "ar" ? "لم تجد ما تحتاجه بالضبط؟ اطلب عرض سعر." : "Don't see exactly what you need? Get a Quote."}</h2><Link href={localizePath(`${servicePath(service.slug)}#quote`, locale)} className="btn-primary">{locale === "ar" ? "اطلب عرض سعر" : "Get a Quote"}</Link></div></div></section></>;
}
