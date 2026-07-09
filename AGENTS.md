<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Read the relevant guide in `node_modules/next/dist/docs/` before writing routing or metadata code.
<!-- END:nextjs-agent-rules -->

## Current state

Plain white homepage: logo + headline + support + CTAs.
Normal white header and footer. No hero image, no glass.

Inner routes (about / services / work / contact) exist and use `SiteChrome`.

## Stack

- Locale routes: `/en`, `/ar`
- UI strings: `src/content/dictionaries.local.ts`
- Projects: `src/content/projects.ts`
- Site config: `src/lib/site-config.ts`
- Brand assets: `public/logo.png`, `public/icon.png`, `public/favicon.ico`
- Optional Sanity CMS: `/studio`

## When you build / extend the site

1. Add or reuse sections under `src/components/sections/`
2. Add copy to `src/content/dictionaries.local.ts` (EN + AR)
3. Wire sections in `src/app/[locale]/page.tsx` (or the relevant page)
4. Keep layout chrome in `src/components/layout/`
5. Update docs under `docs/` if behavior or structure changes

## Content

| Layer | Location |
| --- | --- |
| UI strings | `src/content/dictionaries.local.ts` |
| Projects | `src/content/projects.ts` |
| Site config defaults | `src/lib/site-config.ts` |
| CMS override | Sanity → Site Settings + UI Copy |

## Components

- Server Components by default
- `"use client"` only for interactivity (header mobile menu)

## Human docs

See `docs/README.md` for the full handoff index.
