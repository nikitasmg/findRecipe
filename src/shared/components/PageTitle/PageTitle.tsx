import { Box } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className='flex justify-center w-full pt-8'>
      <Box className='w-full max-w-[1280px] flex items-center flex-wrap gap-4 px-6 xl:px-2'>
        {children}
      </Box>
    </Box>
  );
};
