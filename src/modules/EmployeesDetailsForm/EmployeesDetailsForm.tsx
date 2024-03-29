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
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getBaseEmailValidation, getFullNameValidation } from "~shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Languages } from "~/shared/types/Languages";
import { useEmployeesStore } from "~stores/employees";

interface EmployeesDetailsFormProps {
  lang: Languages;
  id?: number;
  formName?: string;
}

export const EmployeesDetailsForm: React.FC<EmployeesDetailsFormProps> = ({
  id,
  lang,
  formName
}) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { setIsSaveLoading } = useEmployeesStore((state) => ({
    setIsSaveLoading: state.setIsSaveLoading
  }));

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
    const input: EmployeeInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      additional: String(newValues.additional),
      subdivision: {
        ...(Number.isInteger(newValues.subdivision) && { connect: newValues.subdivision }),
        ...(Boolean(!newValues.subdivision && values?.subdivision?.id) && {
          disconnect: true
        })
      }
    };

    if (isCreateMode) {
      createEmployee({ input });
      return;
    }

    updateEmployee({ input });
  });

  const isRuLang = lang === "ru";

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "name_en", "position", "position_en", "additional", "email", "subdivision"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form id={formName} onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='lg:w-[70%] mt-4'>
        <Grid container columns={12} spacing={4}>
          {isRuLang && (
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
          )}

          {!isRuLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='name_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <EnLabelWrapper>
                          <Text>Full name</Text>
                        </EnLabelWrapper>
                      }
                      value={value}
                      variant='outlined'
                      {...register("name_en", getFullNameValidation({ required: false }))}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {isRuLang && (
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
                      {...register("position")}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          {!isRuLang && (
            <Grid item xs={12}>
              <Controller
                control={control}
                name='position_en'
                render={({ field: { value } }) => (
                  <FormControl fullWidth>
                    <TextField
                      label={
                        <EnLabelWrapper>
                          <Text>Position</Text>
                        </EnLabelWrapper>
                      }
                      value={value}
                      variant='outlined'
                      {...register("position_en")}
                    />
                  </FormControl>
                )}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <Controller
              control={control}
              name='additional'
              render={({ field }) => (
                <FormControl fullWidth>
                  <NumericInput
                    label={<Text>Additional number</Text>}
                    id='additional'
                    {...register("additional")}
                    {...field}
                  />
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
                    label={
                      <RequiredLabelWrapper>
                        <Text>Email</Text>
                      </RequiredLabelWrapper>
                    }
                    value={value}
                    variant='outlined'
                    id='email'
                    error={!!getError("email")}
                    {...register("email", getBaseEmailValidation({ required: true }))}
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
                          {isRuLang ? subdivision.name : subdivision.name_en}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
