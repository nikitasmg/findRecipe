import React from "react";
import { Controller, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import { curry } from "rambda";
import { ContestStatus } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { DatePicker } from "~/shared/components/DatePicker";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { NumberField } from "../NumberField";
import { Languages } from "~/shared/types/Languages";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";

export interface GeneralFormFields {
  name?: string;
  name_en?: string;
  number?: number;
  status?: ContestStatus;
  deadline?: string;
  date?: string;
}

type Props = {
  lang: Languages;
  register: UseFormRegister<Partial<GeneralFormFields>>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: keyof GeneralFormFields, value: string | number) => void;
  control?: Control<GeneralFormFields, unknown>;
};

export const GeneralForm: React.FC<Props> = ({ register, errors, setValue, control, lang }) => {
  const getError = getErrorMessage(errors);

  const isRuLang = lang === "ru";

  return (
    <Box className='flex flex-col gap-10 lg:w-[70%]'>
      {isRuLang && (
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
                    <Text>Title</Text>
                  </EnLabelWrapper>
                }
                value={value}
                {...register("name_en")}
              />
            </FormControl>
          )}
        />
      )}

      <NumberField register={register} errors={errors} setValue={setValue} control={control} />

      <FormControl fullWidth>
        <Controller
          control={control}
          name='status'
          render={({ field: { value = [], onChange } }) => (
            <TextField
              select
              label={<Text>Status</Text>}
              name='status'
              SelectProps={{
                value: value,
                name: "status",
                onChange: onChange
              }}
            >
              <MenuItem key={"empty"} value={""}>
                <Text>Not selected</Text>
              </MenuItem>
              {Object.entries(ContestStatus).map(([key, value]) => {
                return (
                  <MenuItem key={key} value={value}>
                    <Text>{key}</Text>
                  </MenuItem>
                );
              })}
            </TextField>
          )}
        />
      </FormControl>

      <Controller
        control={control}
        name='deadline'
        render={({ field: { value } }) => (
          <FormControl error={getError("deadline")}>
            <DatePicker
              className='w-full'
              label={<Text>Deadline</Text>}
              value={value ?? null}
              onChange={curry(setValue)("deadline")}
            />

            <HelperText id='deadline' error={getError("deadline")} />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='date'
        render={({ field: { value } }) => (
          <FormControl error={getError("date")}>
            <DatePicker
              className='w-full'
              label={<Text>Date of summing up</Text>}
              value={value ?? null}
              onChange={curry(setValue)("date")}
            />

            <HelperText id='date' error={getError("date")} />
          </FormControl>
        )}
      />
    </Box>
  );
};
