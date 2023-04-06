import { Grid } from "@mui/material";
import React from "react";
import { useWatch } from "react-hook-form";
import { Socials } from "~/shared/types/socials";
import { SocialDrawer } from "../SocialDrawer";
import { SocialItem, SocialItemProps } from "../SocialItem";
import { compose, curry } from "rambda";

export type FormFieldsSocial = {
  vk?: string;
  facebook?: string;
  telegram?: string;
  instagram?: string;
  whatsapp?: string;
};

interface Props
  extends Omit<SocialItemProps<FormFieldsSocial>, "onEdit" | "socialType" | "existedSocials"> {
  handleSubmit: () => void;
  handleOpenForm: () => void;
  open: string;
  handleCloseForm: () => void;
}

export const SocialSettingsForm: React.FC<Props> = ({
  control,
  setValue,
  handleSubmit,
  handleCloseForm,
  open
}) => {
  const socials = useWatch({ control });

  const existedSocials = Object.values(Socials).filter(
    compose(Boolean, curry(Reflect.get)(socials))
  );

  return (
    <Grid container spacing={4} className='w-full lg:w-[70%]'>
      {existedSocials.map((type) => (
        <SocialItem
          socialType={type}
          key={type}
          setValue={setValue}
          handleSubmit={handleSubmit}
          control={control}
        />
      ))}
      ;
      <SocialDrawer
        open={open}
        onChange={setValue}
        handleSubmitProps={handleSubmit}
        handleCloseForm={handleCloseForm}
        existedSocials={existedSocials}
      />
    </Grid>
  );
};
