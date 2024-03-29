import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, TextareaAutosize, TextField } from "@mui/material";
import clsx from "clsx";
import {
  ClusterInput,
  useClusterByIdQuery,
  useCreateClusterMutation,
  useSettingByNameQuery,
  useUpdateClusterMutation,
  useUploadMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { getEventValueHandler } from "~/shared/lib/events";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { ContentEditor } from "~/shared/components/ContentEditor";
import { Languages } from "~/shared/types/Languages";
import { useClustersStore } from "~stores/clusters";

interface ClustersDetailsFormProps {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const ClustersDetailsForm: React.FC<ClustersDetailsFormProps> = ({ id, lang, formName }) => {
  const isCreate = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useClustersStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useClusterByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreate, refetchOnMount: "always", cacheTime: 0 }
  );

  const goBack = useNavigationBack();

  const values = data?.clusterById;

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateClusterMutation(client, {
    onSuccess: goBack
  });

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateClusterMutation(client, {
    onSuccess: goBack
  });

  const isLoading = isCreateLoading || isUpdateLoading;

  useEffect(() => {
    setIsSaveLoading(isLoading);
  }, [isLoading, setIsSaveLoading]);

  const { mutateAsync: upload } = useUploadMutation(client);

  const { data: settingsData } = useSettingByNameQuery(
    client,
    { name: "content_editor" },
    { refetchOnMount: "always" }
  );

  const contentEditorKey = settingsData?.settingByName?.value;

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const input: ClusterInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: Number(newValues.sort) || 0
    };

    if (isCreate) {
      create({ input });
      return;
    }

    update({ input });
  });

  const isRusLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      [
        "name",
        "column_one_name",
        "column_one_text",
        "column_two_name",
        "column_two_text",
        "name_en",
        "column_one_name_en",
        "column_one_text_en",
        "column_two_name_en",
        "column_two_text_en",
        "sort"
      ],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form id={formName} onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
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
                          <Text>Heading</Text>
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
                          <Text>Heading</Text>
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

          {isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='column_one_name'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      label={
                        <RequiredLabelWrapper>
                          <Text>First column heading</Text>
                        </RequiredLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      error={!!getError("column_one_name")}
                      {...register("column_one_name", baseRequiredTextValidation)}
                    />

                    <HelperText id='column_one_name' error={getError("column_one_name")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='column_one_name_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      label={
                        <EnLabelWrapper>
                          <Text>First column heading</Text>
                        </EnLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      {...register("column_one_name_en")}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {isRusLang && (
            <Grid item xs={12}>
              {contentEditorKey && (
                <Controller
                  control={control}
                  name='column_one_text'
                  render={({ field: { value } }) => (
                    <FormControl error={!!getError("column_one_text")} fullWidth>
                      <RequiredLabelWrapper>
                        <Text
                          className={clsx("text-base font-medium mb-2", {
                            "text-mainError": !!getError("column_one_text")
                          })}
                        >
                          First column description
                        </Text>
                      </RequiredLabelWrapper>
                      <ContentEditor
                        error={!!getError("column_one_text")}
                        apiKey={contentEditorKey}
                        value={value}
                        {...register("column_one_text", baseRequiredTextValidation)}
                        onChange={getEventValueHandler((value) =>
                          setValue("column_one_text", value, { shouldTouch: true })
                        )}
                        getUploadedUrl={getUploadedUrl}
                        size='small'
                      />

                      <HelperText id='column_one_text' error={getError("column_one_text")} />
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              {contentEditorKey && (
                <Controller
                  control={control}
                  name='column_one_text_en'
                  render={({ field: { value } }) => (
                    <FormControl fullWidth>
                      <EnLabelWrapper>
                        <Text className='text-base font-medium mb-2'>First column description</Text>
                      </EnLabelWrapper>
                      <ContentEditor
                        apiKey={contentEditorKey}
                        value={value}
                        {...register("column_one_text_en")}
                        getUploadedUrl={getUploadedUrl}
                        size='small'
                      />
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          )}

          {isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='column_two_name'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      label={
                        <RequiredLabelWrapper>
                          <Text>Second column heading</Text>
                        </RequiredLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      error={!!getError("column_two_name")}
                      {...register("column_two_name", baseRequiredTextValidation)}
                    />

                    <HelperText id='column_one_name' error={getError("column_one_name")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='column_two_name_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      multiline
                      fullWidth
                      value={value}
                      label={
                        <EnLabelWrapper>
                          <Text>Second column heading</Text>
                        </EnLabelWrapper>
                      }
                      InputProps={{
                        inputComponent: TextareaAutosize
                      }}
                      {...register("column_two_name_en")}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {isRusLang && (
            <Grid item xs={12}>
              {contentEditorKey && (
                <Controller
                  control={control}
                  name='column_two_text'
                  render={({ field: { value } }) => (
                    <FormControl error={!!getError("column_two_text")} fullWidth>
                      <RequiredLabelWrapper>
                        <Text
                          className={clsx("text-base font-medium mb-2", {
                            "text-mainError": !!getError("column_two_text")
                          })}
                        >
                          Second column description
                        </Text>
                      </RequiredLabelWrapper>
                      <ContentEditor
                        error={!!getError("column_two_text")}
                        apiKey={contentEditorKey}
                        value={value}
                        {...register("column_two_text", baseRequiredTextValidation)}
                        onChange={getEventValueHandler((value) =>
                          setValue("column_two_text", value, { shouldTouch: true })
                        )}
                        getUploadedUrl={getUploadedUrl}
                        size='small'
                      />

                      <HelperText id='column_two_text' error={getError("column_two_text")} />
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              {contentEditorKey && (
                <Controller
                  control={control}
                  name='column_two_text_en'
                  render={({ field: { value } }) => (
                    <FormControl fullWidth>
                      <EnLabelWrapper>
                        <Text className='text-base font-medium mb-2'>
                          Second column description
                        </Text>
                      </EnLabelWrapper>
                      <ContentEditor
                        apiKey={contentEditorKey}
                        value={value}
                        {...register("column_two_text_en")}
                        getUploadedUrl={getUploadedUrl}
                        size='small'
                      />
                    </FormControl>
                  )}
                />
              )}
            </Grid>
          )}

          {!isCreate && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='sort'
                render={({ field }) => (
                  <FormControl fullWidth>
                    <NumericInput label={<Text>Sorting</Text>} {...register("sort")} {...field} />

                    <HelperText id='sort' error={getError("sort")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}
        </Grid>
      </Box>
    </form>
  );
};
