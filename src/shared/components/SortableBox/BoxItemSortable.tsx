import { Box, BoxProps } from "@mui/material";
import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = Omit<BoxProps, "id"> & {
  children: ReactNode;
  id: string | number;
};

export const BoxItemSortable: React.FC<Props> = ({ children, id, ...boxProps }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Box {...boxProps} ref={setNodeRef} {...attributes} style={style} tabIndex={-1} {...listeners}>
      {children}
    </Box>
  );
};
