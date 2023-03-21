import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  EmployeeInput,
  useCreateVacancyMutation,
  useUpdateVacancyMutation,
  useVacancyByIdQuery
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";
import { NumericInput } from "~/shared/components/NumericInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { baseRequired } from "~/shared/lib/validation";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

interface IVacanciesDetailsForm {
  id?: number;
}

export const VacanciesDetailsForm: React.FC<IVacanciesDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

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
      createVacancy({ input });
      return;
    }

    updateVacancy({ input });
  });

  const handleChecked = getCheckedHandler(setValue);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "description", "sort", "published"], setValue, values);
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
                    variant='outlined'
                    InputLabelProps={{
                      shrink: !!value
                    }}
                    id='name'
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
              name='description'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    id='description'
                    multiline
                    fullWidth
                    value={value}
                    label={<Text>Description</Text>}
                    InputProps={{
                      inputComponent: TextareaAutosize
                    }}
                    {...register("description")}
                  />

                  <HelperText id='description' error={getError("description")} />
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
        </Grid>
      </Box>
      <Box className='w-full flex'>
        <Button
          startIcon={<SaveIcon />}
          disabled={isLoading}
          type='submit'
          variant='contained'
          className='w-fit ml-auto'
          size='small'
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
