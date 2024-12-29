import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";

import { updateSession } from "@/utils/supabase/middleware";

import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    // Match only internationalized pathnames.
    "/(ar|en)/:path*",
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */ "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};