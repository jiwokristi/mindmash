"use client";

import { useTransition } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import clsx from "clsx";

import { Locales, routing, usePathname, useRouter } from "@/i18n/routing";

export const LocaleSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();

  const [isPending, startTransition] = useTransition();

  const options = routing.locales.map(item => ({
    label: item === Locales.EN ? "English" : "العربية",
    value: item,
  }));

  function onSelectChange(payload: Locales) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: payload },
      );
    });
  }

  return (
    <div
      id="LocaleSwitcher"
      className="fixed right-8 top-8 z-10 flex w-fit items-center justify-center rounded-full bg-crayon-red shadow-sm shadow-crayon-red"
    >
      {options.map((o, i) => (
        <>
          <span
            key={o.value}
            role="button"
            aria-disabled={isPending}
            onClick={() => onSelectChange(o.value)}
            className={clsx(
              "hover:bg-crayon-red-hover active:bg-crayon-red-active focus:bg-crayon-red-hover cursor-pointer px-16 py-4 text-12 font-medium text-white transition ease-in-out",
              {
                "rounded-bl-full rounded-tl-full":
                  (i === 0 && locale === Locales.EN) || (i === 1 && locale === Locales.AR),
                "rounded-br-full rounded-tr-full":
                  (i === 0 && locale === Locales.AR) || (i === 1 && locale === Locales.EN),
                "bg-crayon-red-hover": locale === o.value,
              },
            )}
          >
            {o.label}
          </span>
        </>
      ))}
    </div>
  );
};
