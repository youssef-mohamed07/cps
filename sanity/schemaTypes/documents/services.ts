import { defineField, defineType } from "sanity";
import { languageField, slugField, statusField } from "../objects/shared";

export const service = defineType({
  name: "service",
  title: "Service",
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
      name: "benefits",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Benefits",
    }),
    defineField({
      name: "process",
      type: "array",
      of: [{ type: "processStep" }],
      title: "Process",
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [{ type: "faqItem" }],
      title: "FAQ",
    }),
    defineField({
      name: "boothTypes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "boothType" }] }],
      title: "Related booth types",
    }),
    defineField({
      name: "cta",
      type: "ctaBlock",
      title: "CTA",
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({ name: "order", type: "number", title: "Sort order", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
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

export const boothType = defineType({
  name: "boothType",
  title: "Booth Type",
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
    defineField({ name: "description", type: "text", rows: 5, title: "Description" }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "string" }],
      title: "Features",
    }),
    defineField({
      name: "advantages",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Advantages",
    }),
    defineField({
      name: "useCases",
      type: "array",
      of: [{ type: "string" }],
      title: "Use cases",
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
      title: "Gallery",
    }),
    defineField({ name: "cta", type: "ctaBlock", title: "CTA" }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({ name: "order", type: "number", title: "Sort order", initialValue: 0 }),
  ],
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
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
