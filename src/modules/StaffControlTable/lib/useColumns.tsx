import React from "react";
import { SortOrder, StaffControl } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { formatDate } from "~/shared/lib/formatDate";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";
import { Box } from "@mui/material";

export const useColumns = (
  handleRowClick: (row: StaffControl) => void,
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
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      minWidth: 200,
      render: (value, row) => (
        <img
          className='w-[220px] h-auto'
          loading='lazy'
          src={(value as string) ?? ""}
          alt={row.name as string}
        />
      )
    },

    {
      id: "name",
      label: (
        <TableHeadCell
          title='Title'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      minWidth: 250,
      render: (value, row) => {
        return (
          <Box
            tabIndex={0}
            className='text-primary hover:text-primaryActive cursor-pointer'
            onClick={() => handleRowClick(row as StaffControl)}
          >
            {value as string}
          </Box>
        );
      }
    },

    {
      id: "description",
      label: (
        <TableHeadCell
          title='Description'
          cellId='description'
          onSortClick={getClickHandler("description")}
          sortProps={getActiveProps("description")}
        />
      )
    },

    {
      id: "created_at",
      label: (
        <TableHeadCell
          title='Created at'
          cellId='created_at'
          onSortClick={getClickHandler("created_at")}
          sortProps={getActiveProps("created_at")}
        />
      ),
      format: formatDate
    }
  ];
};
