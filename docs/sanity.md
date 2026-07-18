# Sanity CMS (optional)

The site runs fully without Sanity using local dictionaries, `src/content/catalog.ts`, `projects.ts`, and `site-config` defaults. CMS content merges on top when configured.

## Seed (EN + AR)

Idempotent seed from local content into Sanity:

```bash
# .env.local needs project id, dataset, and a write token
SANITY_API_WRITE_TOKEN=...

npm run seed:sanity
```

The default seed is non-destructive: it creates missing documents and fills missing
top-level fields without overwriting editor changes. To intentionally replace all
seeded documents with local defaults, run:

```bash
SANITY_SEED_REPLACE=true npm run seed:sanity
```

Stable IDs include `service-booth-design-en`, `homePage-ar`,
`navigation-en`, and `client-neom-en`.

Seeded image fields use URL fallbacks so pages stay complete before assets are
uploaded. Editors can replace those fallbacks in Studio with Sanity-hosted images.
Project motion sections accept either an MP4/WebM URL or an uploaded video file.
Booth types accept uploaded/external GLB or GLTF models and editable galleries.

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
| `siteSettings` | Company, contact, brand, analytics, default SEO |
| `globalSeo` | Default SEO / org name / Twitter handle |
| `homePage` | Home hero + section JSON overlay + SEO (wired via `resolveDictionary`) |
| `aboutPageDoc` | About page copy + SEO (wired via `loadAboutPage`) |
| `contactPageDoc` | Contact page + brief form JSON + SEO (wired via `loadContactPage`) |
| `hubPage` | Index hubs (services, booth types, work, industries, locations, news) — chrome + SEO |
| `navigation` | Primary + footer menus |
| `dictionary` | Residual UI chrome / full JSON fallback |
| `notFoundPage` | 404 copy + SEO |

Every collection document (`service`, `boothType`, `project`, …) and page singleton has an `seo` (`seoMeta`) field. Seed fills title/description/keywords from local content; override freely in Studio.

### Collections

| Type | Routes |
| --- | --- |
| `service` | `/services` hub; detail at `/locations/[city]/services/[slug]` |
| `boothType` | `/booth-types` hub; detail at `/locations/[city]/booth-types/[slug]` — includes comparison flags |
| `project` | `/work`, `/work/[slug]` |
| `industry` | `/industries`, `/industries/[slug]` |
| `location` | `/locations`, `/locations/[slug]` |
| `newsArticle` | `/news`, `/news/[slug]` |
| `client` | Logo marquee (`loadClients`) |
| `category`, `author`, `faq`, `testimonial`, `redirect` | Taxonomies / redirects |

Document-level i18n: each content doc has `language: en | ar`.

### Media ownership

- Services, booth types, projects, industries, locations, and news support uploaded
  hero media with seeded URL fallbacks.
- Project and booth-type galleries can use uploaded images or URL fallbacks.
- Project motion video accepts an upload or URL; an uploaded file wins.
- Booth-type 3D models accept GLB/GLTF upload or URL; an uploaded model wins.
- Site Settings controls the optional home hero poster/video.
- Uploaded media is resolved from Sanity's image/file CDN; local URLs remain as a
  safe fallback when CMS media is incomplete.

## Loaders

Under `src/sanity/`:

- `load-site-config.ts` — site settings
- `load-collections.ts` — services, booth types, projects, industries, locations, news, clients, navigation, redirects
- `load-pages.ts` — home overlay, about, contact page docs
- Local fallback always from `src/content/*` when Sanity is empty or unconfigured

Sitemap and `generateStaticParams` use these loaders (CMS-first).

## CMS vs residual dictionary

| Editable in Studio | Residual local / dictionary |
| --- | --- |
| Collections, nav, footer, clients | Form field labels, coming-soon, some chrome |
| `homePage` / `aboutPageDoc` / `contactPageDoc` | Thin button labels if not in page docs |
| Booth comparison flags on `boothType` | Local `booth-comparison.ts` fallback matrix |

## Setup

1. Create a Sanity project
2. Copy `.env.example` → `.env.local` and fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=...          # required for draft preview
SANITY_API_WRITE_TOKEN=...         # required for npm run seed:sanity
SANITY_REVALIDATE_SECRET=...       # webhook auth
SANITY_PREVIEW_SECRET=...          # optional; falls back to revalidate secret
```

3. Run `npm run setup:sanity`, then `npm run seed:sanity`, then `npm run dev`
4. Open Studio: http://localhost:3000/studio

## Form inbox (Contact + Brief)

Contact and brief form POSTs create Sanity documents:

| Form | Document type | Studio |
| --- | --- | --- |
| `/api/contact` | `contactSubmission` | Inbox → Contact submissions |
| `/api/brief` | `briefSubmission` | Inbox → Brief submissions |

Requires `SANITY_API_WRITE_TOKEN` on the server (local `.env.local` and Vercel). Optional `CONTACT_WEBHOOK_URL` / `BRIEF_WEBHOOK_URL` still fire after a successful Sanity save.

## Revalidation

`POST /api/revalidate`

Tags include: `siteSettings`, `dictionary`, `notFoundPage`, page singletons (`homePage`, `aboutPageDoc`, `contactPageDoc`), and all collection types (`service`, `boothType`, `project`, `industry`, `location`, `newsArticle`, `client`, `redirect`, …) plus locale-scoped variants.

## Draft preview

- Enable: `GET /api/draft?secret=...&slug=/en/locations/riyadh/services/booth-design`
- Disable: `GET /api/draft/disable?redirect=/en`
- When draft mode is on, `sanityFetch` uses `perspective=previewDrafts` (needs read token)

## Redirects

Local seed redirects live in `src/content/catalog.ts` (`/portfolio` → `/work`, `/blog` → `/news`) and are applied in `src/proxy.ts` (plus `next.config.ts`). CMS `redirect` documents can be authored in Studio for editorial tracking.

## Merge behavior

Never replace the whole dictionary with a partial CMS payload. Use `resolveDictionary(locale)` so local defaults remain, then structured page docs (`homePage`, `aboutPageDoc`, `contactPageDoc`) win for their fields. Prefer structured collection docs over the deprecated `dictionary.content` JSON blob.
