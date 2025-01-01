"use client";

import { useTranslations, useLocale } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/input/Input";
import { Password } from "@/components/input/Password";
import { Button } from "@/components/button/Button";

import { AuthValues, useAuthValidation } from "@/utils/hooks/validation.auth";

import { signup } from "./actions";

interface AuthFormsProps {
  isAuthenticated: boolean;
}

const SignUpForm = () => {
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
      id="SignUpForm"
      onSubmit={handleSubmit(signupHandler)}
      className="absolute left-1/2 top-1/2 flex w-[calc(100%-6.4rem)] max-w-[43.6rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-16 rounded-32 bg-white bg-opacity-80 px-32 py-48 shadow-lg shadow-crayon-red"
    >
      <header id="SignUpForm-header" className="text-center">
        <h2 className="form-header">{t("form.header")}</h2>
      </header>
      <Input
        id="SignUpForm-form__email"
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
        id="SignUpForm-form__password"
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
        id="SignUpForm-form-btn"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        aria-disabled={!isValid || isSubmitting}
        className="mt-8 h-[4.92rem] w-full"
      >
        {t("form.button.sign-up")}
      </Button>
      <div id="SignUpForm-oauthContainer" className="mt-16 flex flex-col gap-16 border-t border-slate-200 pt-32">
        <Button
          id="SignUpForm-oauth-btn"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          variant="outlined"
          className="h-[4.92rem] w-full"
        >
          {t("form.button.oauth.google")}
        </Button>
        <p className="text-grey-600 text-center text-14">
          {t("form.already-have-an-account")}{" "}
          <span id="SignUpForm-signIn-link" role="button" className="link">
            {t("form.button.sign-in")}
          </span>
        </p>
      </div>
    </form>
  );
};

const SignInForm = () => {
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
      id="SignInForm"
      onSubmit={handleSubmit(signupHandler)}
      className="absolute left-1/2 top-1/2 flex w-[calc(100%-6.4rem)] max-w-[43.6rem] -translate-x-1/2 -translate-y-1/2 flex-col gap-16 rounded-32 bg-white bg-opacity-80 px-32 py-48 shadow-lg shadow-crayon-red"
    >
      <header id="SignInForm-header" className="text-center">
        <h2 className="form-header">{t("form.button.sign-in")}!</h2>
      </header>
      <Input
        id="SignInForm-form__email"
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
        id="SignInForm-form__password"
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
        <span id="SignInForm-forgotPassword-link" role="button" className="link">
          {t("form.reset-password")}
        </span>
      </p>
      <Button
        id="SignInForm-form-btn"
        loading={isSubmitting}
        disabled={!isValid || isSubmitting}
        aria-disabled={!isValid || isSubmitting}
        className="mt-8 h-[4.92rem] w-full"
      >
        {t("form.button.sign-in")}
      </Button>
      <div id="SignInForm-oauthContainer" className="mt-16 flex flex-col gap-16 border-t border-slate-200 pt-32">
        <Button
          id="SignInForm-oauth-btn"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          variant="outlined"
          className="h-[4.92rem] w-full"
        >
          {t("form.button.oauth.google")}
        </Button>
        <p className="text-grey-600 text-center text-14">
          {t("form.dont-have-an-account")}{" "}
          <span id="SignInForm-signIn-link" role="button" className="link">
            {t("form.button.sign-up")}
          </span>
        </p>
      </div>
    </form>
  );
};

export const AuthForms = ({ isAuthenticated }: AuthFormsProps) => {
  return (
    <>
      {/* <SignUpForm /> */}
      <SignInForm />
    </>
  );
};
