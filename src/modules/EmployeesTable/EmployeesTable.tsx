import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Employee } from "~/generated/graphql";
import { useColumns } from "~/modules/EmployeesTable/lib/useColumns";
import { useEmployees } from "~/modules/EmployeesTable/lib/useEmployees";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { FiltersForm } from "./components/FiltersForm";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";
import { EmployeesPageCreate } from "~shared/routes";
import { getEventValueHandler } from "~shared/lib/events";

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
    subdivisions,
    resetTitle
  } = useEmployees();

  const columns = useColumns(activeOrder, handleChangeOrder);

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
            addHref: EmployeesPageCreate
          }}
          resetFilters={resetFilters}
          filterModalInnerForm={
            <FiltersForm
              params={params}
              handleChangeFilter={handleFilterChange}
              subdivisions={subdivisions}
            />
          }
        />

        <TableContainer component={Paper}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <CellDragHandle disabled />

                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={column.style}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {!isLoading && (
              <TableBodySortable items={rows ?? []} onSortEnd={onSortEnd}>
                {rows?.map((row: Employee, i) => {
                  return (
                    <TableRowSortable key={row.id} id={row.id ?? i}>
                      <CellDragHandle />

                      {columns.map((column) => {
                        const value = row[column.id];

                        return (
                          <TableCell
                            key={column.id}
                            align={column.align ?? "left"}
                            style={column.style}
                          >
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
      </Box>
    </Panel>
  );
};

export default EmployeesTable;
