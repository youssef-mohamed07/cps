# Architecture

## Goal

Locale-first bilingual site with local content as the source of truth, and optional Sanity overrides for collections and singletons.

## Routes

| Path | What it is | Notes |
| --- | --- | --- |
| `/` | Redirect / locale entry | Handled via locale routing |
| `/[locale]` | Homepage | Hero + lifecycle + services + booth types + FAQ |
| `/[locale]/about` | About page | Single page with anchors (`#overview` `#mission` `#why-us` `#process` `#team` `#certifications` `#clients` `#faq`) |
| `/[locale]/services` | Services index | CMS + local catalog fallback |
| `/[locale]/services/[slug]` | Service detail | 7 services |
| `/[locale]/booth-types` | Booth types index | CMS + local catalog fallback |
| `/[locale]/booth-types/[slug]` | Booth type detail | 8 types |
| `/[locale]/work` | Work index | Filters: booth type, industry, country, event, size |
| `/[locale]/work/[slug]` | Project detail | CMS + `projects.ts` fallback |
| `/[locale]/industries` | Industries hub | SEO hubs |
| `/[locale]/industries/[slug]` | Industry detail | |
| `/[locale]/locations` | Locations hub | GCC + Egypt (footer, not primary nav) |
| `/[locale]/locations/[slug]` | Location detail | Links to service × location + booth type × location |
| `/[locale]/locations/[slug]/services/[serviceSlug]` | Programmatic SEO | 7 locations × 7 services |
| `/[locale]/locations/[slug]/booth-types/[boothTypeSlug]` | Programmatic SEO | 7 locations × 8 booth types |
| `/[locale]/news` | Insights index | |
| `/[locale]/news/[slug]` | Article | |
| `/[locale]/contact` | Contact page | Email / WhatsApp helpers |
| `/studio` | Sanity Studio | Needs env vars |
| `/api/revalidate` | CMS webhook | `SANITY_REVALIDATE_SECRET` |
| `/api/draft` | Enable draft mode | Preview secret |
| `/api/draft/disable` | Disable draft mode | |

Locales: `en` (LTR), `ar` (RTL). Helpers live in `src/lib/i18n.ts`.

## Folder map

```
src/
  app/
    [locale]/          # locale layout + pages
    api/revalidate/    # on-demand revalidation
    api/draft/         # draft preview
    studio/            # Sanity Studio route
    sitemap.ts         # collection URLs + hreflang alternates
    globals.css
  components/
    layout/            # SiteChrome, header, footer
    sections/          # HomeHero, Services, BoothTypes, …
    seo/               # Breadcrumbs, JSON-LD
    media/             # BleedImage
  content/
    dictionaries.local.ts  # EN/AR UI chrome
    catalog.ts             # services, booth types, industries, locations, news seed
    programmatic-seo.ts    # location × service / booth type page builders
    projects.ts            # portfolio seed + filter metadata
  lib/
    dictionary.ts      # resolveDictionary() + navigation merge
    seo.ts / cms-seo.ts
  sanity/              # client, queries, transformers, loaders
  middleware.ts        # (deprecated) use proxy.ts
  proxy.ts             # locale routing + content redirects
```

## Content flow

```
catalog.ts / projects.ts / dictionaries.local.ts  ──┐
                                                    ├── loaders + resolveDictionary → pages
Sanity collections + singletons (optional) ─────────┘
```

**Important:** loaders fall back to local TypeScript when Sanity is empty or unconfigured.

## Layout chrome

- `SiteChrome` resolves `navigation` + `siteFooter` and renders mega-menu `SiteHeader` + premium `SiteFooter`
- Footer services/booth-type columns come from published collections
- Local seeds: `src/content/navigation.ts`, `src/content/footer.ts`

## SEO

- Per-page metadata via `buildPageMetadata` (hreflang already in `buildMetadata`)
- Breadcrumbs + JSON-LD on detail templates
- Sitemap emits all collection URLs with `alternates.languages`

## Related docs

- [content.md](content.md) — editing copy & projects
- [brand.md](brand.md) — assets & colors
- [development.md](development.md) — how to extend UI
- [sanity.md](sanity.md) — CMS model, tags, preview
