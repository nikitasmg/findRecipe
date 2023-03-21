import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { arrayMove } from "react-sortable-hoc";
import React, { useEffect, useState } from "react";
import { Report, useReportsQuery, useUpdateReportMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { getEventValueHandler } from "~/shared/lib/events";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { ReportsPageCreate } from "~/shared/routes";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { CellDragHandle } from "~shared/components/CellDragHandle";
import { Panel } from "~shared/components/Panel";
import { TableActions } from "~/shared/components/TableActions";
import { TableBodySortable, TableRowSortable } from "~/shared/components/SortableTable";
import { useReportsStore } from "~stores/reports";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";

export const ReportsTable: React.FC = () => {
  const [rows, setRows] = useState<Partial<Report>[]>([]);

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

  const { setCount, setLoading } = useReportsStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading } = useReportsQuery(client, variables, {
    refetchOnMount: "always"
  });

  const { mutateAsync: update } = useUpdateReportMutation(client);

  const reports = data?.reports;

  const total = reports?.length ?? 0;

  const columns = useColumns(activeOrder, handleChangeOrder);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setRows((rows) => {
      const newRows = arrayMove(rows, oldIndex, newIndex);

      const updatedRow = newRows[newIndex];

      update({
        input: { id: updatedRow.id, sort: newIndex + 1 }
      });

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
    setRows(reports ?? []);
  }, [reports]);

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
            addHref: ReportsPageCreate
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
              <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
                {rows?.map((row: Partial<Report>, i) => {
                  return (
                    <TableRowSortable index={i} key={row.id}>
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
