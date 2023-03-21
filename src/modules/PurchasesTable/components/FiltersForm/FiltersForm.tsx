import { FormControlLabel, Grid, Switch } from "@mui/material";
import { curry } from "rambda";
import React, { forwardRef } from "react";
import { Text } from "~/shared/components/Text";
import { DatePicker } from "~/shared/components/DatePicker";
import { getCheckedHandler } from "~/shared/lib/getCheckedHandler";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter }, ref) => {
    const getChangeHandler = curry(handleChangeFilter);

    const handleChecked = getCheckedHandler(handleChangeFilter);

    const handlePublishedChange = handleChecked("published");

    const handleCreatedAtChange = getChangeHandler("created_atLike");

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
