import { draftMode } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/en";
  const expected = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_REVALIDATE_SECRET;

  if (expected && secret !== expected) {
    return NextResponse.json({ message: "Invalid preview secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const redirectTo = slug.startsWith("/") ? slug : `/${slug}`;
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
