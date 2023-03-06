import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";
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

    const handlePublishedChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleChangeFilter?.("published", event.target.checked ? "1" : "0");
    };

    const switchValue = params?.published && Boolean(+params?.published);

    return (
      <form ref={ref}>
        <Grid container spacing={4}>
          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.description}
              label={<Text>Description</Text>}
              InputLabelProps={{
                shrink: !!params?.description
              }}
              size='small'
              onChange={getChangeHandler("description")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControlLabel
              control={<Switch checked={!!switchValue} onChange={handlePublishedChange} />}
              label={<Text>Published</Text>}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
