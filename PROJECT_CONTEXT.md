# Project Context

## Snapshot and scope

- Investigated on 2026-09-11 at repository root `/Users/seif/code/work/cps`.
- Git snapshot: branch `main`, commit `25f48559eedadda92558000e0aa6b52cd15cf0da`, tracking `origin/main`.
- The working tree already contained modifications to `package.json` and `package-lock.json` before onboarding. This investigation preserved them and changed only this file.
- Evidence covered repository instructions, maintained source and configuration, human docs, bounded Git history/diffs, installed top-level packages, route and API entry points, representative content loaders, Sanity queries/transformers/schemas, and form persistence. Generated output, dependency source, the full 13,194-line stylesheet, every component, and every content record were not read line by line.
- No live website, Sanity dataset, webhook, analytics account, or deployment platform was queried. Checked-in configuration is described below; it does not establish that a production deployment is healthy.

## System overview

CPS is one bilingual (`en`, `ar`) marketing application for a Saudi production/fabrication company. It runs as a Next.js 16 App Router process with an embedded Sanity Studio at `/studio`; there are no separate application services in this repository. Public pages render from local TypeScript content with optional Sanity overlays/fallbacks, while contact and project-brief POSTs require Sanity write access to persist submissions.

The maintained public model centers on eight service families and 122 locally defined catalogue items, plus production capabilities, five local portfolio projects, seven legacy locations, two local news articles, and legacy booth/industry collections. The canonical service routes are top-level; many former location/service, booth-type, industry, portfolio, and blog URLs are redirected in [`next.config.ts`](next.config.ts).

## Repository map and architecture

- [`src/app`](src/app) is the App Router entry tree. The root layout loads site settings and brand styles; the locale layout validates `en|ar`, establishes direction, and wraps content in shared chrome ([`src/app/layout.tsx`](src/app/layout.tsx), [`src/app/[locale]/layout.tsx`](src/app/%5Blocale%5D/layout.tsx)).
- [`src/proxy.ts`](src/proxy.ts) applies local content redirects, bypasses assets/API/Studio, writes an `x-site-locale` header for localized requests, and redirects unlocalized paths to English.
- [`src/components/layout`](src/components/layout) owns the header/footer shell. [`SiteChrome`](src/components/layout/site-chrome.tsx) resolves navigation and footer concurrently, then injects the canonical eight-service links.
- [`src/components/sections`](src/components/sections) contains reusable page sections. Server Components are the default convention, but interactivity is deliberately isolated into client components for forms, navigation, motion, filters, accordions, the catalogue browser, and 3D views.
- [`src/content/dictionaries.local.ts`](src/content/dictionaries.local.ts) is the bilingual UI/page fallback; [`src/content/service-architecture.ts`](src/content/service-architecture.ts) is the canonical service and catalogue model; [`src/content/projects.ts`](src/content/projects.ts) supplies portfolio fallback/filter data; and [`src/content/catalog.ts`](src/content/catalog.ts) retains legacy services/booth types plus industries, locations, news, and local redirects.
- [`src/lib`](src/lib) contains locale, SEO, content-resolution, navigation/footer, and mutable site-config helpers. Local path generation belongs in [`src/lib/i18n.ts`](src/lib/i18n.ts), not hard-coded locale URLs.
- [`src/sanity`](src/sanity) contains the read/write clients, GROQ, mapping, fallback loaders, and submission persistence. [`sanity/schemaTypes`](sanity/schemaTypes) defines Studio documents/objects, and [`sanity.config.ts`](sanity.config.ts) builds the Studio desk structure.
- [`scripts/seed-sanity.ts`](scripts/seed-sanity.ts) creates/fills stable bilingual documents. [`scripts/migrate-blueprint-content.ts`](scripts/migrate-blueprint-content.ts) is a dry-run-by-default, revision-checked migration for Blueprint v5 content.
- Styling is centralized in [`src/app/globals.css`](src/app/globals.css), Tailwind v4 is loaded through [`postcss.config.mjs`](postcss.config.mjs), and Alexandria is bundled through [`src/lib/fonts.ts`](src/lib/fonts.ts). Framer Motion/Lottie drive UI motion; React Three Fiber/Drei render optional booth models.

### Content precedence

The content system is intentionally hybrid, not simply “CMS first”:

1. Local content provides complete renderable defaults.
2. [`sanityFetch`](src/sanity/fetch.ts) returns `null` when Sanity is not configured or a fetch fails, caches published reads for one hour outside development, and disables caching for draft preview.
3. Collection loaders map valid Sanity documents and selectively fill missing fields/media from matching local records ([`src/sanity/load-collections.ts`](src/sanity/load-collections.ts)). Project lists append local-only records even when CMS records exist.
4. [`resolveDictionary`](src/lib/dictionary.ts) merges local dictionary, residual CMS dictionary JSON, structured page overlays, and CMS navigation. It includes guards against legacy hero/about/service content.
5. Canonical service pages always require a matching local service architecture record. CMS media may overlay it, but CMS service copy overlays only when `blueprintVersion === 5` ([`src/app/[locale]/services/[serviceSlug]/page.tsx`](src/app/%5Blocale%5D/services/%5BserviceSlug%5D/page.tsx)). Catalogue structure and catalogue-page content are local-only at runtime.

## Representative execution flows

### Canonical service page request

1. `next.config.ts` handles configured compatibility redirects before the route; [`src/proxy.ts`](src/proxy.ts) supplies a missing `/en` prefix or passes a valid locale.
2. [`src/app/[locale]/layout.tsx`](src/app/%5Blocale%5D/layout.tsx) rejects unsupported locales, loads optional Sanity site settings, sets LTR/RTL, and resolves shared navigation/footer through `SiteChrome`.
3. [`src/app/[locale]/services/[serviceSlug]/page.tsx`](src/app/%5Blocale%5D/services/%5BserviceSlug%5D/page.tsx) resolves the local service and loads the same slug from Sanity.
4. The route overlays CMS hero/media and Blueprint-v5-authorized copy onto the complete local record, loads projects, and renders breadcrumbs plus [`ServiceArchitecturePage`](src/components/sections/service-architecture-page.tsx).
5. Metadata uses local service title/excerpt/image and global site config. Unlike projects/news/locations, this canonical route does not currently pass `cmsService.seo` to `buildPageMetadata`.

### Quote/contact submission

1. [`QuoteForm`](src/components/forms/quote-form.tsx) can preselect catalogue item/layout query parameters, validates required fields and up to five 10 MiB reference files, and sends multipart data to `/api/contact`. The contact page uses a separate role-based form for clients, applicants, and partners; partner enquiries can include company, banking, and supporting-document fields ([`src/components/forms/contact-form.tsx`](src/components/forms/contact-form.tsx)).
2. [`POST /api/contact`](src/app/api/contact/route.ts) parses JSON or multipart input, accepts honeypot hits as successful no-ops, validates either the quote or role-based contact workflow, and sends the submission plus reference or partner documents through Resend.
3. [`src/lib/resend.ts`](src/lib/resend.ts) renders escaped HTML and plain-text email, reads server-only sender/recipient settings, and waits for Resend delivery acceptance before the endpoint reports success. Contact submissions are not persisted in Sanity.
4. `/api/brief` remains a separate persist-first Sanity workflow without file uploads and can optionally POST to `BRIEF_WEBHOOK_URL` after saving.

### Testimonials

Published `testimonial` documents are loaded by locale through [`loadTestimonials`](src/sanity/load-collections.ts) and replace `dictionary.clients.items` in the existing carousel. The local bilingual dictionary remains the fallback when Sanity has no valid testimonial rows. Queries use shared and locale-specific testimonial cache tags, both covered by the revalidation endpoint.
The shared carousel is rendered on the homepage after the Why CPS section and on inner pages that enable client proof. The homepage follows it with the shared role-based contact form before the closing CTA.

## Development and configuration

Commands discovered in [`package.json`](package.json):

- `npm run dev`, `npm run build`, `npm run start`
- `npm run lint`
- `npm run studio`
- `npm run setup:sanity`
- `npm run seed:sanity`

Node/npm versions are not pinned through `.nvmrc`, `.node-version`, `engines`, or a `packageManager` field. The current install resolves Next 16.3.4, React 19.2.4, TypeScript 5.9.3, Sanity 5.14.1, and next-sanity 11.6.13; the working-tree manifest/lock changes are not part of the committed snapshot.

Configuration names observed (values deliberately not recorded):

- Site/SEO: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ALLOW_INDEXING`, `VERCEL_ENV`.
- Sanity reads/Studio: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (default `production`), `NEXT_PUBLIC_SANITY_API_VERSION` (default `2025-01-01`), `NEXT_PUBLIC_SANITY_STUDIO_URL`, `SANITY_API_READ_TOKEN`, `SANITY_STUDIO_HOSTNAME`.
- Server writes/security: `SANITY_API_WRITE_TOKEN` (or legacy `SANITY_API_TOKEN`), `SANITY_REVALIDATE_SECRET`, `SANITY_PREVIEW_SECRET`.
- Contact email: `RESEND_API_KEY`, `EMAIL_FROM_NAME`, `EMAIL_FROM_ADDRESS`, `EMAIL_TO_ADDRESS`.
- Integrations/media: `BRIEF_WEBHOOK_URL`, `NEXT_PUBLIC_HERO_VIDEO_URL`.
- Site Settings in Sanity can override company/contact data, brand colors, analytics identifiers, SEO defaults, and selected media through [`src/sanity/load-site-config.ts`](src/sanity/load-site-config.ts) and [`src/lib/site-config.ts`](src/lib/site-config.ts).

The seed script manually reads `.env.local` only when a variable is not already in the process environment ([`scripts/seed-sanity.ts`](scripts/seed-sanity.ts)); Next.js handles application environment loading. A local ignored `.env` exists in this workspace, but only variable names were inspected. The checked-in `.env.example` documents Sanity and Resend configuration without secret values.

Indexing is off unless `NEXT_PUBLIC_ALLOW_INDEXING=true`, and is forced off on non-production Vercel environments ([`src/lib/seo.ts`](src/lib/seo.ts), [`src/app/robots.ts`](src/app/robots.ts)). The sitemap generates both locales and hreflang alternates for canonical static, service/catalogue, project, and news routes ([`src/app/sitemap.ts`](src/app/sitemap.ts)).

## Infrastructure and persistence

- No Dockerfile, Compose file, checked-in GitHub Actions workflow, `vercel.json`, Terraform, or other deployment definition was found. Vercel is suggested by `@vercel/analytics`, `VERCEL_ENV`, docs, and `.vercel` ignores, but deployment topology and production settings are unverified.
- Sanity is the only configured persistent store. Published content reads use the CDN client by default; preview reads use an authenticated non-CDN client with `previewDrafts`; submissions/assets use a separate token-bearing write client ([`src/sanity/client.ts`](src/sanity/client.ts), [`src/sanity/fetch.ts`](src/sanity/fetch.ts), [`src/sanity/write-client.ts`](src/sanity/write-client.ts)).
- Primary documents include locale singletons (`homePage`, `aboutPageDoc`, `contactPageDoc`, `hubPage`, `navigation`, `dictionary`, `siteFooter`, `notFoundPage`), global `siteSettings`/`globalSeo`, collections (`service`, `boothType`, `project`, `industry`, `location`, `newsArticle`, `client`), taxonomies, redirects, and contact/brief submissions ([`sanity/schemaTypes/index.ts`](sanity/schemaTypes/index.ts)).
- Content i18n is document-level through required `language: en|ar` on most content types; dictionary/not-found use `locale`. Projects can reference clients, industries, booth types, locations, and multiple services while retaining explicit `serviceSlug`/`industrySlug` filter fields ([`sanity/schemaTypes/documents/content.ts`](sanity/schemaTypes/documents/content.ts)). News references category, author, projects, services, and industries.
- “Migration” is application content synchronization rather than a versioned database-schema migration framework. Seed is non-destructive by default (`createIfNotExists` + `setIfMissing`) and destructive replacement requires `SANITY_SEED_REPLACE=true`. The Blueprint migration produces a change plan, and `--apply` writes a private temporary backup then commits revision-guarded patches in one transaction.
- Optional outbound dependencies are Sanity CDN/API, Vercel Analytics, configured Google Analytics/Tag Manager, webhook targets, and remote images from Sanity, Unsplash, or placehold.co. Their availability was not tested.

## Authentication, authorization, and API conventions

- Public pages and form POSTs have no user identity/session model. The form endpoints are intentionally unauthenticated; repository-level abuse protection consists of input checks and a hidden honeypot.
- Studio identity and dataset permissions are delegated to Sanity; no custom role/tenant authorization exists in this codebase. Actual Sanity project visibility, CORS origins, and role assignments are external and unverified.
- `/api/revalidate` uses a shared bearer/body secret outside development and returns 401 on mismatch; it invalidates broad global and locale cache tags plus root layouts ([`src/app/api/revalidate/route.ts`](src/app/api/revalidate/route.ts)).
- `/api/draft` enables the Next draft cookie and selects the Sanity `previewDrafts` perspective. `/api/draft/disable` clears it. These are shared-secret preview mechanics, not end-user authentication.
- API handlers use `NextResponse.json`, status 400 for malformed input, 422 for validation, 401 for revalidation authentication, 501 for missing production revalidation configuration, and 502 for failed required Sanity persistence. There is no API versioning or pagination because the public API surface is limited to forms, preview, and revalidation.
- Collection GROQ queries consistently filter by locale and exclude records whose custom `status` is `archived`; they order by explicit `order`, project year/title, or article publication date ([`src/sanity/queries/collections.ts`](src/sanity/queries/collections.ts)).

## Tests and verification

No repository-owned unit, integration, or end-to-end test files or runner configuration were found after searching test symbols/configuration. Playwright is installed as a dependency but has no checked-in config or tests, and `package.json` has no test script. No CI workflow was found to establish external test commands.

Checks executed successfully against the current working tree:

- `npm run lint` — ESLint exited 0.
- `./node_modules/.bin/tsc --noEmit --incremental false` — TypeScript exited 0 without writing incremental state.
- `npm ls --depth=0` — exited 0 and reported a resolved top-level dependency tree.

`npm run build` was not run because onboarding is read-only apart from this document and a Next build writes `.next`. No dev server, browser smoke test, live form submission, seed, migration, webhook, or production probe was run.

## Conventions for future changes

- Read the relevant installed Next.js guide under `node_modules/next/dist/docs/` before changing routing or metadata ([`AGENTS.md`](AGENTS.md)).
- Keep routes locale-first and generate shared links with `localizePath`; validate dynamic locale params with `isLocale` and use `notFound()` on invalid entities.
- Prefer Server Components; add `"use client"` only at an interaction boundary. Shared chrome remains under `components/layout`, reusable content blocks under `components/sections`, and page files compose rather than duplicate them.
- Keep all new public copy bilingual. Add fallback chrome to `dictionaries.local.ts`, structured fallback records to their content modules, and update/seed matching Sanity documents when the CMS owns the field.
- Preserve the explicit nested merge/fallback rules. A shallow dictionary merge can erase required fields; incomplete CMS collection media/copy should continue to fall back safely.
- Canonical service slugs and catalogues belong in `service-architecture.ts`. Legacy paths should redirect to canonical services/catalogue items and should not be added to the sitemap.
- Use the centralized SEO builders and structured data helpers; indexing remains opt-in until the production URL/content is ready.
- Update docs when route, content ownership, CMS, or behavior changes.

## Documentation discrepancies and historical context

### Confirmed discrepancies

- [`README.md`](README.md) lines 6 and 53-61 and [`docs/development.md`](docs/development.md) describe a hero-only homepage, but [`src/app/[locale]/page.tsx`](src/app/%5Blocale%5D/page.tsx) currently renders lifecycle, services, production capabilities, featured work, Why CPS, and a closing CTA.
- README and Sanity docs instruct copying `.env.example`, but no such tracked file exists. Because `.env*` is globally ignored in [`.gitignore`](.gitignore), a template would require an explicit ignore exception.
- [`docs/content.md`](docs/content.md) says FeaturedWork is not on the homepage; it is rendered there now.
- [`AGENTS.md`](AGENTS.md) says `/booth-types` remains a legacy index, but `next.config.ts` permanently redirects `/:locale/booth-types` to the Exhibitions & Booths catalogue. A page implementation remains checked in but is bypassed by that redirect.
- Sanity docs say every collection SEO field can be overridden freely. Project/news/location/industry detail metadata uses mapped CMS SEO, but the canonical service detail metadata currently uses only local service fields even though service queries and transformers carry `seo`.
- The Studio publish plugin POSTs `/api/revalidate` without the required production secret, while the production handler requires that secret. The plugin catches and suppresses the resulting failure, so Studio publish-triggered refresh works in development but is not authenticated in production ([`sanity/plugins/publish-revalidate.ts`](sanity/plugins/publish-revalidate.ts), [`src/app/api/revalidate/route.ts`](src/app/api/revalidate/route.ts)). A separately configured Sanity webhook can still call the endpoint correctly.

### Verified history

- `a1a0b7d` introduced bilingual Sanity seeding, CMS-backed collection/page loaders, and sitemap/static-param loading with local fallback. Its diff establishes the hybrid content model rather than relying only on its commit message.
- `b25ae0d` temporarily made location-scoped service and booth pages the primary detail model and removed older top-level detail pages.
- `060a7c0` reversed that URL strategy for Blueprint v5: it added the current top-level service/catalogue routes and converted location/booth/industry URLs to redirects, while adding the eight-family service architecture and structured project filter fields.
- `9f1b11f` then expanded local projects to multiple service slugs, added city-specific catalogue SEO anchors, and propagated `blueprintVersion`/multi-service data through Sanity queries and transformers.
- `25f4855` is a focused mobile-navigation/accessibility change and is the current committed revision.

## Current work and risks

### Current working state

- Pre-existing `package.json`/`package-lock.json` edits change the Next/Sanity dependency set (including Next 16.3.4, Sanity 5.14.1, next-sanity 11.6.13, and an `allowScripts` block). Static checks pass with the installed versions, but the intent and deployment compatibility of this uncommitted dependency change were not established.

### Confirmed risks/findings

- Draft preview authentication is fail-open: [`src/app/api/draft/route.ts`](src/app/api/draft/route.ts) validates only when either preview/revalidation secret exists. If both are absent, any caller can enable draft mode. It also accepts protocol-relative `slug` values beginning with `//`, which can redirect off-origin after enabling draft mode; the disable route similarly accepts an unchecked redirect parameter.
- Form submission endpoints have no in-repository rate limiter, CAPTCHA, origin check, or upload content-type allowlist. A honeypot and 5-file/10-MiB-per-file limits reduce some abuse, but anonymous callers can still consume Sanity write/storage quota. External WAF/rate-limit controls may exist, but none are checked in or verified.
- Studio publish revalidation is best-effort and currently omits production authentication, so editors may see published content remain cached for up to the normal one-hour fetch lifetime unless an external authenticated webhook is configured.
- Canonical service SEO fields authored in Sanity do not reach the canonical service route’s metadata builder.
- Large, centralized source files (`globals.css`, `catalog.ts`, bilingual dictionary) increase merge/conflict and review risk; this is a maintainability observation, not evidence of a runtime defect.

### Suspected concerns requiring more evidence

- A live production smoke test is needed to establish whether current redirects, draft mode, cache invalidation, Studio login, remote images, forms, and RTL layout behave correctly behind the actual host/CDN.
- Sanity project settings are needed to verify dataset visibility, CORS, token scope, editor roles, and whether an authenticated revalidation webhook compensates for the embedded plugin behavior.
- Dependency-owner confirmation or a dedicated diff review is needed before accepting the uncommitted Next/Sanity version changes.

## Coverage and open questions

- Boundary, reconnaissance, docs, architecture, representative data flows, dependencies/tooling, environment names, persistence, authentication/authorization, APIs, tests, history, conventions, risks, and current work were inspected.
- Docker/infrastructure-as-code and CI are not applicable to the checked-in tree because no definitions were found; actual hosting configuration remains unverified.
- A traditional relational database, ORM, migration directory, queues, workers, scheduled jobs, and multi-tenant authorization model are not present in the maintained source. Sanity is the only declared persistence layer.
- Runtime performance, accessibility in a browser, visual fidelity, production build output, and external integration health remain unverified because onboarding avoided generated artifacts and live side effects.
- Open operational questions: Which host is authoritative? Is an authenticated Sanity webhook configured? Are form endpoints protected upstream? Are the dependency changes intentional? Should catalogue content remain local-only, or become CMS-editable?
