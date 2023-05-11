import { Box, Drawer, FormControl, TextareaAutosize, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import RemoveIcon from "@mui/icons-material/Delete";
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
import { SaveButton } from "~/shared/components/SaveButton";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { useAlertsStore } from "~/shared/stores/alerts";
import { NumericInput } from "~/shared/components/NumericInput";

type FormFields = {
  name?: string;
  description?: string;
  name_en?: string;
  sort?: number | undefined;
  description_en?: string;
  email?: string;
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

  const addAlert = useAlertsStore((state) => state.addAlert);

  const client = useGraphqlClient();

  const { mutateAsync: create, isLoading: isCreateLoading } = useCreateStaffControlMutation(client);

  const { mutateAsync: update, isLoading: isUpdateLoading } = useUpdateStaffControlMutation(client);

  const { mutateAsync: remove, isLoading: isDeleteLoading } = useDeleteStaffControlMutation(client);

  const isLoading = isCreateLoading || isUpdateLoading || isDeleteLoading;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      ...(Boolean(!isCreate) && { id: activeStaff?.id }),
      ...newValues,
      page_id: Number(pageId),
      sort: newValues.sort ? Number(newValues.sort) : 0
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
    setValue("name_en", activeStaff.name_en ?? "");
    setValue("description_en", activeStaff.description_en ?? "");
    setValue("email", activeStaff.email ?? "");
    setValue("imageUrl", activeStaff.imageUrl);
    setValue("sort", activeStaff.sort);
  }, [activeStaff, setValue]);

  return (
    <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
      <Box
        className='flex flex-col gap-10 p-6 max-w-[300px] lg:max-w-[600px]'
        component='form'
        onSubmitCapture={onSubmit}
      >
        <Text variant='h5'>{title}</Text>

        <Controller
          control={control}
          name='imageUrl'
          render={({ field: { value } }) => (
            <ImageInput
              addAlert={addAlert}
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
                {...register("name", baseRequiredTextValidation)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='name_en'
          render={({ field: { value } }) => (
            <FormControl>
              <TextField
                label={
                  <EnLabelWrapper>
                    <Text>Name</Text>
                  </EnLabelWrapper>
                }
                value={value}
                {...register("name_en")}
              />
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

        <Controller
          control={control}
          name='description_en'
          render={({ field: { value } }) => (
            <TextField
              multiline
              fullWidth
              value={value}
              label={
                <EnLabelWrapper>
                  <Text>Description</Text>
                </EnLabelWrapper>
              }
              InputProps={{
                inputComponent: TextareaAutosize
              }}
              {...register("description_en")}
            />
          )}
        />
        <Controller
          control={control}
          name='email'
          render={({ field: { value } }) => (
            <TextField
              multiline
              fullWidth
              value={value}
              label={
                <EnLabelWrapper>
                  <Text>Email</Text>
                </EnLabelWrapper>
              }
              InputProps={{
                inputComponent: TextareaAutosize
              }}
              {...register("email")}
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

          <SaveButton className='flex-1' disabled={isLoading} />
        </Box>
      </Box>
    </Drawer>
  );
};
