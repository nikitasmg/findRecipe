import React from "react";
import { SortOrder } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { PagesEdit } from "~/shared/routes/index";
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
      ),
      style: {
        width: "80px"
      }
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
      style: {
        width: "300px"
      },
      render: (value, row) => {
        return (
          <Link className='transition-all' to={`${PagesEdit.replace(":slug", row.slug as string)}`}>
            {value as string}
          </Link>
        );
      }
    },
    {
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: {
        minWidth: "220px"
      },
      render: (value, row) => {
        return (
          <img
            className='w-[220px] h-auto'
            loading='lazy'
            src={(value as string) ?? ""}
            alt={row.name as string}
          />
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
      style: {
        minWidth: "220px"
      },
      format: (value) => `${value.slice(0, 100)}...`
    }
  ];
};
