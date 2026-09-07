import { NextResponse } from "next/server";
import { createContactSubmission } from "@/sanity/create-submission";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
  websiteAlt?: string;
  requestType?: "quote" | "service-add-on";
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  let referenceFiles: File[] = [];

  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await request.formData();
      payload = {
        name: String(form.get("name") ?? ""),
        email: String(form.get("email") ?? ""),
        phone: String(form.get("phone") ?? ""),
        message: String(form.get("message") ?? ""),
        locale: String(form.get("locale") ?? "en"),
        websiteAlt: String(form.get("websiteAlt") ?? ""),
        requestType: form.get("requestType") === "service-add-on" ? "service-add-on" : "quote",
      };
      referenceFiles = form
        .getAll("references")
        .filter((value): value is File => value instanceof File && Boolean(value.name));
    } else {
      payload = await request.json();
    }
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
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
  if (referenceFiles.length > MAX_FILES) errors.references = "too_many_files";
  if (referenceFiles.some((file) => file.size > MAX_FILE_SIZE)) errors.references = "file_too_large";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const plainText = [
    `Contact inquiry (${locale})`,
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    payload.requestType ? `Request type: ${payload.requestType}` : null,
    referenceFiles.length ? `Uploaded files: ${referenceFiles.map((file) => file.name).join(", ")}` : null,
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
      requestType: payload.requestType,
      referenceFiles,
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
          data: {
            name,
            email,
            phone,
            message,
            requestType: payload.requestType,
            referenceFiles: referenceFiles.map((file) => ({ name: file.name, type: file.type, size: file.size })),
          },
          plainText,
        }),
      });
    } catch (error) {
      console.error("[contact] webhook error", error);
    }
  }

  return NextResponse.json({ ok: true });
}
