import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { Text } from "~/shared/components/Text";
import { formatDateForTable } from "~/shared/lib/formatDate";
import { capitalize } from "~/shared/lib/capitalize";
import { ContestPageEdit } from "~/shared/routes";
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
      id: "id",
      label: (
        <TableHeadCell
          title='ID'
          cellId='id'
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        />
      ),
      style: { width: 50 },
      align: "center",
      className: "text-grayLight"
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
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${ContestPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.length > 100
              ? (value as string)?.slice(0, 100).concat("...")
              : (value as string)}
          </Link>
        );
      },
      style: {
        width: "270px"
      }
    },

    {
      id: "number",
      label: (
        <TableHeadCell
          title='Number'
          cellId='number'
          onSortClick={getClickHandler("number")}
          sortProps={getActiveProps("number")}
        />
      ),
      style: {
        width: "80px"
      }
    },
    {
      id: "status",
      label: (
        <TableHeadCell
          title='Status'
          cellId='status'
          onSortClick={getClickHandler("status")}
          sortProps={getActiveProps("status")}
        />
      ),
      style: {
        width: "100px"
      },
      render: (value) => <Text>{capitalize(value as string)}</Text>
    },

    {
      id: "deadline",
      label: (
        <TableHeadCell
          title='Deadline'
          cellId='deadline'
          onSortClick={getClickHandler("deadline")}
          sortProps={getActiveProps("deadline")}
        />
      ),
      style: {
        width: "150px"
      },
      format: formatDateForTable
    },

    {
      id: "date",
      label: (
        <TableHeadCell
          title='Date of summing up'
          cellId='date'
          onSortClick={getClickHandler("date")}
          sortProps={getActiveProps("date")}
        />
      ),
      style: {
        width: "230px"
      },
      format: formatDateForTable
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
      style: {
        width: "100px"
      },
      format: formatDateForTable
    }
  ];
};
