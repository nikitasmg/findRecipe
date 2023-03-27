import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import { SocialItems } from "~/shared/types/socials";
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
  const [active, setActive] = useState<SocialItems>("vk");
  const { vk, facebook, telegram, instagram, whatsapp } = useWatch({ control });

  return (
    <Grid container spacing={4}>
      {vk && (
        <SocialItem
          social={"vk"}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleOpenForm={handleOpenForm}
          setActive={setActive}
          control={control}
        />
      )}

      {facebook && (
        <SocialItem
          social={"facebook"}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleOpenForm={handleOpenForm}
          setActive={setActive}
          control={control}
        />
      )}
      {telegram && (
        <SocialItem
          social={"telegram"}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleOpenForm={handleOpenForm}
          setActive={setActive}
          control={control}
        />
      )}
      {instagram && (
        <SocialItem
          social={"instagram"}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleOpenForm={handleOpenForm}
          setActive={setActive}
          control={control}
        />
      )}

      {whatsapp && (
        <SocialItem
          social={"whatsapp"}
          register={register}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleOpenForm={handleOpenForm}
          setActive={setActive}
          control={control}
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
