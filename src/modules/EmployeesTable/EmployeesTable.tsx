import React, { Fragment } from "react";
import { Panel } from "~shared/components/Panel";
import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { LinkButton } from "~shared/components/LinkButton";
import { EmployeesPageCreate } from "~shared/routes";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import { Employee } from "~/generated/graphql";
import { useColumns } from "~/modules/EmployeesTable/lib/useColumns";
import { SearchInput } from "~shared/components/SearchInput";
import { Text } from "~shared/components/Text";
import { getEventValueHandler } from "~shared/lib/events";
import { Button } from "~shared/components/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { ModalFilters } from "~shared/components/ModalFilters";
import { FiltersForm } from "./components/FiltersForm";
import { useEmployees } from "~/modules/EmployeesTable/lib/useEmployees";
import { useModal } from "~shared/hooks/useModal";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";

const EmployeesTable = () => {
  const {
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    isLoading,
    rows,
    onSortEnd,
    subdivisions
  } = useEmployees();

  const { open, handleOpen, handleClose } = useModal();

  const columns = useColumns(activeOrder, handleChangeOrder);

  const handleOpenFilters = () => handleOpen();

  return (
    <Panel>
      <Box className='flex items-stretch justify-between gap-2 p-4 flex-col sm:flex-row'>
        <Box className='flex items-stretch justify-between gap-2'>
          <SearchInput
            label={<Text>Fast search</Text>}
            InputLabelProps={{
              shrink: !!title
            }}
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
            <FiltersForm
              params={params}
              handleChangeFilter={handleFilterChange}
              subdivisions={subdivisions}
            />
          </ModalFilters>
        </Box>

        <LinkButton variant='outlined' href={EmployeesPageCreate} startIcon={<AddBoxRoundedIcon />}>
          Add
        </LinkButton>
      </Box>

      <Fragment>
        <TableContainer>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <CellDragHandle />

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
              <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
                {rows?.map((row: Employee, index) => {
                  return (
                    <TableRowSortable key={row.id} index={index}>
                      <CellDragHandle />

                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell key={column.id} align={column.align ?? "left"}>
                            {column.render?.(value, row) ?? column.format?.(value) ?? value}
                          </TableCell>
                        );
                      })}
                    </TableRowSortable>
                  );
                })}
              </TableBodySortable>
            )}
          </Table>

          {isLoading && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
        </TableContainer>
      </Fragment>
    </Panel>
  );
};

export default EmployeesTable;
