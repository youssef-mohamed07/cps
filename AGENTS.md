<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

Read the relevant guide in `node_modules/next/dist/docs/` before writing routing or metadata code.
<!-- END:nextjs-agent-rules -->

## Current state

Coming soon shell only — the homepage shows **CPS / Coming Soon** (EN) or **CPS / قريباً** (AR).

## Stack kept in place

- Locale routes: `/en`, `/ar`
- UI strings: `src/content/dictionaries.local.ts`
- Site config: `src/lib/site-config.ts`
- Optional Sanity CMS: `/studio`

## When you build the real site

1. Add sections under `src/components/sections/`
2. Add copy to `src/content/dictionaries.local.ts`
3. Wire sections in `src/app/[locale]/page.tsx`
4. Add layout chrome (header/footer) in `src/app/[locale]/layout.tsx`

## Content

| Layer | Location |
| --- | --- |
| UI strings | `src/content/dictionaries.local.ts` |
| Site config defaults | `src/lib/site-config.ts` |
| CMS override | Sanity → Site Settings + UI Copy |

## Components

- Server Components by default
- `"use client"` only for interactivity
