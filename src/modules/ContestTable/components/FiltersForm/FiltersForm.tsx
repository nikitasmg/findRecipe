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
import { DatePicker } from "@mui/x-date-pickers";
import React, { forwardRef } from "react";
import { ContestStatus } from "~/generated/graphql";
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
              value={params?.deadline ?? null}
              onChange={curry(handleChangeFilter)("deadline")}
              renderInput={(props) => <TextField {...props} variant='outlined' />}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Start date</Text>}
              value={params?.date ?? null}
              onChange={curry(handleChangeFilter)("date")}
              renderInput={(props) => <TextField {...props} variant='outlined' />}
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <DatePicker
              className='w-full'
              label={<Text>Created at</Text>}
              value={params?.created_at ?? null}
              onChange={curry(handleChangeFilter)("created_at")}
              renderInput={(props) => <TextField {...props} variant='outlined' />}
            />
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
