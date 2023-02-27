import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSettingsQuery, useUpdateSettingsMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import SaveIcon from "@mui/icons-material/Save";
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputLabel
} from "@mui/material";
import { Text } from "~shared/components/Text";
import { getBaseEmailValidation } from "~shared/lib/validation";
import { HelperText } from "~shared/components/HelperText";
import * as R from "rambda";

type FormFields = {
  schedule: string;
  phone: string;
  address: string;
  email: string;
  emailPress: string;
};

export const ContactsForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue
  } = useForm<FormFields>({ mode: "all" });
  const client = useGraphqlClient();

  const { data: { settings } = {}, isLoading: loadingQuery } = useSettingsQuery(
    client,
    {},
    { refetchOnMount: "always" }
  );

  const { mutateAsync: saveSettings, isLoading: loadingMutation } =
    useUpdateSettingsMutation(client);

  const isLoading = loadingQuery || loadingMutation;

  const getError = (field: keyof FormFields) => R.prop("message", errors[field]);

  const onSubmit = async (fields: FormFields) => {
    await saveSettings(fields);
  };

  useEffect(() => {
    if (settings) {
      settings.forEach((field) => {
        setValue(field.name as keyof FormFields, field.value || "");
      });
    }
  }, [settings]);

  return (
    <Container className='mt-8'>
      {isLoading && (
        <Backdrop className='z-50 !absolute text-white' open>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='schedule' shrink>
                <Text>Schedule</Text>
              </InputLabel>
              <Input id='schedule' multiline rows={4} {...register("schedule")} />
            </FormControl>
          </Grid>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='address' shrink>
                <Text>Address</Text>
              </InputLabel>
              <Input id='address' {...register("address")} defaultValue='' />
            </FormControl>
          </Grid>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='phone' shrink>
                <Text>Contact phone</Text>
              </InputLabel>
              <Input id='phone' {...register("phone")} />
            </FormControl>
          </Grid>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='email' error={!!getError("email")} shrink>
                <Text>Email</Text>
              </InputLabel>
              <Input
                id='email'
                error={!!getError("email")}
                {...register("email", getBaseEmailValidation({ required: false }))}
              />
              <HelperText id='email' error={getError("email")} />
            </FormControl>
          </Grid>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='emailPress' error={!!getError("emailPress")} shrink>
                <Text>Press email</Text>
              </InputLabel>
              <Input
                id='emailPress'
                error={!!getError("emailPress")}
                {...register("emailPress", getBaseEmailValidation({ required: false }))}
              />
              <HelperText id='emailPress' error={getError("emailPress")} />
            </FormControl>
          </Grid>
          <Grid item columns={12} xs={12}>
            <Button
              type='submit'
              variant='contained'
              startIcon={<SaveIcon />}
              disabled={isLoading || !isValid}
            >
              <Text>Save</Text>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
