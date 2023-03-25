import { TableCell } from "@mui/material";
import React from "react";
import { Text } from "~/shared/components/Text";

export const TableHeadCellActions: React.FC = () => {
  return (
    <TableCell key='actions'>
      <Text textAlign='center'>Actions</Text>
    </TableCell>
  );
};
