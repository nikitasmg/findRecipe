import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { formatDateForTable } from "~/shared/lib/formatDate";
import { InteractiveMapPageEdit } from "~/shared/routes";
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
          title='Heading'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      style: { minWidth: 250 },
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${InteractiveMapPageEdit.replace(":id", String(row.id))}`}
          >
            {value as string}
          </Link>
        );
      }
    },
    {
      id: "characteristics",
      label: (
        <TableHeadCell
          title='Characteristics'
          cellId='characteristics'
          onSortClick={getClickHandler("characteristics")}
          sortProps={getActiveProps("characteristics")}
        />
      ),
      style: { width: 200 }
    },
    {
      id: "area",
      label: (
        <TableHeadCell
          title='Area'
          cellId='area'
          onSortClick={getClickHandler("area")}
          sortProps={getActiveProps("area")}
        />
      ),
      style: { width: 150 }
    },
    {
      id: "floors",
      label: (
        <TableHeadCell
          title='Floors'
          cellId='floors'
          onSortClick={getClickHandler("floors")}
          sortProps={getActiveProps("floors")}
        />
      ),
      style: { width: 150 }
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
      style: { minWidth: 170 },
      render: formatDateForTable,
      align: "center"
    }
  ];
};
