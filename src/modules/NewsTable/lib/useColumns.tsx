import React, { Fragment } from "react";
import { Box, Modal, Switch } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  NewsCategory,
  SortOrder,
  useNewsCategoriesQuery,
  useUpdateOnIndexMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { TableHeadCell } from "~/shared/components/TableHeadCell";
import { Link } from "~/shared/components/Link";
import { useModal } from "~/shared/hooks/useModal";
import { formatDate } from "~/shared/lib/formatDate";
import { NewsPageEdit } from "~/shared/routes";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { Column } from "../types";
import { Button } from "~/shared/components/Button";

export const useColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const { open, handleClose, handleOpen } = useModal();

  const client = useGraphqlClient();

  const { mutateAsync: updateOnIndex } = useUpdateOnIndexMutation(client);

  const { data } = useNewsCategoriesQuery(client);

  const categories = data?.newsCategories.reduce((res, cur) => {
    res[cur.id] = cur.name;
    return res;
  }, Object.create(null));

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
      )
    },
    {
      id: "content",
      label: (
        <TableHeadCell
          title='Content'
          cellId='content'
          onSortClick={getClickHandler("content")}
          sortProps={getActiveProps("content")}
        />
      ),
      minWidth: 220,
      render: (value, row) => {
        if (typeof value !== "string") return null;

        const key = `${row.id}`;

        const handleClick = () => handleOpen(key);

        return (
          <Fragment key={key}>
            <Button
              className='flex gap-2 items-center w-fit p-4'
              variant='outlined'
              onClick={handleClick}
              startIcon={<VisibilityIcon />}
            >
              Preview
            </Button>
            <Modal
              open={open === key}
              onClose={handleClose}
              aria-labelledby={value}
              aria-describedby={value}
            >
              <Box className='w-[90%] bg-white mx-auto mt-2 border-box p-6 h-[90%] flex items-center rounded-lg'>
                <div
                  className='h-[90%] overflow-auto'
                  // eslint-disable-next-line xss/no-mixed-html
                  dangerouslySetInnerHTML={{ __html: value }}
                />
              </Box>
            </Modal>
          </Fragment>
        );
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
      minWidth: 250,
      render: (value, row) => {
        return (
          <Link className='transition-all' to={`${NewsPageEdit.replace(":id", row.id as string)}`}>
            {value as string}
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
          onSortClick={getClickHandler("category")}
          sortProps={getActiveProps("category")}
        />
      ),
      minWidth: 80,
      render: (value) => {
        const category = value as NewsCategory | null;

        return <Fragment key={category?.id as string}>{categories[category?.id ?? ""]}</Fragment>;
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
      minWidth: 250,
      format: formatDate
    },

    {
      id: "on_index",
      label: (
        <TableHeadCell
          title='На главной'
          align='center'
          cellId='on_index'
          onSortClick={getClickHandler("on_index")}
          sortProps={getActiveProps("on_index")}
        />
      ),
      minWidth: 200,
      align: "center",
      render: (value, row) => (
        <Switch
          aria-label='switch-view-on-index'
          defaultValue={value as string}
          onChange={(event) =>
            updateOnIndex({ id: row.id as string, on_index: event.target.checked })
          }
        />
      )
    }
  ];
};
