import { type SchemaTypeDefinition } from "sanity";
import { dictionaryTypes } from "./documents/dictionary";
import { singletonTypes } from "./documents/settings";
import { objectTypes } from "./objects";

export const schemaTypes: SchemaTypeDefinition[] = [
  ...objectTypes,
  ...singletonTypes,
  ...dictionaryTypes,
];

export const singletonDocumentIds = ["siteSettings", "dictionary", "notFoundPage"];
