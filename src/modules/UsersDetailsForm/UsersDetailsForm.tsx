import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import {
  UserInput,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUserByIdQuery
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import {
  baseRequiredTextValidation,
  getBaseEmailValidation,
  getBasePasswordValidation
} from "~/shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SaveButton } from "~/shared/components/SaveButton";

interface Props {
  id?: number;
}

export const UsersDetailsForm: React.FC<Props> = ({ id }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useUserByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.userById;

  const goBack = useNavigationBack();

  const { mutateAsync: createUser, isLoading: isCreateLoading } = useCreateUserMutation(client, {
    onSuccess: goBack
  });

  const { mutateAsync: updateUser, isLoading: isUpdateLoading } = useUpdateUserMutation(client, {
    onSuccess: goBack
  });

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const input: UserInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues
    };

    if (isCreateMode) {
      createUser({ input });
      return;
    }

    updateUser({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "email"], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='name'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <RequiredLabelWrapper>
                        <Text>Name</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value}
                    id='name'
                    error={!!getError("name")}
                    {...register("name", baseRequiredTextValidation)}
                  />

                  <HelperText id='name' error={getError("name")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='email'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <RequiredLabelWrapper>
                        <Text>Email</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value}
                    id='email'
                    error={!!getError("email")}
                    {...register("email", getBaseEmailValidation({ required: true }))}
                  />

                  <HelperText id='email' error={getError("email")} />
                </FormControl>
              )}
            />
          </Grid>
          {isCreateMode && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  error={!!getError("password")}
                  label={
                    <RequiredLabelWrapper>
                      <Text>Password</Text>
                    </RequiredLabelWrapper>
                  }
                  type={showPassword ? "text" : "password"}
                  size='small'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          color={getError("password") ? "error" : "default"}
                          aria-label='toggle password visibility'
                          onClick={() => setShowPassword((show) => !show)}
                          onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                            event.preventDefault();
                          }}
                          edge='end'
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...register("password", getBasePasswordValidation())}
                />

                <HelperText id='password' error={getError("password")} text={"Enter password"} />
              </FormControl>
            </Grid>
          )}
        </Grid>
      </Box>
      <Box className='w-full flex mt-8'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
