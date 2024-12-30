"use client";

import { useTranslations, useLocale } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/input/Input";
import { Password } from "@/components/input/Password";
import { Button } from "@/components/button/Button";

import { AuthValues, useAuthValidation } from "@/utils/hooks/validation.auth";

import { signup } from "./actions";

interface AuthFormProps {
  isAuthenticated: boolean;
}

export const AuthForm = ({ isAuthenticated }: AuthFormProps) => {
  const t = useTranslations("AUTH");
  const locale = useLocale();

  const { schema } = useAuthValidation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AuthValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const signupHandler = async (values: AuthValues) => {
    await signup(values, locale);
  };

  return (
    <form
      noValidate
      id="AuthForm"
      onSubmit={handleSubmit(signupHandler)}
      className="absolute left-1/2 top-1/2 flex w-[calc(100%-6.4rem)] max-w-[43.6rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-16 rounded-32 bg-white bg-opacity-80 px-32 py-48 shadow-lg shadow-crayon-red"
    >
      <header id="AuthForm-header" className="text-center">
        <h2 className="form-header">{t("form.header")}</h2>
      </header>
      <Input
        id="AuthForm-form__email"
        inputProps={{
          type: "email",
          id: "email",
          ...register("email"),
        }}
        labelProps={{ htmlFor: "email" }}
        label={t("form.email.label")}
        helperText={errors.email?.message}
        error={!!errors.email}
      />
      <Password
        id="AuthForm-form__password"
        inputProps={{
          id: "password",
          ...register("password"),
        }}
        labelProps={{ htmlFor: "password" }}
        label={t("form.password.label")}
        helperText={errors.password?.message}
        error={!!errors.password}
      />
      <Button
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        aria-disabled={!isValid || isSubmitting}
        className="mt-8 h-[4.92rem] w-full"
      >
        {t("form.button.sign-up")}
      </Button>
      <div id="AuthForm-oauthContainer" className="mt-16 flex flex-col gap-16 border-t border-slate-200 pt-32">
        <Button disabled={isSubmitting} aria-disabled={isSubmitting} variant="outlined" className="h-[4.92rem] w-full">
          {t("form.button.oauth.google")}
        </Button>
      </div>
    </form>
  );
};
