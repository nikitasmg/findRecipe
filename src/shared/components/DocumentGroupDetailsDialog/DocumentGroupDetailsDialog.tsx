import { Box, Drawer, FormControl, TextField } from "@mui/material";
import React, { useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import { Controller, useForm } from "react-hook-form";
import { DocumentGroup, DocumentGroupInput } from "~/generated/graphql";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { Button } from "../Button";
import { HelperText } from "../HelperText";
import { RequiredLabelWrapper } from "../RequiredLabelWrapper";
import { Text } from "../Text";

type Props = {
  open: boolean;
  onClose: () => void;
  create?: (group: Omit<DocumentGroupInput, "id">) => void;
  update?: (group: DocumentGroupInput) => void;
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
      name: newValues.name
    };

    if (isCreate) {
      create?.(input);
      return;
    }

    update?.(input);
  });

  const handleDelete = () => {
    if (group?.id) {
      onRemove?.(group.id);
    }

    onClose();
  };

  useEffect(() => {
    setValue("name", group?.name);
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
                {...register("name", baseRequired)}
              />

              <HelperText id='name' error={getError("name")} />
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

          <Button
            className='flex-1'
            color='primary'
            type='submit'
            variant='outlined'
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
