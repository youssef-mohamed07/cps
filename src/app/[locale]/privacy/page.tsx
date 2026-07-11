import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Privacy Policy",
    lead: "How CPS collects, uses, and protects information when you contact us or use this website.",
    body: [
      "We use contact details you share through forms, email, or WhatsApp only to respond to your inquiry and deliver related services.",
      "Analytics may be used to understand site performance. We do not sell personal data.",
      "For privacy questions, email hello@cps.com.",
    ],
  },
  ar: {
    title: "سياسة الخصوصية",
    lead: "كيف تجمع CPS المعلومات وتستخدمها وتحميها عند تواصلك معنا أو استخدام هذا الموقع.",
    body: [
      "نستخدم بيانات التواصل التي تشاركها عبر النماذج أو البريد أو واتساب للرد على استفسارك وتقديم الخدمات ذات الصلة فقط.",
      "قد نستخدم التحليلات لفهم أداء الموقع. لا نبيع البيانات الشخصية.",
      "لأسئلة الخصوصية، راسل hello@cps.com.",
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/privacy",
    locale: localeParam,
    fallbackTitle: `CPS — ${copy[localeParam].title}`,
    fallbackDescription: copy[localeParam].lead,
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const page = copy[locale];

  return <LegalPage locale={locale} title={page.title} lead={page.lead} body={page.body} />;
}
