import { TableRow } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";
import { SortableElement } from "react-sortable-hoc";

export const TableRowSortable = SortableElement<{ children: ReactNode; style?: CSSProperties }>(
  ({ children, style }: { children: ReactNode; style?: CSSProperties }) => {
    return (
      <TableRow hover role='row' tabIndex={-1} style={style}>
        {children}
      </TableRow>
    );
  }
);
