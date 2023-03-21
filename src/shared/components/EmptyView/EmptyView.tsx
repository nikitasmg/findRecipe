import { Box } from "@mui/material";
import React from "react";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import { Text } from "../Text";

export const EmptyView: React.FC = () => {
  return (
    <Box className='flex flex-col gap-6 p-2 justify-center items-center w-full h-[200px] opacity-90'>
      <Text variant='h4'>Not Found</Text>
      <LayersClearIcon className='h-[40%] w-auto' />
    </Box>
  );
};
