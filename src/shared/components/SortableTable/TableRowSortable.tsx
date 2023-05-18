import { TableRow } from "@mui/material";
import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  children: ReactNode;
  id: string | number;
};

export const TableRowSortable: React.FC<Props> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <TableRow
      hover
      ref={setNodeRef}
      {...attributes}
      style={style}
      tabIndex={-1}
      {...listeners}
      role='row'
    >
      {children}
    </TableRow>
  );
};
