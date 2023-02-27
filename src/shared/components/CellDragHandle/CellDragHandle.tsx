import { TableCell } from "@mui/material";
import React from "react";
import { DragHandle } from "../SortableTable";

type Props = {
  disabled?: boolean;
};

export const CellDragHandle: React.FC<Props> = ({ disabled = false }) => (
  <TableCell key='drag' className='w-[5%]'>
    <DragHandle disabled={disabled} />
  </TableCell>
);
