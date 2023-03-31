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
import { DeepPartial } from "react-hook-form";
import React from "react";
import { VideoBroadcast } from "~/generated/graphql";
import { getEventValueHandler } from "~/shared/lib/events";
import { BroadcastsPageCreate } from "~/shared/routes";
import { Panel } from "~shared/components/Panel";
import { useColumns } from "./lib/useColumns";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~shared/components/SortableTable";
import { TableActions } from "~shared/components/TableActions";
import { useBroadcasts } from "./lib/useBroadcasts";

export const BroadcastsTable: React.FC = () => {
  const {
    title,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    resetFilters,
    isLoading,
    rows,
    onSortEnd,
    resetTitle
  } = useBroadcasts();

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
            addHref: BroadcastsPageCreate
          }}
          resetFilters={resetFilters}
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
              <TableBodySortable onSortEnd={onSortEnd} items={rows ?? []}>
                {rows?.map((row: DeepPartial<VideoBroadcast>, index) => {
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
