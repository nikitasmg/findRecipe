import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import {
  useCreateVideo360Mutation,
  useUpdateVideo360Mutation,
  useVideo360ByIdQuery,
  Video360Input
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { LinkInput } from "~/shared/components/LinkInput";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequired, baseRequiredTextValidation } from "~/shared/lib/validation";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { useVideo360Store } from "~stores/video360";

interface Video360DetailsProps {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const Video360DetailsForm: React.FC<Video360DetailsProps> = ({ id, lang, formName }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useVideo360Store((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useVideo360ByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const values = data?.video360ById;

  const { mutateAsync: createVideo360, isLoading: isCreateLoading } = useCreateVideo360Mutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updateVideo360, isLoading: isUpdateLoading } = useUpdateVideo360Mutation(
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
    const input: Video360Input = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createVideo360({ input });
      return;
    }

    updateVideo360({ input });
  });

  const isRusLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "name_en", "description", "description_en", "url", "sort"],
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
          {isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='description'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <RequiredLabelWrapper>
                          <Text>Description</Text>
                        </RequiredLabelWrapper>
                      }
                      value={value ?? ""}
                      error={!!getError("description")}
                      {...register("description", {
                        ...baseRequired,
                        maxLength: { value: 500, message: "Max length text field 500" }
                      })}
                    />

                    <HelperText id='description' error={getError("description")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='description_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <EnLabelWrapper>
                          <Text>Description</Text>
                        </EnLabelWrapper>
                      }
                      value={value ?? ""}
                      error={!!getError("description_en")}
                      {...register("description_en", {
                        maxLength: { value: 500, message: "Max length text field 500" }
                      })}
                    />

                    <HelperText id='description_en' error={getError("description_en")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Controller
              control={control}
              name='url'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <LinkInput
                    label={
                      <RequiredLabelWrapper>
                        <Text>Link</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value}
                    type='url'
                    error={!!getError("url")}
                    {...register("url", baseRequiredTextValidation)}
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
        </Grid>
      </Box>
    </form>
  );
};
