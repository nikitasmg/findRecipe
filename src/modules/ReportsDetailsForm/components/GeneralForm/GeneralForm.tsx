import { Box, FormControl, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { curry } from "rambda";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { NumericInput } from "~/shared/components/NumericInput";
import { DatePicker } from "~/shared/components/DatePicker";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";

export type GeneralFormFields = {
  name?: string;
  description?: string;
  name_en?: string;
  description_en?: string;
  sort?: number;
  imageUrl?: string;
  uploadImage?: File | null;
  created_at?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<GeneralFormFields>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: keyof GeneralFormFields, value: string | File | null) => void;
  control?: Control<GeneralFormFields, unknown>;
};

export const GeneralForm: React.FC<Props> = ({ register, setValue, errors, control, lang }) => {
  const getError = getErrorMessage(errors);

  const addAlert = useAlertsStore((state) => state.addAlert);

  const isRusLang = lang === "ru";

  return (
    <Box className='flex flex-col lg:flex-row gap-10'>
      <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
        {isRusLang && (
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <RequiredLabelWrapper>
                      <Text>Title</Text>
                    </RequiredLabelWrapper>
                  }
                  value={value}
                  variant='outlined'
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
                      <Text>Title</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  variant='outlined'
                  {...register("name_en")}
                />
              </FormControl>
            )}
          />
        )}

        {isRusLang && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  multiline
                  fullWidth
                  value={value}
                  label={
                    <RequiredLabelWrapper>
                      <Text>Short description</Text>
                    </RequiredLabelWrapper>
                  }
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  error={getError("description")}
                  {...register("description", baseRequiredTextValidation)}
                />

                <HelperText id='description' error={getError("description")} />
              </FormControl>
            )}
          />
        )}

        {!isRusLang && (
          <Controller
            control={control}
            name='description_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  multiline
                  fullWidth
                  value={value}
                  label={
                    <EnLabelWrapper>
                      <Text>Short description</Text>
                    </EnLabelWrapper>
                  }
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("description_en")}
                />
              </FormControl>
            )}
          />
        )}

        <Controller
          control={control}
          name='created_at'
          render={({ field: { value } }) => (
            <FormControl error={getError("start")}>
              <DatePicker
                className='w-full'
                label={<Text>Created at</Text>}
                value={value ?? null}
                onChange={curry(setValue)("created_at")}
              />

              <HelperText id='date' error={getError("created_at")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='sort'
          render={({ field }) => (
            <NumericInput
              label={<Text>Sorting</Text>}
              variant='outlined'
              id='sort'
              error={!!getError("sort")}
              {...register("sort")}
              {...field}
            />
          )}
        />
      </Box>

      <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
        <Controller
          control={control}
          name='imageUrl'
          render={({ field: { value } }) => (
            <ImageInput
              addAlert={addAlert}
              id='general'
              url={value}
              {...register("imageUrl")}
              onChange={(file) => {
                setValue("uploadImage", file as File);
              }}
              onDelete={() => {
                setValue("uploadImage", null);
                setValue("imageUrl", null);
              }}
            />
          )}
        />
      </Box>
    </Box>
  );
};
