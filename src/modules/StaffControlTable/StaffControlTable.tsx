import {
  Box,
  CircularProgress,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { MouseEventHandler, useCallback, useEffect, useState } from "react";
import { compose, equals, not } from "rambda";
import { SortOrder, StaffControl, useStaffControlsQuery } from "~/generated/graphql";
import { useResort } from "~/api/resort";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableActions } from "~/shared/components/TableActions";
import { CellDragHandle } from "~/shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable as Row } from "~/shared/components/SortableTable";
import { getEventValueHandler } from "~/shared/lib/events";
import { resortArray } from "~/shared/lib/resortArray";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { useModal } from "~/shared/hooks/useModal";
import { formatDayJsForFilters } from "~/shared/lib/formatDate";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { DetailsForm } from "./components/DetailsForm";
import { useStaffControlStore } from "~stores/staffControl";
import { EmptyView } from "~shared/components/EmptyView";

type Props = {
  pageId?: number;
};

export const StaffControlTable: React.FC<Props> = ({ pageId }) => {
  const [rows, setRows] = useState<Partial<StaffControl>[]>([]);

  const [activeRow, setActiveRow] = useState<Partial<StaffControl> | null>();

  const { open, handleClose, handleOpen } = useModal();

  const {
    variables,
    title,
    params,
    activeOrder,
    handleTitleChange,
    handleChangeOrder,
    handleFilterChange,
    resetFilters,
    resetTitle,
    setFilters,
    removeFilter,
    handleSubmit
  } = useRequestState("name", {
    filterFormats: {
      created_atLike: formatDayJsForFilters
    }
  });

  const client = useGraphqlClient();

  const { setCount, setLoading } = useStaffControlStore((state) => ({
    setLoading: state.setLoading,
    setCount: state.setCount
  }));

  const { data, isLoading, refetch } = useStaffControlsQuery(
    client,
    {
      ...variables,
      orderBy: [...(variables.orderBy ?? []), { column: "sort", order: SortOrder.Asc }]
    },
    {
      refetchOnMount: "always",
      enabled: Number.isInteger(pageId)
    }
  );

  const { mutateAsync: resort } = useResort("upsertStaffControl");

  const staffControls = data?.staffControls;

  const handleCloseForm = () => {
    handleClose();
    setActiveRow(null);
    refetch();
  };

  const handelSelect = (row: StaffControl | null) => {
    setActiveRow(row);
    handleOpen();
  };

  const columns = useColumns(handelSelect, activeOrder, handleChangeOrder);

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setRows((rows) => {
      const newRows = resortArray(oldIndex, newIndex, rows) as StaffControl[];

      resort(newRows.slice(0, Math.max(newIndex, oldIndex) + 1));

      return newRows;
    });
  };

  const handleAddClick: MouseEventHandler = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleDelete = (item?: Partial<StaffControl> | null) => {
    if (!item) {
      return;
    }

    setRows((rows) => rows.filter(compose(not, equals(item))));
  };

  const handleReset = useCallback(() => {
    resetFilters();
    setFilters({ page_id: `${pageId}` });
  }, [pageId, resetFilters, setFilters]);

  useEffect(() => {
    if (!params?.page_id) {
      handleFilterChange("page_id", pageId);
    }
  }, [params, pageId, handleFilterChange]);

  useEffect(() => {
    setRows(staffControls ?? []);
  }, [staffControls]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    setCount(staffControls?.length ?? 0);
  }, [staffControls, setCount]);

  return (
    <Box className='flex flex-col'>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          onAddClick: handleAddClick
        }}
        resetFilters={handleReset}
        filters={params}
        excludedChipsKeys={["page_id"]}
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
              <CellDragHandle style={{ visibility: "hidden" }} disabled />

              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={column.style}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBodySortable items={(rows as StaffControl[]) ?? []} onSortEnd={onSortEnd}>
              {rows?.map((row: Partial<StaffControl>, i) => {
                return (
                  <Row key={row.id} id={row.id ?? i}>
                    <CellDragHandle />

                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={column.style}
                          className={column.className}
                        >
                          {column.render?.(value, row) ?? column.format?.(value) ?? value}
                        </TableCell>
                      );
                    })}
                  </Row>
                );
              })}
            </TableBodySortable>
          )}
        </Table>

        {!staffControls?.length && !isLoading && <EmptyView />}

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </TableContainer>

      <DetailsForm
        activeStaff={activeRow}
        open={!!open}
        handleCloseForm={handleCloseForm}
        pageId={pageId}
        onDelete={handleDelete}
      />
    </Box>
  );
};
