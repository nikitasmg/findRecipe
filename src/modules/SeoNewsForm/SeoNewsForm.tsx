import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";

type FormFields = {
  "seo.upsert.title"?: string;
  "seo.upsert.description"?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  control?: Control<FormFields, unknown>;
};
export const SeoNewsForm: React.FC<Props> = ({ register, errors, control }) => {
  const getError = getErrorMessage(errors);

  return (
    <Box className='grow-[2] lg:w-[70%] order-last mt-2'>
      <Controller
        control={control}
        name='seo.upsert.title'
        render={({ field: { value } }) => (
          <FormControl fullWidth className='!p-2'>
            <TextField
              label={<Text>Heading</Text>}
              value={value}
              variant='standard'
              InputLabelProps={{
                shrink: !!value
              }}
              id='seo.upsert.title'
              error={!!getError("seo.upsert.title")}
              {...register("seo.upsert.title")}
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='seo.upsert.description'
        render={({ field: { value } }) => (
          <FormControl fullWidth className='!p-2'>
            <TextField
              label={<Text>Description</Text>}
              value={value}
              variant='standard'
              InputLabelProps={{
                shrink: !!value
              }}
              id='title'
              error={!!getError("seo.upsert.description")}
              {...register("seo.upsert.description")}
            />
          </FormControl>
        )}
      />
    </Box>
  );
};
