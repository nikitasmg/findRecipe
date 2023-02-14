import { Box } from "@mui/material";
import React from "react";
import { LanguageSelect } from "~/shared/components/LanguageSelect/LanguageSelect";

export const Footer: React.FC = () => {
  return (
    <Box className='h-[100px] p-2 border drop-shadow-md flex items-center' component='footer'>
      <LanguageSelect />
    </Box>
  );
};
