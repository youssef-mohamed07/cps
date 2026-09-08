"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import type { QuoteFormCopy, QuoteFormOption } from "@/content/quote-form.copy";
import type { Locale } from "@/lib/i18n";

type QuoteFormProps = {
  locale: Locale;
  copy: QuoteFormCopy;
  options: QuoteFormOption[];
  /** Context line included in the submission message. */
  contextLabel?: string;
  requestType?: "quote" | "service-add-on" | "contact";
  /** When false, do not read ?item= from the URL (contact page). */
  preferUrlItem?: boolean;
};

export function QuoteForm({
  locale,
  copy,
  options,
  contextLabel,
  requestType = "quote",
  preferUrlItem = true,
}: QuoteFormProps) {
  const searchParams = useSearchParams();
  const urlItem = preferUrlItem ? (searchParams.get("item") ?? "") : "";
  const selectedLayout = preferUrlItem ? (searchParams.get("layout") ?? "") : "";
  const initialItem = options.some((option) => option.value === urlItem)
    ? urlItem
    : "";

  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [fileLabel, setFileLabel] = useState(copy.placeholders.references);

  const optionMap = useMemo(
    () => new Map(options.map((option) => [option.value, option.label])),
    [options],
  );

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const itemValue = String(data.get("item") ?? "").trim();
    const projectName = String(data.get("projectName") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const files = data
      .getAll("references")
      .filter((value): value is File => value instanceof File && Boolean(value.name));

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = copy.errors.required;
    if (!company) nextErrors.company = copy.errors.required;
    if (!email) nextErrors.email = copy.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = copy.errors.email;
    }
    if (!phone) nextErrors.phone = copy.errors.required;
    if (!itemValue) nextErrors.item = copy.errors.required;
    if (!details) nextErrors.details = copy.errors.required;
    if (files.length > 5) nextErrors.references = copy.errors.tooManyFiles;
    if (files.some((file) => file.size > 10 * 1024 * 1024)) {
      nextErrors.references = copy.errors.fileTooLarge;
    }

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setSubmitting(false);
      return;
    }

    const itemLabel = optionMap.get(itemValue) ?? itemValue;
    const message = [
      contextLabel ? `Context: ${contextLabel}` : null,
      `${copy.labels.item}: ${itemLabel}`,
      selectedLayout ? `Booth layout: ${selectedLayout}` : null,
      projectName ? `${copy.labels.projectName}: ${projectName}` : null,
      company ? `${copy.labels.company}: ${company}` : null,
      files.length
        ? `Reference files: ${files.map((file) => file.name).join(", ")}`
        : null,
      "",
      details,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const payload = new FormData();
      payload.set("name", name);
      payload.set("email", email);
      payload.set("phone", phone);
      payload.set("message", message);
      payload.set("locale", locale);
      payload.set("websiteAlt", String(data.get("websiteAlt") ?? ""));
      payload.set(
        "requestType",
        requestType === "service-add-on" ? "service-add-on" : "quote",
      );
      files.forEach((file) => payload.append("references", file));

      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });

      if (!response.ok) throw new Error("submit failed");
      setDone(true);
    } catch {
      setError(copy.errors.submit);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="brief-success quote-form-success" role="status">
        <p className="brief-success-eyebrow">{copy.success.eyebrow}</p>
        <h3 className="brief-success-title">{copy.success.title}</h3>
        <p className="brief-success-copy">{copy.success.message}</p>
      </div>
    );
  }

  return (
    <form className="brief-form quote-form" onSubmit={submit} noValidate>
      <div className="brief-form-grid">
        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-name">
            {copy.labels.name}
          </label>
          <input
            id="quote-name"
            name="name"
            className="brief-control"
            autoComplete="name"
            placeholder={copy.placeholders.name}
            required
          />
          {fieldErrors.name ? (
            <span className="brief-error">{fieldErrors.name}</span>
          ) : null}
        </div>

        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-company">
            {copy.labels.company}
          </label>
          <input
            id="quote-company"
            name="company"
            className="brief-control"
            autoComplete="organization"
            placeholder={copy.placeholders.company}
            required
          />
          {fieldErrors.company ? (
            <span className="brief-error">{fieldErrors.company}</span>
          ) : null}
        </div>

        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-email">
            {copy.labels.email}
          </label>
          <input
            id="quote-email"
            name="email"
            className="brief-control"
            type="email"
            autoComplete="email"
            placeholder={copy.placeholders.email}
            required
          />
          {fieldErrors.email ? (
            <span className="brief-error">{fieldErrors.email}</span>
          ) : null}
        </div>

        <div className="brief-field">
          <label className="brief-label" htmlFor="quote-phone">
            {copy.labels.phone}
          </label>
          <input
            id="quote-phone"
            name="phone"
            className="brief-control"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            placeholder={copy.placeholders.phone}
            required
          />
          {fieldErrors.phone ? (
            <span className="brief-error">{fieldErrors.phone}</span>
          ) : null}
        </div>

        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-item">
            {copy.labels.item}
          </label>
          <select
            id="quote-item"
            name="item"
            className="brief-control"
            defaultValue={initialItem}
            required
          >
            <option value="" disabled>
              {copy.placeholders.item}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {fieldErrors.item ? (
            <span className="brief-error">{fieldErrors.item}</span>
          ) : null}
        </div>

        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-project">
            {copy.labels.projectName}
          </label>
          <input
            id="quote-project"
            name="projectName"
            className="brief-control"
            placeholder={copy.placeholders.projectName}
          />
        </div>

        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-details">
            {copy.labels.details}
          </label>
          <textarea
            id="quote-details"
            name="details"
            className="brief-control brief-control--area"
            placeholder={copy.placeholders.details}
            rows={5}
            required
          />
          {fieldErrors.details ? (
            <span className="brief-error">{fieldErrors.details}</span>
          ) : null}
        </div>

        <div className="brief-field brief-field--full">
          <label className="brief-label" htmlFor="quote-references">
            {copy.labels.references}
          </label>
          <label className="quote-file">
            <input
              id="quote-references"
              name="references"
              className="quote-file-input"
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.webp,.dwg,.zip"
              onChange={(event) => {
                const files = Array.from(event.target.files ?? []);
                setFileLabel(
                  files.length
                    ? files.map((file) => file.name).join(", ")
                    : copy.placeholders.references,
                );
              }}
            />
            <span className="quote-file-label">{fileLabel}</span>
          </label>
          {fieldErrors.references ? (
            <span className="brief-error">{fieldErrors.references}</span>
          ) : null}
        </div>

        <input
          name="websiteAlt"
          className="brief-honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {error ? (
        <p className="brief-submit-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="brief-form-actions quote-form-actions">
        <button type="submit" className="btn-primary brief-next" disabled={submitting}>
          {submitting ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}
