import { FormFieldsSocial } from "../SocialSettingsForm";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { ButtonDelete } from "~/shared/components/ButtonDelete";
import { SocialItems } from "~/shared/types/socials";

type Props = {
  register: UseFormRegister<FormFieldsSocial>;
  control?: Control<FormFieldsSocial, unknown>;
  setValue: (name: keyof FormFieldsSocial, value: string) => void;
  handleOpenForm: () => void;
  setActive: (social: keyof FormFieldsSocial) => void;
  handleSubmit: () => void;
  social: SocialItems;
};

export const SocialItem: React.FC<Props> = ({
  register,
  control,
  handleOpenForm,
  handleSubmit,
  setActive,
  setValue,
  social
}) => {
  const deleteHandler = () => {
    setValue(social, "");
    handleSubmit();
  };

  const editHandler = () => {
    setActive(social);
    handleOpenForm();
  };

  return (
    <>
      <Grid item columns={10} xs={10}>
        <Controller
          control={control}
          name={social}
          render={({ field: { value } }) => (
            <TextField
              fullWidth
              value={value}
              label={<Text>{social}</Text>}
              {...register(social)}
            />
          )}
        />
      </Grid>
      <Grid item columns={2} xs={2}>
        <Button onClick={editHandler} color='info'>
          <EditIcon />
        </Button>
        <ButtonDelete onClick={deleteHandler} variant='text'>
          <DeleteIcon />
        </ButtonDelete>
      </Grid>
    </>
  );
};
