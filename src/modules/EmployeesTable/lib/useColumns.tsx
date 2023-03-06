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
      id: "id",
      label: (
        <TableHeadCell
          title='ID'
          cellId='id'
          align='center'
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        />
      ),
      align: "center"
    },

    {
      id: "name",
      label: (
        <TableHeadCell
          title='Full name'
          cellId='name'
          align='center'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      minWidth: 150,
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
          align='center'
          onSortClick={getClickHandler("position")}
          sortProps={getActiveProps("position")}
        />
      ),
      minWidth: 150
    },

    {
      id: "additional",
      label: (
        <TableHeadCell
          title='Additional number'
          cellId='additional'
          align='center'
          onSortClick={getClickHandler("additional")}
          sortProps={getActiveProps("additional")}
        />
      ),
      align: "center",
      minWidth: 250
    },

    {
      id: "email",
      label: (
        <TableHeadCell
          title='Email'
          cellId='email'
          align='center'
          onSortClick={getClickHandler("email")}
          sortProps={getActiveProps("email")}
        />
      ),
      minWidth: 250
    },

    {
      id: "subdivision",
      label: (
        <TableHeadCell
          title='Subdivision'
          cellId='subdivision'
          align='center'
          onSortClick={getClickHandler("subdivision_id")}
          sortProps={getActiveProps("subdivision_id")}
        />
      ),
      minWidth: 200,
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
