import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import {
  VacancyInput,
  useCreateVacancyMutation,
  useSettingByNameQuery,
  useUpdateVacancyMutation,
  useUploadMutation,
  useVacancyByIdQuery
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getEventValueHandler } from "~/shared/lib/events";
import { curry } from "rambda";
import clsx from "clsx";
import { useVacanciesStore } from "~stores/vacancies";

interface VacanciesDetailsFormProps {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const VacanciesDetailsForm: React.FC<VacanciesDetailsFormProps> = ({
  id,
  lang,
  formName
}) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useVacanciesStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data: { settingByName } = {} } = useSettingByNameQuery(
    client,
    {
      name: "content_editor"
    },
    { refetchOnMount: "always" }
  );

  const { mutateAsync: upload } = useUploadMutation(client);

  const { data, isSuccess } = useVacancyByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.vacancyById;

  const goBack = useNavigationBack();

  const { mutateAsync: createVacancy, isLoading: isCreateLoading } = useCreateVacancyMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updateVacancy, isLoading: isUpdateLoading } = useUpdateVacancyMutation(
    client,
    { onSuccess: goBack }
  );

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const input: VacancyInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createVacancy({ input });
      return;
    }

    updateVacancy({ input });
  });

  const handleChecked = getCheckedHandler(setValue);

  const isRusLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      setValue("published", true);
      return;
    }

    initFormValues(
      ["name", "description", "name_en", "description_en", "sort", "published"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  const contentEditorKey = settingByName?.value;

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  return (
    <form id={formName} onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='published'
              render={({ field: { value } }) => (
                <FormControl>
                  <FormControlLabel
                    control={<Switch checked={!!value} onChange={handleChecked("published")} />}
                    label={<Text>Published</Text>}
                  />

                  <HelperText id='published' error={getError("published")} />
                </FormControl>
              )}
            />
          </Grid>

          {isRusLang && (
            <Grid item xs={12}>
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
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
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
            </Grid>
          )}

          {contentEditorKey && isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='description'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <Text
                      className={clsx("text-base font-medium mb-2", {
                        "text-mainError": !!getError("content")
                      })}
                    >
                      Description
                    </Text>
                    <ContentEditor
                      apiKey={contentEditorKey}
                      value={value ?? ""}
                      {...register("description")}
                      onChange={getEventValueHandler(curry(setValue)("description"))}
                      getUploadedUrl={getUploadedUrl}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {contentEditorKey && !isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='description_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <ContentEditor
                      apiKey={contentEditorKey}
                      value={value ?? ""}
                      {...register("description_en")}
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
              name='sort'
              render={({ field }) => (
                <FormControl fullWidth>
                  <NumericInput
                    label={<Text>Sorting</Text>}
                    variant='outlined'
                    id='sort'
                    error={!!getError("sort")}
                    {...register("sort")}
                    {...field}
                  />
                  <HelperText id='sort' error={getError("sort")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
