import Image from "next/image";
import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries.local";
import { getSiteConfig } from "@/lib/site-config";

type SiteFooterProps = {
  locale: Locale;
  footer: Dictionary["footer"];
  navItems: Dictionary["nav"]["items"];
};

export function SiteFooter({ locale, footer, navItems }: SiteFooterProps) {
  const config = getSiteConfig();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-container flex flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href={localizePath("/", locale)}
              className="inline-flex items-center gap-2.5"
              aria-label="CPS"
            >
              <Image src="/icon.png" alt="" width={28} height={28} className="h-7 w-7" />
              <span className="text-sm font-semibold tracking-[0.18em] uppercase">CPS</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">{footer.tagline}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-[rgba(15,51,85,0.1)] pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {config.name}. {footer.rights}
          </p>
          <p>
            {config.address.city}, {config.address.countryName}
          </p>
        </div>
      </div>
    </footer>
  );
}
