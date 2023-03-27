import { Grid } from "@mui/material";
import React, { useState } from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";
import { SocialItems, Socials } from "~/shared/types/socials";
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

  const { ...obj } = useWatch({ control });

  return (
    <Grid container spacing={4}>
      {Object.values(Socials)
        .filter((el) => obj[el] !== "")
        .map((el, i) => (
          <SocialItem
            social={el}
            key={i}
            register={register}
            setValue={setValue}
            handleSubmit={handleSubmit}
            handleOpenForm={handleOpenForm}
            setActive={setActive}
            control={control}
          />
        ))}
      ;
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
