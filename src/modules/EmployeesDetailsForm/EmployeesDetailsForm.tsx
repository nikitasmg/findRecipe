import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, Grid, MenuItem, TextField } from "@mui/material";
import {
  EmployeeInput,
  useCreateEmployeeMutation,
  useEmployeeByIdQuery,
  useSubdivisionsQuery,
  useUpdateEmployeeMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { NumericInput } from "~/shared/components/NumericInput";
import { SaveButton } from "~/shared/components/SaveButton";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getBaseEmailValidation, getFullNameValidation } from "~shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";

interface EmployeesDetailsFormProps {
  id?: number;
}

export const EmployeesDetailsForm: React.FC<EmployeesDetailsFormProps> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data: subdivisions } = useSubdivisionsQuery(client, {}, { refetchOnMount: "always" });

  const { data, isSuccess } = useEmployeeByIdQuery(
    client,
    { id: Number(id) },
    { enabled: !isCreateMode, refetchOnMount: "always" }
  );

  const values = data?.employeeById;

  const goBack = useNavigationBack();

  const { mutateAsync: createEmployee, isLoading: isCreateLoading } = useCreateEmployeeMutation(
    client,
    { onSuccess: goBack }
  );

  const { mutateAsync: updateEmployee, isLoading: isUpdateLoading } = useUpdateEmployeeMutation(
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
      subdivision: {
        connect: !isNaN(Number(newValues.subdivision))
          ? newValues.subdivision
          : newValues.subdivision?.id
      }
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

    initFormValues(["name", "position", "additional", "email", "subdivision"], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='flex flex-col gap-6'>
        <Grid container columns={12} spacing={3}>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='name'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={
                      <RequiredLabelWrapper>
                        <Text>Full name</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value}
                    variant='outlined'
                    id='name'
                    error={!!getError("name")}
                    {...register("name", getFullNameValidation({ required: true }))}
                  />

                  <HelperText id='name' error={getError("name")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='position'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Position</Text>}
                    value={value}
                    variant='outlined'
                    id='position'
                    error={!!getError("position")}
                    {...register("position")}
                  />

                  <HelperText id='position' error={getError("position")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='additional'
              render={({ field }) => (
                <FormControl fullWidth>
                  <NumericInput
                    label={<Text>Additional number</Text>}
                    id='additional'
                    error={!!getError("additional")}
                    {...register("additional")}
                    {...field}
                  />

                  <HelperText id='additional' error={getError("additional")} />
                </FormControl>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              control={control}
              name='email'
              render={({ field: { value } }) => (
                <FormControl fullWidth>
                  <TextField
                    label={<Text>Email</Text>}
                    value={value}
                    variant='outlined'
                    id='email'
                    error={!!getError("email")}
                    {...register("email", getBaseEmailValidation({ required: false }))}
                  />

                  <HelperText id='email' error={getError("email")} />
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
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
                      variant='outlined'
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
        <SaveButton className='w-fit ml-auto' disabled={isLoading} />
      </Box>
    </form>
  );
};
