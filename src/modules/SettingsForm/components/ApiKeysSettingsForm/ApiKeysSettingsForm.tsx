import { Grid, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";

export type FormFieldsApiKeys = {
  content_editor?: string;
};

type Props = {
  register: UseFormRegister<FormFieldsApiKeys>;
  control?: Control<FormFieldsApiKeys, unknown>;
};

export const ApiKeysSettingsForm: React.FC<Props> = ({ register, control }) => {
  return (
    <Grid container spacing={4}>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='content_editor'
          render={({ field: { value } }) => (
            <TextField
              id='content_editor'
              multiline
              fullWidth
              value={value ?? ""}
              variant='outlined'
              label={<Text>Content Editor key</Text>}
              {...register("content_editor")}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
