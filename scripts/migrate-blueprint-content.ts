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
  hero?: Record<string, unknown>;
  description?: string;
  content?: string;
  sections?: { payload?: string };
  designs?: Record<string, unknown> & { items?: Record<string, unknown>[] };
  faq?: Record<string, unknown>[];
  serviceSlug?: string;
  industrySlug?: string;
  scopeOfWork?: string;
};

function plain(value: unknown) {
  return typeof value === "string" ? value.replace(/[\u200b-\u200f\ufeff]/g, "").trim() : "";
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
    designs, faq, serviceSlug, industrySlug, scopeOfWork}`);
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
        set.designs = { ...doc.designs, title: localizeText(service.showcase.title, lang), items };
        set.faq = service.faq.map((item, index) => ({
          ...doc.faq?.[index],
          _key: typeof doc.faq?.[index]?._key === "string" ? doc.faq[index]._key : `faq-${index}`,
          question: localizeText(item.question, lang),
          answer: localizeText(item.answer, lang),
        }));
      }
    }
    if (doc._type === "project") {
      const project = projects.find((entry) => entry.slug === doc.slug?.current);
      if (project) {
        if (!plain(doc.serviceSlug)) set.serviceSlug = project.serviceSlug;
        if (!plain(doc.scopeOfWork)) set.scopeOfWork = project[lang].scopeOfWork;
        const aliases: Record<string, string> = { technology: "technology-electronics", healthcare: "healthcare-pharmaceutical" };
        if (!plain(doc.industrySlug)) set.industrySlug = project.industrySlug;
        else if (aliases[plain(doc.industrySlug)]) set.industrySlug = aliases[plain(doc.industrySlug)];
      }
    }
    for (const key of Object.keys(set)) {
      if (set[key] === undefined || JSON.stringify(set[key]) === JSON.stringify(doc[key as keyof Doc])) delete set[key];
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
