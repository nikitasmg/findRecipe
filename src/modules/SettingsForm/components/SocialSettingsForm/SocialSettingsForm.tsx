import { Grid, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";

export type FormFieldsSocial = {
  vk?: string;
  facebook?: string;
  telegram?: string;
  instagram?: string;
  whatsapp?: string;
};

type Props = {
  register: UseFormRegister<FormFieldsSocial>;
  control?: Control<FormFieldsSocial, unknown>;
};

export const SocialSettingsForm: React.FC<Props> = ({ register, control }) => {
  return (
    <Grid container spacing={4}>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='vk'
          render={({ field: { value } }) => (
            <TextField fullWidth value={value ?? ""} label={<Text>Vk</Text>} {...register("vk")} />
          )}
        />
      </Grid>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='facebook'
          render={({ field: { value } }) => (
            <TextField
              fullWidth
              value={value ?? ""}
              label={<Text>Facebook</Text>}
              {...register("facebook")}
            />
          )}
        />
      </Grid>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='telegram'
          render={({ field: { value } }) => (
            <TextField
              fullWidth
              value={value ?? ""}
              label={<Text>Telegram</Text>}
              {...register("telegram")}
            />
          )}
        />
      </Grid>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='instagram'
          render={({ field: { value } }) => (
            <TextField
              fullWidth
              value={value ?? ""}
              label={<Text>Instagram</Text>}
              {...register("instagram")}
            />
          )}
        />
      </Grid>
      <Grid item columns={12} xs={12}>
        <Controller
          control={control}
          name='whatsapp'
          render={({ field: { value } }) => (
            <TextField
              fullWidth
              value={value ?? ""}
              label={<Text>Whats App</Text>}
              {...register("whatsapp")}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};
