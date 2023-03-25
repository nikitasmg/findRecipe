import { Button as MuiButton, ButtonProps } from "@mui/material";
import clsx from "clsx";
import React, { ReactNode, forwardRef, PropsWithChildren } from "react";
import { Text, Props as TextProps } from "../Text";

type Props = ButtonProps &
  (
    | {
        children?: string;
        textProps?: Omit<TextProps, "children">;
      }
    | {
        children?: ReactNode;
        textProps?: never;
      }
  );

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<Props>>(
  ({ children, className, textProps, ...props }, ref): React.ReactElement => {
    const inner =
      typeof children === "string" ? (
        <Text
          {...textProps}
          className={clsx("normal-case", textProps?.className)}
          component={textProps?.component ?? "span"}
        >
          {children}
        </Text>
      ) : (
        children
      );

    return (
      <MuiButton ref={ref} className={clsx("!normal-case", className)} {...props}>
        {inner}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";
