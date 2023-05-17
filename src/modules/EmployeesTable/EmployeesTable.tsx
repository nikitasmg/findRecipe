import React, { useMemo } from "react";
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
import { TableActions } from "~/shared/components/TableActions";
import { FiltersForm } from "./components/FiltersForm";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";
import { EmployeesPageCreate } from "~shared/routes";
import { getEventValueHandler } from "~shared/lib/events";
import { TableWrapper } from "~shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";
import { mapIdToValue } from "~shared/lib/mapIdToValue";

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
    resetTitle,
    removeFilter,
    handleSubmit,
    employees
  } = useEmployees();

  const columns = useColumns(activeOrder, handleChangeOrder);

  const additionalFilterChipsData = useMemo(
    () => ({ subdivision: mapIdToValue("id", "name", subdivisions) }),
    [subdivisions]
  );

  return (
    <TableWrapper>
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
        filters={params}
        removeFilter={removeFilter}
        additionalFilterChipsData={additionalFilterChipsData}
        handleSubmit={handleSubmit}
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

        {!employees?.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
    </TableWrapper>
  );
};

export default EmployeesTable;
