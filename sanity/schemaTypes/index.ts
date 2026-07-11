import { type SchemaTypeDefinition } from "sanity";
import { boothType, service } from "./documents/services";
import { industry, location, newsArticle, project } from "./documents/content";
import { dictionaryTypes } from "./documents/dictionary";
import { footerBadge, footerTrustItem, siteFooter } from "./documents/footer";
import { pageSingletonTypes } from "./documents/pages";
import { singletonTypes } from "./documents/settings";
import {
  author,
  category,
  client,
  faq,
  redirect,
  testimonial,
} from "./documents/taxonomies";
import { objectTypes } from "./objects";

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectTypes,
  ...singletonTypes,
  ...dictionaryTypes,
  ...pageSingletonTypes,
  footerBadge,
  footerTrustItem,
  siteFooter,
  service,
  boothType,
  project,
  industry,
  location,
  newsArticle,
  client,
  category,
  author,
  faq,
  testimonial,
  redirect,
];

export const singletonDocumentIds = [
  "siteSettings",
  "dictionary",
  "notFoundPage",
  "homePage",
  "aboutPageDoc",
  "contactPageDoc",
  "navigation",
  "globalSeo",
  "siteFooter",
];

export const collectionTypes = [
  "service",
  "boothType",
  "project",
  "industry",
  "location",
  "newsArticle",
  "client",
  "category",
  "author",
  "faq",
  "testimonial",
  "redirect",
] as const;
