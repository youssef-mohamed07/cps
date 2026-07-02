import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { publishRevalidatePlugin } from "./sanity/plugins/publish-revalidate";
import { schemaTypes, singletonDocumentIds } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const localeSingletons = [
  { title: "UI Copy (EN)", schemaType: "dictionary", documentId: "dictionary-en" },
  { title: "UI Copy (AR)", schemaType: "dictionary", documentId: "dictionary-ar" },
  { title: "404 Page (EN)", schemaType: "notFoundPage", documentId: "notFoundPage-en" },
  { title: "404 Page (AR)", schemaType: "notFoundPage", documentId: "notFoundPage-ar" },
] as const;

export default defineConfig({
  name: "cps",
  title: "CPS CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document().schemaType("siteSettings").documentId("siteSettings"),
              ),
            S.divider(),
            ...localeSingletons.map((item) =>
              S.listItem()
                .title(item.title)
                .id(item.documentId)
                .child(
                  S.document().schemaType(item.schemaType).documentId(item.documentId),
                ),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2025-01-01" }),
    publishRevalidatePlugin(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonDocumentIds.includes(schemaType)),
  },
});
