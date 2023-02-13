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
import { useForm } from "react-hook-form";
import { emailValidation } from "@/shared/lib/validation";
import { useFetchLogin } from "@/api/auth";
import { useAuthStore } from "@/shared/stores/auth";
import { useNavigate } from "react-router-dom";
import { HomePage } from "@/shared/routes";

type FormFields = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({ mode: "all" });

  const { mutateAsync: login, isLoading } = useFetchLogin();

  const auth = useAuthStore((state) => state.auth);

  const history = useNavigate();

  const onSubmit = (fields: FormFields) => {
    login(fields)
      .then(({ login }) => {
        auth(login);
      })
      .then(() => history(HomePage));
  };

  return (
    <Paper elevation={12}>
      <Container className='pb-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='email'>Email address</InputLabel>
                <Input
                  id='email'
                  inputMode='email'
                  {...register("email", {
                    required: "This is required.",
                    validate: {
                      validEmail: (v) => (!emailValidation(v) ? "Invalid email" : true)
                    }
                  })}
                />

                {errors.email ? (
                  <FormHelperText error id='email'>
                    {errors.email.message}
                  </FormHelperText>
                ) : (
                  <FormHelperText id='password'>Enter email</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='password'>Password</InputLabel>
                <Input
                  id='password'
                  type='password'
                  {...register("password", {
                    required: "This is required.",
                    minLength: { value: 6, message: "Min length of password is 6" }
                  })}
                />

                {errors.password ? (
                  <FormHelperText error id='email'>
                    {errors.password.message}
                  </FormHelperText>
                ) : (
                  <FormHelperText id='password'>Enter password</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <Button type='submit' variant='contained' disabled={isLoading}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};
