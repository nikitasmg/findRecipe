import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { ReportsPageEdit } from "~/shared/routes";
import { formatDescriptionForTable } from "~/shared/lib/formatDescriptionForTable";
import { formatDateForTable } from "~/shared/lib/formatDate";
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
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: { width: 50 },
      render: (value, row) => (
        <img
          className='w-[50px] h-auto'
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
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${ReportsPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.slice(0, 100).concat("...")}
          </Link>
        );
      }
    },
    {
      id: "description",
      label: (
        <TableHeadCell
          title='Short description'
          cellId='description'
          onSortClick={getClickHandler("description")}
          sortProps={getActiveProps("description")}
        />
      ),
      style: { width: "300px" },
      format: formatDescriptionForTable
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
      style: { width: "150px" },
      format: formatDateForTable
    }
  ];
};
