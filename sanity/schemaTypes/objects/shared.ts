import { defineField, defineType } from "sanity";

export const languageField = defineField({
  name: "language",
  title: "Language",
  type: "string",
  options: { list: [{ title: "English", value: "en" }, { title: "Arabic", value: "ar" }] },
  initialValue: "en",
  validation: (Rule) => Rule.required(),
});

export const statusField = defineField({
  name: "status",
  title: "Status",
  type: "string",
  options: {
    list: [
      { title: "Draft", value: "draft" },
      { title: "Published", value: "published" },
      { title: "Archived", value: "archived" },
    ],
  },
  initialValue: "published",
});

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (Rule) => Rule.required(),
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "href", type: "string", title: "Href" }),
  ],
});

export const benefitItem = defineType({
  name: "benefitItem",
  title: "Benefit",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
  ],
});

export const processStep = defineType({
  name: "processStep",
  title: "Process step",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
  ],
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "alt", type: "string", title: "Alt text" }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
  ],
});

export const navItem = defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "string", title: "Href", validation: (Rule) => Rule.required() }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "FAQ item",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", title: "Question" }),
    defineField({ name: "answer", type: "text", rows: 4, title: "Answer" }),
  ],
});
