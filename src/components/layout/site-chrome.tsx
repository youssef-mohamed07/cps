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
import { getSiteIcon } from "@/lib/site-assets";
import { getSiteConfig } from "@/lib/site-config";

type SiteChromeProps = {
  locale: Locale;
  children: React.ReactNode;
};

export async function SiteChrome({ locale, children }: SiteChromeProps) {
  const [navigation, footer, dictionary] = await Promise.all([
    resolveNavigation(locale),
    resolveFooter(locale),
    resolveDictionary(locale),
  ]);
  const siteConfig = getSiteConfig();

  return (
    <div className="site-shell">
      <GeometricPointer />
      <SiteHeader
        locale={locale}
        navigation={navigation}
        brandIcon={getSiteIcon()}
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
        serviceLinks={serviceArchitecture.map((item) => ({
          label: localizeText(item.title, locale),
          href: servicePath(item.slug),
        }))}
        workLinks={[
          { label: locale === "ar" ? "أعمالنا" : "Our Work", href: "/our-work" },
          { label: locale === "ar" ? "دراسات الحالة حسب القطاع" : "Case Studies by Industry", href: "/our-work#work-filters" },
        ]}
      />
    </div>
  );
}
