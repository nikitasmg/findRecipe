import clsx from "clsx";
import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { Text } from "../Text";

export const Link: React.FC<LinkProps> = ({ children, className, ...props }) => {
  const inner = typeof children === "string" ? <Text component='span'>{children}</Text> : children;

  return (
    <RouterLink className={clsx("text-primary hover:text-primary-dark", className)} {...props}>
      {inner}
    </RouterLink>
  );
};
