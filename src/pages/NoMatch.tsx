import { Box } from "@mui/material";
import React from "react";
import { Text } from "~/shared/components/Text";
import { LinkButton } from "~/shared/components/LinkButton";
import { HomePageRoute } from "~/shared/routes";

export const NoMatch: React.FC = () => {
  return (
    <Box className='flex justify-center items-center h-full'>
      <Box className='flex flex-col justify-center items-center gap-2'>
        <Text variant='h1'>404</Text>
        <Text variant='h6' className='mt-2'>
          The page you’re looking for doesn’t exist.
        </Text>
        <LinkButton href={HomePageRoute} variant='contained' className='!capitalize !mt-2'>
          <Text component='span'>Back Home</Text>
        </LinkButton>
      </Box>
    </Box>
  );
};
