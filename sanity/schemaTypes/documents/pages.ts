import { defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
    defineField({
      name: "hero",
      type: "object",
      title: "Hero",
      fields: [
        defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "lead", type: "text", rows: 3, title: "Lead" }),
        defineField({ name: "primaryCta", type: "string", title: "Primary CTA" }),
        defineField({ name: "secondaryCta", type: "string", title: "Secondary CTA" }),
      ],
    }),
    defineField({
      name: "sections",
      type: "object",
      title: "Section copy (JSON-compatible)",
      description: "Structured home chrome mirrored from the local dictionary for CMS editing.",
      fields: [
        defineField({ name: "payload", type: "text", rows: 20, title: "JSON payload" }),
      ],
    }),
    defineField({
      name: "featuredProjectIds",
      type: "array",
      of: [{ type: "reference", to: [{ type: "project" }] }],
      title: "Featured projects",
    }),
  ],
});

export const aboutPageDoc = defineType({
  name: "aboutPageDoc",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "lead", type: "text", rows: 3, title: "Lead" }),
    defineField({ name: "storyTitle", type: "string", title: "Story title" }),
    defineField({ name: "story", type: "text", rows: 5, title: "Story" }),
    defineField({ name: "missionTitle", type: "string", title: "Mission title" }),
    defineField({ name: "mission", type: "text", rows: 4, title: "Mission" }),
    defineField({ name: "visionTitle", type: "string", title: "Vision title" }),
    defineField({ name: "vision", type: "text", rows: 4, title: "Vision" }),
    defineField({
      name: "values",
      type: "array",
      of: [{ type: "benefitItem" }],
      title: "Why choose us / Values",
    }),
    defineField({
      name: "process",
      type: "array",
      of: [{ type: "processStep" }],
      title: "Process",
    }),
    defineField({ name: "studioTitle", type: "string", title: "Studio title" }),
    defineField({ name: "studioBody", type: "text", rows: 4, title: "Studio body" }),
    defineField({
      name: "faq",
      type: "array",
      of: [{ type: "faqItem" }],
      title: "FAQ",
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
  ],
});

export const contactPageDoc = defineType({
  name: "contactPageDoc",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "lead", type: "text", rows: 3, title: "Lead" }),
    defineField({ name: "officeTitle", type: "string", title: "Office title" }),
    defineField({ name: "businessHours", type: "text", rows: 3, title: "Business hours" }),
    defineField({
      name: "briefForm",
      type: "object",
      title: "Brief form",
      fields: [
        defineField({ name: "payload", type: "text", rows: 12, title: "JSON payload" }),
      ],
    }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      type: "array",
      of: [{ type: "navPrimaryItem" }],
      title: "Primary navigation",
      description: "Reorderable primary menu. Use Mega or Dropdown for nested sections.",
    }),
    defineField({
      name: "primary",
      type: "array",
      of: [{ type: "navItem" }],
      title: "Legacy primary (deprecated)",
      hidden: true,
    }),
    defineField({
      name: "footer",
      type: "array",
      of: [{ type: "navItem" }],
      title: "Footer navigation",
    }),
    defineField({ name: "ctaLabel", type: "string", title: "Header CTA label" }),
    defineField({ name: "ctaHref", type: "string", title: "Header CTA href", initialValue: "/contact" }),
  ],
});

export const globalSeo = defineType({
  name: "globalSeo",
  title: "Global SEO",
  type: "document",
  fields: [
    defineField({ name: "defaultSeo", type: "seoMeta", title: "Default SEO" }),
    defineField({
      name: "organizationName",
      type: "string",
      title: "Organization name (JSON-LD)",
    }),
    defineField({
      name: "twitterHandle",
      type: "string",
      title: "Twitter / X handle",
    }),
  ],
});

export const pageSingletonTypes = [
  homePage,
  aboutPageDoc,
  contactPageDoc,
  navigation,
  globalSeo,
];
