import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField
} from "@mui/material";
import { curry } from "rambda";
import React, { forwardRef } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNewsCategoriesQuery, useNewsTagsQuery } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
import { DatePicker } from "~/shared/components/DatePicker";
import { getEventValueHandler } from "~/shared/lib/events";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter }, ref) => {
    const getChangeHandler = (cellId: string) =>
      getEventValueHandler((value: unknown) => handleChangeFilter(cellId, value));

    const handleChecked = getCheckedHandler(handleChangeFilter);

    const handleOnIndexChange = handleChecked("on_index");

    const client = useGraphqlClient();

    const { data: categories } = useNewsCategoriesQuery(client, {}, { refetchOnMount: "always" });

    const { data: tags } = useNewsTagsQuery(client, {}, { refetchOnMount: "always" });

    const handleTagChange = (e: SelectChangeEvent<unknown>) =>
      handleChangeFilter("tags", e.target.value);

    return (
      <form ref={ref}>
        <Grid container spacing={4}>
          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.id}
              label={<Text>Enter id</Text>}
              onChange={getChangeHandler("id")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel shrink id='category-select'>
                <Text component='span'>Category</Text>
              </InputLabel>
              <Select
                labelId='category-select'
                input={
                  <OutlinedInput
                    notched
                    label={<Text component='span'>Category</Text>}
                    name='category'
                  />
                }
                value={(params?.category as string) ?? ""}
                onChange={getChangeHandler("category")}
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
          </Grid>

          <Grid item columns={12} xs={12}>
            <TextField
              select
              fullWidth
              name='tags'
              variant='outlined'
              label={<Text>Tags</Text>}
              SelectProps={{
                value: params?.tags,
                onChange: handleTagChange,
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
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Published at</Text>}
              value={params?.published_atLike ?? null}
              onChange={curry(handleChangeFilter)("published_atLike")}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControlLabel
              control={<Switch checked={!!params?.on_index} onChange={handleOnIndexChange} />}
              label={<Text>On the main</Text>}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
