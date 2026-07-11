import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { redirects as localRedirects } from "@/content/catalog";
import { defaultLocale, isLocale, localizePath } from "@/lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

function matchContentRedirect(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];
  const locale = isLocale(maybeLocale) ? maybeLocale : null;
  const barePath = locale ? `/${segments.slice(1).join("/")}` || "/" : pathname;

  const hit = localRedirects.find((item) => item.from === barePath);
  if (!hit) return null;

  return {
    destination: locale ? localizePath(hit.to, locale) : hit.to,
    status: hit.status,
  };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname.startsWith("/favicon") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const contentRedirect = matchContentRedirect(pathname);
  if (contentRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = contentRedirect.destination;
    return NextResponse.redirect(url, contentRedirect.status);
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (isLocale(maybeLocale)) {
    const response = NextResponse.next();
    response.headers.set("x-site-locale", maybeLocale);
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
