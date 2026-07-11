import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Cookies Policy",
    lead: "How CPS may use cookies and similar technologies on this website.",
    body: [
      "We may use essential cookies for site function and optional analytics cookies to understand traffic.",
      "You can control cookies through your browser settings.",
      "Questions: hello@cps.com.",
    ],
  },
  ar: {
    title: "سياسة ملفات تعريف الارتباط",
    lead: "كيف قد تستخدم CPS ملفات تعريف الارتباط والتقنيات المشابهة على هذا الموقع.",
    body: [
      "قد نستخدم ملفات أساسية لعمل الموقع وملفات تحليلات اختيارية لفهم الزيارات.",
      "يمكنك التحكم في ملفات تعريف الارتباط عبر إعدادات المتصفح.",
      "للاستفسار: hello@cps.com.",
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/cookies",
    locale: localeParam,
    fallbackTitle: `CPS — ${copy[localeParam].title}`,
    fallbackDescription: copy[localeParam].lead,
  });
}

export default async function CookiesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const page = copy[locale];

  return <LegalPage locale={locale} title={page.title} lead={page.lead} body={page.body} />;
}
