import React from "react";
import {
  Box,
  CircularProgress,
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
    subdivisions
  } = useEmployees();

  const columns = useColumns(activeOrder, handleChangeOrder);

  return (
    <Panel>
      <Box className='flex flex-col gap-6 p-4'>
        <TableActions
          searchProps={{
            searchValue: title,
            searchChange: getEventValueHandler(handleTitleChange)
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
      </Box>
    </Panel>
  );
};

export default EmployeesTable;
