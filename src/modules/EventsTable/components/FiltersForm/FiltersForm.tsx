import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { curry } from "rambda";
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

    const handlePublishedChange = handleChecked("published");

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
            <TextField
              fullWidth
              value={params?.description}
              label={<Text>Description</Text>}
              onChange={getChangeHandler("description")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Created at</Text>}
              value={params?.created_at ?? null}
              onChange={curry(handleChangeFilter)("created_at")}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControlLabel
              control={<Switch checked={!!params?.published} onChange={handlePublishedChange} />}
              label={<Text>Published</Text>}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
