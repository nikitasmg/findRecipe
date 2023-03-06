import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, FormControlLabel, Switch, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  EmployeeInput,
  useCreateVacancyMutation,
  useUpdateVacancyMutation,
  useVacancyByIdQuery
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";

interface IVacanciesDetailsForm {
  id?: number;
}

export const VacanciesDetailsForm: React.FC<IVacanciesDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useVacancyByIdQuery(
    client,
    { id: `${id}` },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.vacancyById;

  const { mutateAsync: createVacancy, isLoading: isCreateLoading } =
    useCreateVacancyMutation(client);

  const { mutateAsync: updateVacancy, isLoading: isUpdateLoading } =
    useUpdateVacancyMutation(client);

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

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "description", "sort", "published"], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-2'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='p-2'>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                variant='standard'
                InputLabelProps={{
                  shrink: !!value
                }}
                id='name'
                error={!!getError("name")}
                {...register("name", { required: "This is required" })}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='p-2'>
              <TextField
                label={<Text>Description</Text>}
                value={value}
                variant='standard'
                InputLabelProps={{
                  shrink: !!value
                }}
                id='description'
                error={!!getError("description")}
                {...register("description")}
              />

              <HelperText id='description' error={getError("description")} />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='sort'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='p-2'>
              <TextField
                label={<Text>Sorting</Text>}
                value={value}
                variant='standard'
                type='number'
                InputLabelProps={{
                  shrink: !!value || value === 0
                }}
                id='sort'
                error={!!getError("sort")}
                {...register("sort")}
              />

              <HelperText id='sort' error={getError("sort")} />
            </FormControl>
          )}
        />
        <Controller
          control={control}
          name='published'
          render={({ field: { value } }) => (
            <FormControl fullWidth className='!p-2'>
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
      </Box>
    </form>
  );
};
