import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { updateSession } from "@/utils/supabase/middleware";

import { routing } from "./i18n/routing";
import { StorageKeys } from "./utils/constants/storage-keys";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const response = NextResponse.next();
    const storedLocale = response.cookies.get(StorageKeys.MINDMASH_LOCALE);

    const url = request.nextUrl.clone();

    if (!storedLocale) {
      url.pathname = "/" + routing.defaultLocale;
      response.cookies.set(StorageKeys.MINDMASH_LOCALE, routing.defaultLocale);
    } else {
      url.pathname = "/" + storedLocale.value;
    }

    return NextResponse.redirect(url);
  }

  return await updateSession(request);
}

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    // Match only internationalized pathnames.
    "/(ar|en)/:path*",
    /*
     Match all request paths except for the ones starting with:
     - _next/static (static files)
     - _next/image (image optimization files)
     - favicon.ico (favicon file)
     Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
