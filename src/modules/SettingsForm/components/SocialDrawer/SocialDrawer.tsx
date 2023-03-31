import React from "react";
import { not } from "rambda";
import { Box, Drawer, FormControl, MenuItem, TextField } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { Controller, useForm } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { SaveButton } from "~/shared/components/SaveButton";
import { Button } from "~/shared/components/Button";
import { baseRequiredTextValidation } from "~/shared/lib/validation";
import { getErrorMessage } from "~/shared/lib/getError";
import { Socials } from "~/shared/types/socials";
import { FormFieldsSocial } from "../SocialSettingsForm";
import { HelperText } from "~/shared/components/HelperText";

type FormFields = {
  name: string;
  value: string;
};

type Props = {
  open: string;
  handleCloseForm: () => void;
  handleSubmitProps: () => void;
  onChange: (name: keyof FormFieldsSocial, value: string) => void;
  existedSocials: Socials[];
};

export const SocialDrawer: React.FC<Props> = ({
  open,
  handleCloseForm,
  handleSubmitProps,
  onChange,
  existedSocials
}) => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>({
    mode: "all"
  });

  const closeHandler = () => {
    handleCloseForm();
    reset();
  };

  const getError = getErrorMessage(errors);

  const onSubmit = handleSubmit((newValues) => {
    onChange(newValues.name as keyof FormFieldsSocial, newValues.value);
    handleSubmitProps();
    handleCloseForm();
    reset();
  });

  return (
    <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
      <Box
        className='flex flex-col gap-10 p-6 min-w-[300px] md:min-w-[400px]'
        component='form'
        onSubmit={(e) => {
          e.stopPropagation();
          onSubmit(e);
        }}
      >
        <Text variant='h5'>Add social</Text>
        <Controller
          control={control}
          name='name'
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                select
                variant='outlined'
                label={<Text>Title</Text>}
                SelectProps={{ ...field }}
                error={getError("name")}
                {...register("name", baseRequiredTextValidation)}
              >
                {Object.values(Socials)
                  .filter((social) => not(existedSocials.includes(social)))
                  .map((el, i) => (
                    <MenuItem key={i} value={el}>
                      {el}
                    </MenuItem>
                  ))}
              </TextField>
              <HelperText id='name' error={getError("name")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='value'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Source</Text>}
                value={value}
                error={getError("value")}
                {...register("value", baseRequiredTextValidation)}
              />
              <HelperText id='value' error={getError("value")} />
            </FormControl>
          )}
        />

        <Box className='flex gap-2'>
          <Button
            className='flex-1'
            color='error'
            variant='outlined'
            startIcon={<BackspaceIcon />}
            onClick={closeHandler}
          >
            Back
          </Button>

          <SaveButton className='flex-1'>Save</SaveButton>
        </Box>
      </Box>
    </Drawer>
  );
};
