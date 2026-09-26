import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClientsSection } from "@/components/sections/clients-section";
import { FaqSection } from "@/components/sections/faq-section";
import { GeometricPointer } from "@/components/motion/geometric-pointer";
import type { Locale } from "@/lib/i18n";
import { resolveDictionary } from "@/lib/dictionary";
import { resolveFooter } from "@/lib/footer";
import { resolveNavigation } from "@/lib/navigation";
import { localizeText, serviceArchitecture, servicePath } from "@/content/service-architecture";
import { getSiteIcon, getSiteLogo } from "@/lib/site-assets";
import { getSiteConfig } from "@/lib/site-config";
import { loadLocations } from "@/sanity/load-collections";
import { stegaClean } from "next-sanity";
import { cityRegion, regionLabel, regions } from "@/content/regions";

/** Arabic city lists read alphabetically without the definite article (الرياض → رياض). */
const sortKey = (label: string) => label.replace(/^ال/, "");

type SiteChromeProps = {
  locale: Locale;
  children: React.ReactNode;
};

export async function SiteChrome({ locale, children }: SiteChromeProps) {
  const [navigation, footer, dictionary, locations] = await Promise.all([
    resolveNavigation(locale),
    resolveFooter(locale),
    resolveDictionary(locale),
    loadLocations(locale),
  ]);
  const serviceOptions = serviceArchitecture.map((item) => ({
    slug: item.slug,
    label: localizeText(item.title, locale),
    href: servicePath(item.slug),
  }));
  const cityOptions = locations
    .map((item) => ({ slug: item.slug, label: stegaClean(item.title) }))
    .sort((a, b) => sortKey(a.label).localeCompare(sortKey(b.label), locale));
  // Cities without a known region (e.g. added only in Sanity) fall into a trailing "other" group.
  const regionGroups = [
    ...regions.map((region) => ({
      key: region.key,
      label: regionLabel(region.key, locale),
      cities: cityOptions.filter((city) => cityRegion[city.slug] === region.key),
    })),
    {
      key: "other",
      label: locale === "ar" ? "مدن أخرى" : "Other cities",
      cities: cityOptions.filter((city) => !cityRegion[city.slug]),
    },
  ].filter((group) => group.cities.length);
  const siteConfig = getSiteConfig();

  return (
    <div className="site-shell">
      <GeometricPointer />
      <SiteHeader
        locale={locale}
        navigation={navigation}
        brandIcon={getSiteIcon()}
        brandLogo={getSiteLogo()}
        portfolio={siteConfig.portfolio}
      />
      <main className="site-main">{children}</main>
      <div className="site-global-testimonials">
        <ClientsSection
          id="site-testimonials"
          eyebrow={dictionary.clients.eyebrow}
          title={dictionary.clients.title}
          support={dictionary.clients.support}
          items={dictionary.clients.items}
        />
      </div>
      <div className="site-global-faq">
        <FaqSection
          id="site-faq"
          eyebrow={dictionary.faq.eyebrow}
          title={dictionary.faq.title}
          support={dictionary.faq.support}
          items={dictionary.faq.items}
        />
      </div>
      <SiteFooter
        locale={locale}
        footer={footer}
        serviceLinks={serviceOptions.map((item) => ({ label: item.label, href: item.href }))}
        workLinks={[
          { label: locale === "ar" ? "أعمالنا" : "Our Work", href: "/our-work" },
        ]}
        areaServices={serviceOptions}
        areaRegions={regionGroups}
      />
    </div>
  );
}
