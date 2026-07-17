import { NextResponse } from "next/server";
import { createContactSubmission } from "@/sanity/create-submission";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
  websiteAlt?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (payload.websiteAlt?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const message = payload.message?.trim() ?? "";
  const locale = payload.locale ?? "en";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "required";
  if (!email) errors.email = "required";
  else if (!isValidEmail(email)) errors.email = "email";
  if (!message) errors.message = "required";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const plainText = [
    `Contact inquiry (${locale})`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const saved = await createContactSubmission({
      locale,
      name,
      email,
      phone,
      message,
      plainText,
    });

    if (!saved) {
      console.error("[contact] Sanity write token missing or not configured");
      return NextResponse.json(
        { ok: false, message: "Delivery failed" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[contact] Sanity create error", error);
    return NextResponse.json(
      { ok: false, message: "Delivery failed" },
      { status: 502 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL ?? process.env.BRIEF_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cps-contact-form",
          locale,
          submittedAt: new Date().toISOString(),
          data: { name, email, phone, message },
          plainText,
        }),
      });
    } catch (error) {
      console.error("[contact] webhook error", error);
    }
  }

  return NextResponse.json({ ok: true });
}
