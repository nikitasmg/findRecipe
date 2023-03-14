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
import { Contest, useContestsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { ContestPageCreate } from "~/shared/routes";
import { useContestStore } from "~/shared/stores/contest";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { TablePagination } from "~/shared/components/TablePagination";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";

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
    resetTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { setCount, setLoading } = useContestStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useContestsQuery(client, variables, { refetchOnMount: true });

  const contests = data?.contests;

  const total = contests?.paginatorInfo.total ?? 0;

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
            resetTitle: resetTitle
          }}
          addButtonProps={{
            addHref: ContestPageCreate
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
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
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
                          <TableCell key={column.id} align={column.align}>
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
      </Box>
    </Panel>
  );
};
