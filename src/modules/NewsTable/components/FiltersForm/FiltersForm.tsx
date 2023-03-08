import {
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField
} from "@mui/material";
import { curry } from "rambda";
import { DatePicker } from "@mui/x-date-pickers";
import React, { forwardRef } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNewsCategoriesQuery } from "~/generated/graphql";
import { Text } from "~/shared/components/Text";
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

    const { data: categories } = useNewsCategoriesQuery(client);

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
                    id='category-select'
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
            <DatePicker
              className='w-full'
              label={<Text>Published at</Text>}
              value={params?.published_at ?? null}
              onChange={curry(handleChangeFilter)("published_at")}
              renderInput={(props) => <TextField {...props} variant='outlined' />}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControlLabel
              control={<Switch checked={!!params?.on_index} onChange={handleOnIndexChange} />}
              label={<Text>Visible</Text>}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
