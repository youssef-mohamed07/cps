import { defineField, defineType } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Nav link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "string", title: "Href", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "string", title: "Short description" }),
    defineField({
      name: "image",
      type: "image",
      title: "Thumbnail image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "icon",
      type: "string",
      title: "Icon key",
      description: "Optional icon identifier (e.g. design, factory, install)",
    }),
  ],
});

export const navColumn = defineType({
  name: "navColumn",
  title: "Mega menu column",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Column title" }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "navLink" }],
      title: "Links",
    }),
  ],
});

export const navFeatured = defineType({
  name: "navFeatured",
  title: "Featured panel",
  type: "object",
  fields: [
    defineField({ name: "enabled", type: "boolean", title: "Enabled", initialValue: true }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({ name: "href", type: "string", title: "Link" }),
    defineField({ name: "ctaLabel", type: "string", title: "CTA label", initialValue: "View Service →" }),
    defineField({
      name: "image",
      type: "image",
      title: "Featured image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "service",
      type: "reference",
      to: [{ type: "service" }],
      title: "Featured service (optional)",
      description: "When set, title/description/image/href can be filled from this service.",
    }),
    defineField({
      name: "boothType",
      type: "reference",
      to: [{ type: "boothType" }],
      title: "Featured booth type (optional)",
    }),
  ],
});

export const navMega = defineType({
  name: "navMega",
  title: "Mega menu",
  type: "object",
  fields: [
    defineField({ name: "enabled", type: "boolean", title: "Enabled", initialValue: true }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Services (2 columns + featured)", value: "services" },
          { title: "Booth types (3 columns + featured)", value: "boothTypes" },
          { title: "Custom columns", value: "columns" },
        ],
      },
      initialValue: "columns",
    }),
    defineField({ name: "title", type: "string", title: "Section title" }),
    defineField({ name: "description", type: "text", rows: 2, title: "Section description" }),
    defineField({
      name: "columns",
      type: "array",
      of: [{ type: "navColumn" }],
      title: "Columns",
    }),
    defineField({ name: "featured", type: "navFeatured", title: "Featured panel" }),
    defineField({ name: "cta", type: "ctaBlock", title: "Bottom / section CTA" }),
  ],
});

export const navPrimaryItem = defineType({
  name: "navPrimaryItem",
  title: "Primary nav item",
  type: "object",
  fields: [
    defineField({ name: "enabled", type: "boolean", title: "Enabled", initialValue: true }),
    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", type: "string", title: "Href", validation: (Rule) => Rule.required() }),
    defineField({
      name: "kind",
      type: "string",
      title: "Menu type",
      options: {
        list: [
          { title: "Simple link", value: "link" },
          { title: "Mega menu", value: "mega" },
          { title: "Dropdown", value: "dropdown" },
        ],
      },
      initialValue: "link",
    }),
    defineField({
      name: "mega",
      type: "navMega",
      title: "Mega menu",
      hidden: ({ parent }) => parent?.kind !== "mega",
    }),
    defineField({
      name: "dropdown",
      type: "array",
      of: [{ type: "navLink" }],
      title: "Dropdown links",
      hidden: ({ parent }) => parent?.kind !== "dropdown",
    }),
  ],
  preview: {
    select: { title: "label", kind: "kind", enabled: "enabled" },
    prepare: ({ title, kind, enabled }) => ({
      title: title || "Nav item",
      subtitle: `${kind || "link"}${enabled === false ? " · disabled" : ""}`,
    }),
  },
});
