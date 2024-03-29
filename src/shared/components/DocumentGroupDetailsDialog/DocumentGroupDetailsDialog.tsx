import { Box, Drawer, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import { DocumentGroup, DocumentGroupInput } from "~/generated/graphql";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { Button } from "../Button";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";
import { SaveButton } from "../SaveButton";
import { EnLabelWrapper } from "../EnLabelWrapper";

type Props = {
  open: boolean;
  onClose: () => void;
  create?: (group: Omit<DocumentGroupInput, "id">) => void;
  update?: (group: Partial<DocumentGroup>) => void;
  onRemove?: (id: DocumentGroupInput["id"]) => void;
  group?: DocumentGroup | null;
};

export const DocumentGroupDetailsDialog: React.FC<Props> = ({
  open,
  onClose,
  group,
  onRemove,
  create,
  update
}) => {
  const {
    register,
    control,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm({ mode: "all" });

  const getError = getErrorMessage(errors);

  const isCreate = !group?.id;

  const onSubmit = handleSubmit((newValues) => {
    const input = {
      ...(Boolean(isCreate) && { id: group?.id }),
      name: newValues.name,
      name_en: newValues.name_en
    };

    if (isCreate) {
      create?.(input);
      onClose?.();
      return;
    }

    update?.({ ...group, ...input });
    onClose?.();
  });

  const handleDelete = () => {
    if (group?.id) {
      onRemove?.(group.id);
    }

    onClose();
  };

  useEffect(() => {
    setValue("name", group?.name);
    setValue("name_en", group?.name_en);
  }, [group, setValue]);

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Box className='flex flex-col gap-10 p-6' component='form' onSubmitCapture={onSubmit}>
        <Text variant='h5'>{document ? "Edit group" : "Create group"}</Text>
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label={
                  <RequiredLabelWrapper>
                    <Text>Name</Text>
                  </RequiredLabelWrapper>
                }
                {...field}
                error={!!getError("name")}
                {...register("name", baseRequiredTextValidation)}
              />

              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='name_en'
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                fullWidth
                label={
                  <EnLabelWrapper>
                    <Text>Name</Text>
                  </EnLabelWrapper>
                }
                {...field}
                {...register("name_en", baseRequiredTextValidation)}
              />
            </FormControl>
          )}
        />

        <Box className='flex gap-2'>
          {onRemove && (
            <Button
              className='flex-1'
              color='error'
              type='button'
              variant='outlined'
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}

          <SaveButton className='flex-1' />
        </Box>
      </Box>
    </Drawer>
  );
};
