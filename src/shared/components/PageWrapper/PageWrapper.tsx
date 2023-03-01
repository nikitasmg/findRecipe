import { Box, BoxProps } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = {
  className?: string;
} & BoxProps;

export const PageWrapper: React.FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return <Box className={clsx(className, "h-full flex flex-col items-center")}>{children}</Box>;
};
