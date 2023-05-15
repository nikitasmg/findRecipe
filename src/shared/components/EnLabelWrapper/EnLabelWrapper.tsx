import { Box, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const EnLabelWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className='flex'>
      {children}&nbsp;
      <Typography className='!text-secondaryText !text-[10px] !leading-[14px] !font-normal'>
        (ENG)
      </Typography>
    </Box>
  );
};
