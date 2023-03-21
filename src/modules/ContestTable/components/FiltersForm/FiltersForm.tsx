import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import { curry } from "rambda";
import React, { forwardRef } from "react";
import { ContestStatus } from "~/generated/graphql";
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
            <TextField
              fullWidth
              value={params?.number}
              label={<Text>Number</Text>}
              onChange={getChangeHandler("number")}
              variant='outlined'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel shrink id='status-select'>
                <Text component='span'>Status</Text>
              </InputLabel>
              <Select
                labelId='status-select'
                input={
                  <OutlinedInput
                    notched
                    label={<Text component='span'>Status</Text>}
                    name='category'
                    id='status-select'
                  />
                }
                value={(params?.status as string) ?? ""}
                onChange={getChangeHandler("status")}
              >
                <MenuItem key={"empty"} value={""}>
                  <Text>Not selected</Text>
                </MenuItem>
                {Object.entries(ContestStatus).map(([key, value]) => {
                  return (
                    <MenuItem key={key} value={value}>
                      <Text>{key}</Text>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Deadline</Text>}
              value={params?.deadlineLike ?? null}
              onChange={curry(handleChangeFilter)("deadlineLike")}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Start date</Text>}
              value={params?.dateLike ?? null}
              onChange={curry(handleChangeFilter)("dateLike")}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
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
