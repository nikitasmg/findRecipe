import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";
import { Controller, useForm, UseFormReturn } from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  GalleryImage,
  NewsCategory,
  useNewsCategoriesQuery,
  useNewsTagsQuery
} from "~/generated/graphql";
import { Text } from "~/shared/components/Text";

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
  step: number;
  defaultValues?: FormFields;
  onUpdateForm?: (step: number, form: UseFormReturn<Record<string, unknown>, unknown>) => void;
};

export const AdditionalNewsForm: React.FC<Props> = ({ defaultValues }) => {
  const form = useForm<FormFields>({ defaultValues, mode: "all" });

  const client = useGraphqlClient();

  const { data: categories } = useNewsCategoriesQuery(client);

  const { data: tags } = useNewsTagsQuery(client);

  return (
    <form className='flex flex-col mt-2 gap-6'>
      <FormControl fullWidth className='!p-2'>
        <InputLabel htmlFor='source_name'>
          <Text>Source title</Text>
        </InputLabel>
        <Input id='source_name' {...form.register("source_name")} />
      </FormControl>
      <FormControl fullWidth className='!p-2'>
        <InputLabel htmlFor='source'>
          <Text>Source</Text>
        </InputLabel>
        <Controller
          control={form.control}
          name='source'
          render={({ field: { value: sourceValue } }) => (
            <Input
              id='source'
              {...form.register("source", { required: sourceValue ? "This is required" : false })}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth className='!p-2'>
        <FormControlLabel
          control={<Checkbox id='published' {...form.register("published")} />}
          label={<Text>Published</Text>}
        />
      </FormControl>
      <FormControl fullWidth className='!p-2'>
        <Controller
          control={form.control}
          name='published_at'
          render={({ field: { value } }) => (
            <DatePicker
              value={value}
              label={<Text>Published at</Text>}
              {...form.register("published_at")}
              onChange={(value) => form.setValue("published_at", `${value}`)}
              renderInput={(props) => <TextField id='published_at' {...props} variant='standard' />}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth className='!pl-2'>
        <InputLabel id='category-select'>
          <Text component='span'>Category</Text>
        </InputLabel>
        <Select
          labelId='category-select'
          id='category-select'
          label={<Text>Category</Text>}
          variant='standard'
          {...form.register("category")}
        >
          <MenuItem key={"empty"} value={""}>
            <Text>Not selected</Text>
          </MenuItem>
          {categories?.newsCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className='!pl-2'>
        <Controller
          control={form.control}
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
        control={form.control}
        name='on_index'
        render={({ field: { value } }) => (
          <FormControlLabel
            control={
              <Switch
                value={value}
                onChange={(event) => form.setValue("on_index", event.target.checked)}
              />
            }
            label={<Text>Visible on home page</Text>}
          />
        )}
      />
    </form>
  );
};
