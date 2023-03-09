import { Box, Drawer, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  StaffControl,
  useCreateStaffControlMutation,
  useUpdateStaffControlMutation
} from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";
import { ImageInput } from "~/shared/components/ImageInput";

type FormFields = {
  name?: string;
  description?: string;
  imageUrl?: string | null;
  uploadImage?: File | null;
};

type Props = {
  page_id: string;
  open: boolean;
  handleCloseForm: () => void;
  activeStaff?: StaffControl | null;
};

export const DetailsForm: React.FC<Props> = ({ handleCloseForm, open, activeStaff, page_id }) => {
  const { handleSubmit, control, register, reset, setValue } = useForm<FormFields>({ mode: "all" });

  const isCreate = !activeStaff;

  const client = useGraphqlClient();

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateStaffControlMutation(client);

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateStaffControlMutation(client);

  const isLoading = isCreateLoading || isUpdateLoading;

  const onSubmit = handleSubmit((newValues) => {
    const input = { ...newValues, page_id };

    delete (input as StaffControl).imageUrl;

    if (isCreate) {
      create({ input }).then(handleCloseForm);
      return;
    }

    update({ input }).then(handleCloseForm);
  });

  const title = isCreate ? "Create staff control" : "Edit staff control";

  useEffect(() => reset, [open, reset]);

  useEffect(() => {
    if (!activeStaff) {
      return;
    }

    setValue("name", activeStaff.name);
    setValue("description", activeStaff.description ?? "");
    setValue("imageUrl", activeStaff.imageUrl);
  }, [activeStaff, setValue]);

  return (
    <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
      <Box
        className='flex flex-col gap-10 p-6 max-w-[300px]'
        component='form'
        onSubmitCapture={onSubmit}
      >
        <Text variant='h5'>{title}</Text>

        <Controller
          control={control}
          name='imageUrl'
          render={({ field: { value } }) => (
            <ImageInput
              url={value ?? ""}
              {...register("imageUrl")}
              onChange={(file) => {
                setValue("uploadImage", file as File);
              }}
              onDelete={() => {
                setValue("uploadImage", null);
                setValue("imageUrl", null);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <TextField
              label={<Text>Name</Text>}
              value={value}
              variant='standard'
              {...register("name")}
            />
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <TextField
              label={<Text>Description</Text>}
              value={value}
              variant='standard'
              InputProps={{
                inputComponent: TextareaAutosize
              }}
              {...register("description")}
            />
          )}
        />

        <Box className='flex gap-2'>
          <Button
            className='flex-1'
            color='error'
            type='button'
            variant='outlined'
            startIcon={<RemoveIcon />}
            onClick={handleCloseForm}
          >
            Delete
          </Button>

          <Button
            className='flex-1'
            color='primary'
            type='submit'
            variant='outlined'
            startIcon={<SaveIcon />}
            disabled={isLoading}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
