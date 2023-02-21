import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const Panel: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box className='flex flex-col m-8 p-2 rounded-lg border-b-2 bg-white'>{children}</Box>;
};
