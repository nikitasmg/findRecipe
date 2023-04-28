import React from "react";
import { Contest } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { ProjectsPageEdit } from "~/shared/routes";
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
      align: "center",
      style: {
        width: "50px"
      }
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
      ),
      style: {
        width: "200px"
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
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${ProjectsPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.length > 100
              ? (value as string)?.slice(0, 100).concat("...")
              : (value as string)}
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
      ),
      style: {
        width: "200px"
      }
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
        return (value as Contest)?.name?.slice(0, 100).concat("...");
      },
      style: {
        width: "200px"
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
      ),
      style: {
        width: "200px"
      },
      render: (value) =>
        (value as string)?.length > 100
          ? (value as string)?.slice(0, 100).concat("...")
          : (value as string)
    },
    {
      id: "region",
      label: (
        <TableHeadCell
          title='Region'
          cellId='region'
          onSortClick={getClickHandler("region")}
          sortProps={getActiveProps("region")}
        />
      ),
      style: {
        width: "200px"
      },
      render: (value) =>
        (value as string)?.length > 100
          ? (value as string)?.slice(0, 100).concat("...")
          : (value as string)
    }
  ];
};
