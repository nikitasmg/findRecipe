import { FormControl, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, forwardRef } from "react";
import { Text } from "~/shared/components/Text";
import { getEventValueHandler } from "~/shared/lib/events";
import { Subdivision } from "~/generated/graphql";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  params: Record<string, string> | null;
  handleChangeFilter: (name: string, value: unknown) => void;
  subdivisions?: Subdivision[];
};

export const FiltersForm: React.FC<Props> = forwardRef<HTMLFormElement, Props>(
  ({ params, handleChangeFilter, subdivisions }, ref) => {
    const getChangeHandler = (cellId: string) =>
      getEventValueHandler((value: unknown) => handleChangeFilter(cellId, value));

    const handleSubdivisionChange = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      handleChangeFilter?.("subdivision", event.target.value);
    };

    return (
      <form ref={ref}>
        <Grid container spacing={4}>
          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.position}
              label={<Text>Position</Text>}
              InputLabelProps={{
                shrink: !!params?.position
              }}
              onChange={getChangeHandler("position")}
              variant='outlined'
              size='small'
            />
          </Grid>

          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.additional}
              label={<Text>Additional number</Text>}
              InputLabelProps={{
                shrink: !!params?.additional
              }}
              onChange={getChangeHandler("additional")}
              variant='outlined'
              size='small'
              type='number'
            />
          </Grid>
          <Grid item columns={12} xs={12}>
            <TextField
              fullWidth
              value={params?.email}
              label={<Text>Email</Text>}
              InputLabelProps={{
                shrink: !!params?.email
              }}
              onChange={getChangeHandler("email")}
              variant='outlined'
              size='small'
            />
          </Grid>
          <Grid item columns={12} xs={12}>
            <FormControl fullWidth>
              <TextField
                id='subdivision-select'
                value={params?.subdivision ?? ""}
                label={<Text>Subdivision</Text>}
                InputLabelProps={{
                  shrink: !!params?.subdivision
                }}
                onChange={handleSubdivisionChange}
                variant='outlined'
                size='small'
                select
                fullWidth
              >
                <MenuItem key={"empty"} value={""}>
                  <Text>Not selected</Text>
                </MenuItem>
                {subdivisions?.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    );
  }
);

FiltersForm.displayName = "FiltersForm";
