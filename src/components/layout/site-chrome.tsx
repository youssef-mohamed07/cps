import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";

type SiteChromeProps = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

export function SiteChrome({ locale, dictionary, children }: SiteChromeProps) {
  return (
    <div className="site-shell">
      <SiteHeader locale={locale} nav={dictionary.nav} />
      <main>{children}</main>
      <SiteFooter
        locale={locale}
        footer={dictionary.footer}
        navItems={dictionary.nav.items}
      />
    </div>
  );
}
