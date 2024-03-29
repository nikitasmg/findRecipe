import { useCallback, useState } from "react";

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

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPagination((state) => ({ ...state, page: newPage }));
  }, []);

  const handleChangeRowsPerPage = useCallback((perPage: number | string) => {
    setPagination({ perPage: +perPage, page: 0 });
  }, []);

  const resetPagination = useCallback(() => {
    setPagination(defaultPagination);
  }, []);

  return {
    pagination,
    handleChangePage,
    handleChangeRowsPerPage,
    resetPagination
  };
};
