import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import { Text } from "~shared/components/Text";
import { HelperText } from "~shared/components/HelperText";
import { getErrorMessage } from "~/shared/lib/getError";
import { getBaseEmailValidation } from "~shared/lib/validation";
import { PhoneInput } from "~/shared/components/PhoneInput";

export type FormFieldsContacts = {
  schedule?: string;
  phone?: string;
  address?: string;
  email?: string;
  emailPress?: string;
};

type Props = {
  register: UseFormRegister<FormFieldsContacts>;
  errors: FieldErrors<FormFieldsContacts>;
  setValue: (name: keyof FormFieldsContacts, value: string) => void;
  control?: Control<FormFieldsContacts, unknown>;
};

export const ContactSettingsForm: React.FC<Props> = ({ register, errors, setValue, control }) => {
  const getError = getErrorMessage(errors);

  const handlePhoneChange = (phone: string) => {
    setValue("phone", phone);
  };

  return (
    <Grid container spacing={4}>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='schedule'
          render={({ field: { value } }) => (
            <TextField
              id='schedule'
              multiline
              fullWidth
              value={value}
              variant='outlined'
              label={<Text>Schedule</Text>}
              InputProps={{
                inputComponent: TextareaAutosize
              }}
              {...register("schedule")}
            />
          )}
        />
      </Grid>

      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='address'
          render={({ field: { value } }) => (
            <TextField
              id='address'
              fullWidth
              variant='outlined'
              value={value}
              label={<Text>Address</Text>}
              {...register("address")}
            />
          )}
        />
      </Grid>

      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='phone'
          render={({ field: { value } }) => (
            <PhoneInput
              value={value}
              label={<Text component='span'>Contact phone</Text>}
              variant='outlined'
              onChange={handlePhoneChange}
            />
          )}
        />
      </Grid>

      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='email'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                id='email'
                fullWidth
                variant='outlined'
                value={value}
                label={<Text>Email</Text>}
                error={!!getError("email")}
                {...register("email", getBaseEmailValidation())}
              />
              <HelperText id='email' error={getError("email")} />
            </FormControl>
          )}
        />
      </Grid>

      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='emailPress'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                id='emailPress'
                fullWidth
                variant='outlined'
                value={value}
                label={<Text>Press email</Text>}
                error={!!getError("emailPress")}
                {...register("emailPress", getBaseEmailValidation())}
              />
              <HelperText id='emailPress' error={getError("emailPress")} />
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  );
};
