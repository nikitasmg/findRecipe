import { useCallback, useState } from "react";
import { debounce } from "~shared/lib/debounce";
import { createOrder } from "~shared/lib/createOrder";
import { formatFilters } from "~shared/lib/formatFilters";
import { ActiveOrder } from "~shared/types/ActiveOrder";
import { useTablePagination } from "./useTablePagination";
import { useSearchParams } from "react-router-dom";

const prepareFilters = <T>(filters: Params | null, filterFormats?: FiltersFormat<T>) => {
  const newFilters = { ...filters };

  Object.entries(filterFormats ?? {}).forEach(([key, format]) => {
    newFilters[key] = format(newFilters[key] as T);
  });

  return formatFilters(newFilters);
};

type Params = Record<string, string>;
type FiltersFormat<T> = Record<string, (value: T) => string>;

export const useRequestState = <T>(
  fastSearchFieldId: string,
  { filterFormats }: { filterFormats?: FiltersFormat<T> } = {}
) => {
  const [search] = useSearchParams();
  const { filter: initialFilter, sort: initialSort } = [...search.entries()].reduce(
    (res, cur) => {
      const [key, value]: [string, unknown] = cur;
      const sortName = key.match(/sort\[(.+?)]/)?.[1];
      const isPage = key === "page";

      if (sortName) {
        res.sort[sortName] = value;
        return res;
      }

      if (isPage) {
        res.page = Number(value);
        return res;
      }

      res.filter[key] = value;

      return res;
    },
    {
      sort: Object.create(null),
      filter: Object.create(null),
      page: 1
    }
  );

  const [activeOrder, setActiveOrder] = useState<ActiveOrder>(initialSort);
  const [filters, setFilters] = useState<Params | null>(initialFilter);
  const [params, setParams] = useState<Params | null>(null);
  const [title, setTitle] = useState<string>("");

  const { pagination, handleChangePage, handleChangeRowsPerPage, resetPagination } =
    useTablePagination();

  const variables = {
    page: pagination.page || 1,
    first: pagination.perPage,
    ...(activeOrder
      ? {
          orderBy: createOrder(activeOrder)
        }
      : {}),
    ...(filters
      ? {
          filter: prepareFilters(filters, filterFormats)
        }
      : {})
  };

  const handleChangeOrder = (order: ActiveOrder) => {
    setActiveOrder((oldOrder) => {
      if (order) {
        const [key, value] = Object.entries(order)[0];

        search.set(`sort[${key}]`, value);
      } else if (oldOrder) {
        const key = Object.keys(oldOrder)[0];
        search.delete(`sort[${key}]`);
      }

      return order;
    });
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

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilter = useCallback(
    debounce<[Params]>((newParams: Params) => {
      setFilters({
        [fastSearchFieldId]: title,
        ...newParams
      } as Params);
      resetPagination();
    }, 300),
    [resetPagination, fastSearchFieldId, title]
  );

  const handleFilterChange = useCallback(
    (cellId: string, value: unknown) => {
      const newParams = { ...params, [cellId]: value } as Params;
      setParams(newParams);

      if (cellId === fastSearchFieldId) {
        setTitle(value as string);
      }
    },
    [params, fastSearchFieldId]
  );

  const removeFilter = useCallback(
    (key: string) => {
      setParams((currentParams) => {
        const newParams = { ...currentParams };

        delete newParams[key];

        setFilters({ ...newParams, [fastSearchFieldId]: title });

        return newParams;
      });
    },
    [fastSearchFieldId, title]
  );

  const resetTitle = useCallback(() => {
    handleSearchTitle("");
    setTitle("");
  }, [handleSearchTitle]);

  const resetFilters = useCallback(() => {
    setParams(null);
    setFilters(null);
    resetTitle();
  }, [resetTitle]);

  const handleSubmit = () => {
    handleSearchTitle(title);
    handleFilter(params as Params);
  };

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
    handleSearchTitle,
    handleFilterChange,
    handleSubmit,
    removeFilter,
    resetFilters,
    resetTitle
  };
};
