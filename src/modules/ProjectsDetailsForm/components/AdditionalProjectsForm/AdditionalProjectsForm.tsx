import { Box, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";

type FormFields = {
  annotation?: string;
  plan_results?: string;
  result_annotation?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  control?: Control<FormFields, unknown>;
};

export const AdditionalProjectsForm: React.FC<Props> = ({ register, errors, control }) => {
  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='annotation'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={<Text>Annotation</Text>}
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    id='annotation'
                    error={!!getError("annotation")}
                    {...register("annotation")}
                  />

                  <HelperText id='annotation' error={getError("annotation")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='plan_results'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={<Text>Plan results</Text>}
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    id='plan_results'
                    error={!!getError("plan_results")}
                    {...register("plan_results")}
                  />

                  <HelperText id='plan_results' error={getError("plan_results")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
