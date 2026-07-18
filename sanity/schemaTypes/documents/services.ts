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
    defineField({ name: "overviewTitle", type: "string", title: "Overview title" }),
    defineField({
      name: "overviewBullets",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Overview bullets",
    }),
    defineField({ name: "heroLead", type: "text", rows: 2, title: "Hero lead" }),
    defineField({
      name: "secondaryCta",
      type: "object",
      title: "Secondary CTA",
      fields: [
        defineField({ name: "label", type: "string", title: "Label" }),
        defineField({ name: "serviceSlug", type: "string", title: "Service slug" }),
      ],
    }),
    defineField({
      name: "heroUrl",
      type: "url",
      title: "Hero image URL (seed / fallback)",
    }),
    defineField({
      name: "cover",
      type: "contentSection",
      title: "What we cover",
    }),
    defineField({
      name: "designs",
      type: "contentSection",
      title: "What we design / build",
    }),
    defineField({
      name: "why",
      type: "contentSection",
      title: "Why CPS",
    }),
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
    defineField({ name: "overviewTitle", type: "string", title: "Overview title" }),
    defineField({
      name: "features",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Overview bullets",
    }),
    defineField({
      name: "advantages",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "What we cover",
    }),
    defineField({
      name: "useCases",
      type: "array",
      of: [{ type: "string" }],
      title: "Who this is for",
    }),
    defineField({
      name: "faq",
      type: "array",
      of: [{ type: "faqItem" }],
      title: "FAQ",
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
      title: "Gallery",
    }),
    defineField({
      name: "model3dFile",
      type: "file",
      title: "3D model file",
      description: "Optional uploaded GLB/GLTF model. Takes precedence over the URL.",
      options: { accept: ".glb,.gltf,model/gltf-binary,model/gltf+json" },
    }),
    defineField({
      name: "model3d",
      type: "url",
      title: "3D model URL",
      description: "Optional external GLB/GLTF URL and legacy model field.",
    }),
    defineField({ name: "compareLabel", type: "string", title: "Comparison table label" }),
    defineField({
      name: "indoor",
      type: "boolean",
      title: "Indoor",
      initialValue: true,
    }),
    defineField({
      name: "outdoor",
      type: "boolean",
      title: "Outdoor",
      initialValue: false,
    }),
    defineField({
      name: "reusable",
      type: "boolean",
      title: "Reusable",
      initialValue: true,
    }),
    defineField({
      name: "highCustomization",
      type: "boolean",
      title: "High customization",
      initialValue: false,
    }),
    defineField({
      name: "fastSetup",
      type: "boolean",
      title: "Fast setup",
      initialValue: false,
    }),
    defineField({
      name: "heroUrl",
      type: "url",
      title: "Hero image URL (seed / fallback)",
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
