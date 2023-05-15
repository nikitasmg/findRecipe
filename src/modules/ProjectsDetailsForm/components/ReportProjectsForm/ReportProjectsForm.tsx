import { Box, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { Languages } from "~/shared/types/Languages";

type FormFields = {
  result_annotation?: string;
  publications?: string;
  result_usage?: string;
  result_annotation_en?: string;
  publications_en?: string;
  result_usage_en?: string;
};

type Props = {
  lang: Languages;
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const ReportProjectsForm: React.FC<Props> = ({ register, errors, control, lang }) => {
  const getError = getErrorMessage(errors);

  const isRuLang = lang === "ru";

  return (
    <Box className='lg:w-[70%] mt-4'>
      <Grid container columns={12} spacing={4}>
        {isRuLang && (
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
        )}

        {!isRuLang && (
          <Grid item xs={12}>
            <Controller
              control={control}
              name='result_annotation_en'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={
                      <EnLabelWrapper>
                        <Text>Result annotation</Text>
                      </EnLabelWrapper>
                    }
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    {...register("result_annotation_en")}
                  />
                </FormControl>
              )}
            />
          </Grid>
        )}

        {isRuLang && (
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
        )}

        {!isRuLang && (
          <Grid item xs={12}>
            <Controller
              control={control}
              name='publications_en'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <EnLabelWrapper>
                        <Text>Publications</Text>
                      </EnLabelWrapper>
                    }
                    value={value}
                    variant='outlined'
                    {...register("publications_en")}
                  />
                </FormControl>
              )}
            />
          </Grid>
        )}

        {isRuLang && (
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
        )}

        {!isRuLang && (
          <Grid item xs={12}>
            <Controller
              control={control}
              name='result_usage_en'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    multiline
                    label={
                      <EnLabelWrapper>
                        <Text>Practical use</Text>
                      </EnLabelWrapper>
                    }
                    value={value}
                    variant='outlined'
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    {...register("result_usage_en")}
                  />
                </FormControl>
              )}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
