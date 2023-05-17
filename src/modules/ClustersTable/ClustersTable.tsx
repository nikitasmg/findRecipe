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
import { Cluster } from "~/generated/graphql";
import { getEventValueHandler } from "~/shared/lib/events";
import { ClustersPageEdit } from "~/shared/routes";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~shared/components/SortableTable";
import { TableActions } from "~shared/components/TableActions";
import { useClusters } from "./lib/useClusters";
import { useColumns } from "./lib/useColumns";
import { TableWrapper } from "~shared/components/TableWrapper";
import { EmptyView } from "~shared/components/EmptyView";

export const ClustersTable: React.FC = () => {
  const {
    title,
    activeOrder,
    setTitle,
    handleSearchTitle,
    handleChangeOrder,
    resetFilters,
    isLoading,
    rows,
    onSortEnd,
    resetTitle,
    clusters
  } = useClusters();

  const columns = useColumns(activeOrder, handleChangeOrder);

  const handleTitle = (value: string) => {
    setTitle(value);
    handleSearchTitle(value);
  };

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitle),
          resetTitle
        }}
        addButtonProps={{
          addHref: ClustersPageEdit
        }}
        resetFilters={resetFilters}
        searchTitle='Search'
        searchOnly
      />

      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <CellDragHandle style={{ visibility: "hidden" }} disabled />

              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={column.style}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBodySortable onSortEnd={onSortEnd} items={rows ?? []}>
              {rows?.map((row: DeepPartial<Cluster>, index) => {
                return (
                  <TableRowSortable key={row.id} id={row.id ?? index}>
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

        {!clusters?.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
    </TableWrapper>
  );
};
