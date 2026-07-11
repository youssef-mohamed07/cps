import { defineField, defineType } from "sanity";

export const footerBadge = defineType({
  name: "footerBadge",
  title: "Footer badge",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
    defineField({
      name: "image",
      type: "image",
      title: "Badge image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
  ],
});

export const footerTrustItem = defineType({
  name: "footerTrustItem",
  title: "Trust item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label", validation: (Rule) => Rule.required() }),
  ],
});

export const siteFooter = defineType({
  name: "siteFooter",
  title: "Site Footer",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: "Footer logo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      title: "Company description",
    }),
    defineField({
      name: "certifications",
      type: "array",
      of: [{ type: "footerBadge" }],
      title: "Certifications",
    }),
    defineField({
      name: "qualityBadges",
      type: "array",
      of: [{ type: "footerBadge" }],
      title: "Quality badges",
    }),
    defineField({ name: "cta", type: "ctaBlock", title: "Company column CTA" }),
    defineField({ name: "servicesTitle", type: "string", title: "Services column title" }),
    defineField({
      name: "showServices",
      type: "boolean",
      title: "Show published services",
      initialValue: true,
    }),
    defineField({ name: "boothTypesTitle", type: "string", title: "Booth types column title" }),
    defineField({
      name: "showBoothTypes",
      type: "boolean",
      title: "Show published booth types",
      initialValue: true,
    }),
    defineField({ name: "companyLinksTitle", type: "string", title: "Company links title" }),
    defineField({
      name: "companyLinks",
      type: "array",
      of: [{ type: "navLink" }],
      title: "Company links",
    }),
    defineField({ name: "contactTitle", type: "string", title: "Contact column title" }),
    defineField({ name: "officeAddress", type: "text", rows: 3, title: "Office address" }),
    defineField({ name: "phoneDisplay", type: "string", title: "Phone display (override)" }),
    defineField({ name: "phoneHref", type: "string", title: "Phone tel: value (override)" }),
    defineField({ name: "email", type: "string", title: "Email (override)" }),
    defineField({ name: "whatsappLabel", type: "string", title: "WhatsApp label" }),
    defineField({ name: "businessHours", type: "text", rows: 3, title: "Business hours" }),
    defineField({ name: "mapsLabel", type: "string", title: "Google Maps button label" }),
    defineField({ name: "mapsUrl", type: "url", title: "Google Maps URL (override)" }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "socialLink" }],
      title: "Social links (override site settings)",
    }),
    defineField({
      name: "newsletter",
      type: "object",
      title: "Newsletter",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Enabled", initialValue: false }),
        defineField({ name: "headline", type: "string", title: "Headline" }),
        defineField({ name: "description", type: "text", rows: 2, title: "Description" }),
        defineField({ name: "placeholder", type: "string", title: "Email placeholder" }),
        defineField({ name: "buttonLabel", type: "string", title: "Subscribe button" }),
        defineField({
          name: "mailto",
          type: "string",
          title: "Subscribe mailto (until form backend)",
          description: "Opens mailto with the entered email as body when no form API exists.",
        }),
      ],
    }),
    defineField({
      name: "trust",
      type: "object",
      title: "Trust strip",
      fields: [
        defineField({ name: "enabled", type: "boolean", title: "Enabled", initialValue: true }),
        defineField({
          name: "items",
          type: "array",
          of: [{ type: "footerTrustItem" }],
          title: "Items",
        }),
      ],
    }),
    defineField({ name: "rights", type: "string", title: "Rights text" }),
    defineField({
      name: "bottomLinks",
      type: "array",
      of: [{ type: "navLink" }],
      title: "Bottom legal links",
    }),
    defineField({ name: "createdBy", type: "string", title: "Created by (optional)" }),
    defineField({ name: "locationsTitle", type: "string", title: "Locations title" }),
    defineField({
      name: "locations",
      type: "array",
      of: [{ type: "navLink" }],
      title: "Location links",
    }),
  ],
  preview: {
    select: { language: "language" },
    prepare: ({ language }) => ({
      title: `Site Footer (${language?.toUpperCase() ?? "?"})`,
    }),
  },
});
