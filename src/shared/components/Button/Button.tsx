import { Button as MuiButton, ButtonProps } from "@mui/material";
import clsx from "clsx";
import React, { ReactNode } from "react";
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

export const Button: React.FC<Props> = ({ children, className, textProps, ...props }) => {
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
    <MuiButton className={clsx("!normal-case", className)} {...props}>
      {inner}
    </MuiButton>
  );
};
