import { Grid, TextField } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Control, Controller, Path } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { ButtonDelete } from "~/shared/components/ButtonDelete";
import { SocialItems } from "~/shared/types/socials";

type Params = Partial<Record<SocialItems, string | undefined>>;

export type SocialItemProps<T extends Params> = {
  handleSubmit: () => void;
  setValue: (name: keyof T, value: string) => void;
  socialType: SocialItems;
  control?: Control<T, unknown>;
};

export function SocialItem<T extends Params>({
  handleSubmit,
  setValue,
  socialType,
  control
}: SocialItemProps<T>): React.ReactElement {
  const deleteHandler = () => {
    setValue(socialType, "");
    handleSubmit();
  };

  return (
    <>
      <Grid item columns={12} xs={12} className='flex gap-2'>
        <Controller
          control={control}
          name={socialType as Path<T>}
          render={({ field }) => (
            <TextField fullWidth {...field} label={<Text>{socialType}</Text>} />
          )}
        />
        <ButtonDelete onClick={deleteHandler} type='button' variant='text' className='min-w-fit'>
          <DeleteIcon />
        </ButtonDelete>
      </Grid>
    </>
  );
}
