import { Container, Grid, Typography } from "@mui/material";
import React from "react";

export const News: React.FC = () => {
  return (
    <Container className='!flex items-center h-full'>
      <Grid container spacing={6}>
        <Grid item columns={12} xs={12}>
          <Typography align='center' variant='h2' component='h1'>
            News Page
          </Typography>
        </Grid>
        <Grid item columns={12} xs={12}></Grid>
      </Grid>
    </Container>
  );
};
