import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GeometricPointer } from "@/components/motion/geometric-pointer";
import type { Locale } from "@/lib/i18n";
import { resolveFooter } from "@/lib/footer";
import { resolveNavigation } from "@/lib/navigation";
import { localizeText, serviceArchitecture, servicePath } from "@/content/service-architecture";

type SiteChromeProps = {
  locale: Locale;
  children: React.ReactNode;
};

export async function SiteChrome({ locale, children }: SiteChromeProps) {
  const [navigation, footer] = await Promise.all([
    resolveNavigation(locale),
    resolveFooter(locale),
  ]);

  return (
    <div className="site-shell">
      <GeometricPointer />
      <SiteHeader locale={locale} navigation={navigation} />
      <main className="site-main">{children}</main>
      <SiteFooter
        locale={locale}
        footer={footer}
        serviceLinks={serviceArchitecture.map((item) => ({
          label: localizeText(item.title, locale),
          href: servicePath(item.slug),
        }))}
        workLinks={[
          { label: locale === "ar" ? "المشاريع" : "Projects / Our Work", href: "/work" },
          { label: locale === "ar" ? "دراسات الحالة حسب القطاع" : "Case Studies by Industry", href: "/work#work-filters" },
        ]}
      />
    </div>
  );
}
