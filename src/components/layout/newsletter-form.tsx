"use client";

import { useState, type FormEvent } from "react";

type NewsletterFormProps = {
  placeholder: string;
  buttonLabel: string;
  mailto?: string;
};

export function NewsletterForm({ placeholder, buttonLabel, mailto }: NewsletterFormProps) {
  const [email, setEmail] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !mailto) return;
    const subject = encodeURIComponent("Newsletter subscribe");
    const body = encodeURIComponent(`Please subscribe: ${email.trim()}`);
    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="footer-newsletter-form" onSubmit={onSubmit}>
      <label className="sr-only" htmlFor="footer-newsletter-email">
        {placeholder}
      </label>
      <input
        id="footer-newsletter-email"
        type="email"
        name="email"
        required
        autoComplete="email"
        placeholder={placeholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="footer-newsletter-input"
      />
      <button type="submit" className="btn-primary footer-newsletter-btn">
        {buttonLabel}
      </button>
    </form>
  );
}
