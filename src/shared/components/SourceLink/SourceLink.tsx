import clsx from "clsx";
import React from "react";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { Typography } from "@mui/material";

export const SourceLink: React.FC<LinkProps> = ({ children, className, ...props }) => (
  <RouterLink className={clsx("text-primary hover:text-primaryActive", className)} {...props}>
    <Typography>{children}</Typography>
  </RouterLink>
);
