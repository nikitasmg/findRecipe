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
import { SaveButton } from "~/shared/components/SaveButton";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequired } from "~/shared/lib/validation";
import { fileFromBlobUrl } from "~/shared/lib/fileFromBlobUrl";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { ContentEditor } from "~/shared/components/ContentEditor";

interface ClustersDetailsFormProps {
  id?: number;
}

export const ClustersDetailsForm: React.FC<ClustersDetailsFormProps> = ({ id }) => {
  const isCreate = !Number.isInteger(id);

  const client = useGraphqlClient();

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

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "column_one_name", "column_one_text", "column_two_name", "column_two_text", "sort"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
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
                    {...register("name", baseRequired)}
                  />
                  <HelperText id='name' error={getError("name")} />
                </FormControl>
              )}
            />
          </Grid>

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
                    {...register("column_one_name", baseRequired)}
                  />

                  <HelperText id='column_one_name' error={getError("column_one_name")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {contentEditorKey && (
              <Controller
                control={control}
                name='column_one_text'
                render={({ field: { value } }) => (
                  <FormControl error={!!getError("column_one_text")} fullWidth>
                    <RequiredLabelWrapper>
                      <Text
                        className={clsx("text-sm", { "text-mainError": !!getError("content") })}
                      >
                        First column description
                      </Text>
                    </RequiredLabelWrapper>
                    <ContentEditor
                      error={!!getError("column_one_text")}
                      apiKey={contentEditorKey}
                      value={value}
                      {...register("column_one_text", baseRequired)}
                      getUploadedUrl={getUploadedUrl}
                      settings={{ min_height: 200 }}
                    />

                    <HelperText id='column_one_text' error={getError("column_one_text")} />
                  </FormControl>
                )}
              />
            )}
          </Grid>

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
                    {...register("column_two_name", baseRequired)}
                  />

                  <HelperText id='column_one_name' error={getError("column_one_name")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {contentEditorKey && (
              <Controller
                control={control}
                name='column_two_text'
                render={({ field: { value } }) => (
                  <FormControl error={!!getError("column_two_text")} fullWidth>
                    <RequiredLabelWrapper>
                      <Text
                        className={clsx("text-sm", {
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
                      {...register("column_two_text", baseRequired)}
                      getUploadedUrl={getUploadedUrl}
                      settings={{ min_height: 200 }}
                    />

                    <HelperText id='column_two_text' error={getError("column_two_text")} />
                  </FormControl>
                )}
              />
            )}
          </Grid>

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
      <Box className='w-full flex'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
