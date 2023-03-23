import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import {
  EmployeeInput,
  useActivityResultByIdQuery,
  useUpdateActivityResultMutation,
  useCreateActivityResultMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { SaveButton } from "~/shared/components/SaveButton";
import { baseRequired } from "~/shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

interface Props {
  id?: number;
}

export const ActivityResultsDetailsForm: React.FC<Props> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

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

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    register
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    const input: EmployeeInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      create({ input });
      return;
    }

    update({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "result", "measure_unit", "sort"], setValue, values);
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
                        <Text>Indicator title</Text>
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
      <Box className='w-full flex'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
