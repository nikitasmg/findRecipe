import React from "react";
import { Contest, SortOrder } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { ProjectsPageEdit } from "~/shared/routes";
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
      align: "center"
    },
    {
      id: "number",
      label: (
        <TableHeadCell
          title='Project number'
          cellId='number'
          onSortClick={getClickHandler("number")}
          sortProps={getActiveProps("number")}
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
            to={`${ProjectsPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
          </Link>
        );
      }
    },
    {
      id: "leader",
      label: (
        <TableHeadCell
          title='Leader'
          cellId='leader'
          onSortClick={getClickHandler("leader")}
          sortProps={getActiveProps("leader")}
        />
      )
    },
    {
      id: "contest",
      label: (
        <TableHeadCell
          title='Contest'
          cellId='contest'
          onSortClick={getClickHandler("contest")}
          sortProps={getActiveProps("contest")}
        />
      ),
      render: (value) => {
        return (value as Contest)?.name;
      }
    },
    {
      id: "organization",
      label: (
        <TableHeadCell
          title='Organization'
          cellId='organization'
          onSortClick={getClickHandler("organization")}
          sortProps={getActiveProps("organization")}
        />
      )
    }
  ];
};
