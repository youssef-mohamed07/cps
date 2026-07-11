"use client";

import Image from "next/image";
import Link from "next/link";
import type { NavLink, NavMega } from "@/content/navigation";
import { localizePath, type Locale } from "@/lib/i18n";

type MegaMenuPanelProps = {
  locale: Locale;
  mega: NavMega;
  onNavigate: () => void;
};

function flattenLinks(mega: NavMega): NavLink[] {
  return mega.columns.flatMap((column) => column.links);
}

export function MegaMenuPanel({ locale, mega, onNavigate }: MegaMenuPanelProps) {
  const featured = mega.featured?.enabled ? mega.featured : undefined;
  const isServices = mega.layout === "services";
  const isBoothTypes = mega.layout === "boothTypes";
  const links = flattenLinks(mega);
  const hasImages = links.some((link) => Boolean(link.image));
  const featuredLabel = locale === "ar" ? "مميز" : "Featured";

  return (
    <div
      className={`mega-panel${isServices ? " is-services" : ""}${isBoothTypes ? " is-booth-types" : ""}`}
      role="region"
      aria-label={mega.title}
    >
      <div className="site-container mega-panel-inner">
        <div className="mega-panel-top">
          <div className="mega-panel-intro">
            <p className="mega-panel-title">{mega.title}</p>
            {mega.description ? (
              <p className="mega-panel-desc">{mega.description}</p>
            ) : null}
          </div>
          {mega.cta ? (
            <Link
              href={localizePath(mega.cta.href, locale)}
              className="mega-cta"
              onClick={onNavigate}
            >
              {mega.cta.label}
            </Link>
          ) : null}
        </div>

        <div
          className={`mega-panel-grid${hasImages ? " has-images" : ""}${featured ? " has-featured" : ""}`}
        >
          <div className="mega-panel-main">
            {hasImages ? (
              <ul
                className={`mega-card-grid${isBoothTypes ? " is-booth" : " is-services"}`}
              >
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={localizePath(link.href, locale)}
                      className="mega-card"
                      onClick={onNavigate}
                    >
                      {link.image ? (
                        <span className="mega-card-media">
                          <Image
                            src={link.image}
                            alt={link.imageAlt || link.label}
                            fill
                            sizes={
                              isBoothTypes
                                ? "(max-width: 1024px) 40vw, 11vw"
                                : "(max-width: 1024px) 40vw, 8vw"
                            }
                            className="object-cover"
                          />
                        </span>
                      ) : null}
                      <span className="mega-card-copy">
                        <span className="mega-card-label">{link.label}</span>
                        {link.description ? (
                          <span className="mega-card-desc">{link.description}</span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className={`mega-columns${isBoothTypes ? " cols-3" : isServices ? " cols-1" : ""}`}
              >
                {mega.columns.map((column, index) => (
                  <div key={column.title || index} className="mega-column">
                    {column.title ? (
                      <p className="mega-column-title">{column.title}</p>
                    ) : null}
                    <ul className="mega-link-list">
                      {column.links.map((link) => (
                        <li key={link.href + link.label}>
                          <Link
                            href={localizePath(link.href, locale)}
                            className="mega-link"
                            onClick={onNavigate}
                          >
                            <span className="mega-link-label">{link.label}</span>
                            {link.description ? (
                              <span className="mega-link-desc">{link.description}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {featured ? (
            <Link
              href={localizePath(featured.href, locale)}
              className="mega-featured"
              onClick={onNavigate}
            >
              <div className="mega-featured-media">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 26vw"
                  className="object-cover"
                />
              </div>
              <div className="mega-featured-copy">
                <p className="mega-featured-eyebrow">{featuredLabel}</p>
                <p className="mega-featured-title">{featured.title}</p>
                <p className="mega-featured-desc">{featured.description}</p>
                <span className="mega-featured-cta">{featured.ctaLabel}</span>
              </div>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

type DropdownPanelProps = {
  locale: Locale;
  links: NavLink[];
  onNavigate: () => void;
};

export function DropdownPanel({ locale, links, onNavigate }: DropdownPanelProps) {
  return (
    <div className="nav-dropdown" role="menu">
      {links.map((link) => (
        <Link
          key={link.href + link.label}
          href={localizePath(link.href, locale)}
          className="nav-dropdown-link"
          role="menuitem"
          onClick={onNavigate}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
