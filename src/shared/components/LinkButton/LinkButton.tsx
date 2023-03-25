import { ButtonProps } from "@mui/material";
import React, { forwardRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button } from "../Button";

const CustomLink = forwardRef<HTMLAnchorElement, LinkProps & { href: string }>(
  ({ href, ...props }, ref) => <Link ref={ref} {...props} to={href} />
);

CustomLink.displayName = "CustomLink";

export const LinkButton: React.FC<ButtonProps> = ({ children, href, ...props }) => {
  return (
    <Button {...props} href={href} LinkComponent={CustomLink}>
      {children}
    </Button>
  );
};
