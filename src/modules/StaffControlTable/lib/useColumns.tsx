import React from "react";
import { SortOrder, StaffControl } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { formatDateForTable } from "~/shared/lib/formatDate";
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
      style: { minWidth: "140px", width: "140px", textAlign: "center" },
      render: (value, row) => (
        <img
          className='w-[50px] h-auto shrink-0'
          loading='lazy'
          src={(value as string) ?? ""}
          alt={row.name as string}
        />
      ),
      align: "center"
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
      style: { width: "40%", minWidth: "250px" },
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
      ),
      style: { width: "40%", minWidth: "250px" }
    },

    {
      id: "created_at",
      label: (
        <TableHeadCell
          title='Created at'
          cellId='created_at'
          align='center'
          onSortClick={getClickHandler("created_at")}
          sortProps={getActiveProps("created_at")}
        />
      ),
      align: "center",
      style: { width: "250px", minWidth: "250px", textAlign: "center" },
      format: formatDateForTable
    }
  ];
};
