import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { UsersPageEdit } from "~/shared/routes";
import { formatDateForTable } from "~shared/lib/formatDate";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
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
          title='Name'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      minWidth: 250,
      render: (value, row) => {
        return (
          <Link className='transition-all' to={`${UsersPageEdit.replace(":id", row.id as string)}`}>
            {value as string}
          </Link>
        );
      }
    },
    {
      id: "email",
      label: (
        <TableHeadCell
          title='Email'
          cellId='email'
          onSortClick={getClickHandler("email")}
          sortProps={getActiveProps("email")}
        />
      )
    },
    {
      id: "email_verified_at",
      label: (
        <TableHeadCell
          title='Email verified at'
          cellId='email_verified_at'
          onSortClick={getClickHandler("email_verified_at")}
          sortProps={getActiveProps("email_verified_at")}
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
      format: formatDateForTable
    }
  ];
};
