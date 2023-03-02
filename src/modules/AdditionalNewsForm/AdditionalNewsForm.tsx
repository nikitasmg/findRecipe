import { Box, FormControl, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  GalleryImage,
  NewsCategory,
  useNewsCategoriesQuery,
  useNewsTagsQuery
} from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";

type FormFields = {
  source?: string;
  source_name?: string;
  published?: boolean;
  published_at?: string;
  category?: NewsCategory["id"];
  tags?: string[];
  on_index?: boolean;
  gallery?: GalleryImage;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  control?: Control<FormFields, unknown>;
};

export const AdditionalNewsForm: React.FC<Props> = ({ register, errors, setValue, control }) => {
  const client = useGraphqlClient();

  const { data: categories } = useNewsCategoriesQuery(client);

  const { data: tags } = useNewsTagsQuery(client);

  const getError = getErrorMessage(errors);

  return (
    <Box className='grow-[2] lg:w-[70%] order-last mt-2'>
      <Controller
        control={control}
        name='source_name'
        render={({ field: { value } }) => (
          <FormControl fullWidth className='p-2'>
            <TextField
              label={<Text>Source title</Text>}
              value={value}
              variant='standard'
              InputLabelProps={{
                shrink: !!value
              }}
              id='source_name'
              error={!!getError("source_name")}
              {...register("source_name")}
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='source'
        render={({ field: { value } }) => (
          <FormControl fullWidth className='p-2'>
            <TextField
              label={<Text>Source</Text>}
              value={value}
              variant='standard'
              InputLabelProps={{
                shrink: !!value
              }}
              id='source'
              error={!!getError("source")}
              {...register("source")}
            />
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name='published'
        render={({ field: { value } }) => (
          <FormControlLabel
            control={
              <Switch
                checked={!!value}
                onChange={(event) => setValue("published", event.target.checked)}
              />
            }
            label={<Text>Published</Text>}
          />
        )}
      />

      <Controller
        control={control}
        name='published_at'
        render={({ field: { value } }) => (
          <FormControl fullWidth className='p-2'>
            <DatePicker
              value={value || dayjs().toISOString()}
              label={<Text>Published at</Text>}
              {...register("published_at")}
              onChange={(value) => setValue("published_at", dayjs(value).toISOString())}
              renderInput={(props) => <TextField id='published_at' {...props} variant='standard' />}
            />
          </FormControl>
        )}
      />

      <FormControl fullWidth className='p-2 mt-2'>
        <Controller
          control={control}
          name='category'
          render={({ field: { value = [], onChange } }) => (
            <TextField
              select
              name='category'
              id='category'
              variant='standard'
              label={<Text>Category</Text>}
              SelectProps={{
                value: value,
                onChange: onChange
              }}
            >
              <MenuItem key={"empty"} value={""}>
                <Text>Not selected</Text>
              </MenuItem>
              {categories?.newsCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </FormControl>

      <FormControl fullWidth className='p-2 mt-2'>
        <Controller
          control={control}
          name='tags'
          render={({ field: { value = [], onChange } }) => (
            <TextField
              select
              name='tags'
              id='tags'
              variant='standard'
              label={<Text>Tags</Text>}
              SelectProps={{
                multiple: true,
                value: value,
                onChange: onChange
              }}
            >
              {tags?.newsTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  #{tag.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </FormControl>
      <Controller
        control={control}
        name='on_index'
        render={({ field: { value } }) => (
          <FormControlLabel
            control={
              <Switch
                checked={!!value}
                onChange={(event) => setValue("on_index", event.target.checked)}
              />
            }
            label={<Text>Visible on home page</Text>}
          />
        )}
      />
    </Box>
  );
};
