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
      style: { width: 50 },
      align: "center",
      className: "text-grayLight"
    },
    {
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: { width: 155, paddingLeft: 8 },
      render: (value, row) => (
        <img
          className='w-[155px] h-[90px] rounded object-cover'
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
          title='Full name of the specialist'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      style: { width: 300 },
      render: (value, row) => {
        return (
          <Box
            tabIndex={0}
            className='text-primary hover:text-primary-dark cursor-pointer'
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
      render: (value) => {
        return (value as string)?.length > 100
          ? (value as string)?.slice(0, 100).concat("...")
          : (value as string);
      },
      style: { width: 300 }
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
      style: { width: 150, textAlign: "center" },
      format: formatDateForTable
    }
  ];
};
