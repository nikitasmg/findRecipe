import { Box, FormControl, TextField } from "@mui/material";
import { prop } from "rambda";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { ContentEditor } from "~shared/components/ContentEditor";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";

type FormFields = {
  name?: string;
  description?: string;
  content?: string;
  image?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  control?: Control<FormFields, unknown>;
};

export const GeneralNewsForm: React.FC<Props> = ({ register, errors, control }) => {
  const getError = (field: keyof FormFields) => prop("message", errors[field]);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='grow-[2] lg:w-[70%] order-last mt-2'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2'>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                variant='standard'
                InputLabelProps={{
                  shrink: !!value
                }}
                id='name'
                error={!!getError("name")}
                {...register("name", { required: "This is required" })}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2 !mt-4'>
              <TextField
                label={<Text>Description</Text>}
                value={value}
                variant='standard'
                id='description'
                error={!!getError("description")}
                {...register("description")}
              />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='content'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2 !mt-4'>
              <ContentEditor id='content' value={value} {...register("content")} />
            </FormControl>
          )}
        />

        <FormControl fullWidth className='!p-2 !mt-4'></FormControl>
      </Box>

      <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
        <Controller
          control={control}
          name='content'
          render={({ field: { value } }) => (
            <ImageInput id='general' url={value} {...register("image")} />
          )}
        />
      </Box>
    </Box>
  );
};
