import React from "react";
import { Box } from "@mui/material";
import { StaffControl } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { formatDateForTable } from "~/shared/lib/formatDate";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
  handleRowClick: (row: StaffControl) => void,
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const { getClickHandler, getActiveProps } = useSortProps(handleOrderClick, activeOrder);

  return [
    {
      id: "sort",
      label: (
        <TableHeadCell
          title='ID'
          cellId='sort'
          align='center'
          onSortClick={getClickHandler("sort")}
          sortProps={getActiveProps("sort")}
        />
      ),
      align: "center",
      style: { width: "50px", textAlign: "center" }
    },
    {
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: { width: "140px", textAlign: "center" },
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
          title='Full name of the specialist'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
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
      style: { width: "250px" }
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
      style: { width: "250px", textAlign: "center" },
      format: formatDateForTable
    }
  ];
};
