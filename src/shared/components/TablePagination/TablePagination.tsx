import { Box, Pagination } from "@mui/material";
import React from "react";

type Props = {
  totalPages: number;
  page: number;
  onChangePagination: (_event: unknown, newPage: number) => void;
};

export const TablePagination: React.FC<Props> = ({ totalPages, page, onChangePagination }) => {
  return (
    <Box className='flex justify-end items-center w-full py-4 px-6 flex-col sm:flex-row gap-4'>
      <Pagination count={totalPages} color='primary' onChange={onChangePagination} page={page} />
    </Box>
  );
};
