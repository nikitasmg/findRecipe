import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  EmployeeInput,
  useCreateEmployeeMutation,
  useEmployeeByIdQuery,
  useSubdivisionsQuery,
  useUpdateEmployeeMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";
import { getBaseEmailValidation } from "~shared/lib/validation";

interface IEmployeesDetailsForm {
  id?: number;
}

export const EmployeesDetailsForm: React.FC<IEmployeesDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data: subdivisions } = useSubdivisionsQuery(client, {}, { refetchOnMount: "always" });

  const { data, isSuccess } = useEmployeeByIdQuery(
    client,
    { id: `${id}` },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.employeeById;

  const { mutateAsync: createEmployee, isLoading: isCreateLoading } =
    useCreateEmployeeMutation(client);

  const { mutateAsync: updateEmployee, isLoading: isUpdateLoading } =
    useUpdateEmployeeMutation(client);

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
      subdivision: { connect: newValues.subdivision },
      sort: newValues.sort ? Number(newValues.sort) : 0
    };

    if (isCreateMode) {
      createEmployee({ input });
      return;
    }

    updateEmployee({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "position", "additional", "email", "sort", "subdivision"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='flex flex-col gap-6'>
        <Grid container className='mt-2' columns={12} spacing={3}>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <Controller
              control={control}
              name='name'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Full name</Text>}
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
          </Grid>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <Controller
              control={control}
              name='position'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Position</Text>}
                    value={value}
                    variant='standard'
                    InputLabelProps={{
                      shrink: !!value
                    }}
                    id='position'
                    error={!!getError("position")}
                    {...register("position")}
                  />

                  <HelperText id='position' error={getError("position")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <Controller
              control={control}
              name='additional'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Additional number</Text>}
                    value={value}
                    variant='standard'
                    InputLabelProps={{
                      shrink: !!value
                    }}
                    id='additional'
                    error={!!getError("additional")}
                    {...register("additional")}
                  />

                  <HelperText id='additional' error={getError("additional")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <Controller
              control={control}
              name='email'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Email</Text>}
                    value={value}
                    variant='standard'
                    InputLabelProps={{
                      shrink: !!value
                    }}
                    id='email'
                    error={!!getError("email")}
                    {...register("email", getBaseEmailValidation({ required: false }))}
                  />

                  <HelperText id='email' error={getError("email")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <Controller
              control={control}
              name='sort'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Sorting</Text>}
                    value={value}
                    variant='standard'
                    type='number'
                    InputLabelProps={{
                      shrink: !!value
                    }}
                    id='sort'
                    error={!!getError("sort")}
                    {...register("sort")}
                  />

                  <HelperText id='sort' error={getError("sort")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item className='max-w-lg' xs={12} sm={6}>
            <FormControl fullWidth>
              <Controller
                control={control}
                name='subdivision'
                render={({ field: { value, onChange } }) => {
                  return (
                    <TextField
                      select
                      name='subdivision'
                      id='subdivision'
                      variant='standard'
                      label={<Text>Subdivision</Text>}
                      SelectProps={{
                        value: value?.id ?? value ?? "",
                        onChange
                      }}
                    >
                      <MenuItem key={"empty"} value={""}>
                        <Text>Not selected</Text>
                      </MenuItem>
                      {subdivisions?.subdivisions.map((subdivision) => (
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                          {subdivision.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
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
