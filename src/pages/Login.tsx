import React, { Fragment } from "react";
import { Container, Grid } from "@mui/material";
import { LoginForm } from "~/modules/LoginForm";
import { Text } from "~shared/components/Text";
import { Logo } from "~shared/components/Logo";

export const Login: React.FC = () => {
  return (
    <Fragment>
      <Container className='!flex flex-col items-center justify-center h-full w-full'>
        <Grid container spacing={6}>
          <Grid item columns={12} xs={12} className='flex items-center justify-center'>
            <Logo size='big' />
            <Text className='pl-2' variant='h2' component='h1'>
              Admin Panel
            </Text>
          </Grid>
          <Grid item columns={12} xs={12} className='flex items-center justify-center'>
            <LoginForm />
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};
