import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { ClustersPageEdit } from "~/shared/routes";
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
      id: "name",
      label: (
        <TableHeadCell
          title='Heading'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${ClustersPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.length > 100
            ? (value as string)?.slice(0, 100).concat("...")
            : (value as string)}
          </Link>
        );
      }
    }
  ];
};
