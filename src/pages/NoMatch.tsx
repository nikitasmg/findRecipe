import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Text } from "~/shared/components/Text";
import { LinkButton } from "~/shared/components/LinkButton";
import { HomePageRoute } from "~/shared/routes";
import notFound from "~/shared/assets/images/not-found-icon.jpg";

export const NoMatch: React.FC = () => {
  return (
    <Box className='flex justify-center items-center h-full'>
      <Container maxWidth='md' className='p-2'>
        <Grid container gap={6}>
          <Grid xs={12} md={6} className='flex !flex-col justify-center items-center'>
            <Text variant='h1'>404</Text>
            <Text variant='h6' className='mt-2'>
              The page you’re looking for doesn’t exist.
            </Text>
            <LinkButton href={HomePageRoute} variant='contained' className='!capitalize !mt-2'>
              <Text component='span'>Back Home</Text>
            </LinkButton>
          </Grid>
          <Grid xs={12} md={4} className='hidden md:flex justify-center'>
            <img src={notFound} alt='not found' width={512} height={512} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
