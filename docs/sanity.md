# Sanity CMS (optional)

The site runs fully without Sanity using local dictionaries, `src/content/catalog.ts`, `projects.ts`, and `site-config` defaults. CMS content merges on top when configured.

## Navigation (mega menus)

Primary navigation is CMS-managed via the `navigation` singleton (`language: en|ar`).

| Field | Purpose |
| --- | --- |
| `items[]` (`navPrimaryItem`) | Primary menu — reorderable; kinds: `link`, `mega`, `dropdown` |
| `navMega` | Section title, description, columns, featured panel, CTA |
| `navFeatured` | Featured image + copy; optional `service` / `boothType` refs auto-fill |
| `footer[]` | Legacy footer links (prefer `siteFooter`) |
| `ctaLabel` / `ctaHref` | Header CTA |

Local fallback: `src/content/navigation.ts` via `resolveNavigation(locale)`.

## Footer

CMS singleton `siteFooter` (`siteFooter-en` / `siteFooter-ar`):

| Field | Purpose |
| --- | --- |
| Company column | Logo, description, certifications, badges, CTA |
| Services / Booth types | Titles + toggles; links loaded from published collections |
| Company links | About, portfolio, news, legal, etc. |
| Contact | Address, phone, email, WhatsApp, hours, maps, social |
| Newsletter | Optional strip above footer |
| Trust strip | Optional badges above footer |
| Bottom bar | Rights, legal links, created-by |

Local fallback: `src/content/footer.ts` via `resolveFooter(locale)`. Contact falls back to Site Settings when empty.

Revalidate tags: `siteFooter`, `siteFooter-{locale}`.

## Document model

### Singletons

| Document | Purpose |
| --- | --- |
| `siteSettings` | Company, contact, brand, analytics |
| `globalSeo` | Default SEO / robots |
| `homePage` / `aboutPageDoc` / `contactPageDoc` | Page SEO + structured sections |
| `navigation` | Primary + footer menus |
| `dictionary` | Residual UI chrome strings only (JSON blob deprecated) |
| `notFoundPage` | 404 copy |

### Collections

| Type | Routes |
| --- | --- |
| `service` | `/services` hub; detail at `/locations/[city]/services/[slug]` |
| `boothType` | `/booth-types` hub; detail at `/locations/[city]/booth-types/[slug]` |
| `project` | `/work`, `/work/[slug]` |
| `industry` | `/industries`, `/industries/[slug]` |
| `location` | `/locations`, `/locations/[slug]` |
| `newsArticle` | `/news`, `/news/[slug]` |
| `client`, `category`, `author`, `faq`, `testimonial`, `redirect` | Taxonomies / redirects |

Document-level i18n: each content doc has `language: en | ar`.

## Loaders

Under `src/sanity/`:

- `load-site-config.ts` — site settings
- `load-collections.ts` — services, booth types, projects, industries, locations, news, navigation, redirects
- Local fallback always from `src/content/catalog.ts` + `projects.ts`

## Setup

1. Create a Sanity project
2. Copy `.env.example` → `.env.local` and fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=...          # required for draft preview
SANITY_REVALIDATE_SECRET=...       # webhook auth
SANITY_PREVIEW_SECRET=...          # optional; falls back to revalidate secret
```

3. Run `npm run setup:sanity` then `npm run dev`
4. Open Studio: http://localhost:3000/studio

## Revalidation

`POST /api/revalidate`

Tags include: `siteSettings`, `dictionary`, `notFoundPage`, page singletons, and all collection types (`service`, `boothType`, `project`, `industry`, `location`, `newsArticle`, `redirect`, …) plus locale-scoped variants.

## Draft preview

- Enable: `GET /api/draft?secret=...&slug=/en/locations/riyadh/services/booth-design`
- Disable: `GET /api/draft/disable?redirect=/en`
- When draft mode is on, `sanityFetch` uses `perspective=previewDrafts` (needs read token)

## Redirects

Local seed redirects live in `src/content/catalog.ts` (`/portfolio` → `/work`, `/blog` → `/news`) and are applied in `src/proxy.ts` (plus `next.config.ts`). CMS `redirect` documents can be authored in Studio for editorial tracking.

## Merge behavior

Never replace the whole dictionary with a partial CMS payload. Use `resolveDictionary(locale)` so local defaults remain. Prefer structured collection docs over the deprecated `dictionary.content` JSON blob.
