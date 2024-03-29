import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import {
  useActivityResultByIdQuery,
  useUpdateActivityResultMutation,
  useCreateActivityResultMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { baseRequired, baseRequiredTextValidation } from "~/shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { useActivityResultsStore } from "~stores/activityResult";

interface Props {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const ActivityResultsDetailsForm: React.FC<Props> = ({ id, lang, formName }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useActivityResultsStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

  const { data, isSuccess } = useActivityResultByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.activityResultById;

  const goBack = useNavigationBack();

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateActivityResultMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateActivityResultMutation(
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
    const input = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      result: parseFloat(newValues.result),
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
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
      ["name", "name_en", "result", "measure_unit", "measure_unit_en", "sort"],
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
                          <Text>Indicator title</Text>
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
                          <Text>Indicator title</Text>
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

          <Grid item xs={12}>
            <Controller
              control={control}
              name='result'
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    fullWidth
                    type='number'
                    inputMode='numeric'
                    inputProps={{
                      step: "0.01"
                    }}
                    label={
                      <RequiredLabelWrapper>
                        <Text>Indicator statistics</Text>
                      </RequiredLabelWrapper>
                    }
                    {...field}
                    error={!!getError("result")}
                    {...register("result", baseRequired)}
                  />

                  <HelperText id='result' error={getError("result")} />
                </FormControl>
              )}
            />
          </Grid>

          {isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='measure_unit'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <RequiredLabelWrapper>
                          <Text>Measure unit</Text>
                        </RequiredLabelWrapper>
                      }
                      value={value}
                      error={!!getError("measure_unit")}
                      {...register("measure_unit", baseRequired)}
                    />

                    <HelperText id='measure_unit' error={getError("measure_unit")} />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRusLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='measure_unit_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <EnLabelWrapper>
                          <Text>Measure unit</Text>
                        </EnLabelWrapper>
                      }
                      value={value}
                      {...register("measure_unit_en")}
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
