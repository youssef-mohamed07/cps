import { defineField, defineType } from "sanity";

export const dictionary = defineType({
  name: "dictionary",
  title: "UI Copy",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      type: "string",
      options: { list: ["en", "ar"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "comingSoon",
      type: "object",
      title: "Coming Soon",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
      ],
    }),
    defineField({
      name: "content",
      type: "text",
      title: "Dictionary JSON (advanced override)",
      rows: 16,
    }),
  ],
  preview: {
    select: { locale: "locale" },
    prepare({ locale }) {
      return { title: `UI Copy (${locale?.toUpperCase() ?? "?"})` };
    },
  },
});

export const dictionaryTypes = [dictionary];
