import { Box, Drawer, FormControl, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  StaffControl,
  useCreateStaffControlMutation,
  useDeleteStaffControlMutation,
  useUpdateStaffControlMutation
} from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";
import { ImageInput } from "~/shared/components/ImageInput";
import { HelperText } from "~/shared/components/HelperText";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";

type FormFields = {
  name?: string;
  description?: string;
  imageUrl?: string | null;
  uploadImage?: File | null;
  deleteImage?: boolean;
};

type Props = {
  open: boolean;
  handleCloseForm: () => void;
  onDelete: (item?: Partial<StaffControl> | null) => void;
  pageId?: string | number;
  activeStaff?: Partial<StaffControl> | null;
};

export const DetailsForm: React.FC<Props> = ({
  handleCloseForm,
  open,
  onDelete,
  activeStaff,
  pageId
}) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormFields>({ mode: "all" });

  const getError = getErrorMessage(errors);

  const isCreate = !activeStaff;

  const client = useGraphqlClient();

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateStaffControlMutation(client);

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateStaffControlMutation(client);

  const { mutateAsync: remove, isLoading: isDeleteLoading } = useDeleteStaffControlMutation(client);

  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      ...(Boolean(!isCreate) && { id: activeStaff?.id }),
      ...newValues,
      page_id: Number(pageId)
    };

    delete (input as StaffControl).imageUrl;

    if (isCreate) {
      create({ input }).then(handleCloseForm);
      return;
    }

    update({ input }).then(handleCloseForm);
  });

  const handleRemove = () => {
    if (!isCreate && activeStaff.id) {
      remove({ id: activeStaff.id });
    }

    onDelete(activeStaff);

    handleCloseForm();
  };

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
                setValue("deleteImage", true);
                setValue("imageUrl", null);
              }}
            />
          )}
        />

        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl>
              <TextField
                label={
                  <RequiredLabelWrapper>
                    <Text>Name</Text>
                  </RequiredLabelWrapper>
                }
                error={getError("name")}
                value={value}
                {...register("name", baseRequired)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <TextField
              multiline
              fullWidth
              value={value}
              label={<Text>Description</Text>}
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
            onClick={handleRemove}
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
