import React, { Fragment } from "react";
import { Container, Grid } from "@mui/material";
import { Footer } from "~/modules/Footer";
import { LoginForm } from "~/modules/LoginForm";
import { Text } from "~/shared/components/Text";

export const Login: React.FC = () => {
  return (
    <Fragment>
      <Container className='!flex items-center h-full lg:!max-w-[50%]'>
        <Grid container spacing={6}>
          <Grid item columns={12} xs={12}>
            <Text align='center' variant='h2' component='h1'>
              Admin Panel
            </Text>
          </Grid>
          <Grid item columns={12} xs={12}>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Fragment>
  );
};
