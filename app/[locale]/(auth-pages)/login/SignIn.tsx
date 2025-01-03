"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertProps } from "@nextui-org/react";

import { Input } from "@/components/input/Input";
import { Password } from "@/components/input/Password";
import { Button } from "@/components/button/Button";
import { Toast } from "@/components/Toast";

import { Link, useRouter } from "@/i18n/routing";

import { AuthValues, useAuthValidation } from "@/utils/hooks/validation.auth";

import { signIn } from "../actions";

type Toast = Pick<AlertProps, "title" | "description" | "color" | "isVisible">;

export const SignIn = () => {
  const t = useTranslations("AUTH");

  const router = useRouter();

  const { schema } = useAuthValidation();

  const [{ isVisible, title, description, color }, setToast] = useState<Toast>({
    isVisible: false,
    title: "",
    description: "",
    color: "success",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<AuthValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const signInHandler = async (values: AuthValues) => {
    const { error } = await signIn(values);

    if (!error) {
      router.push("/dashboard");
    } else {
      if (error.message === "Invalid login credentials") {
        setToast({
          isVisible: true,
          title: t("error.invalid-credentials.title"),
          description: t("error.invalid-credentials.description"),
          color: "danger",
        });

        window.setTimeout(() => {
          setToast(p => ({ ...p, isVisible: false }));
        }, 5000);
      }
    }
  };

  return (
    <>
      <Toast color={color} title={title} description={description} isVisible={isVisible} />
      <form
        noValidate
        id="SignIn"
        onSubmit={handleSubmit(signInHandler)}
        className="absolute left-1/2 top-1/2 flex w-[calc(100%-6.4rem)] max-w-[43.6rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-16 rounded-32 bg-white px-32 py-48 shadow-lg shadow-crayon-red"
      >
        <header id="SignIn-header" className="text-center">
          <h2 className="form-header">{t("form.button.sign-in")}!</h2>
        </header>
        <Input
          id="SignIn-form__email"
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
          id="SignIn-form__password"
          inputProps={{
            id: "password",
            ...register("password"),
          }}
          labelProps={{ htmlFor: "password" }}
          label={t("form.password.label")}
          helperText={errors.password?.message}
          error={!!errors.password}
        />
        <p className="text-grey-600 text-14">
          {t("form.forgot-password")}{" "}
          <span id="SignIn-forgotPassword-link" role="button" className="link">
            {t("form.reset-password")}
          </span>
        </p>
        <Button
          id="SignIn-form-btn"
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          aria-disabled={!isValid || isSubmitting}
          className="mt-8 h-[4.92rem] w-full"
        >
          {t("form.button.sign-in")}
        </Button>
        <div id="SignIn-oauthContainer" className="mt-16 flex flex-col gap-16 border-t border-slate-200 pt-32">
          <Button
            id="SignIn-oauth-btn"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            variant="outlined"
            className="h-[4.92rem] w-full"
          >
            {t("form.button.oauth.google")}
          </Button>
          <p className="text-grey-600 text-center text-14">
            {t("form.dont-have-an-account")}{" "}
            <Link id="SignIn-signIn-link" href="register" className="link">
              {t("form.button.sign-up")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
