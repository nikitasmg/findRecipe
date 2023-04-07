import { TableCell } from "@mui/material";
import React from "react";
import { DragHandle } from "../SortableTable";

type Props = {
  disabled?: boolean;
  style?: React.CSSProperties;
};

export const CellDragHandle: React.FC<Props> = ({ disabled = false, style }) => (
  <TableCell key='drag' className='w-[5%]'>
    <DragHandle style={style} disabled={disabled} />
  </TableCell>
);
