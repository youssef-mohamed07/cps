# Sanity CMS (optional)

The site runs fully without Sanity using local dictionaries and `site-config` defaults.

## What CMS can override

| Sanity document | Affects |
| --- | --- |
| Site Settings | Name, contact, logo, brand colors, SEO defaults, hero media |
| UI Copy | Dictionary strings per locale |

Loaders / transformers live under `src/sanity/`.

## Setup

1. Create a Sanity project
2. Copy `.env.example` → `.env.local` and fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=...          # if private dataset
SANITY_REVALIDATE_SECRET=...       # webhook auth
```

3. Run:

```bash
npm run setup:sanity   # prints checklist
npm run dev
```

4. Open Studio: http://localhost:3000/studio

## Revalidation webhook

`POST /api/revalidate`

- Dev: open (no secret required)
- Prod: `Authorization: Bearer <SANITY_REVALIDATE_SECRET>` or JSON `{ "secret": "..." }`

Revalidates tags: `siteSettings`, `dictionary`, `notFoundPage`, plus locale-specific tags.

## Merge behavior

Never replace the whole dictionary with a partial CMS payload.

Use `resolveDictionary(locale)` so local defaults remain for missing nested fields.

## When to skip Sanity

If the team is fine editing TypeScript content files, leave Sanity unconfigured. Local files are enough for launch.
