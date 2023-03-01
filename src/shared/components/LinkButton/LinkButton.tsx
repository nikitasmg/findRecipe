import { ButtonProps, Link } from "@mui/material";
import React from "react";
import { Button } from "../Button";

export const LinkButton: React.FC<ButtonProps> = ({ children, href, ...props }) => {
  return (
    <Button {...props} href={href} LinkComponent={(linkProps) => <Link to={href} {...linkProps} />}>
      {children}
    </Button>
  );
};
