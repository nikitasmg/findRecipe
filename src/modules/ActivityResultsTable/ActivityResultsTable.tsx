import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useActivityResultsQuery, ActivityResult, SortOrder } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { resortArray } from "~/shared/lib/resortArray";
import { ActivityResultPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { TableActions } from "~/shared/components/TableActions";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";
import { useActivityResultsStore } from "~stores/activityResult";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { TableWrapper } from "~shared/components/TableWrapper";

export const ActivityResultsTable: React.FC = () => {
  const [rows, setRows] = useState<Partial<ActivityResult>[]>([]);

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
  } = useRequestState("name", { filterFormats: { created_atLike: formatDayJsForFilters } });

  const client = useGraphqlClient();

  const { setCount, setLoading } = useActivityResultsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useActivityResultsQuery(
    client,
    {
      ...variables,
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }]
    },
    {
      refetchOnMount: "always"
    }
  );

  const { mutateAsync: resort } = useResort("upsertActivityResult");

  const activityResults = data?.activityResults;

  const total = activityResults?.length ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setRows((rows) => {
      const newRows = resortArray(oldIndex, newIndex, rows) as ActivityResult[];

      resort(newRows.slice(0, Math.max(newIndex, oldIndex) + 1));

      return newRows;
    });
  };

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(total);
  }, [total, setCount]);

  useEffect(() => {
    setRows(activityResults ?? []);
  }, [activityResults]);

  return (
    <TableWrapper>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          addHref: ActivityResultPageCreate
        }}
        resetFilters={resetFilters}
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
            <TableBodySortable items={(rows as ActivityResult[]) ?? []} onSortEnd={onSortEnd}>
              {rows?.map((row: Partial<ActivityResult>, i) => {
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

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
    </TableWrapper>
  );
};
