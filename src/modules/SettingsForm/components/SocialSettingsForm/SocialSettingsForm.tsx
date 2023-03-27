import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import { SocialDrawer } from "../SocialDrawer";
import { SocialItem } from "../SocialItem";

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
  setValue: (name: keyof FormFieldsSocial, value: string) => void;
  handleSubmit: () => void;
  handleOpenForm: () => void;
  open: string;
  handleCloseForm: () => void;
};

export const SocialSettingsForm: React.FC<Props> = ({
  register,
  control,
  setValue,
  handleSubmit,
  handleOpenForm,
  handleCloseForm,
  open
}) => {
  const [active, setActive] = useState({});
  const { vk, facebook, telegram, instagram, whatsapp } = useWatch({ control });

  return (
    <Grid container spacing={4}>
      {vk && (
        <SocialItem
          social={"vk"}
          register={register}
          control={control}
          name='vk'
          render={({ field: { value } }) => (
            <TextField fullWidth value={value ?? ""} label={<Text>Vk</Text>} {...register("vk")} />
          )}
        />
      )}

      {facebook && (
        <SocialItem
          social={"facebook"}
          register={register}
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
      )}
      {telegram && (
        <SocialItem
          social={"telegram"}
          register={register}
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
      )}
      {instagram && (
        <SocialItem
          social={"instagram"}
          register={register}
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
      )}

      {whatsapp && (
        <SocialItem
          social={"whatsapp"}
          register={register}
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
      )}

      <SocialDrawer
        open={open}
        setValue={setValue}
        handleSubmitProps={handleSubmit}
        active={active}
        handleCloseForm={handleCloseForm}
      />
    </Grid>
  );
};
