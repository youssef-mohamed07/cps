# Architecture

## Goal

Locale-first bilingual site with local content as the source of truth, and optional Sanity overrides for collections and singletons.

## Routes

| Path | What it is | Notes |
| --- | --- | --- |
| `/` | Redirect / locale entry | Handled via locale routing |
| `/[locale]` | Homepage | Hero + lifecycle + services + booth types + FAQ |
| `/[locale]/about` | About page | Single page with anchors (`#overview` `#mission` `#why-us` `#process` `#team` `#certifications` `#clients` `#faq`) |
| `/[locale]/services` | Services hub | Cards link to `/locations/riyadh/services/...` |
| `/[locale]/booth-types` | Booth types hub | Cards link to `/locations/riyadh/booth-types/...` |
| `/[locale]/work` | Work index | Filters: booth type, industry, city, event, size |
| `/[locale]/work/[slug]` | Project detail | CMS + `projects.ts` fallback |
| `/[locale]/industries` | Industries hub | SEO hubs |
| `/[locale]/industries/[slug]` | Industry detail | |
| `/[locale]/locations` | Cities hub | 7 Saudi cities (footer) |
| `/[locale]/locations/[slug]` | City detail | Parent for services + booth types |
| `/[locale]/locations/[slug]/services/[serviceSlug]` | Service detail | Only service detail URL (7×7) |
| `/[locale]/locations/[slug]/booth-types/[boothTypeSlug]` | Booth type detail | Only booth-type detail URL (7×8) |
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
