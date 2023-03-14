import React from "react";
import * as R from "rambda";
import {
  Backdrop,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useLoginMutation } from "~/generated/graphql";
import { getBaseEmailValidation, getBasePasswordValidation } from "~shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { AuthState, useAuthStore } from "~shared/stores/auth";
import { HomePageRoute } from "~shared/routes";
import { Button } from "~/shared/components/Button";
import { Text } from "~shared/components/Text";
import { HelperText } from "~shared/components/HelperText";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";

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

  const [showPassword, setShowPassword] = React.useState(false);

  const client = useGraphqlClient();

  const { mutateAsync: login, isLoading } = useLoginMutation(client);

  const auth = useAuthStore(R.prop<"auth", AuthState>("auth"));

  const history = useNavigate();

  const onSubmit = (fields: FormFields) => {
    login(fields)
      .then(R.compose(auth, R.prop("login")))
      .then(() => history(HomePageRoute));
  };

  const getError = getErrorMessage(errors);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Paper elevation={12} className='sm:!max-w-[450px] relative'>
      {isLoading && (
        <Backdrop className='z-50 !absolute text-white' open>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}

      <Container>
        <form className='py-10 px-2 border-box' onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <TextField
                  error={!!getError("email")}
                  label={
                    <RequiredLabelWrapper>
                      <Text>Email address</Text>
                    </RequiredLabelWrapper>
                  }
                  defaultValue='dev@echo-company.ru'
                  inputMode='email'
                  {...register("email", getBaseEmailValidation({ required: true }))}
                  variant='standard'
                />

                <HelperText id='email' error={getError("email")} text={"Enter email"} />
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <FormControl fullWidth>
                <TextField
                  error={!!getError("password")}
                  label={
                    <RequiredLabelWrapper>
                      <Text>Password</Text>
                    </RequiredLabelWrapper>
                  }
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          color={getError("password") ? "error" : "default"}
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register("password", getBasePasswordValidation())}
                  variant='standard'
                />

                <HelperText id='password' error={getError("password")} text={"Enter password"} />
              </FormControl>
            </Grid>

            <Grid item columns={12} xs={12}>
              <Button fullWidth type='submit' variant='contained' disabled={isLoading}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Paper>
  );
};
