import { Box, CircularProgress, Table, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useNavigationBack } from "~/shared/hooks/useBackClick";
import { Panel } from "~/shared/components/Panel";
import { Text } from "~/shared/components/Text";
import { TableBodyCellActions } from "~/shared/components/TableBodyCellActions";
import { TableHeadCellActions } from "~/shared/components/TableHeadCellActions";
import { TableBodySortable, TableRowSortable as Row } from "~/shared/components/SortableTable";
import { DetailsHead } from "~/shared/components/DetailsHead";
import { CellDragHandle } from "~/shared/components/CellDragHandle";
import { Button } from "~/shared/components/Button";
import { resortArray } from "~/shared/lib/resortArray";
import { CompilationItem } from "~/shared/types/Compilation";
import { useCompilations } from "./lib/useCompilations";
import { useColumns } from "./lib/getColumns";

type Props = {
  id: number;
};

export const CompilationEditTable: React.FC<Props> = ({ id }) => {
  const [editRow, setEditRow] = useState<CompilationItem | null>(null);

  const [newValues, setNewValues] = useState<Partial<Omit<CompilationItem, "id">>>();

  const formRef = useRef<HTMLFormElement>(null);

  const {
    rows,
    activeOrder,
    setRows,
    compilationMeta,
    isLoading,
    isMutationLoading,
    create,
    update,
    remove,
    handleChangeOrder,
    resort
  } = useCompilations(id);

  const columns = useColumns(activeOrder, handleChangeOrder);

  const handleBackClick = useNavigationBack();

  const handleAddClick = () => {
    setRows((oldRows) => {
      const newRow = { id: "new", sort: rows.length + 1, name: "" };
      setEditRow(newRow);
      return [...oldRows, newRow];
    });
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setRows((rows) => {
      const newRows = resortArray(oldIndex, newIndex, rows);

      resort(newRows.slice(0, Math.max(newIndex, oldIndex) + 1));

      return newRows;
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const isCreate = editRow?.id === "new";

    if (!isCreate && editRow) {
      update({ ...editRow, ...newValues, id: Number(editRow.id) });
      setNewValues({});
      return;
    }

    const newRow = { sort: rows.length + 1, name: newValues?.name ?? "" };

    create(newRow);
    setRows((rows) => rows.slice(0, -1).concat({ id: "new", ...newRow }));
  };

  return (
    <Panel>
      <Box className='flex flex-col gap-6 p-4'>
        <DetailsHead title='Compilations editing' onBackClick={handleBackClick} />

        <Box
          component='section'
          className='flex items-center justify-center flex-wrap gap-1 w-full py-4'
        >
          <Text variant='h6'>{compilationMeta?.heading ?? ""}</Text>
        </Box>
        <form onSubmit={handleSubmit} onSubmitCapture={handleSubmit} ref={formRef}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <CellDragHandle disabled />

                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={column.style}>
                    {column.label}
                  </TableCell>
                ))}

                <TableHeadCellActions />
              </TableRow>
            </TableHead>

            {!isLoading && (
              <TableBodySortable onSortEnd={onSortEnd} useDragHandle>
                {rows?.map((row, index) => {
                  const handleEdit = () => {
                    setEditRow(row);
                  };

                  const handleSuccess = () => {
                    formRef.current?.dispatchEvent(new Event("submit"));
                    setEditRow(null);
                  };

                  const handleRemove = () => {
                    remove(row.id);
                    setNewValues({});
                    setEditRow(null);
                  };

                  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
                    const { name, value } = e.target;
                    setNewValues((oldValues) => ({
                      ...oldValues,
                      [name]: value
                    }));
                  };

                  const editableProps = editRow?.id === row.id ? { handleChange } : undefined;

                  const spinnerVisible = isMutationLoading;

                  return (
                    <Row key={row.id} index={index}>
                      <CellDragHandle />

                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.render?.(value, row, editableProps) ??
                              column.format?.(value) ??
                              value}
                          </TableCell>
                        );
                      })}

                      <TableBodyCellActions
                        spinnerVisible={spinnerVisible}
                        isEditMode={!!editableProps}
                        handleEdit={handleEdit}
                        handleSuccess={handleSuccess}
                        handleRemove={handleRemove}
                      />
                    </Row>
                  );
                })}
              </TableBodySortable>
            )}
          </Table>
          <Box className='flex justify-center py-6'>
            <Button
              disabled={!!editRow}
              onClick={handleAddClick}
              fullWidth
              size='large'
              variant='contained'
              startIcon={<AddIcon />}
              textProps={{ align: "center" }}
            >
              Add
            </Button>
          </Box>

          {isLoading && (
            <Box className='flex h-[20vh] w-full justify-center items-center'>
              <CircularProgress />
            </Box>
          )}
        </form>
      </Box>
    </Panel>
  );
};
