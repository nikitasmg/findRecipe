import React, { Fragment } from "react";
import { Container, Grid } from "@mui/material";
import { LoginForm } from "~/modules/LoginForm";
import { Text } from "~shared/components/Text";
import { Logo } from "~shared/components/Logo";

export const Login: React.FC = () => {
  return (
    <Fragment>
      <Container className='!flex flex-col items-center justify-center h-full w-full'>
        <Grid container spacing={4}>
          <Grid
            item
            columns={12}
            xs={12}
            className='flex items-center flex-col gap-2 justify-center'
          >
            <Logo size='big' />
            <Text className='pl-2 text-4xl' align='center' component='h1'>
              Administration system
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
