import { Box, FormControl, FormControlLabel, MenuItem, Switch, TextField } from "@mui/material";
import React from "react";
import { curry } from "rambda";
import { DateTimePicker } from "@mui/x-date-pickers";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
  UseFormSetError
} from "react-hook-form";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import {
  GalleryImage,
  NewsCategory,
  useNewsCategoriesQuery,
  useNewsTagsQuery
} from "~/generated/graphql";
import { HelperText } from "~/shared/components/HelperText";
import { Text } from "~/shared/components/Text";
import { LinkInput } from "~/shared/components/LinkInput";
import { RequiredLabelWrapper } from "~/shared/components/RequiredLabelWrapper";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";
import { getErrorMessage } from "~/shared/lib/getError";
import { baseRequired } from "~shared/lib/validation";
import { Languages } from "~/shared/types/Languages";
import { EnLabelWrapper } from "~/shared/components/EnLabelWrapper";

type FormFields = {
  source?: string;
  source_name?: string;
  published?: boolean;
  published_at?: string;
  category?: NewsCategory["id"];
  tags?: string[];
  on_index?: boolean;
  gallery?: GalleryImage;
  source_name_en?: string;
};

type Props = {
  register: UseFormRegister<Partial<FormFields>>;
  errors: FieldErrors<FormFields>;
  setValue: (name: string, value: unknown) => void;
  setError: UseFormSetError<FieldErrors>;
  lang: Languages;
  control?: Control<FormFields, unknown>;
};

export const AdditionalNewsForm: React.FC<Props> = ({
  register,
  errors,
  setValue,
  control,
  lang
}) => {
  const client = useGraphqlClient();

  const { data: categories } = useNewsCategoriesQuery(client, {}, { refetchOnMount: "always" });

  const { data: tags } = useNewsTagsQuery(client, {}, { refetchOnMount: "always" });

  const getError = getErrorMessage(errors);

  const handleChecked = getCheckedHandler(setValue);

  const isRuLang = lang === "ru";

  return (
    <Box className='flex flex-col gap-6 grow-[2] lg:w-[70%] order-last'>
      {isRuLang && (
        <Controller
          control={control}
          name='source_name'
          render={({ field: { value } }) => (
            <TextField
              label={<Text>Source title</Text>}
              value={value ?? ""}
              variant='outlined'
              id='source_name'
              {...register("source_name")}
            />
          )}
        />
      )}

      {!isRuLang && (
        <Controller
          control={control}
          name='source_name_en'
          render={({ field: { value } }) => (
            <TextField
              label={
                <EnLabelWrapper>
                  <Text>Source title</Text>
                </EnLabelWrapper>
              }
              value={value ?? ""}
              variant='outlined'
              id='source_name_en'
              {...register("source_name_en")}
            />
          )}
        />
      )}

      <Controller
        control={control}
        name='source'
        render={({ field: { value } }) => (
          <LinkInput
            label={<Text>Source</Text>}
            value={value ?? ""}
            variant='outlined'
            {...register("source")}
            onChange={(e) => setValue("source", e.target.value)}
          />
        )}
      />

      <Controller
        control={control}
        name='published'
        render={({ field: { value } }) => (
          <FormControlLabel
            control={<Switch checked={!!value} onChange={handleChecked("published")} />}
            label={<Text>Published</Text>}
          />
        )}
      />

      <Controller
        control={control}
        name='published_at'
        render={({ field: { value } }) => (
          <FormControl error={getError("published_at")}>
            <DateTimePicker
              className='w-full'
              label={
                <RequiredLabelWrapper>
                  <Text>Date and time created</Text>
                </RequiredLabelWrapper>
              }
              value={value ?? null}
              {...register("published_at", baseRequired)}
              onChange={curry(setValue)("published_at")}
              renderInput={(props) => <TextField {...props} size='small' />}
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
                  {isRuLang ? category.name : category.name_en}
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
              variant='outlined'
              label={<Text>Tags</Text>}
              SelectProps={{
                multiple: true,
                value,
                onChange,
                MenuProps: {
                  className: "h-[300px]"
                }
              }}
            >
              {tags?.newsTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  #{isRuLang ? tag.name : tag.name_en}
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
            control={<Switch checked={!!value} onChange={handleChecked("on_index")} />}
            label={<Text>Visible on home page</Text>}
          />
        )}
      />
    </Box>
  );
};
