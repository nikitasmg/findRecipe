import { Box, FormControl, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { curry } from "rambda";
import React from "react";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  GalleryImage,
  NewsCategory,
  useNewsCategoriesQuery,
  useNewsTagsQuery
} from "~/generated/graphql";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { getErrorMessage } from "~/shared/lib/getError";
import { getBaseUrlValidation } from "~/shared/lib/validation";

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
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      <Controller
        control={control}
        name='source_name'
        render={({ field: { value } }) => (
          <FormControl fullWidth>
            <TextField
              label={<Text>Source title</Text>}
              value={value}
              variant='outlined'
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
          <FormControl fullWidth>
            <TextField
              label={<Text>Source</Text>}
              value={value}
              inputMode='url'
              variant='outlined'
              id='source'
              error={!!getError("source")}
              {...register("source", getBaseUrlValidation())}
            />

            <HelperText id='source' error={getError("source")} />
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
          <FormControl error={getError("published_at")}>
            <DatePicker
              value={value}
              label={<Text>Published at</Text>}
              {...register("published_at", { required: "This is required" })}
              onChange={curry(setValue)("created_at")}
              renderInput={(props) => (
                <TextField
                  error={getError("published_at")}
                  id='published_at'
                  variant='outlined'
                  {...props}
                />
              )}
            />

            <HelperText id='published_at' error={getError("published_at")} />
          </FormControl>
        )}
      />

      <FormControl fullWidth>
        <Controller
          control={control}
          name='category'
          render={({ field: { value = [], onChange } }) => (
            <TextField
              select
              name='category'
              id='category'
              variant='outlined'
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

      <FormControl fullWidth>
        <Controller
          control={control}
          name='tags'
          render={({ field: { value = [], onChange } }) => (
            <TextField
              select
              name='tags'
              id='tags'
              variant='outlined'
              label={<Text>Tags</Text>}
              SelectProps={{
                multiple: true,
                value: value,
                onChange: onChange,
                MenuProps: {
                  className: "h-[300px]"
                }
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
