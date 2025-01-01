import { Alert, AlertProps } from "@nextui-org/react";
import clsx from "clsx";

export const Toast = ({ ...props }: AlertProps) => {
  return (
    <Alert
      variant="solid"
      classNames={{
        base: clsx(
          "fixed right-8 top-8 h-64 w-fit items-center gap-16 px-16 z-10 transition-all ease-in-out duration-300",
          {
            "translate-x-[calc(100%+0.8rem)]": !props.isVisible,
            "translate-x-0": props.isVisible,
          },
        ),
        mainWrapper: "justify-center gap-8",
        iconWrapper: "w-24 h-24",
        title: "!text-14",
        description: "!text-14",
        ...props.classNames,
      }}
      {...props}
      isVisible
    />
  );
};
