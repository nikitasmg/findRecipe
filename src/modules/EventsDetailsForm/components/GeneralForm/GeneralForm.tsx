import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import React from "react";
import { curry } from "rambda";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { useAlertsStore } from "~/shared/stores/alerts";
import { Languages } from "~/shared/types/Languages";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { DateTimePicker } from "~shared/components/DateTimePicker";

export type GeneralFormFields = {
  name?: string;
  description?: string;
  name_en?: string;
  description_en?: string;
  place?: string;
  place_en?: string;
  imageUrl?: string;
  published?: boolean;
  end?: string;
  start?: string;
  uploadImage?: File | null;
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

  const handleChecked = getCheckedHandler(setValue);

  const addAlert = useAlertsStore((state) => state.addAlert);

  const isRuLang = lang === "ru";

  return (
    <Box className='flex flex-col lg:flex-row gap-10'>
      <Box className='flex flex-col gap-10 grow-[2] lg:w-[70%] order-last'>
        <Controller
          control={control}
          name='published'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <FormControlLabel
                control={<Switch checked={!!value} onChange={handleChecked("published")} />}
                label={<Text>Published</Text>}
              />

              <HelperText id='published' error={getError("published")} />
            </FormControl>
          )}
        />

        {isRuLang && (
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <RequiredLabelWrapper>
                      <Text>Heading</Text>
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

        {!isRuLang && (
          <Controller
            control={control}
            name='name_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Heading</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  variant='outlined'
                  error={!!getError("name_en")}
                  {...register("name_en")}
                />
              </FormControl>
            )}
          />
        )}

        {isRuLang && (
          <Controller
            control={control}
            name='description'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  multiline
                  fullWidth
                  value={value}
                  label={<Text>Description</Text>}
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("description")}
                />

                <HelperText id='description' error={getError("description")} />
              </FormControl>
            )}
          />
        )}

        {!isRuLang && (
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
                      <Text>Description</Text>
                    </EnLabelWrapper>
                  }
                  InputProps={{
                    inputComponent: TextareaAutosize
                  }}
                  {...register("description_en")}
                />

                <HelperText id='description_en' error={getError("description_en")} />
              </FormControl>
            )}
          />
        )}

        {isRuLang && (
          <Controller
            control={control}
            name='place'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField label={<Text>Place event</Text>} value={value} {...register("place")} />
              </FormControl>
            )}
          />
        )}

        {!isRuLang && (
          <Controller
            control={control}
            name='place_en'
            render={({ field: { value } }) => (
              <FormControl fullWidth>
                <TextField
                  label={
                    <EnLabelWrapper>
                      <Text>Place event</Text>
                    </EnLabelWrapper>
                  }
                  value={value}
                  {...register("place_en")}
                />
              </FormControl>
            )}
          />
        )}

        <Controller
          control={control}
          name='start'
          render={({ field: { value } }) => (
            <FormControl error={getError("start")}>
              <DateTimePicker
                className='w-full'
                label={<Text>Start date</Text>}
                value={value ?? null}
                onChange={curry(setValue)("start")}
              />

              <HelperText id='date' error={getError("start")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='end'
          render={({ field: { value } }) => (
            <FormControl error={getError("end")}>
              <DateTimePicker
                className='w-full'
                label={<Text>Finish date</Text>}
                value={value ?? null}
                onChange={curry(setValue)("end")}
              />

              <HelperText id='date' error={getError("start")} />
            </FormControl>
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
