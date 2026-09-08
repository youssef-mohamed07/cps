/** Targeted, revision-checked content migration. Dry run unless --apply is supplied. */
import { writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import { getDictionaryLocal } from "../src/content/dictionaries.local";
import { getFooterLocal } from "../src/content/footer";
import { projects } from "../src/content/projects";
import { serviceArchitecture, localizeText } from "../src/content/service-architecture";
import { isLocale } from "../src/lib/i18n";

loadEnvConfig(process.cwd());
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
if (!projectId || !token) throw new Error("Sanity project and write token are required.");
const client = createClient({ projectId, dataset, token, apiVersion: "2025-01-01", useCdn: false });

type Doc = {
  _id: string;
  _rev: string;
  _type: string;
  language?: string;
  locale?: string;
  slug?: { current?: string };
  title?: string;
  excerpt?: string;
  hero?: Record<string, unknown>;
  overview?: string;
  overviewTitle?: string;
  overviewBullets?: Record<string, unknown>[];
  heroLead?: string;
  description?: string;
  content?: string;
  sections?: { payload?: string };
  designs?: Record<string, unknown> & { items?: Record<string, unknown>[] };
  why?: Record<string, unknown> & { items?: Record<string, unknown>[] };
  benefits?: Record<string, unknown>[];
  faq?: Record<string, unknown>[];
  serviceSlug?: string;
  services?: { _key?: string; _type?: string; _ref?: string }[];
  industrySlug?: string;
  scopeOfWork?: string;
  blueprintVersion?: number;
};

function plain(value: unknown) {
  return typeof value === "string" ? value.replace(/[\u200b-\u200f\ufeff]/g, "").trim() : "";
}
function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entry]) => entry !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, entry]) => [key, stableValue(entry)]),
    );
  }
  return value;
}
function sameValue(left: unknown, right: unknown) {
  return JSON.stringify(stableValue(left)) === JSON.stringify(stableValue(right));
}
function legacyHero(title: unknown) {
  const text = plain(title);
  return !text || text.startsWith("Everything your booth needs") || text.startsWith("كل ما يحتاجه جناحك");
}
function parseObject(value: string | undefined): Record<string, unknown> | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
  } catch { return null; }
}

async function main() {
  const documents = await client.fetch<Doc[]>(`*[
    _type in ["homePage", "dictionary", "siteFooter", "service", "project"] &&
    !(_id in path("drafts.**"))
  ]{_id, _rev, _type, language, locale, slug, hero, description, content, sections,
    title, excerpt, overview, overviewTitle, overviewBullets, heroLead, designs, why,
    benefits, faq, serviceSlug, services, industrySlug, scopeOfWork, blueprintVersion}`);
  const plan: { document: Doc; set: Record<string, unknown> }[] = [];
  for (const doc of documents) {
    const locale = doc.language || doc.locale;
    if (!isLocale(locale ?? "")) continue;
    const lang = locale as "en" | "ar";
    const dictionary = getDictionaryLocal(lang);
    const set: Record<string, unknown> = {};
    if (doc._type === "homePage" && legacyHero(doc.hero?.title)) {
      set.hero = {
        ...doc.hero,
        eyebrow: dictionary.hero.badge,
        title: dictionary.hero.headline,
        lead: dictionary.hero.support,
        primaryCta: dictionary.hero.primaryCta,
        secondaryCta: dictionary.hero.secondaryCta,
      };
    }
    if (doc._type === "dictionary") {
      const content = parseObject(doc.content);
      const hero = content?.hero as { headline?: string } | undefined;
      if (content && legacyHero(hero?.headline)) {
        set.content = JSON.stringify({ ...content, hero: dictionary.hero });
      }
    }
    if (doc._type === "siteFooter") {
      const description = plain(doc.description);
      if (!description || description.startsWith("Exhibition booth design,") || description.startsWith("تصميم أجنحة المعارض")) {
        set.description = getFooterLocal(lang).description;
      }
    }
    if (doc._type === "service") {
      const service = serviceArchitecture.find((entry) => entry.slug === doc.slug?.current);
      if (service) {
        set.title = localizeText(service.title, lang);
        set.excerpt = localizeText(service.excerpt, lang);
        set.overview = localizeText(service.hero.support, lang);
        set.overviewTitle = localizeText(service.hero.headline, lang);
        set.overviewBullets = service.hero.bullets.map((item, index) => ({
          _key:
            typeof doc.overviewBullets?.[index]?._key === "string"
              ? doc.overviewBullets[index]._key
              : `overview-${index}`,
          title: localizeText(item, lang),
          description: "",
        }));
        set.heroLead = localizeText(service.hero.support, lang);
        // Preserve the image and other editorial fields for matching showcase items.
        const items = service.showcase.items.map((item, index) => {
          const title = localizeText(item.title, lang);
          const existing = doc.designs?.items?.find((entry) => plain(entry.title) === title);
          return {
            ...existing,
            _key: typeof existing?._key === "string" ? existing._key : `showcase-${index}`,
            title,
            description: localizeText(item.description, lang),
            ...(!existing?.image && !existing?.imageUrl ? { imageUrl: service.image, imageAlt: title } : {}),
          };
        });
        set.designs = {
          ...doc.designs,
          eyebrow: lang === "ar" ? "الكتالوج" : "Catalogue",
          title: localizeText(service.showcase.title, lang),
          support: localizeText(service.catalogue.support, lang),
          cta: {
            label: localizeText(service.hero.catalogueCta, lang),
            href: `/services/${service.slug}/catalogue`,
          },
          items,
        };
        set.why = {
          ...doc.why,
          title: localizeText(service.why.headline, lang),
          support: localizeText(service.why.support, lang),
          items: service.why.items.map((item, index) => ({
            _key:
              typeof doc.why?.items?.[index]?._key === "string"
                ? doc.why.items[index]._key
                : `why-${index}`,
            title: localizeText(item, lang),
            description: "",
          })),
        };
        set.benefits = service.benefits.map((item, index) => ({
          _key:
            typeof doc.benefits?.[index]?._key === "string"
              ? doc.benefits[index]._key
              : `benefit-${index}`,
          title: localizeText(item, lang),
          description: "",
        }));
        set.faq = service.faq.map((item, index) => ({
          ...doc.faq?.[index],
          _key: typeof doc.faq?.[index]?._key === "string" ? doc.faq[index]._key : `faq-${index}`,
          question: localizeText(item.question, lang),
          answer: localizeText(item.answer, lang),
        }));
        set.blueprintVersion = 5;
      }
    }
    if (doc._type === "project") {
      const project = projects.find((entry) => entry.slug === doc.slug?.current);
      if (project) {
        if (!plain(doc.serviceSlug)) set.serviceSlug = project.serviceSlug;
        const serviceSlugs = project.serviceSlugs ?? (project.serviceSlug ? [project.serviceSlug] : []);
        const existingRefs = new Set((doc.services ?? []).map((service) => service._ref).filter(Boolean));
        if (serviceSlugs.some((serviceSlug) => !existingRefs.has(`service-${serviceSlug}-${lang}`))) {
          set.services = serviceSlugs.map((serviceSlug, index) => ({
            _key: `service-${index}`,
            _type: "reference",
            _ref: `service-${serviceSlug}-${lang}`,
          }));
        }
        if (!plain(doc.scopeOfWork)) set.scopeOfWork = project[lang].scopeOfWork;
        const aliases: Record<string, string> = { technology: "technology-electronics", healthcare: "healthcare-pharmaceutical" };
        if (!plain(doc.industrySlug)) set.industrySlug = project.industrySlug;
        else if (aliases[plain(doc.industrySlug)]) set.industrySlug = aliases[plain(doc.industrySlug)];
      }
    }
    for (const key of Object.keys(set)) {
      if (set[key] === undefined || sameValue(set[key], doc[key as keyof Doc])) delete set[key];
    }
    if (Object.keys(set).length) plan.push({ document: doc, set });
  }
  console.log(JSON.stringify(plan.map(({ document, set }) => ({ id: document._id, fields: Object.keys(set) })), null, 2));
  if (!process.argv.includes("--apply")) {
    console.log(`Dry run: ${plan.length} documents. Re-run with --apply to write.`);
    return;
  }
  if (!plan.length) { console.log("Nothing to update."); return; }
  const backupPath = join(tmpdir(), `cps-blueprint-before-${Date.now()}.json`);
  writeFileSync(backupPath, JSON.stringify(plan, null, 2), { mode: 0o600 });
  let transaction = client.transaction();
  for (const { document, set } of plan) {
    transaction = transaction.patch(document._id, (patch) => patch.ifRevisionId(document._rev).set(set));
  }
  await transaction.commit();
  console.log(`Updated ${plan.length} documents. Backup: ${backupPath}`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Migration failed");
  process.exitCode = 1;
});
