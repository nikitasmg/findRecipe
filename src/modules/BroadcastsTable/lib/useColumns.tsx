import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { SourceLink } from "~shared/components/SourceLink";
import { Link } from "~/shared/components/Link";
import { BroadcastsPageEdit } from "~/shared/routes";
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
            to={`${BroadcastsPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.length > 100
            ? (value as string)?.slice(0, 100).concat("...")
            : (value as string)}
          </Link>
        );
      }
    },

    {
      id: "url",
      label: (
        <TableHeadCell
          title='Link'
          cellId='url'
          onSortClick={getClickHandler("url")}
          sortProps={getActiveProps("url")}
        />
      ),
      style: {
        width: "50%",
        minWidth: "300px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
      },
      render: (value) => (
        <SourceLink className='transition-all' to={value as string} target='_blank'>
          {(value as string)?.length > 100
            ? (value as string)?.slice(0, 100).concat("...")
            : (value as string)}
        </SourceLink>
      )
    }
  ];
};
