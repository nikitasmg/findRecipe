import React from "react";
import { SortOrder } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { formatDate } from "~/shared/lib/formatDate";
import { ContestPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
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
          <Link
            className='transition-all'
            to={`${ContestPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
          </Link>
        );
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
      )
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
      )
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
      minWidth: 250,
      format: formatDate
    },

    {
      id: "date",
      label: (
        <TableHeadCell
          title='Start date'
          cellId='date'
          onSortClick={getClickHandler("date")}
          sortProps={getActiveProps("date")}
        />
      ),
      minWidth: 250,
      format: formatDate
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
      minWidth: 250,
      format: formatDate
    }
  ];
};
