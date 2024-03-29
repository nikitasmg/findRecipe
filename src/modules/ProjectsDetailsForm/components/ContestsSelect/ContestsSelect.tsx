import React, { Fragment } from "react";
import { Autocomplete, Box, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Text } from "~shared/components/Text";
import { Languages } from "~/shared/types/Languages";
import { useContestsSelect } from "./lib/useContestsSelect";

interface ContestsSelect {
  lang: Languages;
  onFormChange: (event: number) => void;
  initValue?: number;
}

export const ContestsSelect: React.FC<ContestsSelect> = ({ initValue = 0, onFormChange, lang }) => {
  const { value, handleChange, options, handleScroll, isLoading } = useContestsSelect(
    initValue,
    onFormChange
  );

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      options={options}
      getOptionLabel={(option) => option && option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          name='contest'
          id='contest'
          variant='outlined'
          size='small'
          label={<Text>Contest</Text>}
          InputLabelProps={{
            shrink: true
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <Fragment key={`${option.id}`}>
            <MenuItem {...props} id={`${option.id}`}>
              {lang === "ru" ? option.name : option.name_en}
            </MenuItem>
            {option.id === options[options.length - 1].id && isLoading && (
              <Box className='flex w-full justify-center items-center'>
                <CircularProgress />
              </Box>
            )}
          </Fragment>
        );
      }}
      ListboxProps={{
        onScroll: handleScroll,
        style: { overflowX: "hidden" }
      }}
    />
  );
};
