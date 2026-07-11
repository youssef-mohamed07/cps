"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { DropdownPanel, MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import type { NavigationConfig, NavPrimaryItem } from "@/content/navigation";
import { localizePath, switchLocalePath, type Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  navigation: NavigationConfig;
};

const OPEN_DELAY_MS = 150;
const CLOSE_DELAY_MS = 120;

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const menuLocked = useRef(false);
  const navId = useId();

  const items = navigation.items.filter((item) => item.enabled !== false);
  const overlay =
    pathname === `/${locale}` || pathname === `/${locale}/`;
  const isOverlay = overlay && !scrolled && !mobileOpen;

  useEffect(() => {
    menuLocked.current = mobileOpen || Boolean(openKey);
    if (menuLocked.current) setHidden(false);
  }, [mobileOpen, openKey]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const syncOffset = () => {
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${el.getBoundingClientRect().height}px`,
      );
    };
    syncOffset();
    window.addEventListener("resize", syncOffset);
    return () => window.removeEventListener("resize", syncOffset);
  }, [mobileOpen, scrolled, overlay]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastScrollY.current;
        const nextScrolled = y > 24;

        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

        if (menuLocked.current || y < 72) {
          setHidden((prev) => (prev ? false : prev));
        } else if (delta > 8) {
          setHidden((prev) => (prev ? prev : true));
          setOpenKey(null);
        } else if (delta < -8) {
          setHidden((prev) => (prev ? false : prev));
        }

        lastScrollY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenKey(null);
    setMobileOpen(false);
    setMobileExpanded(null);
    setHidden(false);
  }, [pathname]);

  useEffect(() => {
    if (!openKey) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenKey(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openKey]);

  useEffect(() => {
    return () => {
      if (openTimer.current) clearTimeout(openTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const scheduleOpen = useCallback((key: string) => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpenKey(key), OPEN_DELAY_MS);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY_MS);
  }, []);

  const closeAll = useCallback(() => {
    clearTimers();
    setOpenKey(null);
    setMobileOpen(false);
    setMobileExpanded(null);
  }, []);

  const isActive = (href: string) => {
    const full = localizePath(href, locale);
    if (href === "/") return pathname === full;
    return pathname === full || pathname.startsWith(`${full}/`);
  };

  const onTriggerKeyDown = (event: KeyboardEvent, item: NavPrimaryItem, key: string) => {
    if (event.key === "Escape") {
      setOpenKey(null);
      return;
    }
    if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
      if (item.kind === "mega" || item.kind === "dropdown") {
        event.preventDefault();
        setOpenKey(key);
      }
    }
  };

  const megaOpen = Boolean(
    openKey &&
      items.some(
        (item) =>
          `${item.href}-${item.label}` === openKey &&
          item.kind === "mega" &&
          item.mega?.enabled !== false,
      ),
  );

  return (
    <header
      ref={headerRef}
      className={`site-header${overlay ? " is-overlay" : ""}${isOverlay && !megaOpen ? " is-transparent" : ""}${scrolled || !overlay || megaOpen ? " is-solid" : ""}${mobileOpen ? " is-mobile-open" : ""}${megaOpen ? " is-mega-open" : ""}${hidden && !mobileOpen && !megaOpen ? " is-hidden" : ""}`}
    >
      <div className="site-container">
        <div className="site-header-bar">
          <Link
            href={localizePath("/", locale)}
            className="site-brand"
            aria-label="CPS"
            onClick={closeAll}
          >
            <Image
              src="/icon.png"
              alt=""
              width={28}
              height={28}
              priority
              className="site-brand-icon"
            />
            <span className="site-brand-text">CPS</span>
          </Link>

          <nav className="site-nav-desktop" aria-label="Primary">
            {items.map((item) => {
              const key = `${item.href}-${item.label}`;
              const hasPanel =
                (item.kind === "mega" && item.mega?.enabled !== false) ||
                (item.kind === "dropdown" && (item.dropdown?.length ?? 0) > 0);
              const open = openKey === key;
              const active = isActive(item.href);

              if (!hasPanel) {
                return (
                  <Link
                    key={key}
                    href={localizePath(item.href, locale)}
                    className={`site-nav-link${active ? " is-active" : ""}`}
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={key}
                  className={`site-nav-item${open ? " is-open" : ""}`}
                  onMouseEnter={() => scheduleOpen(key)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    className={`site-nav-trigger${active ? " is-active" : ""}`}
                    aria-expanded={open}
                    aria-haspopup={item.kind === "mega" ? "dialog" : "menu"}
                    aria-controls={`${navId}-${key}`}
                    onClick={() => setOpenKey(open ? null : key)}
                    onKeyDown={(event) => onTriggerKeyDown(event, item, key)}
                  >
                    <span>{item.label}</span>
                    <span className="site-nav-chevron" aria-hidden="true" />
                  </button>
                  <div
                    id={`${navId}-${key}`}
                    className={`site-nav-panel${open ? " is-visible" : ""}`}
                    hidden={!open}
                    onMouseEnter={() => scheduleOpen(key)}
                    onMouseLeave={scheduleClose}
                  >
                    {item.kind === "mega" && item.mega ? (
                      <MegaMenuPanel
                        locale={locale}
                        mega={item.mega}
                        onNavigate={closeAll}
                      />
                    ) : null}
                    {item.kind === "dropdown" && item.dropdown ? (
                      <DropdownPanel
                        locale={locale}
                        links={item.dropdown}
                        onNavigate={closeAll}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="site-header-actions">
            <Link
              href={switchLocalePath(pathname, navigation.langHrefLocale)}
              className="lang-switch"
              hrefLang={navigation.langHrefLocale}
              aria-label={navigation.langLabel}
              title={navigation.langLabel}
            >
              <Image
                src={
                  navigation.langHrefLocale === "ar"
                    ? "/lang_switch/sa.png"
                    : "/lang_switch/gb.png"
                }
                alt=""
                width={22}
                height={15}
                className="lang-switch-flag"
                unoptimized
              />
              <span className="sr-only">{navigation.langLabel}</span>
            </Link>
            <Link
              href={localizePath(navigation.cta.href, locale)}
              className="btn-primary site-header-cta"
              onClick={closeAll}
            >
              {navigation.cta.label}
            </Link>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute inset-x-0 top-0 h-px bg-current transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 top-[7px] h-px bg-current transition ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute inset-x-0 bottom-0 h-px bg-current transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div id="mobile-nav" className="site-mobile-nav">
            <nav className="site-mobile-accordion" aria-label="Mobile">
              {items.map((item) => {
                const key = `${item.href}-${item.label}`;
                const hasChildren =
                  (item.kind === "mega" && item.mega?.enabled !== false) ||
                  (item.kind === "dropdown" && (item.dropdown?.length ?? 0) > 0);
                const expanded = mobileExpanded === key;

                if (!hasChildren) {
                  return (
                    <Link
                      key={key}
                      href={localizePath(item.href, locale)}
                      className={`site-mobile-link${isActive(item.href) ? " is-active" : ""}`}
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  );
                }

                const childLinks =
                  item.kind === "mega"
                    ? item.mega?.columns.flatMap((column) => column.links) ?? []
                    : item.dropdown ?? [];

                return (
                  <div key={key} className="site-mobile-group">
                    <button
                      type="button"
                      className={`site-mobile-trigger${expanded ? " is-open" : ""}`}
                      aria-expanded={expanded}
                      onClick={() => setMobileExpanded(expanded ? null : key)}
                    >
                      <span>{item.label}</span>
                      <span className="site-nav-chevron" aria-hidden="true" />
                    </button>
                    {expanded ? (
                      <div className="site-mobile-children">
                        <Link
                          href={localizePath(item.href, locale)}
                          className="site-mobile-child"
                          onClick={closeAll}
                        >
                          {item.label}
                        </Link>
                        {childLinks.map((link) => (
                          <Link
                            key={link.href + link.label}
                            href={localizePath(link.href, locale)}
                            className="site-mobile-child"
                            onClick={closeAll}
                          >
                            {link.label}
                          </Link>
                        ))}
                        {item.mega?.cta ? (
                          <Link
                            href={localizePath(item.mega.cta.href, locale)}
                            className="site-mobile-child is-cta"
                            onClick={closeAll}
                          >
                            {item.mega.cta.label}
                          </Link>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <Link
                href={localizePath(navigation.cta.href, locale)}
                className="btn-primary mt-3 w-full"
                onClick={closeAll}
              >
                {navigation.cta.label}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
