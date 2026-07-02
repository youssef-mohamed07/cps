import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "companyName", type: "string", title: "Company name" }),
    defineField({ name: "legalName", type: "string", title: "Legal name" }),
    defineField({ name: "tagline", type: "string", title: "Tagline" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({
      name: "logo",
      type: "image",
      title: "Logo",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
    }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phone", type: "string", title: "Phone (E.164)" }),
    defineField({ name: "phoneDisplay", type: "string", title: "Phone display" }),
    defineField({ name: "whatsappMessage", type: "text", rows: 2, title: "WhatsApp default message" }),
    defineField({ name: "addressCity", type: "string", title: "Address city" }),
    defineField({ name: "addressCountry", type: "string", title: "Address country code" }),
    defineField({ name: "addressCountryName", type: "string", title: "Address country name" }),
    defineField({ name: "googleMapsUrl", type: "url", title: "Google Maps URL" }),
    defineField({
      name: "socialLinks",
      type: "array",
      of: [{ type: "socialLink" }],
      title: "Social links",
    }),
    defineField({
      name: "brandColors",
      type: "object",
      title: "Brand colors",
      fields: [
        defineField({ name: "accent", type: "string", title: "Accent" }),
        defineField({ name: "primary", type: "string", title: "Primary" }),
      ],
    }),
    defineField({ name: "googleAnalyticsId", type: "string", title: "Google Analytics ID" }),
    defineField({ name: "googleTagManagerId", type: "string", title: "Google Tag Manager ID" }),
    defineField({
      name: "defaultSeo",
      type: "seoMeta",
      title: "Default SEO",
    }),
    defineField({
      name: "defaultKeywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Default keywords",
    }),
    defineField({
      name: "defaultSeoByLocale",
      type: "array",
      title: "Default SEO by locale",
      of: [
        {
          type: "object",
          name: "localeSeoDefaults",
          fields: [
            defineField({
              name: "locale",
              type: "string",
              options: { list: ["en", "ar"] },
            }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
        },
      ],
    }),
    defineField({
      name: "homeHero",
      type: "image",
      title: "Homepage hero poster",
      description: "Poster frame shown while the hero video loads.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "homeHeroVideo",
      type: "file",
      title: "Homepage hero video",
      description: "Background loop for the homepage hero. Upload MP4/WebM — plays muted with no sound.",
      options: {
        accept: "video/mp4,video/webm",
      },
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Default OG image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "footerExploreLinks",
      type: "array",
      title: "Footer explore links",
      description:
        "Optional override for footer navigation links. When empty, main nav links are used.",
      of: [{ type: "footerLink" }],
    }),
  ],
});

export const notFoundPage = defineType({
  name: "notFoundPage",
  title: "404 Page",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({ name: "headline", type: "string", title: "Headline" }),
    defineField({ name: "body", type: "text", rows: 3, title: "Body" }),
    defineField({ name: "ctaLabel", type: "string", title: "CTA label" }),
    defineField({ name: "ctaHref", type: "string", title: "CTA href" }),
    defineField({ name: "seo", type: "seoMeta", title: "SEO" }),
  ],
});

export const singletonTypes = [siteSettings, notFoundPage];
