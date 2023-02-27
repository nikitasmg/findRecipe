import React from "react";
import { Input, Typography } from "@mui/material";
import { NumericInput } from "~/shared/components/NumericInput";
import { TableHeadCell } from "~/shared/components/TableHeadCell";
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
      id: "id",
      label: (
        <TableHeadCell
          title='ID'
          cellId='id'
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        />
      ),
      style: {
        width: "10%"
      }
    },
    {
      id: "sort",
      label: (
        <TableHeadCell
          title='Sorting'
          cellId='sort'
          align='center'
          onSortClick={getClickHandler("sort")}
          sortProps={getActiveProps("sort")}
        />
      ),
      style: {
        minWidth: "10%",
        width: "150px"
      },
      render: (value, _, isEditMode) => {
        if (!isEditMode) {
          return <Typography textAlign='center'>{value as string}</Typography>;
        }

        return <NumericInput name='sort' value={Number(value)} />;
      }
    },
    {
      id: "name",
      label: (
        <TableHeadCell
          title='Value'
          cellId='name'
          align='center'
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
