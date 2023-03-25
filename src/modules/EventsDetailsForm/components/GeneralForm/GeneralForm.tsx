import {
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  TextareaAutosize,
  TextField
} from "@mui/material";
import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { curry } from "rambda";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { HelperText } from "~/shared/components/HelperText";
import { ImageInput } from "~/shared/components/ImageInput";
import { Text } from "~/shared/components/Text";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { DatePicker } from "~/shared/components/DatePicker";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~/shared/lib/validation";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { useAlertsStore } from "~/shared/stores/alerts";

export type GeneralFormFields = {
  name?: string;
  description?: string;
  place?: string;
  imageUrl?: string;
  published?: boolean;
  end?: string;
  start?: string;
  uploadImage?: File | null;
};

type Props = {
  register: UseFormRegister<GeneralFormFields>;
  errors: FieldErrors<GeneralFormFields>;
  setValue: (name: keyof GeneralFormFields, value: string | File | null) => void;
  control?: Control<GeneralFormFields, unknown>;
};

export const GeneralForm: React.FC<Props> = ({ register, setValue, errors, control }) => {
  const getError = getErrorMessage(errors);

  const handleChecked = getCheckedHandler(setValue);

  const addAlert = useAlertsStore((state) => state.addAlert);

  return (
    <Box className='flex flex-col lg:flex-row gap-6'>
      <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
        <Controller
          control={control}
          name='name'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={
                  <RequiredLabelWrapper>
                    <Text>Heading</Text>
                  </RequiredLabelWrapper>
                }
                value={value}
                variant='outlined'
                error={!!getError("name")}
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
            <FormControl fullWidth>
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

              <HelperText id='description' error={getError("description")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='place'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <TextField
                label={<Text>Place event</Text>}
                value={value}
                error={!!getError("place")}
                {...register("place")}
              />

              <HelperText id='place' error={getError("place")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='published'
          render={({ field: { value } }) => (
            <FormControl fullWidth>
              <FormControlLabel
                control={<Switch checked={!!value} onChange={handleChecked("published")} />}
                label={<Text>Published</Text>}
              />

              <HelperText id='published' error={getError("published")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='start'
          render={({ field: { value } }) => (
            <FormControl error={getError("start")}>
              <DatePicker
                className='w-full'
                label={<Text>Start date</Text>}
                value={value ?? null}
                onChange={curry(setValue)("start")}
              />

              <HelperText id='date' error={getError("start")} />
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name='end'
          render={({ field: { value } }) => (
            <FormControl error={getError("end")}>
              <TimePicker
                className='w-full'
                label={<Text>Event time</Text>}
                value={value ?? null}
                onChange={curry(setValue)("end")}
                renderInput={(params) => <TextField size='small' {...params} />}
              />

              <HelperText id='date' error={getError("start")} />
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
              addAlert={addAlert}
              id='general'
              url={value}
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
      </Box>
    </Box>
  );
};
