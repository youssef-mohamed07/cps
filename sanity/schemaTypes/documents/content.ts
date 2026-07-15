import { defineField, defineType } from "sanity";
import { languageField, slugField, statusField } from "../objects/shared";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "year", type: "string", title: "Year" }),
    defineField({ name: "summary", type: "text", rows: 3, title: "Summary" }),
    defineField({
      name: "hero",
      type: "image",
      title: "Hero image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
      title: "Gallery",
    }),
    defineField({
      name: "motionVideo",
      type: "url",
      title: "Motion video URL",
      description: "Optional MP4/WebM URL for the motion section between facts and story.",
    }),
    defineField({ name: "challenge", type: "text", rows: 4, title: "Challenge" }),
    defineField({ name: "solution", type: "text", rows: 4, title: "Solution / Approach" }),
    defineField({ name: "result", type: "text", rows: 4, title: "Result / Outcome" }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
      title: "Technologies",
    }),
    defineField({ name: "event", type: "string", title: "Event" }),
    defineField({ name: "size", type: "string", title: "Booth size" }),
    defineField({
      name: "client",
      type: "reference",
      to: [{ type: "client" }],
      title: "Client",
    }),
    defineField({
      name: "industry",
      type: "reference",
      to: [{ type: "industry" }],
      title: "Industry",
    }),
    defineField({
      name: "boothType",
      type: "reference",
      to: [{ type: "boothType" }],
      title: "Booth type",
    }),
    defineField({
      name: "location",
      type: "reference",
      to: [{ type: "location" }],
      title: "Country / Location",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      title: "Services",
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({ name: "featured", type: "boolean", title: "Featured", initialValue: false }),
  ],
  preview: {
    select: { title: "title", media: "hero", language: "language", year: "year" },
    prepare: ({ title, media, language, year }) => ({
      title,
      subtitle: [language?.toUpperCase(), year].filter(Boolean).join(" · "),
      media,
    }),
  },
});

export const industry = defineType({
  name: "industry",
  title: "Industry",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "excerpt", type: "text", rows: 3, title: "Excerpt" }),
    defineField({
      name: "hero",
      type: "image",
      title: "Hero image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "overview", type: "text", rows: 5, title: "Overview" }),
    defineField({
      name: "challenges",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Industry challenges",
    }),
    defineField({
      name: "solutions",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Our solutions",
    }),
    defineField({
      name: "recommendedBoothTypes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "boothType" }] }],
      title: "Recommended booth types",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      title: "Related services",
    }),
    defineField({ name: "cta", type: "ctaBlock", title: "CTA" }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({ name: "order", type: "number", title: "Sort order", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", media: "hero", language: "language" },
    prepare: ({ title, media, language }) => ({
      title,
      subtitle: language?.toUpperCase(),
      media,
    }),
  },
});

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "countryCode", type: "string", title: "Country code" }),
    defineField({ name: "excerpt", type: "text", rows: 3, title: "Excerpt" }),
    defineField({
      name: "hero",
      type: "image",
      title: "Hero image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "localExperience", type: "text", rows: 5, title: "Local experience" }),
    defineField({
      name: "capabilities",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Capabilities",
    }),
    defineField({
      name: "heroUrl",
      type: "url",
      title: "Hero image URL (seed / fallback)",
    }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      title: "Services in this country",
    }),
    defineField({ name: "cta", type: "ctaBlock", title: "CTA" }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({ name: "order", type: "number", title: "Sort order", initialValue: 0 }),
  ],
  preview: {
    select: { title: "title", language: "language", countryCode: "countryCode" },
    prepare: ({ title, language, countryCode }) => ({
      title,
      subtitle: [language?.toUpperCase(), countryCode].filter(Boolean).join(" · "),
    }),
  },
});

export const newsArticle = defineType({
  name: "newsArticle",
  title: "News Article",
  type: "document",
  fields: [
    languageField,
    statusField,
    defineField({ name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "excerpt", type: "text", rows: 3, title: "Excerpt" }),
    defineField({
      name: "featuredImage",
      type: "image",
      title: "Featured image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "body",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
      title: "Body",
    }),
    defineField({ name: "publishedAt", type: "datetime", title: "Publish date" }),
    defineField({ name: "readingTime", type: "number", title: "Reading time (minutes)" }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      title: "Category",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      title: "Tags",
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      title: "Author",
    }),
    defineField({
      name: "relatedProjects",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      title: "Related projects",
    }),
    defineField({
      name: "relatedServices",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      title: "Related services",
    }),
    defineField({
      name: "relatedIndustries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "industry" }] }],
      title: "Related industries",
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage", language: "language", date: "publishedAt" },
    prepare: ({ title, media, language, date }) => ({
      title,
      subtitle: [language?.toUpperCase(), date ? new Date(date).toLocaleDateString() : null]
        .filter(Boolean)
        .join(" · "),
      media,
    }),
  },
});
