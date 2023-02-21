import React from "react";
import * as R from "rambda";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getBaseEmailValidation, getBasePasswordValidation } from "~shared/lib/validation";
import { AuthState, useAuthStore } from "~shared/stores/auth";
import { HomePageRoute } from "~shared/routes";
import { Text } from "~shared/components/Text";
import { HelperText } from "~shared/components/HelperText";
import { useLoginMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";

type FormFields = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormFields>({ mode: "all" });

  const client = useGraphqlClient();

  const { mutateAsync: login, isLoading } = useLoginMutation(client);

  const auth = useAuthStore(R.prop<"auth", AuthState>("auth"));

  const history = useNavigate();

  const onSubmit = (fields: FormFields) => {
    login(fields)
      .then(R.compose(auth, R.prop("login")))
      .then(() => history(HomePageRoute));
  };

  const getError = (field: keyof FormFields) => R.prop("message", errors[field]);

  return (
    <Paper elevation={12} className='sm:!max-w-[450px] relative'>
      {isLoading && (
        <Backdrop className='z-50 !absolute text-white' open>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Container>
        <form className='py-10 px-2 border-box' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel error={!!getError("email")} htmlFor='email'>
                  <Text>Email address</Text>
                </InputLabel>
                <Input
                  id='email'
                  defaultValue='dev@echo-company.ru'
                  error={!!getError("email")}
                  inputMode='email'
                  {...register("email", getBaseEmailValidation({ required: true }))}
                />

                <HelperText id='email' error={getError("email")} text={"Enter email"} />
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel error={!!getError("password")} htmlFor='password'>
                  <Text>Password</Text>
                </InputLabel>
                <Input
                  id='password'
                  error={!!getError("password")}
                  type='password'
                  {...register("password", getBasePasswordValidation())}
                />

                <HelperText id='password' error={getError("password")} text={"Enter password"} />
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <Button fullWidth type='submit' variant='contained' disabled={isLoading || !isValid}>
                <Text>Login</Text>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};
