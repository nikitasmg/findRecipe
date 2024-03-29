import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { prop } from "rambda";
import React, { useEffect, useMemo, useState } from "react";
import { DeepPartial } from "react-hook-form";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  News,
  SortOrder,
  useAllNewsQuery,
  useNewsQuery,
  useNewsTagsQuery
} from "~/generated/graphql";
import { useHideNews } from "~/api/news";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { NewsPageCreate } from "~/shared/routes";
import { useNewsStore } from "~/shared/stores/news";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { TableActions } from "~/shared/components/TableActions";
import { EmptyView } from "~/shared/components/EmptyView";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { getEventValueHandler } from "~/shared/lib/events";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { Button } from "~/shared/components/Button";
import { CustomCheckbox } from "~shared/components/CustomCheckbox";
import { TableWrapper } from "~shared/components/TableWrapper";
import { mapIdToValue } from "~shared/lib/mapIdToValue";
import { NewsCategories } from "./components/NewsCategories";

export const NewsTable: React.FC = () => {
  const [selected, setSelected] = useState<Set<number>>(new Set([]));

  const {
    variables,
    title,
    params,
    activeOrder,
    pagination,
    handleTitleChange,
    handleChangePage,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle,
    removeFilter,
    handleSubmit
  } = useRequestState("name", {
    filterFormats: {
      published_atLike: formatDayJsForFilters
    }
  });

  const client = useGraphqlClient();

  const { setCount, setLoading } = useNewsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading, refetch } = useNewsQuery(
    client,
    {
      ...variables,
      orderBy: [...(variables.orderBy ?? []), { column: "published_at", order: SortOrder.Desc }]
    },
    { refetchOnMount: "always", cacheTime: 0 }
  );

  const { refetch: fetchAll, isFetching } = useAllNewsQuery(client, variables, {
    enabled: false
  });

  const { mutateAsync: hideNews } = useHideNews();

  const news = data?.news;

  const total = news?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  const indeterminate = selected.size > 0 && selected.size < total;

  const allChecked = total > 0 && selected.size === total;

  const { data: tags } = useNewsTagsQuery(client, {}, { refetchOnMount: "always" });

  const additionalFilterChipsData = useMemo(
    () => ({ tags: mapIdToValue("id", "name", tags?.newsTags, "#") }),
    [tags]
  );

  const onSelectAllClick = () => {
    if (allChecked) {
      setSelected(new Set([]));
      return;
    }

    fetchAll()
      .then(({ data }) => data?.allNewsIds?.data)
      .then((ids) => {
        const allIds = (ids ?? [])?.map<number>(prop("id"));

        setSelected(new Set(allIds));
      });
  };

  const onHideClick = () => {
    hideNews([...selected]).then(() => refetch());
    setSelected(new Set([]));
  };

  const getCheckedHandler =
    (id: number) => (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) =>
      setSelected((cur) => {
        const newSelected = new Set(cur);

        if (checked) {
          newSelected.add(id);
        } else {
          newSelected.delete(id);
        }

        return newSelected;
      });

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          addHref: NewsPageCreate
        }}
        resetFilters={resetFilters}
        filters={params}
        removeFilter={removeFilter}
        additionalFilterChipsData={additionalFilterChipsData}
        excludedChipsKeys={["category"]}
        handleSubmit={handleSubmit}
        filterModalInnerForm={
          <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
        }
        contentButtons={
          <Button
            variant='outlined'
            color='error'
            onClick={onHideClick}
            startIcon={<VisibilityOffIcon />}
            disabled={!selected.size}
          >
            Hide
          </Button>
        }
      />

      <NewsCategories handleSubmit={handleSubmit} handleChangeFilter={handleFilterChange} />

      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell padding='checkbox'>
                {!isFetching && (
                  <CustomCheckbox
                    color='primary'
                    indeterminate={indeterminate}
                    checked={allChecked}
                    onChange={onSelectAllClick}
                    inputProps={{
                      "aria-label": "select all news"
                    }}
                  />
                )}
                {isFetching && (
                  <Box className='flex justify-center'>
                    <CircularProgress size={20} />
                  </Box>
                )}
              </TableCell>

              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={column.style}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBody>
              {news?.data?.map((row: DeepPartial<News>) => {
                return (
                  <TableRow hover role='row' tabIndex={-1} key={row.id}>
                    <TableCell padding='checkbox'>
                      <CustomCheckbox
                        onChange={getCheckedHandler(row.id as number)}
                        color='primary'
                        checked={selected.has(row.id as number)}
                        inputProps={{
                          "aria-labelledby": String(row.id)
                        }}
                      />
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          className={column.className}
                          align={column.align}
                          style={column.style}
                        >
                          {column.render?.(value, row) ?? column.format?.(value) ?? value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>

        {!news?.data.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>

      {!isLoading && (
        <TablePagination
          totalPages={news?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      )}
    </TableWrapper>
  );
};
