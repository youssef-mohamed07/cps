import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/lib/i18n";
import { resolveFooter } from "@/lib/footer";
import { resolveNavigation } from "@/lib/navigation";
import { loadBoothTypes, loadServices } from "@/sanity/load-collections";

type SiteChromeProps = {
  locale: Locale;
  children: React.ReactNode;
};

export async function SiteChrome({ locale, children }: SiteChromeProps) {
  const [navigation, footer, services, boothTypes] = await Promise.all([
    resolveNavigation(locale),
    resolveFooter(locale),
    loadServices(locale),
    loadBoothTypes(locale),
  ]);

  return (
    <div className="site-shell">
      <SiteHeader locale={locale} navigation={navigation} />
      <main className="site-main">{children}</main>
      <SiteFooter
        locale={locale}
        footer={footer}
        serviceLinks={services.map((item) => ({
          label: item.title,
          href: `/services/${item.slug}`,
        }))}
        boothTypeLinks={boothTypes.map((item) => ({
          label: item.title,
          href: `/booth-types/${item.slug}`,
        }))}
      />
    </div>
  );
}
