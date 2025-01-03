import { ComponentProps, forwardRef, ReactNode, Ref } from "react";
import clsx from "clsx";

interface InputProps extends ComponentProps<"div"> {
  inputProps?: ComponentProps<"input">;
  labelProps?: ComponentProps<"label">;
  label?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  error?: boolean;
  helperText?: string;
}

export const Input = forwardRef(
  (
    { inputProps, labelProps, label, startAdornment, endAdornment, error, helperText, ...props }: InputProps,
    ref: Ref<HTMLInputElement>,
  ) => {
    return (
      <div className="flex w-full flex-col gap-8" {...props}>
        {label && (
          <label className={"label " + labelProps?.className} {...labelProps}>
            {label}
          </label>
        )}
        <div className="relative rounded-8 bg-white">
          {startAdornment}
          <input
            ref={ref}
            type="text"
            className={
              "ease h-[4rem] w-full rounded-8 border border-slate-200 bg-transparent p-8 font-medium shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none " +
              inputProps?.className
            }
            {...inputProps}
          />
          {endAdornment}
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

Input.displayName = "Input";
