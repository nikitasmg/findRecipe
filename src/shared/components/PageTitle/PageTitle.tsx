import { Box } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";

export const PageTitle: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box className='flex justify-center border-b-2 bg-white w-full'>
      <Box className='w-full max-w-[1280px] flex items-center flex-wrap p-2'>{children}</Box>
    </Box>
  );
};
