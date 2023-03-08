import { Grid, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";

export type FormFieldsNotification = {
  send_email_notify?: string;
};

type Props = {
  register: UseFormRegister<FormFieldsNotification>;
  control?: Control<FormFieldsNotification, unknown>;
};

export const NotificationSettingsForm: React.FC<Props> = ({ register, control }) => {
  return (
    <Grid container spacing={4}>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='send_email_notify'
          render={({ field: { value } }) => (
            <TextField
              id='send_email_notify'
              multiline
              fullWidth
              value={value}
              variant='outlined'
              label={<Text>Email for notifies</Text>}
              {...register("send_email_notify")}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
