import { Box, CircularProgress, Table, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useRef, useState } from "react";
import { Text } from "~/shared/components/Text";
import { TableBodyCellActions } from "~/shared/components/TableBodyCellActions";
import { TableHeadCellActions } from "~/shared/components/TableHeadCellActions";
import { TableBodySortable, TableRowSortable as Row } from "~/shared/components/SortableTable";
import { CellDragHandle } from "~/shared/components/CellDragHandle";
import { resortArray } from "~/shared/lib/resortArray";
import { CompilationItem } from "~/shared/types/Compilation";
import { useCompilations } from "./lib/useCompilations";
import { useColumns } from "./lib/getColumns";
import { TableWrapper } from "~shared/components/TableWrapper";
import { Languages } from "~shared/types/Languages";
import { AddButton } from "~shared/components/AddButton";

type Props = {
  lang: Languages;
  id: number;
};

export const CompilationEditTable: React.FC<Props> = ({ id, lang }) => {
  const [editRow, setEditRow] = useState<CompilationItem | null>(null);

  const [newValues, setNewValues] = useState<Partial<Omit<CompilationItem, "id">>>();

  const formRef = useRef<HTMLFormElement>(null);

  const {
    rows,
    setRows,
    compilationMeta,
    isLoading,
    isMutationLoading,
    create,
    update,
    remove,
    resort
  } = useCompilations(id);

  const columns = useColumns(lang);

  const handleAddClick = () => {
    setRows((oldRows) => {
      const newRow = { id: "new", sort: rows.length + 1, name: "", name_en: "" };
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

    if (!newValues?.name && !newValues?.name_en) {
      if (editRow?.id === "new") {
        setRows((oldRows) => oldRows.filter((el) => el.id !== "new"));
        setEditRow(null);
        setNewValues({});
      }
      return;
    }

    if (!isCreate && editRow) {
      update({ ...editRow, ...newValues, id: Number(editRow.id) });
      setNewValues({});
      return;
    }

    const newRow = {
      sort: rows.length + 1,
      name: newValues?.name ?? "",
      name_en: newValues?.name_en ?? ""
    };

    create(newRow);
    setRows((rows) => rows.slice(0, -1).concat({ id: "new", ...newRow }));
    setNewValues({});
  };

  return (
    <TableWrapper>
      <Text className='font-bold' variant='h5'>
        {compilationMeta?.heading ?? ""}
      </Text>
      <form onSubmit={handleSubmit} onSubmitCapture={handleSubmit} ref={formRef}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <CellDragHandle disabled hidden />

              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={column.style}>
                  {column.label}
                </TableCell>
              ))}

              <TableHeadCellActions />
            </TableRow>
          </TableHead>

          {!isLoading && (
            <TableBodySortable items={rows ?? []} onSortEnd={onSortEnd}>
              {rows?.map((row, i) => {
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
                  setNewValues((oldValues) => {
                    if (lang === "en") {
                      return {
                        ...oldValues,
                        name_en: value
                      };
                    } else {
                      return {
                        ...oldValues,
                        [name]: value
                      };
                    }
                  });
                };

                const editableProps = editRow?.id === row.id ? { handleChange } : undefined;

                const spinnerVisible = isMutationLoading;

                return (
                  <Row key={row.id} id={row.id ?? i}>
                    <CellDragHandle />

                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.render?.(value, row, editableProps) ?? value}
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
          <AddButton disabled={!!editRow} onClick={handleAddClick} fullWidth />
        </Box>

        {isLoading && (
          <Box className='flex h-[20vh] w-full justify-center items-center'>
            <CircularProgress />
          </Box>
        )}
      </form>
    </TableWrapper>
  );
};
