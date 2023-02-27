import { useCallback, useEffect, useState } from "react";
import { debounce } from "~shared/lib/debounce";
import { createOrder } from "~shared/lib/createOrder";
import { formatFilters } from "~shared/lib/formatFilters";
import { ActiveOrder } from "~shared/types/ActiveOrder";
import { useTablePagination } from "./useTablePagination";
import { useSearchParams } from "react-router-dom";

type Params = Record<string, string>;

export const useRequestState = (fastSearchFieldId: string) => {
  const [search, setSearch] = useSearchParams();
  const { filter: initialFilter, sort: initialSort } = [...search.entries()].reduce(
    (res, cur) => {
      const [key, value]: [string, unknown] = cur;
      const sortName = key.match(/sort\[(.+?)]/)?.[1];

      if (sortName) {
        res.sort[sortName] = value;
        return res;
      }

      res.filter[key] = value;

      return res;
    },
    {
      sort: Object.create(null),
      filter: Object.create(null)
    }
  );

  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(initialSort);
  const [filters, setFilters] = useState<Params | null>(initialFilter);
  const [params, setParams] = useState<Params | null>(null);
  const [title, setTitle] = useState<string>("");

  const { pagination, handleChangePage, handleChangeRowsPerPage, resetPagination } =
    useTablePagination();

  const variables = {
    page: pagination.page,
    first: pagination.perPage,
    ...(activeOrder
      ? {
          orderBy: createOrder(activeOrder)
        }
      : {}),
    ...(filters
      ? {
          filter: formatFilters(filters)
        }
      : {})
  };

  const handleChangeOrder = (order: ActiveOrder) => {
    setActiveOrder(order);
    resetPagination();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearchTitle = useCallback(
    debounce<[string]>((newTitle: string) => {
      setFilters((filter) => ({ ...filter, [fastSearchFieldId]: newTitle }));
      resetPagination();
    }, 300),
    [resetPagination, fastSearchFieldId]
  );

  const handleTitleChange = useCallback(
    (newTitle: string) => {
      handleSearchTitle(newTitle);
      setTitle(newTitle);
    },
    [handleSearchTitle]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce<[Params]>((newParams: Params) => {
      setFilters({
        [fastSearchFieldId]: filters?.[fastSearchFieldId],
        ...newParams
      } as Params);
      resetPagination();
    }, 300),
    [resetPagination, fastSearchFieldId]
  );

  const handleFilterChange = useCallback(
    (cellId: string, value: unknown) => {
      const newParams = { ...params, [cellId]: value } as Params;
      handleFilter(newParams);
      setParams(newParams);

      if (cellId === fastSearchFieldId) {
        setTitle(value as string);
      }
    },
    [handleFilter, params, fastSearchFieldId]
  );

  useEffect(() => {
    const [sortKey, sortValue] = Object.entries(activeOrder ?? {})[0] ?? [];

    setSearch({ ...(Boolean(activeOrder) && { [`sort[${sortKey}]`]: sortValue }), ...params });
  }, [params, activeOrder, setSearch]);

  return {
    variables,
    activeOrder,
    filters,
    title,
    pagination,
    params,

    setActiveOrder,
    setFilters,
    setTitle,
    handleChangePage,
    handleChangeRowsPerPage,
    resetPagination,
    handleChangeOrder,
    handleTitleChange,
    handleFilterChange
  };
};
