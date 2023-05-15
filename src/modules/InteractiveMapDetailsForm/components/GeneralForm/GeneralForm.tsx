import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { LinkInput } from "~/shared/components/LinkInput";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation, getBaseUrlValidation } from "~/shared/lib/validation";
import { Languages } from "~/shared/types/Languages";

type FormFields = {
  name?: string;
  name_en?: string;
  learn_more?: string;
  characteristics?: string;
  characteristics_en?: string;
  area?: number;
  gross_boma_area?: number;
  floors?: string;
  floors_en?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const GeneralNewsForm: React.FC<Props> = ({ register, setValue, errors, control, lang }) => {
  const getError = getErrorMessage(errors);

  const isRusLang = lang === "ru";

  return (
    <Box className='flex flex-col lg:flex-row gap-10'>
      <Box className='flex flex-col gap-10 w-full lg:w-[70%]'>
        {isRusLang && (
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <RequiredLabelWrapper>
                      <Text>Object name</Text>
                    </RequiredLabelWrapper>
                  }
                  value={value}
                  error={!!getError("name")}
                  {...register("name", baseRequiredTextValidation)}
                />

                <HelperText id='name' error={getError("name")} />
              </FormControl>
            )}
          />
        )}

        {!isRusLang && (
          <Controller
            control={control}
            name='name_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Object name</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  {...register("name_en")}
                />
              </FormControl>
            )}
          />
        )}

        {isRusLang && (
          <Controller
            control={control}
            name='characteristics'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={<Text>Characteristics</Text>}
                  value={value}
                  {...register("characteristics")}
                />
              </FormControl>
            )}
          />
        )}

        {!isRusLang && (
          <Controller
            control={control}
            name='characteristics_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Characteristics</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  {...register("characteristics_en")}
                />
              </FormControl>
            )}
          />
        )}

        <Controller
          control={control}
          name='area'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                type='number'
                inputMode='numeric'
                inputProps={{
                  step: "0.01"
                }}
                value={value}
                label={<Text>Area</Text>}
                error={!!getError("area")}
                {...register("area")}
              />

              <HelperText id='area' error={getError("area")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='gross_boma_area'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                type='number'
                inputMode='numeric'
                inputProps={{
                  step: "0.01"
                }}
                value={value}
                label={<Text>GBA</Text>}
                error={!!getError("gross_boma_area")}
                {...register("gross_boma_area")}
              />

              <HelperText id='gross_boma_area' error={getError("gross_boma_area")} />
            </FormControl>
          )}
        />

        {isRusLang && (
          <Controller
            control={control}
            name='floors'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField label={<Text>Floors</Text>} value={value} {...register("floors")} />
              </FormControl>
            )}
          />
        )}

        {!isRusLang && (
          <Controller
            control={control}
            name='floors_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Floors</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  {...register("floors_en")}
                />
              </FormControl>
            )}
          />
        )}

        <Controller
          control={control}
          name='learn_more'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <LinkInput
                label={<Text>Learn more</Text>}
                value={value}
                type='learn_more'
                error={!!getError("learn_more")}
                {...register("learn_more", getBaseUrlValidation({ required: true }))}
                onChange={(e) => setValue("learn_more", e.target.value)}
              />

              <HelperText id='url' error={getError("url")} />
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );
};
