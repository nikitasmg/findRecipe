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
          <Grid item columns={12} xs={12} lg={4}>
            <TextField
              fullWidth
              value={params?.descriptionLike ?? ""}
              label={<Text>Description</Text>}
              onChange={getChangeHandler("descriptionLike")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12} lg={4}>
            <DatePicker
              className='w-full'
              label={<Text>Created at</Text>}
              value={params?.created_atLike ?? null}
              onChange={curry(handleChangeFilter)("created_atLike")}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
