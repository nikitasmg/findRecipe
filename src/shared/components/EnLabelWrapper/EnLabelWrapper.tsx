import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const EnLabelWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return <Box className='flex'>{children}&nbsp;(en)</Box>;
};
