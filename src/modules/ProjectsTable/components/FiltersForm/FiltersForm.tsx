import { Grid, TextField } from "@mui/material";
import React, { forwardRef } from "react";
import { Text } from "~/shared/components/Text";
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
            <TextField
              fullWidth
              value={params?.numberLike}
              label={<Text>Project number</Text>}
              onChange={getChangeHandler("numberLike")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.leaderLike}
              label={<Text>Leader</Text>}
              onChange={getChangeHandler("leaderLike")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.organizationLike}
              label={<Text>Organization</Text>}
              onChange={getChangeHandler("organizationLike")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.regionLike}
              label={<Text>Region</Text>}
              onChange={getChangeHandler("regionLike")}
              variant='outlined'
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
