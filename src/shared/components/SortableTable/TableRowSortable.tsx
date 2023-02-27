import { TableRow } from "@mui/material";
import React, { ReactNode } from "react";
import { SortableElement } from "react-sortable-hoc";

export const TableRowSortable = SortableElement<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => {
    return (
      <TableRow hover role='row' tabIndex={-1} className='w-full'>
        {children}
      </TableRow>
    );
  }
);
