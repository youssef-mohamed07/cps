"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CtaArrow } from "@/components/motion/cta-arrow";
import type { CatalogueCategory } from "@/content/service-architecture";
import { localizeText } from "@/content/service-architecture";
import { localizePath, type Locale } from "@/lib/i18n";

type CatalogueBrowserProps = {
  locale: Locale;
  serviceSlug: string;
  serviceImage: string;
  categories: CatalogueCategory[];
  layoutFilters?: { en: string; ar: string }[];
  searchable?: boolean;
  highlightedItem?: string;
  selectedCity?: string;
};

const boothLayoutCompatibility: Record<string, string[]> = {
  "custom-built-exhibition-booths": ["Inline Booth", "Corner Booth", "Peninsula Booth", "Island Booth"],
  "modular-exhibition-booths": ["Inline Booth", "Corner Booth", "Peninsula Booth", "Island Booth"],
  "double-decker-booths": ["Peninsula Booth", "Island Booth"],
  "pavilions-and-large-scale-exhibition-spaces": ["Peninsula Booth", "Island Booth"],
  "shell-scheme-upgrades": ["Inline Booth", "Corner Booth"],
  "portable-and-pop-up-displays": ["Inline Booth", "Corner Booth"],
};

export function CatalogueBrowser({
  locale,
  serviceSlug,
  serviceImage,
  categories,
  layoutFilters = [],
  searchable = false,
  highlightedItem,
  selectedCity,
}: CatalogueBrowserProps) {
  const [category, setCategory] = useState("all");
  const [layout, setLayout] = useState("all");
  const [query, setQuery] = useState("");
  const allItems = useMemo(
    () => categories.flatMap((group) => group.items.map((entry) => ({ ...entry, categorySlug: group.slug }))),
    [categories],
  );
  const visible = allItems.filter((entry) => {
    if (category !== "all" && entry.categorySlug !== category) return false;
    if (layout !== "all" && !(boothLayoutCompatibility[entry.slug] ?? []).includes(layout)) return false;
    if (query && !`${localizeText(entry.title, locale)} ${localizeText(entry.description, locale)}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  const allLabel = locale === "ar" ? "الكل" : "All";

  return (
    <>
      <div className="catalogue-toolbar">
        {searchable ? (
          <label className="catalogue-search">
            <span>{locale === "ar" ? "ابحث في الكتالوج" : "Search the catalogue"}</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={locale === "ar" ? "مثال: لافتة، فينيل، صندوق إضاءة" : "Try signage, vinyl, light box"}
            />
          </label>
        ) : null}

        {categories.length > 1 ? (
          <div className="catalogue-tabs" role="group" aria-label={locale === "ar" ? "فئات الكتالوج" : "Catalogue categories"}>
            <button type="button" className={category === "all" ? "is-active" : ""} onClick={() => setCategory("all")}>{allLabel}</button>
            {categories.map((group) => (
              <button key={group.slug} type="button" className={category === group.slug ? "is-active" : ""} onClick={() => setCategory(group.slug)}>
                {localizeText(group.title, locale)}
              </button>
            ))}
          </div>
        ) : null}

        {layoutFilters.length ? (
          <div className="catalogue-tabs catalogue-tabs--layout" role="group" aria-label={locale === "ar" ? "تخطيط الجناح" : "Booth layout"}>
            <button type="button" className={layout === "all" ? "is-active" : ""} onClick={() => setLayout("all")}>{allLabel}</button>
            {layoutFilters.map((filter) => {
              const value = filter.en;
              return <button key={value} type="button" className={layout === value ? "is-active" : ""} onClick={() => setLayout(value)}>{localizeText(filter, locale)}</button>;
            })}
          </div>
        ) : null}
      </div>

      <div className="catalogue-grid" aria-live="polite">
        {visible.map((entry, index) => {
          const title = localizeText(entry.title, locale);
          const layoutParam = layout !== "all" ? `&layout=${encodeURIComponent(layout)}` : "";
          const cityParam = selectedCity ? `&city=${encodeURIComponent(selectedCity)}` : "";
          const quoteHref = localizePath(`/services/${serviceSlug}?item=${encodeURIComponent(entry.slug)}${layoutParam}${cityParam}#quote`, locale);
          return (
            <article
              id={`catalogue-${entry.slug}`}
              className={`catalogue-card${highlightedItem === entry.slug ? " is-highlighted" : ""}`}
              key={`${entry.categorySlug}-${entry.slug}`}
            >
              <div className="catalogue-card-media">
                <Image src={serviceImage} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" className="object-cover" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="catalogue-card-copy">
                <h2>{title}</h2>
                <p>{localizeText(entry.description, locale)}</p>
                {entry.cityAnchors?.length ? (
                  <div className="catalogue-city-anchors">
                    <span>{locale === "ar" ? "متاح في" : "Available in"}</span>
                    <ul>
                      {entry.cityAnchors.map((city) => (
                        <li key={city.slug}>
                          <Link
                            href={localizePath(
                              `/services/${serviceSlug}/catalogue?item=${entry.slug}&city=${city.slug}#catalogue-${entry.slug}`,
                              locale,
                            )}
                            aria-current={selectedCity === city.slug ? "location" : undefined}
                          >
                            {localizeText(city.title, locale)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <Link href={quoteHref} className="catalogue-card-cta">
                  {locale === "ar" ? "اطلب عرض سعر" : "Get a Quote"}
                  <CtaArrow size="sm" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {!visible.length ? <p className="catalogue-empty">{locale === "ar" ? "لا توجد عناصر مطابقة للبحث." : "No items match your search."}</p> : null}
    </>
  );
}
