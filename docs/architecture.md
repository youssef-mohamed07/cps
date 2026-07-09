# Architecture

## Goal

Locale-first bilingual site with local content as the source of truth, and optional Sanity overrides.

## Routes

| Path | What it is | Notes |
| --- | --- | --- |
| `/` | Redirect / locale entry | Handled via locale routing |
| `/[locale]` | Homepage | White hero only today |
| `/[locale]/about` | About page | Uses `aboutPage` dictionary |
| `/[locale]/services` | Services page | Uses `services` + `servicesPage` |
| `/[locale]/work` | Work index | From `projects.ts` |
| `/[locale]/work/[slug]` | Project detail | From `projects.ts` |
| `/[locale]/contact` | Contact page | Email / WhatsApp helpers |
| `/studio` | Sanity Studio | Needs env vars |
| `/api/revalidate` | CMS webhook | `SANITY_REVALIDATE_SECRET` |

Locales: `en` (LTR), `ar` (RTL). Helpers live in `src/lib/i18n.ts`.

## Folder map

```
src/
  app/
    [locale]/          # locale layout + pages
    api/revalidate/    # on-demand revalidation
    studio/            # Sanity Studio route
    globals.css        # site styles
  components/
    layout/            # SiteChrome, header, footer
    sections/          # HomeHero, About, Services, Work, Contact…
    media/             # BleedImage
    analytics/         # GA / GTM hooks
  content/
    dictionaries.local.ts  # EN/AR UI copy (primary)
    projects.ts            # portfolio data
    dictionaries.ts        # local + remote merge entry
  lib/
    i18n.ts            # locale helpers
    dictionary.ts      # resolveDictionary() deep merge
    site-config.ts     # brand / contact defaults
    seo.ts / cms-seo.ts
    fonts.ts           # Alexandria
  sanity/              # client, queries, transformers, loaders
public/
  logo.png             # full bilingual logo
  icon.png             # cube mark
  favicon.ico          # generated from mark
  favicon-16.png / favicon-32.png / apple-touch-icon.png
```

## Request flow (homepage)

```
/[locale]/page.tsx
  → ensureSiteConfig()          # Sanity Site Settings or local defaults
  → resolveDictionary(locale)   # local + optional CMS UI Copy
  → SiteChrome                  # header + main + footer
      → HomeHero
```

## Content flow

```
dictionaries.local.ts  ──┐
                         ├── resolveDictionary(locale) → pages
Sanity "UI Copy" (opt) ──┘

site-config.ts defaults ──┐
                          ├── ensureSiteConfig() → getSiteConfig()
Sanity "Site Settings" ───┘

projects.ts ──→ work pages / FeaturedWork (if wired)
```

**Important:** `resolveDictionary` deep-merges CMS onto local defaults so a partial CMS document cannot wipe required fields (e.g. `hero`).

## Layout chrome

- `SiteChrome` wraps pages with `SiteHeader` + `SiteFooter`.
- Header is a client component (mobile menu only).
- Prefer Server Components everywhere else.

## SEO

- Metadata builders: `src/lib/seo.ts`, `src/lib/cms-seo.ts`
- Icons / favicon wired in metadata
- Indexing gated by `NEXT_PUBLIC_ALLOW_INDEXING=true` (and production Vercel env)
- `src/app/sitemap.ts`, `src/app/robots.ts`

## Related docs

- [content.md](content.md) — editing copy & projects
- [brand.md](brand.md) — assets & colors
- [development.md](development.md) — how to extend UI
- [sanity.md](sanity.md) — CMS
