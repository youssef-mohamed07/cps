import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { publishRevalidatePlugin } from "./sanity/plugins/publish-revalidate";
import {
  schemaTypes,
  singletonDocumentIds,
} from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const localeSingletons = [
  { title: "Home (EN)", schemaType: "homePage", documentId: "homePage-en" },
  { title: "Home (AR)", schemaType: "homePage", documentId: "homePage-ar" },
  { title: "About (EN)", schemaType: "aboutPageDoc", documentId: "aboutPage-en" },
  { title: "About (AR)", schemaType: "aboutPageDoc", documentId: "aboutPage-ar" },
  { title: "Contact (EN)", schemaType: "contactPageDoc", documentId: "contactPage-en" },
  { title: "Contact (AR)", schemaType: "contactPageDoc", documentId: "contactPage-ar" },
  { title: "Navigation (EN)", schemaType: "navigation", documentId: "navigation-en" },
  { title: "Navigation (AR)", schemaType: "navigation", documentId: "navigation-ar" },
  { title: "Footer (EN)", schemaType: "siteFooter", documentId: "siteFooter-en" },
  { title: "Footer (AR)", schemaType: "siteFooter", documentId: "siteFooter-ar" },
  { title: "UI Copy (EN)", schemaType: "dictionary", documentId: "dictionary-en" },
  { title: "UI Copy (AR)", schemaType: "dictionary", documentId: "dictionary-ar" },
  { title: "404 Page (EN)", schemaType: "notFoundPage", documentId: "notFoundPage-en" },
  { title: "404 Page (AR)", schemaType: "notFoundPage", documentId: "notFoundPage-ar" },
] as const;

const hubKinds = [
  "services",
  "boothTypes",
  "work",
  "industries",
  "locations",
  "news",
] as const;

const hubTitles: Record<(typeof hubKinds)[number], string> = {
  services: "Services",
  boothTypes: "Booth types",
  work: "Work",
  industries: "Industries",
  locations: "Locations",
  news: "News / Insights",
};

const hubSingletons = hubKinds.flatMap((kind) => [
  {
    title: `${hubTitles[kind]} hub (EN)`,
    documentId: `hubPage-${kind}-en`,
  },
  {
    title: `${hubTitles[kind]} hub (AR)`,
    documentId: `hubPage-${kind}-ar`,
  },
]);

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
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("Global SEO")
              .id("globalSeo")
              .child(S.document().schemaType("globalSeo").documentId("globalSeo")),
            S.divider(),
            S.listItem()
              .title("Pages")
              .child(
                S.list()
                  .title("Pages")
                  .items(
                    localeSingletons
                      .filter((item) =>
                        [
                          "homePage",
                          "aboutPageDoc",
                          "contactPageDoc",
                          "navigation",
                          "siteFooter",
                        ].includes(item.schemaType),
                      )
                      .map((item) =>
                        S.listItem()
                          .title(item.title)
                          .id(item.documentId)
                          .child(
                            S.document()
                              .schemaType(item.schemaType)
                              .documentId(item.documentId),
                          ),
                      ),
                  ),
              ),
            S.listItem()
              .title("Hub pages")
              .child(
                S.list()
                  .title("Hub pages")
                  .items(
                    hubSingletons.map((item) =>
                      S.listItem()
                        .title(item.title)
                        .id(item.documentId)
                        .child(
                          S.document()
                            .schemaType("hubPage")
                            .documentId(item.documentId),
                        ),
                    ),
                  ),
              ),
            S.listItem()
              .title("UI Copy & 404")
              .child(
                S.list()
                  .title("UI Copy & 404")
                  .items(
                    localeSingletons
                      .filter((item) =>
                        ["dictionary", "notFoundPage"].includes(item.schemaType),
                      )
                      .map((item) =>
                        S.listItem()
                          .title(item.title)
                          .id(item.documentId)
                          .child(
                            S.document()
                              .schemaType(item.schemaType)
                              .documentId(item.documentId),
                          ),
                      ),
                  ),
              ),
            S.divider(),
            S.listItem()
              .title("Services")
              .child(S.documentTypeList("service").title("Services")),
            S.listItem()
              .title("Booth Types")
              .child(S.documentTypeList("boothType").title("Booth Types")),
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
            S.listItem()
              .title("Industries")
              .child(S.documentTypeList("industry").title("Industries")),
            S.listItem()
              .title("Locations")
              .child(S.documentTypeList("location").title("Locations")),
            S.listItem()
              .title("News")
              .child(S.documentTypeList("newsArticle").title("News")),
            S.divider(),
            S.listItem()
              .title("Inbox")
              .child(
                S.list()
                  .title("Inbox")
                  .items([
                    S.listItem()
                      .title("Contact submissions")
                      .child(
                        S.documentTypeList("contactSubmission")
                          .title("Contact submissions")
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                    S.listItem()
                      .title("Brief submissions")
                      .child(
                        S.documentTypeList("briefSubmission")
                          .title("Brief submissions")
                          .defaultOrdering([
                            { field: "submittedAt", direction: "desc" },
                          ]),
                      ),
                  ]),
              ),
            S.listItem()
              .title("Taxonomies")
              .child(
                S.list()
                  .title("Taxonomies")
                  .items([
                    S.listItem()
                      .title("Clients")
                      .child(S.documentTypeList("client").title("Clients")),
                    S.listItem()
                      .title("Categories")
                      .child(S.documentTypeList("category").title("Categories")),
                    S.listItem()
                      .title("Authors")
                      .child(S.documentTypeList("author").title("Authors")),
                    S.listItem()
                      .title("FAQs")
                      .child(S.documentTypeList("faq").title("FAQs")),
                    S.listItem()
                      .title("Testimonials")
                      .child(S.documentTypeList("testimonial").title("Testimonials")),
                    S.listItem()
                      .title("Redirects")
                      .child(S.documentTypeList("redirect").title("Redirects")),
                  ]),
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
