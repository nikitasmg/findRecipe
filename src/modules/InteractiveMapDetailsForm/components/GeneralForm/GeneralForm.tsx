import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { LinkInput } from "~/shared/components/LinkInput";

type FormFields = {
  name?: string;
  learn_more?: string;
  characteristics?: string;
  area?: number;
  gross_boma_area?: number;
  floors?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const GeneralNewsForm: React.FC<Props> = ({ register, setValue, errors, control }) => {
  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='flex flex-col gap-6 w-full lg:w-[70%]'>
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
                {...register("name", baseRequired)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='characteristics'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Characteristics</Text>}
                value={value}
                error={!!getError("characteristics")}
                {...register("characteristics")}
              />

              <HelperText id='characteristics' error={getError("characteristics")} />
            </FormControl>
          )}
        />

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

        <Controller
          control={control}
          name='floors'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={
                  <RequiredLabelWrapper>
                    <Text>Floors</Text>
                  </RequiredLabelWrapper>
                }
                value={value}
                error={!!getError("floors")}
                {...register("floors", baseRequired)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='learn_more'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <LinkInput
                label={<Text>Link</Text>}
                value={value}
                type='learn_more'
                error={!!getError("learn_more")}
                {...register("learn_more")}
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
