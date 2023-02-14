import React from "react";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  Paper
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFetchLogin } from "~/api/auth";
import { getBaseEmailValidation, getBasePasswordValidation } from "~shared/lib/validation";
import { useAuthStore } from "~shared/stores/auth";
import { HomePageRoute } from "~shared/routes";
import { Text } from "~/shared/components/Text";

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

  const { mutateAsync: login, isLoading } = useFetchLogin();

  const auth = useAuthStore((state) => state.auth);

  const history = useNavigate();

  const onSubmit = (fields: FormFields) => {
    login(fields)
      .then(({ login }) => {
        auth(login);
      })
      .then(() => history(HomePageRoute));
  };

  return (
    <Paper elevation={12}>
      <Container className='pb-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='email'>
                  <Text>Email address</Text>
                </InputLabel>
                <Input
                  id='email'
                  defaultValue='dev@echo-company.ru'
                  inputMode='email'
                  {...register("email", getBaseEmailValidation({ required: true }))}
                />

                {errors.email ? (
                  <FormHelperText error id='email'>
                    <Text component='span'>{errors.email.message}</Text>
                  </FormHelperText>
                ) : (
                  <FormHelperText id='password'>
                    <Text component='span'>Enter email</Text>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='password'>
                  <Text>Password</Text>
                </InputLabel>
                <Input
                  id='password'
                  type='password'
                  {...register("password", getBasePasswordValidation())}
                />

                {errors.password ? (
                  <FormHelperText error id='email'>
                    <Text component='span'>{errors.password.message}</Text>
                  </FormHelperText>
                ) : (
                  <FormHelperText id='password'>
                    <Text component='span'>Enter password</Text>
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <Button
                className='w-full'
                type='submit'
                variant='contained'
                disabled={isLoading || !isValid}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};
