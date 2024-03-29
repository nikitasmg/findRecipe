import React from "react";
import { Subdivision, useSubdivisionsQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { EmployeesPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { SelectSubdivision } from "../components/SelectSubdivision";
import { Column } from "../types";

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

  const { getClickHandler, getActiveProps } = useSortProps(handleOrderClick, activeOrder);

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
      style: {
        width: "250px"
      },
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
        width: "200px",
        maxWidth: "200px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
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
        width: "250px"
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
