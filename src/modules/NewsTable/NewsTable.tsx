import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect } from "react";
import { DeepPartial } from "react-hook-form";
import { News, SortOrder, useNewsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { NewsPageCreate } from "~/shared/routes";
import { useNewsStore } from "~/shared/stores/news";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { EmptyView } from "~/shared/components/EmptyView";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { getEventValueHandler } from "~/shared/lib/events";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";

export const NewsTable: React.FC = () => {
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
    resetTitle
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

  const { data, isLoading } = useNewsQuery(
    client,
    {
      ...variables,
      orderBy: [...(variables.orderBy ?? []), { column: "published_at", order: SortOrder.Desc }]
    },
    { refetchOnMount: "always" }
  );

  const news = data?.news;

  const total = news?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <Panel>
      <Box className='flex flex-col gap-6 p-4'>
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
          filterModalInnerForm={
            <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
          }
        />

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
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
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={column.style}>
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
      </Box>
    </Panel>
  );
};
