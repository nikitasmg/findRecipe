import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const RequiredLabelWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className='flex'>
      {children}
      <Typography className='!text-mainError text-base'>*</Typography>
    </Box>
  );
};
