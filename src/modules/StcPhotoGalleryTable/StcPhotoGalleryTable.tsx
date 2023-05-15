import React from "react";
import { useColumns } from "./lib/useColumns";
import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { TableActions } from "~/shared/components/TableActions";
import { getEventValueHandler } from "~/shared/lib/events";
import { StcPhotoGalleryPageCreate } from "~/shared/routes";
import { CellDragHandle } from "~/shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";
import { StcPhotoGallery } from "~/generated/graphql";
import { DeepPartial } from "react-hook-form";
import { useStcPhotoGallery } from "./lib/useStcPhotoGallery";
import { TableWrapper } from "~shared/components/TableWrapper";

export const StcPhotoGalleryTable = () => {
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
  } = useStcPhotoGallery();

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
          addHref: StcPhotoGalleryPageCreate
        }}
        resetFilters={resetFilters}
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
              {rows?.map((row: DeepPartial<StcPhotoGallery>, index) => {
                return (
                  <TableRowSortable key={row.id} id={row.id ?? index}>
                    <CellDragHandle />

                    {columns.map((column) => {
                      const value = row[column.id as keyof StcPhotoGallery];

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={column.className}
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
    </TableWrapper>
  );
};
