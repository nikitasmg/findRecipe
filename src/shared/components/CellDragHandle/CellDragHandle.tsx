import { TableCell } from "@mui/material";
import React from "react";
import { DragHandle } from "../SortableTable";

type Props = {
  disabled?: boolean;
  style?: React.CSSProperties;
  hidden?: boolean;
};

export const CellDragHandle: React.FC<Props> = ({ disabled = false, style, hidden = false }) => (
  <TableCell key='drag' className='w-[5%]'>
    <DragHandle style={style} disabled={disabled} hidden={hidden} />
  </TableCell>
);
