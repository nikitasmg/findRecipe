import React from "react";
import { Input, Typography } from "@mui/material";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { Column } from "../types";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const { getClickHandler, getActiveProps } = useSortProps(handleOrderClick, activeOrder);

  return [
    {
      id: "name",
      label: (
        <TableHeadCell
          title='Value'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      style: {
        minWidth: "55%"
      },
      render: (value, _, editOptions) => {
        if (!editOptions) {
          return <Typography>{value as string}</Typography>;
        }

        return (
          <Input
            name='name'
            onChange={editOptions.handleChange}
            fullWidth
            defaultValue={value as string}
          />
        );
      }
    }
  ];
};
