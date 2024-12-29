"use client";

import { useTranslations } from "next-intl";

import { Input } from "../components/input/Input";
import { Password } from "../components/input/Password";
import { Button } from "../components/button/Button";

export const AuthForm = () => {
  const t = useTranslations("AUTH");

  return (
    <form
      noValidate
      id="AuthForm"
      className="shadow-crayon-red absolute left-1/2 top-1/2 flex w-[calc(100%-6.4rem)] max-w-[43.6rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-16 rounded-32 bg-white px-32 py-48 shadow-lg"
    >
      <header id="AuthForm-header" className="text-center">
        <h2 className="form-header">{t("form.header")}</h2>
      </header>
      <Input
        id="AuthForm-form__email"
        inputProps={{
          type: "email",
        }}
        labelProps={{ htmlFor: "email" }}
        label={t("form.email.label")}
        // helperText={t("form.email.label")}
      />
      <Password
        id="AuthForm-form__password"
        inputProps={{}}
        labelProps={{ htmlFor: "password" }}
        label={t("form.password.label")}
        // helperText={t("form.password.label")}
      />
      <Button className="mt-8 w-full">{t("form.button.sign-up")}</Button>
      <div id="AuthForm-oauthContainer" className="mt-16 flex flex-col gap-16 border-t border-slate-200 pt-32">
        <Button variant="outlined" className="w-full">
          {t("form.button.oauth.google")}
        </Button>
      </div>
    </form>
  );
};
