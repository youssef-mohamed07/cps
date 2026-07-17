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
const HEADER_HIDE_AFTER = 72;

/** Body can be the real scroll root (overflow-y: auto + h-full). */
function getScrollRoot(): Element {
  const body = document.body;
  const bodyStyle = getComputedStyle(body);
  const bodyScrolls =
    (bodyStyle.overflowY === "auto" || bodyStyle.overflowY === "scroll") &&
    body.scrollHeight > body.clientHeight + 1;

  if (bodyScrolls) return body;
  return document.scrollingElement || document.documentElement;
}

function getScrollY() {
  const root = getScrollRoot();
  if (root === document.body) return document.body.scrollTop;
  return window.scrollY || document.documentElement.scrollTop || 0;
}

export function SiteHeader({ locale, navigation }: SiteHeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const items = navigation.items.filter((item) => item.enabled !== false);
  const isHome =
    pathname === `/${locale}` || pathname === `/${locale}/`;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const menuLocked = useRef(false);
  const navId = useId();

  const activeMegaItem = openKey
    ? items.find(
        (item) =>
          `${item.href}-${item.label}` === openKey &&
          item.kind === "mega" &&
          item.mega?.enabled !== false,
      )
    : undefined;
  const megaOpen = Boolean(activeMegaItem?.mega);
  const megaPanelId = `${navId}-mega`;
  const atTop = heroInView && !mobileOpen && !megaOpen;
  const isScrolled = !heroInView;

  useEffect(() => {
    menuLocked.current = mobileOpen || Boolean(openKey);
    if (menuLocked.current) setHidden(false);
  }, [mobileOpen, openKey]);

  useEffect(() => {
    const hero = document.querySelector(".home-hero, .page-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const syncOffset = () => {
      const bar = el.querySelector<HTMLElement>(".site-header-bar");
      const headerRect = el.getBoundingClientRect();
      const bottomPadding = Number.parseFloat(getComputedStyle(el).paddingBottom) || 0;
      const height = bar
        ? bar.getBoundingClientRect().bottom - headerRect.top + bottomPadding
        : headerRect.height;
      document.documentElement.style.setProperty(
        "--site-header-offset",
        `${height}px`,
      );
    };
    syncOffset();
    window.addEventListener("resize", syncOffset);
    return () => window.removeEventListener("resize", syncOffset);
  }, [mobileOpen, megaOpen, isScrolled]);

  useEffect(() => {
    const setHeaderHidden = (nextHidden: boolean) => {
      setHidden((current) => (current === nextHidden ? current : nextHidden));
    };

    const updateHeaderVisibility = (
      y: number,
      direction: "up" | "down" | "none",
    ) => {
      if (menuLocked.current) {
        setHeaderHidden(false);
        return;
      }

      if (y <= HEADER_HIDE_AFTER) {
        setHeaderHidden(false);
        return;
      }

      if (direction === "down") {
        setHeaderHidden(true);
        setOpenKey(null);
      } else if (direction === "up") {
        setHeaderHidden(false);
      }
    };

    lastScrollY.current = getScrollY();
    let animationFrame: number | null = null;

    const onScroll = () => {
      if (animationFrame !== null) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = null;
        const y = getScrollY();
        const delta = y - lastScrollY.current;
        // Always sync the baseline so direction detection never goes stale.
        lastScrollY.current = y;

        if (y <= HEADER_HIDE_AFTER) {
          setHeaderHidden(false);
          return;
        }

        // Ignore tiny trackpad jitter, but keep lastScrollY up to date above.
        if (Math.abs(delta) < 2) return;

        updateHeaderVisibility(y, delta > 0 ? "down" : "up");
      });
    };

    const scrollRoot = getScrollRoot();
    // Scroll events don't bubble — listen on the actual scrolling element.
    scrollRoot.addEventListener("scroll", onScroll, { passive: true });
    if (scrollRoot !== document.documentElement) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      scrollRoot.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
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

  return (
    <header
      ref={headerRef}
      className={[
        "site-header",
        "is-overlay",
        isHome ? "is-home is-home-page" : "is-inner-page",
        atTop ? "is-at-top" : "is-solid",
        isScrolled ? "is-scrolled" : "",
        mobileOpen ? "is-mobile-open" : "",
        megaOpen ? "is-mega-open" : "",
        hidden && !mobileOpen && !megaOpen ? "is-hidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="site-container site-header-wrap">
        <div
          className="site-header-shell"
          onMouseLeave={megaOpen ? scheduleClose : undefined}
        >
          <div className="site-header-bar">
            <Link
              href={localizePath("/", locale)}
              className="site-brand"
              aria-label={
                locale === "ar"
                  ? "CPS — المبدعون المحترفون"
                  : "CPS — Creatives Professionals"
              }
              onClick={closeAll}
            >
              <Image
                src="/icon.png"
                alt=""
                width={44}
                height={44}
                priority
                className="site-brand-icon"
              />
              <span className="site-brand-name">
                {locale === "ar"
                  ? "المبدعون المحترفون"
                  : "Creatives Professionals"}
              </span>
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

              const isMega = item.kind === "mega" && item.mega?.enabled !== false;

              return (
                <div
                  key={key}
                  className={`site-nav-item${open ? " is-open" : ""}`}
                  onMouseEnter={() => scheduleOpen(key)}
                  onMouseLeave={isMega ? undefined : scheduleClose}
                >
                  <button
                    type="button"
                    className={`site-nav-trigger${active ? " is-active" : ""}`}
                    aria-expanded={open}
                    aria-haspopup={isMega ? "dialog" : "menu"}
                    aria-controls={isMega ? megaPanelId : `${navId}-${key}`}
                    onClick={() => setOpenKey(open ? null : key)}
                    onKeyDown={(event) => onTriggerKeyDown(event, item, key)}
                  >
                    <span>{item.label}</span>
                    <span className="site-nav-chevron" aria-hidden="true" />
                  </button>
                  {item.kind === "dropdown" && item.dropdown ? (
                    <div
                      id={`${navId}-${key}`}
                      className={`site-nav-panel${open ? " is-visible" : ""}`}
                      hidden={!open}
                      onMouseEnter={() => scheduleOpen(key)}
                      onMouseLeave={scheduleClose}
                    >
                      <DropdownPanel
                        locale={locale}
                        links={item.dropdown}
                        onNavigate={closeAll}
                      />
                    </div>
                  ) : null}
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
              className="site-header-cta"
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

          {activeMegaItem?.mega ? (
            <div
              id={megaPanelId}
              className="site-header-mega"
              onMouseEnter={() => scheduleOpen(openKey!)}
            >
              <MegaMenuPanel
                locale={locale}
                mega={activeMegaItem.mega}
                onNavigate={closeAll}
              />
            </div>
          ) : null}

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
      </div>
    </header>
  );
}
