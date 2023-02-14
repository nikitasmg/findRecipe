import { useState } from "react";

type Pagination = {
  page: number;
  perPage: number;
};

const defaultPagination: Pagination = {
  page: 0,
  perPage: 30
};

export const useTablePagination = (initialPagination = defaultPagination) => {
  const [pagination, setPagination] = useState<Pagination>(initialPagination);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPagination((state) => ({ ...state, page: newPage }));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ perPage: +event.target.value, page: 0 });
  };

  const resetPagination = () => {
    setPagination(defaultPagination);
  };

  return {
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    resetPagination
  };
};
