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
import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  StaffControl,
  useStaffControlsQuery,
  useUpdateStaffControlMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableActions } from "~/shared/components/TableActions";
import { CellDragHandle } from "~/shared/components/CellDragHandle";
import { TableBodySortable, TableRowSortable as Row } from "~/shared/components/SortableTable";
import { getEventValueHandler } from "~/shared/lib/events";
import { resortArray } from "~/shared/lib/resortArray";
import { useRequestState } from "~/shared/hooks/useRequestState";
import { useModal } from "~/shared/hooks/useModal";
import { useColumns } from "./lib/useColumns";
import { FiltersForm } from "./components/FiltersForm";
import { DetailsForm } from "./components/DetailsForm";

type Props = {
  pageId?: number;
};

export const StaffControlTable: React.FC<Props> = ({ pageId }) => {
  const [rows, setRows] = useState<StaffControl[]>([]);

  const [activeRow, setActiveRow] = useState<StaffControl | null>();

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
    resetTitle
  } = useRequestState("name");

  const client = useGraphqlClient();

  const { data, isLoading, refetch } = useStaffControlsQuery(client, variables, {
    refetchOnMount: "always",
    enabled: !!pageId
  });

  const { mutateAsync: update } = useUpdateStaffControlMutation(client);

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
    const input: { id?: number; sort: number } = { sort: newIndex + 1 };

    if (rows[oldIndex]?.id) {
      input.id = rows[oldIndex]?.id;
    }

    update({ input });

    setRows((rows) => resortArray(oldIndex, newIndex, rows));
  };

  const handleAddClick: MouseEventHandler = (e) => {
    e.preventDefault();
    handleOpen();
  };

  useEffect(() => {
    if (!params?.page_id) {
      handleFilterChange("page_id", pageId);
    }
  }, [params, pageId, handleFilterChange]);

  return (
    <Box className='flex flex-col gap-6'>
      <TableActions
        searchProps={{
          searchValue: title,
          searchChange: getEventValueHandler(handleTitleChange),
          resetTitle
        }}
        addButtonProps={{
          onAddClick: handleAddClick
        }}
        resetFilters={resetFilters}
        filterModalInnerForm={
          <FiltersForm params={params} handleChangeFilter={handleFilterChange} />
        }
      />

      <TableContainer component={Paper}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <CellDragHandle />

              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={column.style}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
              {staffControls?.map((row: Partial<StaffControl>, i) => {
                return (
                  <Row index={i} key={row.id}>
                    <CellDragHandle />

                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={column.style}>
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
      />
    </Box>
  );
};
