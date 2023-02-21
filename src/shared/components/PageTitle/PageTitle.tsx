import { Box } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box className='flex p-2 border-b-2 bg-white'>{children}</Box>;
};
