<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Read the relevant guide in `node_modules/next/dist/docs/` before writing routing or metadata code.
<!-- END:nextjs-agent-rules -->

## Current state

Bilingual production and fabrication site (`/en`, `/ar`) with eight service families, service catalogues, production capabilities, filtered work, and news/insights. About is one page with section anchors.

Canonical service URLs are top-level:

- `/services/[service]`
- `/services/[service]/catalogue`

Location service URLs and the former booth-type URLs are legacy compatibility routes and redirect to these canonical pages/catalogue items. `/booth-types` remains a legacy index.

## Stack

- Locale routes: `/en`, `/ar`
- UI chrome strings: `src/content/dictionaries.local.ts` (fallback + residual chrome)
- Service architecture + catalogues: `src/content/service-architecture.ts`
- Legacy structured content: `src/content/catalog.ts` (booth types, industries, locations, news)
- Projects: `src/content/projects.ts`
- Site config: `src/lib/site-config.ts`
- Brand assets: `public/logo.png`, `public/icon.png`, `public/favicon.ico`
- Sanity CMS: `/studio` — seed with `npm run seed:sanity` (needs `SANITY_API_WRITE_TOKEN`)

## When you build / extend the site

1. Add or reuse sections under `src/components/sections/`
2. Add chrome copy to `src/content/dictionaries.local.ts` (EN + AR) **and** re-seed / update the matching Sanity docs when CMS is primary
3. Add structured content to `src/content/catalog.ts` / `projects.ts` (local fallback)
4. Wire pages under `src/app/[locale]/…` with loaders from `src/sanity/load-collections.ts` / `load-pages.ts`
5. Keep layout chrome in `src/components/layout/`
6. Update docs under `docs/` if behavior or structure changes

## Content ownership

| Layer | Location | Notes |
| --- | --- | --- |
| UI chrome strings | `dictionaries.local.ts` + Sanity `dictionary` / page docs | Nav labels fallback, CTAs, section labels |
| Home / about / contact | Sanity `homePage` / `aboutPageDoc` / `contactPageDoc` | Loaded via `resolveDictionary` / `load-pages.ts` |
| Primary navigation / mega menus | `navigation.ts` + Sanity `navigation` | CMS-first; local seed fallback |
| Footer | `footer.ts` + Sanity `siteFooter` | Brand band + 4-col menu; services/booth types from collections |
| Services + catalogues | `service-architecture.ts` + Sanity `service` docs | Blueprint v5 local fallback; CMS copy accepted after `blueprintVersion: 5` |
| Booth types / industries / locations / news | `catalog.ts` + Sanity collections | Legacy/fallback collections |
| Clients / logos | `clients.ts` + Sanity `client` | `loadClients` |
| Projects | `projects.ts` + Sanity `project` | Filter metadata on local seed |
| Site config defaults | `site-config.ts` | Overridden by Site Settings |
| Navigation | dictionary nav + Sanity `navigation` | CMS primary menu wins when set |
| Deprecated | `dictionary.content` JSON blob | Prefer structured docs |

## Components

- Server Components by default
- `"use client"` only for interactivity (header mobile menu)

## Human docs

See `docs/README.md` for the full handoff index. Sanity seed + CMS ownership: `docs/sanity.md`.
