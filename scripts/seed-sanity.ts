/**
 * Idempotent Sanity seed — EN + AR documents from local content.
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=... npm run seed:sanity
 *
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID + NEXT_PUBLIC_SANITY_DATASET.
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";
import { getBoothComparisonRow } from "../src/content/booth-comparison";
import {
  boothTypes,
  industries,
  locations,
  newsArticles,
  redirects,
  services,
} from "../src/content/catalog";
import { clientLogos } from "../src/content/clients";
import { getDictionaryLocal } from "../src/content/dictionaries.local";
import { getFooterLocal } from "../src/content/footer";
import { getNavigationLocal } from "../src/content/navigation";
import { projects } from "../src/content/projects";
import { getSiteConfig } from "../src/lib/site-config";
import type { Locale } from "../src/lib/i18n";

/** Load .env.local into process.env when running outside Next.js. */
function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
  process.exit(1);
}
if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN (or SANITY_API_TOKEN)");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const locales: Locale[] = ["en", "ar"];

function id(...parts: string[]) {
  return parts.join("-");
}

async function upsert(doc: Record<string, unknown> & { _id: string; _type: string }) {
  if (process.env.SANITY_SEED_REPLACE === "true") {
    await client.createOrReplace(doc);
  } else {
    const { _id, _type, ...fields } = doc;
    await client
      .transaction()
      .createIfNotExists({ _id, _type })
      .patch(_id, (patch) => patch.setIfMissing(fields))
      .commit();
  }
  console.log(`  ✓ ${doc._type} ${doc._id}`);
}

function slugValue(slug: string) {
  return { _type: "slug", current: slug };
}

function seoMeta(title: string, description: string, keywords: string[] = []) {
  return {
    title,
    description,
    keywords,
    noIndex: false,
  };
}

async function seedSettings() {
  console.log("\n→ siteSettings + globalSeo");
  const config = getSiteConfig();
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: config.name,
    legalName: config.legalName,
    tagline: config.tagline,
    description: config.description,
    email: config.email,
    phone: config.phone,
    phoneDisplay: config.phoneDisplay,
    whatsappMessage: config.whatsappMessage,
    addressCity: config.address.city,
    addressCountry: config.address.country,
    addressCountryName: config.address.countryName,
    googleMapsUrl: config.googleMapsUrl,
    brandColors: config.brandColors,
    defaultKeywords: config.defaultKeywords,
    defaultSeoByLocale: config.defaultSeoByLocale,
    defaultSeo:
      config.defaultSeo ??
      seoMeta(
        config.defaultSeoByLocale?.find((entry) => entry.locale === "en")
          ?.title ?? `${config.name} — ${config.tagline}`,
        config.defaultSeoByLocale?.find((entry) => entry.locale === "en")
          ?.description ?? config.description,
        config.defaultKeywords ?? [],
      ),
    socialLinks: [
      { _key: "ig", platform: "instagram", url: config.social.instagram, label: "Instagram" },
      { _key: "li", platform: "linkedin", url: config.social.linkedin, label: "LinkedIn" },
      { _key: "x", platform: "x", url: config.social.x, label: "X" },
    ],
    footerExploreLinks: config.footerExploreLinks,
  });
  const enSeo = config.defaultSeoByLocale?.find((entry) => entry.locale === "en");
  await upsert({
    _id: "globalSeo",
    _type: "globalSeo",
    organizationName: config.legalName,
    twitterHandle: "@cps",
    defaultSeo:
      config.defaultSeo ??
      seoMeta(
        enSeo?.title ?? `${config.name} — ${config.tagline}`,
        enSeo?.description ?? config.description,
        config.defaultKeywords ?? [],
      ),
  });
}

async function seedClients() {
  console.log("\n→ clients");
  for (const locale of locales) {
    for (const [index, logo] of clientLogos.entries()) {
      const slug = logo.name.toLowerCase().replace(/\s+/g, "-");
      await upsert({
        _id: id("client", slug, locale),
        _type: "client",
        language: locale,
        status: "published",
        name: logo.name,
        logoUrl: logo.src,
        order: index + 1,
      });
    }
  }
}

async function seedServices() {
  console.log("\n→ services");
  for (const locale of locales) {
    for (const service of services) {
      const loc = service[locale];
      await upsert({
        _id: id("service", service.slug, locale),
        _type: "service",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(service.slug),
        excerpt: loc.excerpt,
        overview: loc.overview,
        overviewTitle: loc.overviewTitle,
        overviewBullets: (loc.overviewBullets ?? []).map((item, i) => ({
          _key: `ob-${i}`,
          title: item.title,
          description: item.description,
        })),
        heroLead: loc.heroLead,
        secondaryCta: loc.secondaryCta,
        heroUrl: service.image,
        cover: loc.cover
          ? {
              eyebrow: loc.cover.eyebrow,
              title: loc.cover.title,
              support: loc.cover.support,
              items: loc.cover.items.map((item, i) => ({
                _key: `cover-${i}`,
                title: item.title,
                description: item.description,
              })),
            }
          : undefined,
        designs: loc.designs
          ? {
              eyebrow: loc.designs.eyebrow,
              title: loc.designs.title,
              support: loc.designs.support,
              cta: loc.designs.cta,
              items: loc.designs.items.map((item, i) => ({
                _key: `design-${i}`,
                title: item.title,
                description: item.description,
                imageUrl: item.image,
                imageAlt: item.imageAlt,
                serviceSlug: item.serviceSlug,
              })),
            }
          : undefined,
        why: loc.why
          ? {
              title: loc.why.title,
              support: loc.why.support,
              items: loc.why.items.map((item, i) => ({
                _key: `why-${i}`,
                title: item.title,
                description: item.description,
              })),
            }
          : undefined,
        benefits: loc.benefits.map((item, i) => ({
          _key: `ben-${i}`,
          title: item.title,
          description: item.description,
        })),
        process: loc.process.map((item, i) => ({
          _key: `proc-${i}`,
          title: item.title,
          description: item.description,
          imageUrl: item.image,
          imageAlt: item.imageAlt,
        })),
        faq: loc.faq.map((item, i) => ({
          _key: `faq-${i}`,
          question: item.question,
          answer: item.answer,
        })),
        order: service.order,
        seo: seoMeta(
          `CPS — ${loc.title}`,
          loc.excerpt || loc.heroLead || loc.overview,
          [loc.title, "exhibition booth", "CPS"],
        ),
      });
    }
  }
}

async function seedBoothTypes() {
  console.log("\n→ boothTypes");
  for (const locale of locales) {
    for (const booth of boothTypes) {
      const loc = booth[locale];
      const compare = getBoothComparisonRow(booth.slug);
      await upsert({
        _id: id("boothType", booth.slug, locale),
        _type: "boothType",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(booth.slug),
        excerpt: loc.excerpt,
        overviewTitle: loc.overviewTitle,
        description: loc.description,
        heroUrl: booth.image,
        model3d: booth.model3d,
        gallery: [
          {
            _key: "gallery-hero",
            imageUrl: booth.image,
            alt: booth.imageAlt,
          },
        ],
        compareLabel: compare
          ? locale === "ar"
            ? compare.label.ar
            : compare.label.en
          : undefined,
        indoor: compare?.indoor ?? true,
        outdoor: compare?.outdoor ?? false,
        reusable: compare?.reusable ?? true,
        highCustomization: compare?.highCustomization ?? false,
        fastSetup: compare?.fastSetup ?? false,
        features: loc.features.map((item, i) => ({
          _key: `feat-${i}`,
          title: item.title,
          description: item.description,
        })),
        advantages: loc.advantages.map((item, i) => ({
          _key: `adv-${i}`,
          title: item.title,
          description: item.description,
        })),
        useCases: loc.useCases,
        faq: loc.faq.map((item, i) => ({
          _key: `faq-${i}`,
          question: item.question,
          answer: item.answer,
        })),
        order: booth.order,
        seo: seoMeta(
          `CPS — ${loc.title}`,
          loc.excerpt || loc.description,
          [loc.title, "booth type", "CPS"],
        ),
      });
    }
  }
}

async function seedIndustries() {
  console.log("\n→ industries");
  for (const locale of locales) {
    for (const industry of industries) {
      const loc = industry[locale];
      await upsert({
        _id: id("industry", industry.slug, locale),
        _type: "industry",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(industry.slug),
        excerpt: loc.excerpt,
        overview: loc.overview,
        heroUrl: industry.image,
        challenges: loc.challenges.map((item, i) => ({
          _key: `ch-${i}`,
          title: item.title,
          description: item.description,
        })),
        solutions: loc.solutions.map((item, i) => ({
          _key: `sol-${i}`,
          title: item.title,
          description: item.description,
        })),
        recommendedBoothTypes: industry.recommendedBoothTypeSlugs.map(
          (slug, i) => ({
            _key: `rb-${i}`,
            _type: "reference",
            _ref: id("boothType", slug, locale),
          }),
        ),
        order: industry.order,
        seo: seoMeta(`CPS — ${loc.title}`, loc.excerpt || loc.overview, [
          loc.title,
          "industry",
          "CPS",
        ]),
      });
    }
  }
}

async function seedLocations() {
  console.log("\n→ locations");
  for (const locale of locales) {
    for (const location of locations) {
      const loc = location[locale];
      await upsert({
        _id: id("location", location.slug, locale),
        _type: "location",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(location.slug),
        countryCode: location.countryCode,
        excerpt: loc.excerpt,
        localExperience: loc.localExperience,
        heroUrl: location.image,
        capabilities: (loc.capabilities ?? []).map((item, i) => ({
          _key: `cap-${i}`,
          title: item.title,
          description: item.description,
        })),
        order: location.order,
        seo: seoMeta(
          `CPS — ${loc.title}`,
          loc.excerpt || loc.localExperience,
          [loc.title, "exhibition", "CPS"],
        ),
      });
    }
  }
}

async function seedProjects() {
  console.log("\n→ projects");
  for (const locale of locales) {
    for (const project of projects) {
      const loc = project[locale];
      await upsert({
        _id: id("project", project.slug, locale),
        _type: "project",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(project.slug),
        year: project.year,
        summary: loc.summary,
        challenge: loc.challenge,
        solution: loc.approach,
        result: loc.outcome,
        technologies: project.technologies ?? [],
        event: project.event,
        size: project.size,
        featured: project.featured ?? false,
        motionVideo: project.motionVideo,
        heroUrl: project.image,
        gallery: project.gallery.map((imageUrl, i) => ({
          _key: `gallery-${i}`,
          imageUrl,
          alt: `${loc.title} gallery image ${i + 1}`,
        })),
        industry: project.industrySlug
          ? {
              _type: "reference",
              _ref: id("industry", project.industrySlug, locale),
            }
          : undefined,
        boothType: project.boothTypeSlug
          ? {
              _type: "reference",
              _ref: id("boothType", project.boothTypeSlug, locale),
            }
          : undefined,
        location: project.locationSlug
          ? {
              _type: "reference",
              _ref: id("location", project.locationSlug, locale),
            }
          : undefined,
        seo: seoMeta(`CPS — ${loc.title}`, loc.summary, [
          loc.title,
          "portfolio",
          "CPS",
        ]),
      });
    }
  }
}

async function seedNews() {
  console.log("\n→ news");
  for (const locale of locales) {
    for (const article of newsArticles) {
      const loc = article[locale];
      await upsert({
        _id: id("newsArticle", article.slug, locale),
        _type: "newsArticle",
        language: locale,
        status: "published",
        title: loc.title,
        slug: slugValue(article.slug),
        excerpt: loc.excerpt,
        featuredImageUrl: article.image,
        publishedAt: article.publishedAt,
        readingTime: article.readingTime,
        tags: article.tags ?? [],
        body: (loc.body ?? []).map((paragraph, i) => ({
          _key: `b-${i}`,
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: `t-${i}`,
              _type: "span",
              text: paragraph,
              marks: [],
            },
          ],
        })),
        seo: seoMeta(`CPS — ${loc.title}`, loc.excerpt, [
          loc.title,
          "insights",
          "CPS",
        ]),
      });
    }
  }
}

async function seedNavigation() {
  console.log("\n→ navigation");
  for (const locale of locales) {
    const nav = getNavigationLocal(locale);
    await upsert({
      _id: id("navigation", locale),
      _type: "navigation",
      language: locale,
      ctaLabel: nav.cta.label,
      ctaHref: nav.cta.href,
      footer: nav.footer.map((link, i) => ({
        _key: `f-${i}`,
        label: link.label,
        href: link.href,
      })),
      items: nav.items.map((item, i) => ({
        _key: `item-${i}`,
        enabled: item.enabled,
        label: item.label,
        href: item.href,
        kind: item.kind,
        dropdown: item.dropdown?.map((link, j) => ({
          _key: `dd-${i}-${j}`,
          label: link.label,
          href: link.href,
          description: link.description,
        })),
        mega: item.mega
          ? {
              enabled: item.mega.enabled,
              layout: item.mega.layout,
              title: item.mega.title,
              description: item.mega.description,
              columns: item.mega.columns.map((col, j) => ({
                _key: `col-${i}-${j}`,
                title: col.title,
                links: col.links.map((link, k) => ({
                  _key: `lnk-${i}-${j}-${k}`,
                  label: link.label,
                  href: link.href,
                  description: link.description,
                })),
              })),
              cta: item.mega.cta,
            }
          : undefined,
      })),
    });
  }
}

async function seedFooter() {
  console.log("\n→ siteFooter");
  for (const locale of locales) {
    const footer = getFooterLocal(locale);
    await upsert({
      _id: id("siteFooter", locale),
      _type: "siteFooter",
      language: locale,
      description: footer.description,
      servicesTitle: footer.servicesTitle,
      showServices: footer.showServices,
      boothTypesTitle: footer.boothTypesTitle,
      showBoothTypes: footer.showBoothTypes,
      companyLinksTitle: footer.companyLinksTitle,
      companyLinks: footer.companyLinks.map((link, i) => ({
        _key: `cl-${i}`,
        label: link.label,
        href: link.href,
      })),
      contactTitle: footer.contactTitle,
      officeAddress: footer.officeAddress,
      phoneDisplay: footer.phoneDisplay,
      phoneHref: footer.phoneHref,
      email: footer.email,
      whatsappLabel: footer.whatsappLabel,
      businessHours: footer.businessHours,
      mapsLabel: footer.mapsLabel,
      mapsUrl: footer.mapsUrl,
      socialLinks: footer.socialLinks.map((link, i) => ({
        _key: `soc-${i}`,
        platform: link.platform,
        url: link.url,
        label: link.label,
      })),
      newsletter: footer.newsletter,
      trust: {
        enabled: footer.trust.enabled,
        items: footer.trust.items.map((item, i) => ({
          _key: `tr-${i}`,
          label: item.label,
        })),
      },
      rights: footer.rights,
      bottomLinks: footer.bottomLinks.map((link, i) => ({
        _key: `bl-${i}`,
        label: link.label,
        href: link.href,
      })),
      createdBy: footer.createdBy,
      cta: footer.cta,
    });
  }
}

async function seedDictionaryAndPages() {
  console.log("\n→ dictionary + page docs + hubs");
  for (const locale of locales) {
    const dict = getDictionaryLocal(locale);
    const config = getSiteConfig();
    const localeSeo = config.defaultSeoByLocale?.find(
      (entry) => entry.locale === locale,
    );

    await upsert({
      _id: id("dictionary", locale),
      _type: "dictionary",
      locale,
      comingSoon: dict.comingSoon,
      content: JSON.stringify(dict),
    });

    await upsert({
      _id: id("homePage", locale),
      _type: "homePage",
      language: locale,
      hero: {
        eyebrow: dict.hero.badge,
        title: dict.hero.headline,
        lead: dict.hero.support,
        primaryCta: dict.hero.primaryCta,
        secondaryCta: dict.hero.secondaryCta,
      },
      sections: {
        payload: JSON.stringify({
          lifecycle: dict.lifecycle,
          stats: dict.stats,
          clients: dict.clients,
          about: dict.about,
          services: dict.services,
          boothTypes: dict.boothTypes,
          whyCps: dict.whyCps,
          beforeAfter: dict.beforeAfter,
          process: dict.process,
          work: dict.work,
          briefForm: dict.briefForm,
          faq: dict.faq,
          contact: dict.contact,
          servicesPage: dict.servicesPage,
          boothTypesPage: dict.boothTypesPage,
          workPage: dict.workPage,
          industriesPage: dict.industriesPage,
          locationsPage: dict.locationsPage,
          newsPage: dict.newsPage,
          projectPage: dict.projectPage,
        }),
      },
      seo: seoMeta(
        localeSeo?.title ?? `${config.name} — ${config.tagline}`,
        localeSeo?.description ?? dict.hero.support,
        config.defaultKeywords ?? [],
      ),
    });

    await upsert({
      _id: id("aboutPage", locale),
      _type: "aboutPageDoc",
      language: locale,
      eyebrow: dict.aboutPage.eyebrow,
      title: dict.aboutPage.title,
      lead: dict.aboutPage.lead,
      storyTitle: dict.aboutPage.storyTitle,
      story: [dict.aboutPage.story, dict.aboutPage.storySecond]
        .filter(Boolean)
        .join("\n\n"),
      missionTitle: dict.aboutPage.valuesTitle,
      mission: dict.aboutPage.valuesSupport,
      visionTitle: dict.aboutPage.studioTitle,
      vision: dict.aboutPage.studioSupport,
      values: dict.aboutPage.values.map((item, i) => ({
        _key: `v-${i}`,
        title: item.title,
        description: item.description,
      })),
      process: dict.aboutPage.studioItems.map((item, i) => ({
        _key: `p-${i}`,
        title: item.title,
        description: item.description,
      })),
      studioTitle: dict.aboutPage.studioTitle,
      studioBody: dict.aboutPage.studioSupport,
      faq: dict.aboutPage.faqItems.map((item, i) => ({
        _key: `f-${i}`,
        question: item.question,
        answer: item.answer,
      })),
      seo: seoMeta(`CPS — ${dict.aboutPage.title}`, dict.aboutPage.lead),
    });

    await upsert({
      _id: id("contactPage", locale),
      _type: "contactPageDoc",
      language: locale,
      eyebrow: dict.contactPage.eyebrow,
      title: dict.contactPage.title,
      lead: dict.contactPage.lead,
      officeTitle: dict.contactPage.map?.title,
      businessHours: dict.contactPage.map?.support,
      briefForm: {
        payload: JSON.stringify(dict.contactPage),
      },
      seo: seoMeta(`CPS — ${dict.contactPage.title}`, dict.contactPage.lead),
    });

    const hubs = [
      {
        kind: "services" as const,
        eyebrow: dict.servicesPage.eyebrow,
        title: dict.servicesPage.title,
        lead: dict.servicesPage.lead,
        primaryCta: dict.servicesPage.primaryCta,
        secondaryCta: dict.servicesPage.secondaryCta,
        detailTitle: dict.servicesPage.detailTitle,
        faq: dict.servicesPage.faqItems.map((item, i) => ({
          _key: `faq-${i}`,
          question: item.question,
          answer: item.answer,
        })),
      },
      {
        kind: "boothTypes" as const,
        eyebrow: dict.boothTypesPage.eyebrow,
        title: dict.boothTypesPage.title,
        lead: dict.boothTypesPage.lead,
      },
      {
        kind: "work" as const,
        eyebrow: dict.workPage.eyebrow,
        title: dict.workPage.title,
        lead: dict.workPage.lead,
      },
      {
        kind: "industries" as const,
        eyebrow: dict.industriesPage.eyebrow,
        title: dict.industriesPage.title,
        lead: dict.industriesPage.lead,
      },
      {
        kind: "locations" as const,
        eyebrow: dict.locationsPage.eyebrow,
        title: dict.locationsPage.title,
        lead: dict.locationsPage.lead,
      },
      {
        kind: "news" as const,
        eyebrow: dict.newsPage.eyebrow,
        title: dict.newsPage.title,
        lead: dict.newsPage.lead,
      },
    ];

    for (const hub of hubs) {
      await upsert({
        _id: id("hubPage", hub.kind, locale),
        _type: "hubPage",
        language: locale,
        ...hub,
        seo: seoMeta(
          `CPS — ${hub.title.replace("{City}", locale === "ar" ? "السعودية" : "Saudi Arabia")}`,
          hub.lead,
        ),
      });
    }

    await upsert({
      _id: id("notFoundPage", locale),
      _type: "notFoundPage",
      locale,
      title: locale === "ar" ? "الصفحة غير موجودة" : "Page not found",
      description:
        locale === "ar"
          ? "الصفحة التي تبحث عنها غير متاحة."
          : "The page you are looking for is unavailable.",
      headline: locale === "ar" ? "404" : "404",
      body:
        locale === "ar"
          ? "عد إلى الصفحة الرئيسية أو تصفح خدماتنا."
          : "Return home or browse our services.",
      ctaLabel: locale === "ar" ? "الرئيسية" : "Home",
      ctaHref: "/",
      seo: seoMeta(
        locale === "ar" ? "CPS — الصفحة غير موجودة" : "CPS — Page not found",
        locale === "ar"
          ? "الصفحة التي تبحث عنها غير متاحة."
          : "The page you are looking for is unavailable.",
      ),
    });
  }
}

async function seedRedirects() {
  console.log("\n→ redirects");
  for (const [index, redirect] of redirects.entries()) {
    await upsert({
      _id: id("redirect", String(index + 1)),
      _type: "redirect",
      from: redirect.from,
      to: redirect.to,
      status: redirect.status ?? 301,
    });
  }
}

async function main() {
  console.log(`Seeding Sanity dataset "${dataset}" (${projectId})…`);
  await seedSettings();
  await seedClients();
  await seedBoothTypes();
  await seedServices();
  await seedIndustries();
  await seedLocations();
  await seedProjects();
  await seedNews();
  await seedNavigation();
  await seedFooter();
  await seedDictionaryAndPages();
  await seedRedirects();
  console.log("\nDone. Open Studio to review seeded documents.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
