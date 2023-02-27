import { TableBody } from "@mui/material";
import React, { ReactNode } from "react";
import { SortableContainer } from "react-sortable-hoc";

export const TableBodySortable = SortableContainer<{ children: ReactNode }>(
  ({ children }: { children: ReactNode }) => <TableBody>{children}</TableBody>
);
