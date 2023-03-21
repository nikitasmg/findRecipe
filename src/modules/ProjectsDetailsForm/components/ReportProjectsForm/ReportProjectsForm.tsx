import { Box, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";

type FormFields = {
  result_annotation?: string;
  publications?: string;
  result_usage?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const ReportProjectsForm: React.FC<Props> = ({ register, errors, control }) => {
  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='result_annotation'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={<Text>Result annotation</Text>}
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    id='result_annotation'
                    error={!!getError("result_annotation")}
                    {...register("result_annotation")}
                  />

                  <HelperText id='result_annotation' error={getError("result_annotation")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='publications'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Publications</Text>}
                    value={value}
                    variant='outlined'
                    id='publications'
                    error={!!getError("publications")}
                    {...register("publications")}
                  />

                  <HelperText id='publications' error={getError("publications")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name='result_usage'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={<Text>Practical use</Text>}
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    id='result_usage'
                    error={!!getError("result_usage")}
                    {...register("result_usage")}
                  />

                  <HelperText id='result_usage' error={getError("result_usage")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
