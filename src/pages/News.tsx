import { Box } from "@mui/material";
import React from "react";
import { NewsTable } from "~/modules/NewsTable";

export const News: React.FC = () => {
  return (
    <Box className='!flex flex-col h-full'>
      <NewsTable />
    </Box>
  );
};
