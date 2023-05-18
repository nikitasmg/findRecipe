import React from "react";
import { Switch } from "@mui/material";
import { useUpdatePurchasePublishedMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { SourceLink } from "~shared/components/SourceLink";
import { Link } from "~/shared/components/Link";
import { PurchasesPageEdit } from "~/shared/routes";
import { formatDateForTable } from "~shared/lib/formatDate";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { mutateAsync: updatePublished } = useUpdatePurchasePublishedMutation(client);

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
            to={`${PurchasesPageEdit.replace(":id", row.id as string)}`}
          >
            {(value as string)?.slice(0, 100).concat("...")}
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
        width: "300px",
        maxWidth: "300px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        wordBreak: "break-all"
      },
      render: (value) => (
        <SourceLink className='transition-all' to={value as string} target='_blank'>
          {(value as string)?.slice(0, 100).concat("...")}
        </SourceLink>
      )
    },

    {
      id: "created_at",
      label: (
        <TableHeadCell
          title='Created at'
          cellId='created_at'
          align='center'
          onSortClick={getClickHandler("created_at")}
          sortProps={getActiveProps("created_at")}
        />
      ),
      align: "center",
      format: formatDateForTable,
      style: {
        width: "100px"
      }
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
        width: "200px"
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
