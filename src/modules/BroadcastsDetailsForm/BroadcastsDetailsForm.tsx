import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import {
  EmployeeInput,
  useCreateVideoBroadcastMutation,
  useUpdateVideoBroadcastMutation,
  useVideoBroadcastByIdQuery
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { LinkInput } from "~/shared/components/LinkInput";
import { SaveButton } from "~/shared/components/SaveButton";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { baseRequired } from "~/shared/lib/validation";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

interface IVacanciesDetailsForm {
  id?: number;
}

export const BroadcastsDetailsForm: React.FC<IVacanciesDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useVideoBroadcastByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const goBack = useNavigationBack();

  const values = data?.videoBroadcastById;

  const { mutateAsync: createVideoBroadcast, isLoading: isCreateLoading } =
    useCreateVideoBroadcastMutation(client, { onSuccess: goBack });

  const { mutateAsync: updateVideoBroadcast, isLoading: isUpdateLoading } =
    useUpdateVideoBroadcastMutation(client, { onSuccess: goBack });

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
      createVideoBroadcast({ input });
      return;
    }

    updateVideoBroadcast({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "description", "url", "sort"], setValue, values);
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
        </Grid>
      </Box>
      <Box className='w-full flex'>
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
