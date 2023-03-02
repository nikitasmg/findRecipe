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
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { DeepPartial } from "react-hook-form";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, { Fragment, useEffect } from "react";
import { Event, useEventsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { EventsPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { LinkButton } from "~/shared/components/LinkButton";
import { Text } from "~/shared/components/Text";
import { TablePagination } from "~/shared/components/TablePagination";
import { SearchInput } from "~/shared/components/SearchInput";
import { Panel } from "~shared/components/Panel";
import { Button } from "~/shared/components/Button";
import { useColumns } from "./lib/useColumns";
import { ModalFilters } from "~/shared/components/ModalFilters";
import { useModal } from "~/shared/hooks/useModal";
import { FiltersForm } from "./components/FiltersForm";
import { useEventsStore } from "~/shared/stores/events";

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
    resetFilters
  } = useRequestState("name");

  const { open, handleOpen, handleClose } = useModal();

  const client = useGraphqlClient();

  const { setCount, setLoading } = useEventsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useEventsQuery(client, variables, { refetchOnMount: true });

  const events = data?.events;

  const total = events?.paginatorInfo.total ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  const handleOpenFilters = () => handleOpen();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  return (
    <Panel>
      <Box className='flex items-stretch justify-between gap-2 p-4 flex-col sm:flex-row'>
        <Box className='flex items-stretch justify-between gap-2'>
          <SearchInput
            label={<Text>Fast search</Text>}
            className='w-full sm:w-auto'
            value={title}
            onChange={getEventValueHandler(handleTitleChange)}
            size='small'
          />
          <Button onClick={handleOpenFilters} variant='outlined'>
            <FilterAltIcon />
          </Button>

          <ModalFilters
            opened={!!open}
            handleClose={handleClose}
            handleSuccess={handleClose}
            handleDrop={resetFilters}
          >
            <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
          </ModalFilters>
        </Box>

        <LinkButton variant='outlined' href={EventsPageCreate} startIcon={<AddBoxRoundedIcon />}>
          Add
        </LinkButton>
      </Box>

      <Fragment>
        <TableContainer>
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
                {events?.data?.map((row: DeepPartial<Event>) => {
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

        <TablePagination
          totalPages={events?.paginatorInfo.lastPage ?? 1}
          page={pagination.page || 1}
          onChangePagination={handleChangePage}
        />
      </Fragment>
    </Panel>
  );
};