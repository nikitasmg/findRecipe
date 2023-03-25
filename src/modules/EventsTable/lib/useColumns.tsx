import React from "react";
import { Switch } from "@mui/material";
import { useUpdateEventPublishedMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { formatDateForTable } from "~/shared/lib/formatDate";
import { EventsPageEdit } from "~/shared/routes";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { mutateAsync: updatePublished } = useUpdateEventPublishedMutation(client);

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
      align: "center"
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
        width: "30%"
      },
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${EventsPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
          </Link>
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
        width: "25%"
      },
      render: (value) => (value as string)?.slice(0, 100).concat("...")
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
      style: {
        width: "120px"
      },
      align: "center",
      format: formatDateForTable
    },

    {
      id: "start",
      label: (
        <TableHeadCell
          title='Start date'
          cellId='start'
          onSortClick={getClickHandler("start")}
          sortProps={getActiveProps("start")}
        />
      ),
      style: {
        minWidth: "170px"
      },
      align: "center",
      format: formatDateForTable
    },

    {
      id: "published",
      label: (
        <TableHeadCell
          title='Published'
          align='center'
          cellId='published'
          onSortClick={getClickHandler("published")}
          sortProps={getActiveProps("published")}
        />
      ),
      style: {
        width: "120px"
      },
      align: "center",
      render: (value, row) => {
        return (
          <Switch
            aria-label='switch-published'
            checked={!!value}
            onChange={(event) => {
              updatePublished({ id: Number(row.id), published: event.target.checked });
              row.published = !row.published;
            }}
          />
        );
      }
    }
  ];
};
