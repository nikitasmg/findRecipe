import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { DeepPartial } from "react-hook-form";
import React from "react";
import { Purchase } from "~/generated/graphql";
import { getEventValueHandler } from "~/shared/lib/events";
import { PurchasesPageCreate } from "~/shared/routes";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~shared/components/SortableTable";
import { usePurchases } from "~/modules/PurchasesTable/lib/usePurchases";
import { TableActions } from "~shared/components/TableActions";
import { TableWrapper } from "~/shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";

export const PurchasesTable: React.FC = () => {
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
    resetTitle,
    removeFilter,
    handleSubmit,
    purchases
  } = usePurchases();

  const columns = useColumns(activeOrder, handleChangeOrder);

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          addHref: PurchasesPageCreate
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
              {rows?.map((row: DeepPartial<Purchase>, i) => {
                return (
                  <TableRowSortable key={row.id} id={row.id ?? i}>
                    <CellDragHandle />

                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id} align={column.align}>
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

        {!purchases?.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
    </TableWrapper>
  );
};
