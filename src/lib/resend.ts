import "server-only";

import { Buffer } from "node:buffer";
import { Resend } from "resend";

export type ContactAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type ContactEmail = {
  name: string;
  email?: string;
  phone?: string;
  locale: string;
  requestType?: "quote" | "service-add-on";
  inquiryOption?: "client" | "recruitment" | "partner";
  source?: string;
  country?: string;
  eventType?: string;
  cvUrl?: string;
  note?: string;
  message?: string;
  commercialRegister?: string;
  vatNumber?: string;
  websiteSocial?: string;
  nationalAddress?: string;
  authorizedPersonName?: string;
  bankName?: string;
  iban?: string;
  beneficiaryName?: string;
  attachments?: ContactAttachment[];
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function cleanHeaderValue(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function inquiryLabel(inquiry: ContactEmail): string {
  if (inquiry.requestType === "service-add-on") return "Service add-on";
  if (inquiry.requestType === "quote") return "Quote request";
  if (inquiry.inquiryOption === "client") return "Client";
  if (inquiry.inquiryOption === "recruitment") return "Job applicant";
  if (inquiry.inquiryOption === "partner") return "Partner / supplier";
  return "Website";
}

function attachmentSummary(inquiry: ContactEmail): string | undefined {
  const names = inquiry.attachments?.map((file) => file.filename).filter(Boolean) ?? [];
  return names.length ? `${names.join(", ")} (attached)` : undefined;
}

function fieldRows(inquiry: ContactEmail): Array<[string, string]> {
  const rows: Array<[string, string | undefined]> = [
    ["Submission", inquiryLabel(inquiry)],
    ["Language", inquiry.locale],
    [inquiry.inquiryOption === "partner" ? "Company" : "Name", inquiry.name],
    ["Email", inquiry.email],
    ["Phone", inquiry.phone],
    ["Country", inquiry.country],
    ["Planning", inquiry.eventType],
    ["CV / portfolio", inquiry.cvUrl],
    ["Notes", inquiry.note],
    ["Request details", inquiry.message],
    ["Commercial register", inquiry.commercialRegister],
    ["VAT number", inquiry.vatNumber],
    ["Website / social", inquiry.websiteSocial],
    ["National address", inquiry.nationalAddress],
    ["Authorized person", inquiry.authorizedPersonName],
    ["Bank name", inquiry.bankName],
    ["IBAN", inquiry.iban],
    ["Beneficiary name", inquiry.beneficiaryName],
    ["Attachments", attachmentSummary(inquiry)],
    ["Source", inquiry.source],
  ];

  return rows
    .map(([label, value]) => [label, value?.trim() ?? ""] as [string, string])
    .filter(([, value]) => Boolean(value));
}

function renderText(inquiry: ContactEmail): string {
  return fieldRows(inquiry).map(([label, value]) => `${label}: ${value}`).join("\n\n");
}

function renderHtml(inquiry: ContactEmail): string {
  const rows = fieldRows(inquiry)
    .map(
      ([label, value]) =>
        `<tr><th style="padding:10px 16px;text-align:left;vertical-align:top;color:#667085;font-size:12px;font-weight:600;border-bottom:1px solid #e4e7ec;white-space:nowrap">${escapeHtml(label)}</th><td style="padding:10px 16px;color:#101828;font-size:14px;line-height:1.55;border-bottom:1px solid #e4e7ec;white-space:pre-wrap;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html lang="en"><body style="margin:0;background:#f2f4f7;font-family:Arial,sans-serif"><div style="max-width:680px;margin:0 auto;padding:32px 16px"><div style="background:#101828;color:#fff;padding:20px 24px;border-radius:14px 14px 0 0"><div style="font-size:20px;font-weight:700">CPS</div><div style="margin-top:4px;color:#d0d5dd;font-size:13px">New website submission</div></div><table role="presentation" style="width:100%;border-collapse:collapse;background:#fff;border-radius:0 0 14px 14px;overflow:hidden">${rows}</table></div></body></html>`;
}

export async function sendContactEmail(inquiry: ContactEmail): Promise<void> {
  const resend = new Resend(requireEnv("RESEND_API_KEY"));
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "CPS";
  const fromAddress = requireEnv("EMAIL_FROM_ADDRESS");
  const toAddress = requireEnv("EMAIL_TO_ADDRESS");
  const label = inquiryLabel(inquiry);

  const { error } = await resend.emails.send({
    from: `${fromName.replace(/[<>\r\n]/g, "")} <${fromAddress}>`,
    to: [toAddress],
    subject: `[CPS] ${label} inquiry — ${cleanHeaderValue(inquiry.name)}`,
    text: renderText(inquiry),
    html: renderHtml(inquiry),
    replyTo: inquiry.email || undefined,
    attachments: inquiry.attachments?.length ? inquiry.attachments : undefined,
  });

  if (error) throw new Error(error.message || "Failed to send contact email");
}
