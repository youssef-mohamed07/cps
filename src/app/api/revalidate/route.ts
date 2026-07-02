import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const REVALIDATE_TAGS = [
  "siteSettings",
  "dictionary",
  "notFoundPage",
] as const;

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev && !secret) {
    return NextResponse.json(
      { ok: false, message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 501 },
    );
  }

  if (!isDev) {
    const authHeader = request.headers.get("authorization");
    const body = await request.json().catch(() => ({}));
    const providedSecret =
      authHeader?.replace(/^Bearer\s+/i, "") ||
      (typeof body.secret === "string" ? body.secret : undefined);

    if (providedSecret !== secret) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
  }

  for (const tag of REVALIDATE_TAGS) {
    revalidateTag(tag, "max");
  }

  for (const locale of ["en", "ar"] as const) {
    revalidateTag(`dictionary-${locale}`, "max");
    revalidateTag(`notFoundPage-${locale}`, "max");
  }

  revalidatePath("/", "layout");
  revalidatePath("/en", "page");
  revalidatePath("/ar", "page");

  return NextResponse.json({ ok: true, revalidated: true, dev: isDev });
}
