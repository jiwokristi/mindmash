import { ComponentProps } from "react";

export const IconButton = ({ className, children, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={
        "flex h-32 w-32 items-center justify-center rounded-full bg-transparent transition-all ease-in-out hover:bg-slate-100 focus:bg-slate-100 focus:shadow-none active:bg-slate-200 active:shadow-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};
