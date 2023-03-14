import { FormControlLabel, Grid, Switch } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";
import dayjs, { ConfigTypeMap } from "dayjs";
import { Text } from "~/shared/components/Text";
import { DatePicker } from "~/shared/components/DatePicker";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter }, ref) => {
    const handleCreatedAtChange = (value: unknown) => {
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
