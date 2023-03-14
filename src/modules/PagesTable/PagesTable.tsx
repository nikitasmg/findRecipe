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
import React, { Fragment, useEffect } from "react";
import { DeepPartial } from "react-hook-form";
import { Page, usePagesQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { usePagesStore } from "~/shared/stores/pages";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";

export const PagesTable: React.FC = () => {
  const {
    variables,
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { setCount, setLoading } = usePagesStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = usePagesQuery(client, variables, { refetchOnMount: true });

  const pages = data?.pages;

  const total = pages?.length ?? 0;

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
          resetFilters={resetFilters}
          filterModalInnerForm={
            <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
          }
        />

        <Fragment>
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
                  {pages?.map((row: DeepPartial<Page>) => {
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
        </Fragment>
      </Box>
    </Panel>
  );
};
