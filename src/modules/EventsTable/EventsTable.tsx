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
import { DeepPartial } from "react-hook-form";
import React, { useEffect } from "react";
import { Event, useEventsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { EventsPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { TableActions } from "~/shared/components/TableActions";
import { useEventsStore } from "~/shared/stores/events";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { getBooleanPresentationForBackend } from "~/shared/lib/getBooleanPresentationForBackend";
import { FiltersForm } from "./components/FiltersForm";
import { useColumns } from "./lib/useColumns";
import { TableWrapper } from "~shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";

export const EventsTable: React.FC = () => {
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
      created_atLike: formatDayJsForFilters,
      published: getBooleanPresentationForBackend
    }
  });

  const client = useGraphqlClient();

  const { setCount, setLoading } = useEventsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useEventsQuery(client, variables, {
    refetchOnMount: "always"
  });

  const events = data?.events;

  const total = events?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

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
          addHref: EventsPageCreate
        }}
        resetFilters={resetFilters}
        filters={params}
        removeFilter={removeFilter}
        handleSubmit={handleSubmit}
        filterModalInnerForm={
          <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
        }
      />

      <TableContainer>
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
              {events?.data?.map((row: DeepPartial<Event>) => {
                return (
                  <TableRow hover role='row' tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={column.style}
                          className={column.className}
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

        {!events?.data.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>

      {!isLoading && (
        <TablePagination
          totalPages={events?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      )}
    </TableWrapper>
  );
};
