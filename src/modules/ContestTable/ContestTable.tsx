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
import React, { useEffect } from "react";
import { Contest, ContestStatus, useContestsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { ContestPageCreate } from "~/shared/routes";
import { useContestStore } from "~/shared/stores/contest";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { TableActions } from "~/shared/components/TableActions";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { getEventValueHandler } from "~/shared/lib/events";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { TableWrapper } from "~shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";
import { useTranslation } from "react-i18next";

export const ContestTable: React.FC = () => {
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
      dateLike: formatDayJsForFilters,
      deadlineLike: formatDayJsForFilters
    }
  });

  const { t } = useTranslation();

  const client = useGraphqlClient();

  const { setCount, setLoading } = useContestStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useContestsQuery(client, variables, {
    refetchOnMount: "always",
    cacheTime: 0
  });

  const contests = data?.contests;

  const total = contests?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  const additionalFilterChipsData = {
    status: {
      [ContestStatus.Completed]: t("Completed"),
      [ContestStatus.Acceptance]: t("Acceptance"),
      [ContestStatus.Expertise]: t("Expertise")
    }
  };

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          addHref: ContestPageCreate
        }}
        resetFilters={resetFilters}
        filters={params}
        removeFilter={removeFilter}
        additionalFilterChipsData={additionalFilterChipsData}
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
              {contests?.data?.map((row: Partial<Contest>) => {
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

        {!contests?.data.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>

      {!isLoading && (
        <TablePagination
          totalPages={contests?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      )}
    </TableWrapper>
  );
};
