import { FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";
import { Text } from "~/shared/components/Text";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { ConfigTypeMap } from "dayjs";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter }, ref) => {
    const handleCreatedAtChange = (value: ChangeEvent<HTMLInputElement> | null) => {
      handleChangeFilter?.(
        "created_atLike",
        dayjs(value as ConfigTypeMap["default"]).format("YYYY-MM-DD")
      );
    };

    const handlePublishedChange = (event: ChangeEvent<HTMLInputElement>) => {
      handleChangeFilter?.("published", event.target.checked ? "1" : "0");
    };

    const switchValue = params?.published && Boolean(+params?.published);

    return (
      <form ref={ref}>
        <Grid container spacing={4}>
          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Created at</Text>}
              value={params?.created_atLike ?? null}
              onChange={handleCreatedAtChange}
              renderInput={(props) => <TextField {...props} size='small' />}
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
