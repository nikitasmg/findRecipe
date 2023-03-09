import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, MenuItem, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { DatePicker } from "@mui/x-date-pickers";
import { curry } from "rambda";
import {
  ContestInput,
  ContestStatus,
  useContestByIdQuery,
  useCreateContestMutation,
  useUpdateContestMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";
import { NumericInput } from "~/shared/components/NumericInput";
import { getErrorMessage } from "~/shared/lib/getError";
import { initFormValues } from "~/shared/lib/initFormValues";

interface ContestDetailsForm {
  id?: number;
}

export const ContestDetailsForm: React.FC<ContestDetailsForm> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useContestByIdQuery(
    client,
    { id: `${id}` },
    { enabled: !isCreateMode }
  );

  const values = data?.contestById;

  const { mutateAsync: createContest, isLoading: isCreateLoading } =
    useCreateContestMutation(client);

  const { mutateAsync: updateContest, isLoading: isUpdateLoading } =
    useUpdateContestMutation(client);

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
    const input: ContestInput = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues
    };

    if (isCreateMode) {
      createContest({ input });
      return;
    }

    updateContest({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(
      ["name", "number", "status", "deadline", "date", "created_at"],
      setValue,
      values
    );
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='flex flex-col gap-6'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Title</Text>}
                value={value}
                error={!!getError("name")}
                {...register("name", { required: "This is required" })}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='number'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <NumericInput
                size='medium'
                label={<Text>Number</Text>}
                value={Number(value) || 0}
                {...register("number")}
              />

              <HelperText id='number' error={getError("number")} />
            </FormControl>
          )}
        />

        <FormControl fullWidth>
          <Controller
            control={control}
            name='status'
            render={({ field: { value = [], onChange } }) => (
              <TextField
                select
                label={<Text>Status</Text>}
                SelectProps={{
                  value: value,
                  onChange: onChange
                }}
              >
                <MenuItem key={"empty"} value={""}>
                  <Text>Not selected</Text>
                </MenuItem>
                {Object.entries(ContestStatus).map(([key, value]) => {
                  return (
                    <MenuItem key={key} value={value}>
                      <Text>{key}</Text>
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
        </FormControl>

        <Controller
          control={control}
          name='deadline'
          render={({ field: { value } }) => (
            <FormControl error={getError("deadline")}>
              <DatePicker
                className='w-full'
                label={<Text>Deadline</Text>}
                value={value ?? null}
                onChange={curry(setValue)("deadline")}
                renderInput={(props) => <TextField {...props} />}
              />

              <HelperText id='deadline' error={getError("deadline")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='date'
          render={({ field: { value } }) => (
            <FormControl error={getError("date")}>
              <DatePicker
                className='w-full'
                label={<Text>Start date</Text>}
                value={value ?? null}
                onChange={curry(setValue)("date")}
                renderInput={(props) => <TextField {...props} />}
              />

              <HelperText id='date' error={getError("date")} />
            </FormControl>
          )}
        />

        <Button
          startIcon={<SaveIcon />}
          disabled={isLoading}
          type='submit'
          variant='contained'
          className='w-fit ml-auto'
        >
          Save
        </Button>
      </Box>
    </form>
  );
};
