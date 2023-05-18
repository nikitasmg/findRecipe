import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export type Props = { component?: string; children: string } & TypographyProps;

export const Text: React.FC<Props> = ({ children, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <Typography {...props} className={className}>
      {t(children)}
    </Typography>
  );
};
