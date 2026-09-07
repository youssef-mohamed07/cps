import { media } from "@/content/media";
import { localizeText, serviceArchitecture, servicePath } from "@/content/service-architecture";
import type { Locale } from "@/lib/i18n";

export type NavLink = { label: string; href: string; description?: string; icon?: string; image?: string; imageAlt?: string };
export type NavColumn = { title?: string; links: NavLink[] };
export type NavFeatured = { enabled: boolean; title: string; description: string; href: string; ctaLabel: string; image: string; imageAlt: string };
export type NavMega = { enabled: boolean; layout: "services" | "boothTypes" | "columns"; title: string; description: string; columns: NavColumn[]; featured?: NavFeatured; cta?: { label: string; href: string } };
export type NavPrimaryItem = { enabled: boolean; label: string; href: string; kind: "link" | "mega" | "dropdown"; mega?: NavMega; dropdown?: NavLink[] };
export type NavigationConfig = { items: NavPrimaryItem[]; footer: NavLink[]; cta: { label: string; href: string }; langLabel: string; langHrefLocale: Locale };

function serviceLinks(locale: Locale): NavLink[] {
  return serviceArchitecture.map((service) => ({
    label: localizeText(service.title, locale),
    href: servicePath(service.slug),
    description: localizeText(service.excerpt, locale),
    image: service.image,
    imageAlt: localizeText(service.title, locale),
  }));
}

function navigation(locale: Locale): NavigationConfig {
  const ar = locale === "ar";
  const links = serviceLinks(locale);
  return {
    langLabel: ar ? "English" : "العربية",
    langHrefLocale: ar ? "en" : "ar",
    cta: { label: ar ? "ابدأ مشروعاً" : "Start a Project", href: "/contact" },
    footer: [
      { label: ar ? "من نحن" : "About", href: "/about" },
      { label: ar ? "الخدمات" : "Services", href: "/services" },
      { label: ar ? "المشاريع" : "Projects", href: "/work" },
      { label: ar ? "تواصل" : "Contact", href: "/contact" },
    ],
    items: [
      { enabled: true, label: ar ? "الرئيسية" : "Home", href: "/", kind: "link" },
      { enabled: true, label: ar ? "من نحن" : "About", href: "/about", kind: "link" },
      {
        enabled: true,
        label: ar ? "الخدمات" : "Services",
        href: "/services",
        kind: "mega",
        mega: {
          enabled: true,
          layout: "services",
          title: ar ? "ثمان خدمات تحت سقف واحد" : "Eight services under one roof",
          description: ar ? "من الأجنحة والفعاليات إلى التجهيزات والطباعة والتسليم." : "From exhibitions and events to fit-out, print and delivery.",
          columns: [
            { title: ar ? "البيئات" : "Environments", links: links.slice(0, 4) },
            { title: ar ? "الإنتاج والتسليم" : "Production & Delivery", links: links.slice(4) },
          ],
          featured: {
            enabled: true,
            title: ar ? "قدرات الإنتاج" : "Production Capabilities",
            description: ar ? "شاهد كيف نجمع الخشب والمعدن والأكريليك والطباعة والتركيب." : "See how wood, metal, acrylic, print and installation come together.",
            href: "/production-capabilities",
            ctaLabel: ar ? "شاهد كيف نبني" : "See how we build it",
            image: media.services.fabrication,
            imageAlt: ar ? "الإنتاج داخل CPS" : "CPS in-house production",
          },
          cta: { label: ar ? "عرض كل الخدمات" : "View All Services", href: "/services" },
        },
      },
      { enabled: true, label: ar ? "المشاريع" : "Projects", href: "/work", kind: "link" },
      { enabled: true, label: ar ? "تواصل" : "Contact", href: "/contact", kind: "link" },
    ],
  };
}

export function getNavigationLocal(locale: Locale): NavigationConfig {
  return navigation(locale);
}
