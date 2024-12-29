import { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "flex w-fit items-center justify-center gap-4 px-16 py-8 disabled:cursor-not-allowed font-semibold text-20 rounded-8",
  {
    variants: {
      color: {
        "deep-space": "bg-deep-space-1 text-white border-2 border-deep-space-1",
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

export interface ButtonProps extends Omit<ComponentProps<"button">, "color">, VariantProps<typeof buttonVariants> {}

export const Button = ({ color, variant, className, children, ...props }: ButtonProps) => {
  return (
    <button className={`${buttonVariants({ color, variant })} ${className}`} {...props}>
      {children}
    </button>
  );
};
