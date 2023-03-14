import { Grid, TextField } from "@mui/material";
import { curry } from "rambda";
import React, { forwardRef } from "react";
import { Text } from "~/shared/components/Text";
import { DatePicker } from "~/shared/components/DatePicker";
import { getEventValueHandler } from "~/shared/lib/events";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter }, ref) => {
    const getChangeHandler = (cellId: string) =>
      getEventValueHandler((value: unknown) => handleChangeFilter(cellId, value));

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
            <DatePicker
              className='w-full'
              label={<Text>Name</Text>}
              value={params?.published_at ?? null}
              onChange={curry(handleChangeFilter)("name")}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
