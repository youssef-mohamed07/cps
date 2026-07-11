"use client";

import { useId, useState, type FormEvent } from "react";
import { getMailtoUrl } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n";

export type ContactFormCopy = {
  name: string;
  email: string;
  phone: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  required: string;
  emailInvalid: string;
};

type ContactFormProps = {
  locale: Locale;
  copy: ContactFormCopy;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  websiteAlt: string;
};

type FormErrors = Partial<Record<keyof Omit<FormState, "websiteAlt">, string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
  websiteAlt: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function ContactForm({ locale, copy }: ContactFormProps) {
  const prefix = useId();
  const id = (name: string) => `${prefix}-${name}`;

  const [data, setData] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(values: FormState): FormErrors {
    const next: FormErrors = {};
    if (!values.name.trim()) next.name = copy.required;
    if (!values.email.trim()) next.email = copy.required;
    else if (!isValidEmail(values.email)) next.email = copy.emailInvalid;
    if (!values.message.trim()) next.message = copy.required;
    return next;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (data.websiteAlt.trim()) {
      setDone(true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) {
        throw new Error("request failed");
      }

      setDone(true);
      setData(INITIAL);
    } catch {
      const mailto = getMailtoUrl({
        subject: `Contact — ${data.name}`,
        body: [
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone ? `Phone: ${data.phone}` : null,
          "",
          data.message,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      window.location.href = mailto;
      setSubmitError(copy.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="contact-form-success" role="status">
        <p>{copy.success}</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-form-grid">
        <div className="contact-form-field">
          <label htmlFor={id("name")}>{copy.name}</label>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={data.name}
            onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
            className="contact-form-control"
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? <span className="contact-form-error">{errors.name}</span> : null}
        </div>

        <div className="contact-form-field">
          <label htmlFor={id("email")}>{copy.email}</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            value={data.email}
            onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
            className="contact-form-control"
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? <span className="contact-form-error">{errors.email}</span> : null}
        </div>

        <div className="contact-form-field contact-form-field--full">
          <label htmlFor={id("phone")}>{copy.phone}</label>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
            value={data.phone}
            onChange={(e) => setData((prev) => ({ ...prev, phone: e.target.value }))}
            className="contact-form-control"
          />
        </div>

        <div className="contact-form-field contact-form-field--full">
          <label htmlFor={id("message")}>{copy.message}</label>
          <textarea
            id={id("message")}
            name="message"
            rows={5}
            value={data.message}
            onChange={(e) => setData((prev) => ({ ...prev, message: e.target.value }))}
            className="contact-form-control contact-form-control--area"
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message ? (
            <span className="contact-form-error">{errors.message}</span>
          ) : null}
        </div>
      </div>

      <input
        type="text"
        name="websiteAlt"
        value={data.websiteAlt}
        onChange={(e) => setData((prev) => ({ ...prev, websiteAlt: e.target.value }))}
        className="contact-form-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {submitError ? (
        <p className="contact-form-submit-error" role="alert">
          {submitError}
        </p>
      ) : null}

      <button type="submit" className="btn-primary contact-form-submit" disabled={submitting}>
        {submitting ? copy.sending : copy.submit}
      </button>
    </form>
  );
}
