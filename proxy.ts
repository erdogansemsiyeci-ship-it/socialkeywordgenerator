import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const localeList = ["en","zh","de","ja","hi","fr","pt","it","ru","ko","es","id","nl","tr","ar","pl","sv","uk","ro","cs","el","hu","da","fi","nb","bg","hr","sk","lt","sl","sr","lv","et"];

function detectLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";
  const parts = acceptLanguage.split(",");
  for (const part of parts) {
    const code = part.split(";")[0].trim().split("-")[0].toLowerCase();
    if (localeList.includes(code)) return code;
  }
  return "en";
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const localeMatch = pathname.match(new RegExp(`^/(${localeList.join("|")})(/|$)`));

  if (!localeMatch) {
    const acceptLanguage = request.headers.get("accept-language") || "";
    const preferredLocale = detectLocale(acceptLanguage);
    const newPathname = `/${preferredLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  return NextResponse.next();
}
