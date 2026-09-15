# Architecture

## Goal

Locale-first bilingual site with local content as the source of truth, and optional Sanity overrides for collections and singletons.

## Routes

| Path | What it is | Notes |
| --- | --- | --- |
| `/` | Redirect / locale entry | Handled via locale routing |
| `/[locale]` | Homepage | Positioning + eight services + production capabilities + featured work + Why CPS + CTA |
| `/[locale]/about` | About page | Single page with anchors (`#overview` `#mission` `#why-us` `#process` `#team` `#certifications` `#clients` `#faq`) |
| `/[locale]/services` | Services hub | Eight service families |
| `/[locale]/services/[serviceSlug]` | Long-form service page | Hero, trusted brands, overview, catalogue showcase, benefits, Why CPS, process, production link, industries, projects, FAQ, quote form, related services, closing CTA |
| `/[locale]/services/[serviceSlug]/catalogue` | Service catalogue | Full item grid; category tabs where needed; search for Printing & Signage |
| `/[locale]/services/[serviceSlug]/catalogue/[itemSlug]` | Catalogue item detail | Product-style detail view with item summary, CPS benefits, availability, contact and quote actions, and related items |
| `/[locale]/production-capabilities` | Production page | Hero, ten manufacturing disciplines, reassurance band, shared workshop/team proof, services-vs-capabilities explainer, before/after proof, and closing CTA |
| `/[locale]/work` | Work index | Independent service and industry filters |
| `/[locale]/work/[slug]` | Project detail | Client / sector, project type, location, scope of work, services, challenge, CPS solution, production elements and gallery; CMS + `projects.ts` fallback |
| `/[locale]/industries` | Legacy redirect | Redirects to filtered Projects / Work |
| `/[locale]/locations` | Legacy cities hub | Retained for existing URLs; not linked from the footer |
| `/[locale]/locations/[slug]` | Legacy city detail | Retained for existing URLs |
| `/[locale]/locations/[slug]/services/[serviceSlug]` | CMS city-service variation | Shareable city-specific service page with its own copy, image, and SEO/social metadata |
| `/[locale]/locations/[slug]/booth-types/[boothTypeSlug]` | Legacy booth URL | Redirected to Exhibitions & Booths catalogue |
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
    service-architecture.ts # eight services + every catalogue item, EN/AR
    catalog.ts             # legacy services/booth types plus locations and news seed
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

**Important:** loaders fall back to local TypeScript when Sanity is empty or unconfigured. Service copy from Sanity is only allowed to replace Blueprint v5 fallback copy when the service document carries `blueprintVersion: 5`; CMS media can still override independently.

## Layout chrome

- Project detail facts use a compact summary row, followed by a separate two-column scope/services panel. Service tags normalize known service slugs and remove duplicate labels; narrow screens stack the delivery panel while keeping summary facts in two columns.

- `SiteChrome` resolves `navigation` + `siteFooter` and renders mega-menu `SiteHeader` + premium `SiteFooter`
- The moving client-logo strip appears only on the homepage, immediately after `HomeHero`; shared inner-page heroes do not render it.
- `ProjectLaunchSection` is the shared closing conversion panel on production capabilities and service-detail pages; the homepage ends its main content with the brief form before the global FAQ.
- Footer services come from the eight-service architecture; the former secondary collection slot now renders the Work links required by the blueprint
- Local seeds: `src/content/navigation.ts`, `src/content/footer.ts`

## SEO

- Per-page metadata via `buildPageMetadata` (hreflang already in `buildMetadata`)
- Breadcrumbs + JSON-LD on detail templates
- Sitemap emits canonical Blueprint routes, catalogue items, location pages, and CMS-backed city/service variants with `alternates.languages`; redirected booth-type and industry routes remain excluded

## Related docs

- [content.md](content.md) — editing copy & projects
- [brand.md](brand.md) — assets & colors
- [development.md](development.md) — how to extend UI
- [sanity.md](sanity.md) — CMS model, tags, preview
