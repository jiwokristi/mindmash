"use client";

import { ComponentProps, forwardRef, Ref, useState } from "react";
import { useParams } from "next/navigation";
import clsx from "clsx";

import { Locales } from "@/i18n/routing";

import { IconButton } from "../button/IconButton";

interface PasswordProps extends ComponentProps<"div"> {
  inputProps?: Omit<ComponentProps<"input">, "type">;
  labelProps?: ComponentProps<"label">;
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Password = forwardRef(
  ({ inputProps, labelProps, label, error, helperText, ...props }: PasswordProps, ref: Ref<HTMLInputElement>) => {
    const params = useParams();
    const isArabic = params.locale === Locales.AR;

    const [showPassword, setShowPassword] = useState(false);
    const type = showPassword ? "text" : "password";

    return (
      <div className="flex w-full flex-col gap-8" {...props}>
        {label && (
          <label className={"label " + labelProps?.className} {...labelProps}>
            {label}
          </label>
        )}
        <div className="relative rounded-8 bg-white">
          <input
            ref={ref}
            type={type}
            className={
              "ease h-[4rem] w-full rounded-8 border border-slate-200 bg-transparent p-8 font-medium shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none " +
              inputProps?.className
            }
            {...inputProps}
          />
          <IconButton
            type="button"
            onClick={() => setShowPassword(p => !p)}
            className={clsx("absolute top-1/2 z-10 -translate-y-1/2", {
              "left-8": isArabic,
              "right-8": !isArabic,
            })}
          >
            {showPassword ? (
              <span className="-z-10 text-20 text-gray-600 ph ph-[eye]" />
            ) : (
              <span className="-z-10 text-20 text-gray-600 ph ph-[eye-slash]" />
            )}
          </IconButton>
          <div
            className={clsx("absolute top-1/2 h-32 w-48 -translate-y-1/2 bg-inherit", {
              "left-2 rounded-bl-8 rounded-tl-8": isArabic,
              "right-2 rounded-br-8 rounded-tr-8": !isArabic,
            })}
          />
        </div>
        {helperText && (
          <p
            className={clsx("helper-text", {
              "text-red-800": error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Password.displayName = "Password";
