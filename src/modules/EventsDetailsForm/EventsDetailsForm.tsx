import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, FormControl, FormControlLabel, Switch, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import {
  EventInput,
  useCreateEventMutation,
  useEventByIdQuery,
  useUpdateEventMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { initFormValues } from "~/shared/lib/initFormValues";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { HelperText } from "~/shared/components/HelperText";
import { Button } from "~/shared/components/Button";
import { ImageInput } from "~/shared/components/ImageInput";

type Props = {
  id?: number;
};

export const EventsDetailsForm: React.FC<Props> = ({ id }) => {
  const isCreateMode = !Number.isInteger(id);

  const client = useGraphqlClient();

  const { data, isSuccess } = useEventByIdQuery(
    client,
    { id: `${id}` },
    { enabled: !isCreateMode }
  );

  const { mutateAsync: createEvent, isLoading: isCreateLoading } = useCreateEventMutation(client);

  const { mutateAsync: updateEvent, isLoading: isUpdateLoading } = useUpdateEventMutation(client);

  const values = data?.eventById;

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
    const input: EventInput & { imageUrl?: never } = {
      ...(Boolean(values?.id) && { id: values?.id }),
      ...newValues,
      imageUrl: undefined
    };

    if (isCreateMode) {
      createEvent({ input });
      return;
    }

    updateEvent({ input });
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    initFormValues(["name", "description", "published", "imageUrl"], setValue, values);
  }, [values, isSuccess, setValue]);

  return (
    <form onSubmit={onSubmit} className='w-full flex flex-col'>
      <Box className='flex flex-col lg:flex-row gap-6'>
        <Box className='grow-[2] lg:w-[70%] order-last mt-2 '>
          <Controller
            control={control}
            name='name'
            render={({ field: { value } }) => (
              <FormControl fullWidth className='!p-2'>
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
              <FormControl fullWidth className='!p-2'>
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
        </Box>
        <Box className='grow-[1] flex justify-center lg:w-[30%] order-first lg:order-last'>
          <Controller
            control={control}
            name='imageUrl'
            render={({ field: { value } }) => (
              <ImageInput
                id='general'
                url={value}
                {...register("imageUrl")}
                onChange={(file) => {
                  setValue("uploadImage", file);
                  if (file) {
                    setValue("imageUrl", URL.createObjectURL(file as File));
                  }
                }}
                onDelete={() => {
                  setValue("uploadImage", null);
                  setValue("imageUrl", null);
                }}
              />
            )}
          />
        </Box>
      </Box>
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
    </form>
  );
};
