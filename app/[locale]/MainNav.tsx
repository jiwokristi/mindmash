"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import clsx from "clsx";
import { AlertProps } from "@nextui-org/react";

import { Locales, useRouter } from "@/i18n/routing";

import { signOut } from "@/app/[locale]/(auth-pages)/actions";

import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { Button } from "@/components/button/Button";
import { Toast } from "@/components/Toast";

interface MainNavProps {
  isAuthenticated: boolean;
}

type Toast = Pick<AlertProps, "title" | "description" | "color" | "isVisible">;

export const MainNav = ({ isAuthenticated }: MainNavProps) => {
  const t = useTranslations("BUTTON");
  const locale = useLocale();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [{ isVisible, title, description, color }, setToast] = useState<Toast>({
    isVisible: false,
    title: "",
    description: "",
    color: "success",
  });

  const signOutHandler = async () => {
    setLoading(true);

    const { error } = await signOut();

    if (error) {
      setLoading(false);
      setToast({
        isVisible: true,
        title: t("error.something-went-wrong.title"),
        description: t("error.something-went-wrong.description"),
        color: "danger",
      });

      window.setTimeout(() => {
        setToast(p => ({ ...p, isVisible: false }));
      }, 5000);
    } else {
      setLoading(false);
      router.push("/login");
    }
  };

  return (
    <>
      <Toast color={color} title={title} description={description} isVisible={isVisible} />
      <nav
        id="MainNav"
        className={clsx("fixed left-0 top-0 z-10 flex w-full items-center justify-end gap-16 p-24", {
          "flex-row-reverse": locale === Locales.AR,
        })}
      >
        <LocaleSwitcher />
        {!isAuthenticated && (
          <Button
            className="!text-16"
            onClick={signOutHandler}
            loading={loading}
            disabled={loading}
            aria-disabled={loading}
          >
            {t("sign-out")}
          </Button>
        )}
      </nav>
    </>
  );
};
