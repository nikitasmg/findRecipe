import { Typography, TypographyProps } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = { component?: string } & TypographyProps;

export const Text: React.FC<Props> = ({ children, ...props }) => {
  const { t } = useTranslation();

  return <Typography {...props}>{t(children as string)}</Typography>;
};
