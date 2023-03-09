import { ButtonProps } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

export const LinkButton: React.FC<ButtonProps> = ({ children, href, ...props }) => {
  return (
    <Button {...props} href={href} LinkComponent={(linkProps) => <Link to={href} {...linkProps} />}>
      {children}
    </Button>
  );
};
