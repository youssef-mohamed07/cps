import { defineField, defineType } from "sanity";

const submissionStatus = defineField({
  name: "status",
  type: "string",
  title: "Status",
  options: {
    list: [
      { title: "New", value: "new" },
      { title: "Reviewed", value: "reviewed" },
      { title: "Archived", value: "archived" },
    ],
    layout: "radio",
  },
  initialValue: "new",
});

export const contactSubmission = defineType({
  name: "contactSubmission",
  title: "Contact submission",
  type: "document",
  fields: [
    submissionStatus,
    defineField({ name: "submittedAt", type: "datetime", title: "Submitted at" }),
    defineField({
      name: "locale",
      type: "string",
      title: "Locale",
      options: { list: ["en", "ar"] },
    }),
    defineField({ name: "name", type: "string", title: "Name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({ name: "message", type: "text", rows: 6, title: "Message" }),
    defineField({ name: "plainText", type: "text", rows: 10, title: "Plain text" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      email: "email",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare: ({ title, email, status, submittedAt }) => ({
      title: title || "Contact inquiry",
      subtitle: [status, email, submittedAt?.slice(0, 16)].filter(Boolean).join(" · "),
    }),
  },
});

export const briefSubmission = defineType({
  name: "briefSubmission",
  title: "Brief submission",
  type: "document",
  fields: [
    submissionStatus,
    defineField({ name: "submittedAt", type: "datetime", title: "Submitted at" }),
    defineField({
      name: "locale",
      type: "string",
      title: "Locale",
      options: { list: ["en", "ar"] },
    }),
    defineField({ name: "fullName", type: "string", title: "Full name" }),
    defineField({ name: "email", type: "string", title: "Email" }),
    defineField({ name: "phone", type: "string", title: "Phone" }),
    defineField({ name: "jobTitle", type: "string", title: "Job title" }),
    defineField({ name: "userType", type: "string", title: "User type" }),
    defineField({
      name: "preferredContact",
      type: "string",
      title: "Preferred contact",
    }),
    defineField({ name: "companyName", type: "string", title: "Company" }),
    defineField({ name: "website", type: "string", title: "Website" }),
    defineField({ name: "industry", type: "string", title: "Industry" }),
    defineField({ name: "companySize", type: "string", title: "Company size" }),
    defineField({ name: "country", type: "string", title: "Country" }),
    defineField({ name: "city", type: "string", title: "City" }),
    defineField({ name: "eventName", type: "string", title: "Event name" }),
    defineField({ name: "eventLocation", type: "string", title: "Event location" }),
    defineField({ name: "eventDate", type: "string", title: "Event date" }),
    defineField({ name: "boothSize", type: "string", title: "Booth size" }),
    defineField({ name: "boothType", type: "string", title: "Booth type" }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "string" }],
      title: "Services",
    }),
    defineField({
      name: "hasExistingDesign",
      type: "string",
      title: "Has existing design",
    }),
    defineField({ name: "budgetRange", type: "string", title: "Budget range" }),
    defineField({ name: "timeline", type: "string", title: "Timeline" }),
    defineField({ name: "description", type: "text", rows: 6, title: "Description" }),
    defineField({ name: "referenceUrl", type: "string", title: "Reference URL" }),
    defineField({ name: "heardFrom", type: "string", title: "Heard from" }),
    defineField({ name: "updatesOptIn", type: "boolean", title: "Updates opt-in" }),
    defineField({ name: "consent", type: "boolean", title: "Consent" }),
    defineField({ name: "plainText", type: "text", rows: 16, title: "Plain text" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "fullName",
      company: "companyName",
      eventName: "eventName",
      status: "status",
      submittedAt: "submittedAt",
    },
    prepare: ({ title, company, eventName, status, submittedAt }) => ({
      title: title || "Brief inquiry",
      subtitle: [status, company || eventName, submittedAt?.slice(0, 16)]
        .filter(Boolean)
        .join(" · "),
    }),
  },
});

export const submissionTypes = [contactSubmission, briefSubmission];
