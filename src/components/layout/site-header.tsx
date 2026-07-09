"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { localizePath, switchLocalePath, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries.local";

type SiteHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

export function SiteHeader({ locale, nav }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;

  return (
    <header className="site-header">
      <div className="site-container">
        <div className="site-header-bar flex h-16 items-center justify-between gap-4">
          <Link
            href={localizePath("/", locale)}
            className="inline-flex shrink-0 items-center gap-2.5"
            aria-label="CPS"
          >
            <Image src="/icon.png" alt="" width={28} height={28} priority className="h-7 w-7" />
            <span className="site-brand-text text-sm font-semibold tracking-[0.18em] uppercase">
              CPS
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <Link
              href={switchLocalePath(pathname, nav.langHrefLocale)}
              className="lang-switch"
              hrefLang={nav.langHrefLocale}
            >
              {nav.langLabel}
            </Link>
            <Link
              href={localizePath("/contact", locale)}
              className="btn-primary hidden min-h-10 px-4 text-sm sm:inline-flex"
            >
              {nav.cta}
            </Link>
            <button
              type="button"
              className="menu-toggle inline-flex h-10 w-10 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 top-[7px] h-px bg-current transition ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="lg:hidden">
            <nav className="flex flex-col py-3" aria-label="Mobile">
              {nav.items.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href, locale)}
                  className="nav-link py-3 text-base"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={localizePath("/contact", locale)}
                className="btn-primary mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                {nav.cta}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
