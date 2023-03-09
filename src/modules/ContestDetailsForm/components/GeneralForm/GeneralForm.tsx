import React from "react";
import { Controller, UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { curry } from "rambda";
import { ContestStatus } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { getErrorMessage } from "~/shared/lib/getError";

interface GeneralFormFields {
  name?: string;
  number?: number;
  status?: ContestStatus;
  deadline?: string;
  date?: string;
}

type Props = {
  register: UseFormRegister<Partial<GeneralFormFields>>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<GeneralFormFields, unknown>;
};

export const GeneralForm: React.FC<Props> = ({ register, errors, setValue, control }) => {
  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='flex flex-col gap-6 lg:w-[70%]'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                error={!!getError("name")}
                {...register("name", { required: "This is required" })}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='number'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <NumericInput
                size='medium'
                label={<Text>Number</Text>}
                value={Number(value) || 0}
                {...register("number")}
              />

              <HelperText id='number' error={getError("number")} />
            </FormControl>
          )}
        />

        <FormControl fullWidth>
          <Controller
            control={control}
            name='status'
            render={({ field: { value = [], onChange } }) => (
              <TextField
                select
                label={<Text>Status</Text>}
                SelectProps={{
                  value: value,
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
                renderInput={(props) => <TextField {...props} />}
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
                label={<Text>Start date</Text>}
                value={value ?? null}
                onChange={curry(setValue)("date")}
                renderInput={(props) => <TextField {...props} />}
              />

              <HelperText id='date' error={getError("date")} />
            </FormControl>
          )}
        />
      </Box>
    </Box>
  );
};
