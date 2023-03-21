import React from "react";
import { SortOrder, Subdivision, useSubdivisionsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { EmployeesPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";
import { SelectSubdivision } from "~/modules/EmployeesTable/components/SelectSubdivision";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { data: { subdivisions } = {} } = useSubdivisionsQuery(
    client,
    {},
    { refetchOnMount: "always" }
  );

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
      id: "name",
      label: (
        <TableHeadCell
          title='Full name'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${EmployeesPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
          </Link>
        );
      }
    },

    {
      id: "position",
      label: (
        <TableHeadCell
          title='Position'
          cellId='position'
          onSortClick={getClickHandler("position")}
          sortProps={getActiveProps("position")}
        />
      ),
      style: {
        width: "150px"
      }
    },

    {
      id: "additional",
      label: (
        <TableHeadCell
          title='Additional number'
          cellId='additional'
          onSortClick={getClickHandler("additional")}
          sortProps={getActiveProps("additional")}
        />
      ),
      align: "center",
      style: {
        width: "200px"
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
      ),
      style: {
        width: "150px"
      }
    },

    {
      id: "subdivision",
      label: (
        <TableHeadCell
          title='Subdivision'
          cellId='subdivision'
          onSortClick={getClickHandler("subdivision_id")}
          sortProps={getActiveProps("subdivision_id")}
        />
      ),
      style: {
        width: "200px"
      },
      render: (value, row) => (
        <SelectSubdivision
          employeeId={row.id as string}
          value={value as Subdivision}
          subdivisions={subdivisions as Subdivision[]}
        />
      )
    }
  ];
};
