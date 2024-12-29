import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export enum Locales {
  AR = "ar",
  EN = "en",
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(Locales),

  // Used when no locale matches
  defaultLocale: Locales.EN,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
