import { NextResponse } from "next/server";
import {
  formatBriefPlainText,
  validateBriefForm,
  type BriefFormData,
} from "@/lib/brief-form";
import { createBriefSubmission } from "@/sanity/create-submission";

export async function POST(request: Request) {
  let payload: BriefFormData & { locale?: string; websiteAlt?: string };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON" }, { status: 400 });
  }

  if (payload.websiteAlt?.trim()) {
    return NextResponse.json({ ok: true });
  }

  const { locale = "en", websiteAlt: _honeypot, ...data } = payload;
  const errors = validateBriefForm(data as BriefFormData);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const brief = data as BriefFormData;
  const plainText = formatBriefPlainText(brief, locale);

  try {
    const saved = await createBriefSubmission({
      locale,
      data: brief,
      plainText,
    });

    if (!saved) {
      console.error("[brief] Sanity write token missing or not configured");
      return NextResponse.json(
        { ok: false, message: "Delivery failed" },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("[brief] Sanity create error", error);
    return NextResponse.json(
      { ok: false, message: "Delivery failed" },
      { status: 502 },
    );
  }

  const webhook = process.env.BRIEF_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cps-brief-form",
          locale,
          submittedAt: new Date().toISOString(),
          data: brief,
          plainText,
        }),
      });
    } catch (error) {
      console.error("[brief] webhook error", error);
    }
  }

  return NextResponse.json({ ok: true });
}
