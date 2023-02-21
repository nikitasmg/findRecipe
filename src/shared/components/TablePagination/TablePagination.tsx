import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import React from "react";
import { getEventValueHandler } from "~/shared/lib/events";
import { Text } from "../Text";

type Props = {
  totalPages: number;
  page: number;
  perPage: number;
  onChangePagination: (_event: unknown, newPage: number) => void;
  onChangePerPage: (perPage: number | string) => void;
};

export const TablePagination: React.FC<Props> = ({
  totalPages,
  page,
  perPage,
  onChangePagination,
  onChangePerPage
}) => {
  return (
    <Box className='flex justify-between items-center w-full py-4 px-6 flex-col sm:flex-row gap-4'>
      <Pagination count={totalPages} color='primary' onChange={onChangePagination} page={page} />
      <FormControl className='w-[200px]' variant='standard'>
        <InputLabel id='rows-per-page-label'>
          <Text>Rows per page:</Text>
        </InputLabel>
        <Select
          labelId='rows-per-page-label'
          id='rows-per-page'
          size='small'
          value={`${perPage}`}
          label={<Text>Rows per page:</Text>}
          onChange={getEventValueHandler(onChangePerPage)}
        >
          {[10, 30, 100].map((count) => (
            <MenuItem key={count} value={count}>
              {count}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
