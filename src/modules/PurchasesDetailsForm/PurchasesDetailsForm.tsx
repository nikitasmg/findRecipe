import React, { useCallback, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import {
  EmployeeInput,
  useCreatePurchaseMutation,
  usePurchaseByIdQuery,
  useSettingByNameQuery,
  useUpdatePurchaseMutation,
  useUploadMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { ContentEditor } from "~shared/components/ContentEditor";
import { NumericInput } from "~shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { LinkInput } from "~/shared/components/LinkInput";
import { SaveButton } from "~/shared/components/SaveButton";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { fileFromBlobUrl } from "~shared/lib/fileFromBlobUrl";
import { baseRequired } from "~/shared/lib/validation";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

interface IVacanciesDetailsForm {
  id?: number;
}

export const PurchasesDetailsForm: React.FC<IVacanciesDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = usePurchaseByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const values = data?.purchaseById;

  const { mutateAsync: createPurchase, isLoading: isCreateLoading } = useCreatePurchaseMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updatePurchase, isLoading: isUpdateLoading } = useUpdatePurchaseMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: upload } = useUploadMutation(client);

  const { data: { settingByName } = {} } = useSettingByNameQuery(
    client,
    {
      name: "content_editor"
    },
    { refetchOnMount: "always" }
  );

  const contentEditorKey = settingByName?.value;

  const isLoading = isCreateLoading || isUpdateLoading;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const getUploadedUrl = useCallback(
    (url: string) => {
      return fileFromBlobUrl(url).then((file) =>
        upload({ file }).then((url) => `${process.env.REACT_APP_FILES_URL}${url.upload}`)
      );
    },
    [upload]
  );

  const onSubmit = handleSubmit((newValues) => {
    const input: EmployeeInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createPurchase({ input });
      return;
    }

    updatePurchase({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "description", "url", "sort", "published"], setValue, values);
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
                        <Text>Title</Text>
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
            {contentEditorKey && (
              <Controller
                control={control}
                name='description'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <ContentEditor
                      apiKey={contentEditorKey}
                      value={value ?? ""}
                      {...register("description")}
                      getUploadedUrl={getUploadedUrl}
                    />
                  </FormControl>
                )}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='url'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <LinkInput
                    label={<Text>Link</Text>}
                    value={value}
                    type='url'
                    error={!!getError("url")}
                    {...register("url")}
                    onChange={(e) => setValue("url", e.target.value)}
                  />

                  <HelperText id='url' error={getError("url")} />
                </FormControl>
              )}
            />
          </Grid>
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
          <Grid item xs={12}>
            <Controller
              control={control}
              name='published'
              render={({ field: { value } }) => (
                <FormControl>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={!!value}
                        onChange={(event) => setValue("published", event.target.checked)}
                      />
                    }
                    label={<Text>Published</Text>}
                  />

                  <HelperText id='published' error={getError("published")} />
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className='w-full flex'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
