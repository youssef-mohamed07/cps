<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Read the relevant guide in `node_modules/next/dist/docs/` before writing routing or metadata code.
<!-- END:nextjs-agent-rules -->

## Current state

Bilingual exhibition booth site (`/en`, `/ar`) with CMS-ready IA: services, booth types, work (filters), industries, locations (GCC + Egypt), news/insights. About is one page with section anchors.

## Stack

- Locale routes: `/en`, `/ar`
- UI chrome strings: `src/content/dictionaries.local.ts`
- Structured seed content: `src/content/catalog.ts` (services, booth types, industries, locations, news)
- Projects: `src/content/projects.ts`
- Site config: `src/lib/site-config.ts`
- Brand assets: `public/logo.png`, `public/icon.png`, `public/favicon.ico`
- Optional Sanity CMS: `/studio`

## When you build / extend the site

1. Add or reuse sections under `src/components/sections/`
2. Add chrome copy to `src/content/dictionaries.local.ts` (EN + AR)
3. Add structured content to `src/content/catalog.ts` / `projects.ts` (local fallback)
4. Wire pages under `src/app/[locale]/…` with loaders from `src/sanity/load-collections.ts`
5. Keep layout chrome in `src/components/layout/`
6. Update docs under `docs/` if behavior or structure changes

## Content ownership

| Layer | Location | Notes |
| --- | --- | --- |
| UI chrome strings | `dictionaries.local.ts` | Nav labels fallback, CTAs, section labels |
| Primary navigation / mega menus | `navigation.ts` + Sanity `navigation` | CMS-first; local seed fallback |
| Footer | `footer.ts` + Sanity `siteFooter` | 5-col footer, newsletter, trust; services/booth types from collections |
| Services / booth types / industries / locations / news | `catalog.ts` + Sanity collections | Local fallback when CMS empty |
| Projects | `projects.ts` + Sanity `project` | Filter metadata on local seed |
| Site config defaults | `site-config.ts` | Overridden by Site Settings |
| Navigation | dictionary nav + Sanity `navigation` | CMS primary menu wins when set |
| Deprecated | `dictionary.content` JSON blob | Prefer structured docs |

## Components

- Server Components by default
- `"use client"` only for interactivity (header mobile menu)

## Human docs

See `docs/README.md` for the full handoff index.
