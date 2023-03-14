import React from "react";
import { Input, Typography } from "@mui/material";
import { NumericInput } from "~/shared/components/NumericInput";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";
import { SortOrder } from "~/generated/graphql";

export const getColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const getClickHandler = (name: string) => () => {
    if (activeOrder?.[name] && activeOrder[name] === SortOrder.Desc) {
      return handleOrderClick?.(null);
    }

    const direction = activeOrder?.[name] === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc;

    return handleOrderClick?.({ [name]: direction });
  };

  const getActiveProps = (name: string) => ({
    active: !!activeOrder?.[name],
    direction: (activeOrder?.[name]
      ? activeOrder[name].toLocaleLowerCase()
      : "desc") as Lowercase<SortOrder>
  });

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
