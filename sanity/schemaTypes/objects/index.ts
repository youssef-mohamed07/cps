import { defineField, defineType } from "sanity";
import {
  benefitItem,
  contentSection,
  ctaBlock,
  faqItem,
  galleryImage,
  navItem,
  processStep,
  sectionItem,
} from "./shared";
import {
  navColumn,
  navFeatured,
  navLink,
  navMega,
  navPrimaryItem,
} from "./navigation";

export const seoMeta = defineType({
  name: "seoMeta",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Meta title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Meta description" }),
    defineField({
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Keywords",
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Open Graph / social share image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
        defineField({ name: "caption", type: "string", title: "Caption" }),
      ],
    }),
    defineField({ name: "twitterTitle", type: "string", title: "Twitter title" }),
    defineField({ name: "twitterDescription", type: "text", rows: 2, title: "Twitter description" }),
    defineField({ name: "canonicalUrl", type: "url", title: "Canonical URL" }),
    defineField({ name: "noIndex", type: "boolean", title: "No index" }),
    defineField({
      name: "robots",
      type: "string",
      title: "Robots directive",
      description: "e.g. index,follow or noindex,nofollow",
    }),
    defineField({
      name: "structuredDataType",
      type: "string",
      title: "Structured data type",
      description: "e.g. Service, Article, Project, LocalBusiness",
    }),
  ],
});

export const serviceImage = defineType({
  name: "serviceImage",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "asset",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "alt",
      type: "string",
      title: "Alt text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "caption", type: "string", title: "Caption" }),
    defineField({ name: "width", type: "number", title: "Width" }),
    defineField({ name: "height", type: "number", title: "Height" }),
  ],
});

export const geoPoint = defineType({
  name: "geoPoint",
  title: "Geo coordinates",
  type: "object",
  fields: [
    defineField({ name: "lat", type: "number", title: "Latitude" }),
    defineField({ name: "lng", type: "number", title: "Longitude" }),
  ],
});

export const specItem = defineType({
  name: "specItem",
  title: "Spec",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "value", type: "string", title: "Value" }),
  ],
});

export const readingSection = defineType({
  name: "readingSection",
  title: "Reading section",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [{ type: "text" }],
      title: "Paragraphs",
    }),
  ],
});

export const caseStudyHighlight = defineType({
  name: "caseStudyHighlight",
  title: "Highlight",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
  ],
});

export const serviceFeature = defineType({
  name: "serviceFeature",
  title: "Feature / Product",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({ name: "description", type: "text", rows: 3, title: "Description" }),
    defineField({
      name: "details",
      type: "array",
      of: [{ type: "string" }],
      title: "Detail bullets",
    }),
    defineField({
      name: "specs",
      type: "array",
      of: [{ type: "specItem" }],
      title: "Specifications",
    }),
    defineField({
      name: "gallery",
      type: "array",
      of: [{ type: "serviceImage" }],
      title: "Gallery",
    }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  fields: [
    defineField({ name: "platform", type: "string", title: "Platform" }),
    defineField({ name: "url", type: "url", title: "URL" }),
    defineField({ name: "label", type: "string", title: "Label" }),
  ],
});

export const footerLink = defineType({
  name: "footerLink",
  title: "Footer link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", title: "Label" }),
    defineField({ name: "href", type: "string", title: "Href" }),
  ],
});

export const footerLinkGroup = defineType({
  name: "footerLinkGroup",
  title: "Footer link group",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", title: "Title" }),
    defineField({
      name: "links",
      type: "array",
      of: [{ type: "footerLink" }],
    }),
  ],
});

export const objectTypes = [
  seoMeta,
  serviceImage,
  geoPoint,
  specItem,
  readingSection,
  caseStudyHighlight,
  serviceFeature,
  socialLink,
  footerLink,
  footerLinkGroup,
  ctaBlock,
  benefitItem,
  processStep,
  sectionItem,
  contentSection,
  galleryImage,
  navItem,
  faqItem,
  navLink,
  navColumn,
  navFeatured,
  navMega,
  navPrimaryItem,
];
