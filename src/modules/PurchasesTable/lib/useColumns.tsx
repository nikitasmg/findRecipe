import React from "react";
import { Switch } from "@mui/material";
import { SortOrder, useUpdatePurchasePublishedMutation } from "~/generated/graphql";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { PurchasesPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { formatDate } from "~shared/lib/formatDate";
import { SourceLink } from "~shared/components/SourceLink";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { mutateAsync: updatePublished } = useUpdatePurchasePublishedMutation(client);

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
      id: "sort",
      label: (
        <TableHeadCell
          title='Sorting'
          cellId='sort'
          onSortClick={getClickHandler("sort")}
          sortProps={getActiveProps("sort")}
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
      minWidth: 250,
      render: (value, row) => {
        return (
          <Link
            className='transition-all'
            to={`${PurchasesPageEdit.replace(":id", row.id as string)}`}
          >
            {value as string}
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
      minWidth: 200,
      render: (value) => (
        <SourceLink className='transition-all' to={value as string} target='_blank'>
          {value as string}
        </SourceLink>
      )
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
      align: "center",
      format: formatDate
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
      minWidth: 200,
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
