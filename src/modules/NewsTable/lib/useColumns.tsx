import React, { Fragment } from "react";
import { Switch } from "@mui/material";
import {
  NewsCategory,
  useNewsCategoriesQuery,
  useUpdateOnIndexMutation,
  useUpdatePublishedNewsMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Link } from "~/shared/components/Link";
import { formatDateForTable } from "~/shared/lib/formatDate";
import { NewsPageEdit } from "~/shared/routes";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const client = useGraphqlClient();

  const { mutateAsync: updateOnIndex } = useUpdateOnIndexMutation(client);

  const { mutateAsync: updatePublished } = useUpdatePublishedNewsMutation(client);

  const { data } = useNewsCategoriesQuery(client, {}, { refetchOnMount: "always" });

  const categories = data?.newsCategories.reduce((res, cur) => {
    res[cur.id] = cur.name;
    return res;
  }, Object.create(null));

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
      style: { width: 50, paddingRight: 24 },
      align: "center",
      className: "text-grayLight"
    },
    {
      id: "imageUrl",
      label: <TableHeadCell title='Image' cellId='imageUrl' />,
      style: { width: 155, paddingLeft: 8 },
      render: (value, row) => (
        <img
          className='w-[155px] h-[90px] rounded object-cover'
          loading='lazy'
          src={(value as string) ?? ""}
          alt={row.name as string}
        />
      )
    },

    {
      id: "name",
      label: (
        <TableHeadCell
          title='Heading'
          cellId='name'
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        />
      ),
      style: { minWidth: 250, maxWidth: 290 },
      render: (value, row) => {
        return (
          <Link className='transition-all' to={`${NewsPageEdit.replace(":id", row.id as string)}`}>
            {(value as string)?.slice(0, 100).concat("...")}
          </Link>
        );
      }
    },

    {
      id: "category",
      label: (
        <TableHeadCell
          title='Category'
          cellId='category'
          onSortClick={getClickHandler("category.sort")}
          sortProps={getActiveProps("category.sort")}
        />
      ),
      style: { minWidth: 80 },
      render: (value) => {
        const category = value as NewsCategory | null;

        return <Fragment key={category?.id}>{categories[category?.id ?? ""]}</Fragment>;
      }
    },

    {
      id: "published_at",
      label: (
        <TableHeadCell
          title='Published at'
          cellId='published_at'
          onSortClick={getClickHandler("published_at")}
          sortProps={getActiveProps("published_at")}
        />
      ),
      style: { minWidth: 170 },
      format: formatDateForTable
    },

    {
      id: "on_index",
      label: (
        <TableHeadCell
          title='On the main'
          align='center'
          cellId='on_index'
          onSortClick={getClickHandler("on_index")}
          sortProps={getActiveProps("on_index")}
        />
      ),
      style: { minWidth: 120 },
      align: "center",
      render: (value, row) => (
        <Switch
          aria-label='switch-view-on-index'
          checked={!!value}
          onChange={(event) => {
            updateOnIndex({ id: Number(row.id), on_index: event.target.checked });

            row.on_index = !row.on_index;
          }}
        />
      )
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
      style: { minWidth: 120 },
      align: "center",
      render: (value, row) => (
        <Switch
          aria-label='switch-published'
          checked={!!value}
          onChange={(event) => {
            updatePublished({ id: Number(row.id), published: event.target.checked });

            row.published = !row.published;
          }}
        />
      )
    }
  ];
};
