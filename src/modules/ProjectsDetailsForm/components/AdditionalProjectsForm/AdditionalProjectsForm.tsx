import { Box, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useCallback } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetError
} from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useSettingByNameQuery, useUploadMutation } from "~/generated/graphql";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { fileFromBlobUrl } from "~shared/lib/fileFromBlobUrl";
import { ContentEditor } from "~shared/components/ContentEditor";

type FormFields = {
  information?: string;
  annotation?: string;
  plan_results?: string;
  result_annotation?: string;
  year?: number;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  setError: UseFormSetError<FieldErrors>;
  control?: Control<FormFields, unknown>;
};

export const AdditionalProjectsForm: React.FC<Props> = ({
  register,
  errors,
  setValue,
  control
}) => {
  const client = useGraphqlClient();

  const { mutateAsync: upload } = useUploadMutation(client);

  const { data } = useSettingByNameQuery(
    client,
    { name: "content_editor" },
    { refetchOnMount: "always" }
  );

  const contentEditorKey = data?.settingByName?.value;

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  const getError = getErrorMessage(errors);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          {contentEditorKey && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='information'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <ContentEditor
                      apiKey={contentEditorKey}
                      value={value ?? ""}
                      {...register("information")}
                      getUploadedUrl={getUploadedUrl}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

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
              name='year'
              render={({ field: { value } }) => (
                <FormControl error={getError("year")}>
                  <DatePicker
                    className='w-full'
                    views={["year"]}
                    label={<Text>Year</Text>}
                    value={value ? new Date(`${value}`) : null}
                    onChange={(value) => {
                      setValue("year", new Date(value as Date).getFullYear());
                    }}
                    renderInput={(props) => <TextField {...props} variant='outlined' />}
                  />

                  <HelperText id='year' error={getError("year")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
