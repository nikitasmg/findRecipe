import {
  FormControlLabel,
  Grid,
  MenuItem,
  SelectChangeEvent,
  Switch,
  TextField
} from "@mui/material";
import { curry } from "rambda";
import React, { forwardRef } from "react";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { useNewsTagsQuery } from "~/generated/graphql";
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

    const { data: tags } = useNewsTagsQuery(client, {}, { refetchOnMount: "always" });

    const handleTagChange = (e: SelectChangeEvent<unknown>) =>
      handleChangeFilter("tags", e.target.value);

    return (
      <form ref={ref}>
        <Grid container spacing={4}>
          <Grid item columns={12} lg={4} xs={12}>
            <TextField
              fullWidth
              value={params?.id ?? ""}
              label={<Text>Enter id</Text>}
              onChange={getChangeHandler("id")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} lg={4} xs={12}>
            <TextField
              select
              fullWidth
              name='tags'
              variant='outlined'
              label={<Text>Tags</Text>}
              SelectProps={{
                value: params?.tags ?? "",
                onChange: handleTagChange,
                MenuProps: {
                  className: "h-[300px]"
                }
              }}
            >
              <MenuItem key='empty' value=''>
                <Text>Not selected</Text>
              </MenuItem>
              {tags?.newsTags.map((tag) => (
                <MenuItem key={tag.id} value={tag.id}>
                  #{tag.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item columns={12} lg={4} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Published at</Text>}
              value={params?.published_atLike ?? null}
              onChange={curry(handleChangeFilter)("published_atLike")}
            />
          </Grid>

          <Grid className='md:absolute md:bottom-[28px]' item columns={12} xs={12}>
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
