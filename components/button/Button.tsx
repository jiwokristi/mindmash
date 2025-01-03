import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner, SpinnerProps } from "@nextui-org/react";

const buttonVariants = cva(
  "flex w-fit items-center justify-center gap-4 px-16 py-8 disabled:cursor-not-allowed font-semibold text-20 rounded-8 transition ease-in-out",
  {
    variants: {
      color: {
        "deep-space":
          "bg-deep-space-1 text-white border-2 border-deep-space-1 hover:bg-deep-space-2 focus:bg-deep-space-2 active:bg-deep-space-2 hover:border-deep-space-2 focus:border-deep-space-2 active:border-deep-space-2",
      },
      variant: {
        contained: "border-2",
        outlined: "!bg-transparent",
      },
    },
    compoundVariants: [
      {
        color: "deep-space",
        variant: "outlined",
        className: "!text-deep-space-1",
      },
    ],
    defaultVariants: {
      color: "deep-space",
      variant: "contained",
    },
  },
);

export interface ButtonProps extends Omit<ComponentProps<"button">, "color">, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingProps?: Omit<SpinnerProps, "size">;
}

export const Button = ({
  color = "deep-space",
  variant = "contained",
  className,
  loading,
  loadingProps,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={`${buttonVariants({ color, variant })} ${className}`} {...props}>
      {loading ? (
        <Spinner
          classNames={{
            wrapper: "w-24 h-24",
            circle1: variant === "outlined" ? "border-b-deep-space-1" : "border-b-white",
            circle2: variant === "outlined" ? "border-b-deep-space-1" : "border-b-white",
            ...loadingProps?.classNames,
          }}
          {...loadingProps}
        />
      ) : (
        children
      )}
    </button>
  );
};
