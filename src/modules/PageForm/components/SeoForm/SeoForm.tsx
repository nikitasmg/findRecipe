import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { Languages } from "~/shared/types/Languages";

export type SeoFormFields = {
  "seo.upsert.title"?: string;
  "seo.upsert.description"?: string;
  "seo.upsert.title_en"?: string;
  "seo.upsert.description_en"?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<Partial<SeoFormFields>>;
  errors: FieldErrors<SeoFormFields>;
  control?: Control<SeoFormFields, unknown>;
};
export const SeoForm: React.FC<Props> = ({ register, errors, control, lang }) => {
  const isRusLang = lang === "ru";
  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col gap-10 lg:w-[70%]'>
      {isRusLang && (
        <Controller
          control={control}
          name='seo.upsert.title'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Heading</Text>}
                value={value}
                variant='outlined'
                id='seo.upsert.title'
                error={!!getError("seo.upsert.title")}
                {...register("seo.upsert.title")}
              />
            </FormControl>
          )}
        />
      )}
      {!isRusLang && (
        <Controller
          control={control}
          name='seo.upsert.title_en'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Heading</Text>}
                value={value}
                variant='outlined'
                id='seo.upsert.title_en'
                error={!!getError("seo.upsert.title_en")}
                {...register("seo.upsert.title_en")}
              />
            </FormControl>
          )}
        />
      )}

      {isRusLang && (
        <Controller
          control={control}
          name='seo.upsert.description'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Description</Text>}
                value={value}
                variant='outlined'
                id='seo.upsert.description'
                error={!!getError("seo.upsert.description")}
                {...register("seo.upsert.description")}
              />
            </FormControl>
          )}
        />
      )}
      {!isRusLang && (
        <Controller
          control={control}
          name='seo.upsert.description_en'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Description</Text>}
                value={value}
                variant='outlined'
                id='seo.upsert.description_en'
                error={!!getError("seo.upsert.description_en")}
                {...register("seo.upsert.description_en")}
              />
            </FormControl>
          )}
        />
      )}
    </Box>
  );
};
