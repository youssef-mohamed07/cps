"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import type { CatalogueCategory } from "@/content/service-architecture";
import { localizeText } from "@/content/service-architecture";
import type { Locale } from "@/lib/i18n";

type QuoteFormProps = {
  locale: Locale;
  serviceSlug: string;
  serviceTitle: string;
  categories: CatalogueCategory[];
};

export function QuoteForm({ locale, serviceSlug, serviceTitle, categories }: QuoteFormProps) {
  const searchParams = useSearchParams();
  const options = useMemo(() => categories.flatMap((category) => category.items), [categories]);
  const initialItem = searchParams.get("item") ?? "";
  const selectedLayout = searchParams.get("layout") ?? "";
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const item = options.find((entry) => entry.slug === form.get("item"));
    const files = form
      .getAll("references")
      .filter((value): value is File => value instanceof File && Boolean(value.name));
    const message = [
      `Service: ${serviceTitle} (${serviceSlug})`,
      `Item / type: ${item ? localizeText(item.title, locale) : "Not specified"}`,
      selectedLayout ? `Booth layout: ${selectedLayout}` : null,
      form.get("projectName") ? `Project / exhibition: ${form.get("projectName")}` : null,
      files.length ? `Reference files: ${files.map((file) => file.name).join(", ")}` : null,
      "",
      String(form.get("details") ?? ""),
      form.get("company") ? `Company: ${form.get("company")}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const payload = new FormData();
      payload.set("name", String(form.get("name") ?? ""));
      payload.set("email", String(form.get("email") ?? ""));
      payload.set("phone", String(form.get("phone") ?? ""));
      payload.set("message", message);
      payload.set("locale", locale);
      payload.set("websiteAlt", String(form.get("websiteAlt") ?? ""));
      payload.set("requestType", serviceSlug === "installation-project-delivery" ? "service-add-on" : "quote");
      files.forEach((file) => payload.append("references", file));

      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("submit failed");
      setDone(true);
    } catch {
      setError(
        locale === "ar"
          ? "تعذر إرسال الطلب. حاول مرة أخرى أو تواصل معنا مباشرة."
          : "We could not send your request. Try again or contact us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="brief-success" role="status">
        <p className="brief-success-eyebrow">{locale === "ar" ? "اطلب عرض سعر" : "Get a Quote"}</p>
        <h3 className="brief-success-title">{locale === "ar" ? "وصل طلبك" : "Quote request received"}</h3>
        <p className="brief-success-copy">{locale === "ar" ? "سيتواصل معك فريقنا بالخطوة التالية." : "Our team will follow up with the next step."}</p>
      </div>
    );
  }

  return (
    <form className="brief-form service-quote-form" onSubmit={submit}>
      <div className="brief-form-grid">
        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-name">{locale === "ar" ? "الاسم" : "Name"}</label>
          <input id="quote-name" name="name" className="brief-control" autoComplete="name" required />
        </div>
        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-company">{locale === "ar" ? "الشركة" : "Company"}</label>
          <input id="quote-company" name="company" className="brief-control" autoComplete="organization" required />
        </div>
        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-email">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</label>
          <input id="quote-email" name="email" className="brief-control" type="email" autoComplete="email" required />
        </div>
        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-phone">{locale === "ar" ? "الهاتف" : "Phone"}</label>
          <input id="quote-phone" name="phone" className="brief-control" type="tel" autoComplete="tel" dir="ltr" required />
        </div>
        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-item">{locale === "ar" ? "العنصر / النوع" : "Item / Type"}</label>
          <select id="quote-item" name="item" className="brief-control" defaultValue={initialItem} required>
            <option value="" disabled>{locale === "ar" ? "اختر" : "Select"}</option>
            {options.map((entry) => (
              <option key={entry.slug} value={entry.slug}>{localizeText(entry.title, locale)}</option>
            ))}
          </select>
        </div>
        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-project">{locale === "ar" ? "اسم المشروع أو المعرض (اختياري)" : "Project or exhibition name (optional)"}</label>
          <input id="quote-project" name="projectName" className="brief-control" />
        </div>
        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-details">{locale === "ar" ? "تفاصيل المشروع" : "Project details"}</label>
          <textarea id="quote-details" name="details" className="brief-control brief-control--area" required />
        </div>
        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-references">{locale === "ar" ? "ملفات مرجعية (اختياري)" : "Reference files (optional)"}</label>
          <input id="quote-references" name="references" className="brief-control service-quote-file" type="file" multiple />
        </div>
        <input name="websiteAlt" className="brief-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      </div>
      {error ? <p className="brief-submit-error" role="alert">{error}</p> : null}
      <div className="brief-form-actions service-quote-actions">
        <span />
        <button type="submit" className="btn-primary brief-next" disabled={submitting}>
          {submitting
            ? (locale === "ar" ? "جارٍ الإرسال…" : "Sending…")
            : (locale === "ar" ? "اطلب عرض السعر" : "Request My Quote")}
        </button>
      </div>
    </form>
  );
}
