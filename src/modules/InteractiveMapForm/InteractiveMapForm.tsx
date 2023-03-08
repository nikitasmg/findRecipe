import { Box, FormControl, TextField } from "@mui/material";
import React from "react";
import { curry } from "rambda";
import SaveIcon from "@mui/icons-material/Save";
import { Controller, useForm } from "react-hook-form";
import { InteractiveMap } from "~/shared/components/InteractiveMap";
import { Text } from "~/shared/components/Text";
import { Button } from "~/shared/components/Button";

type FormFields = {
  object_id?: string;
  title?: string;
  description?: string;
};

export const InteractiveMapForm: React.FC = () => {
  const { control, register, setValue } = useForm<FormFields>();

  return (
    <Box className='flex flex-col gap-6' component='form'>
      <Box className='w-full flex justify-center border rounded'>
        <Box className='w-full max-w-[900px] h-[400px]'>
          <InteractiveMap onSelect={curry(setValue)("object_id")} />
        </Box>
      </Box>

      <Controller
        control={control}
        name='object_id'
        render={({ field: { value } }) => (
          <FormControl fullWidth>
            <TextField
              disabled
              label={<Text>Object id</Text>}
              value={value}
              variant='outlined'
              id='object_id'
              {...register("object_id")}
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='title'
        render={({ field: { value } }) => (
          <FormControl fullWidth>
            <TextField
              label={<Text>Title</Text>}
              value={value}
              variant='outlined'
              id='title'
              {...register("title")}
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='description'
        render={({ field: { value } }) => (
          <FormControl fullWidth>
            <TextField
              label={<Text>Description</Text>}
              value={value}
              variant='outlined'
              id='description'
              {...register("description")}
            />
          </FormControl>
        )}
      />
      <Button
        startIcon={<SaveIcon />}
        type='submit'
        variant='contained'
        className='w-fit ml-auto'
        size='small'
      >
        Save
      </Button>
    </Box>
  );
};
