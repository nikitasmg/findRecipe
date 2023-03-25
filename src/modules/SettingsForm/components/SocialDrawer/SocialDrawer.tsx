import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text } from "~/shared/components/Text";
import { Socials } from "~/shared/types/socials";
import SaveIcon from "@mui/icons-material/Save";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { FormFieldsSocial } from "../SocialSettingsForm";

type Props = {
  open: string;
  active: "vk" | "facebook" | "telegram" | "instagram" | "whatsapp";
  handleCloseForm: () => void;
  handleSubmitProps: () => void;
  setValue: (name: keyof FormFieldsSocial, value: string) => void;
};

export const SocialDrawer: React.FC<Props> = ({
  open,
  handleCloseForm,
  active,
  handleSubmitProps,
  setValue
}) => {
  const [social, setSocial] = useState(active);

  useEffect(() => {
    setSocial(active);
  }, [active]);

  const { register, control, reset, handleSubmit } = useForm<{ name: string; value: string }>({
    mode: "all"
  });

  const handleChange = (event: SelectChangeEvent) => {
    setSocial(event.target.value as keyof FormFieldsSocial);
  };

  const closeHandler = () => {
    handleCloseForm();
    reset();
  };

  const onSubmit: SubmitHandler<{ name: string; value: string }> = (data) => {
    setValue(social, data.value);
    handleSubmitProps();
    handleCloseForm();
    reset();
  };

  return (
    <Drawer anchor='right' open={!!open} onClose={handleCloseForm}>
      <Box
        className='flex flex-col gap-10 p-6'
        component='form'
        onSubmitCapture={handleSubmit(onSubmit)}
      >
        <Text variant='h5'>Social</Text>
        <FormControl>
          <Select name='name' value={social||""} onChange={handleChange} required>
            {Object.values(Socials).map((el, i) => (
              <MenuItem key={i} value={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Controller
          control={control}
          name='value'
          rules={{ required: true }}
          render={({ field: { value } }) => (
            <TextField
              label={<Text>{social}</Text>}
              value={value||""}
              variant='standard'
              {...register("value")}
            />
          )}
        />

        <Box className='flex gap-2'>
          <Button
            className='flex-1'
            color='error'
            type='button'
            variant='outlined'
            startIcon={<BackspaceIcon />}
            onClick={closeHandler}
          >
            Back
          </Button>

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
