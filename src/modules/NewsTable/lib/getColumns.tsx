// eslint-disable-next-line no-comments/disallowComments
/* eslint-disable react-hooks/rules-of-hooks */
import React, { Fragment } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Switch,
  TableSortLabel,
  TextField
} from "@mui/material";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  NewsCategory,
  SortOrder,
  useNewsCategoriesQuery,
  useUpdateOnIndexMutation
} from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Text } from "~/shared/components/Text";
import { ActiveOrder } from "~/shared/types/ActiveOrder";
import { TableHeadCell } from "~/shared/components/TableHeadCell";
import { getEventValueHandler } from "~/shared/lib/events";
import { useModal } from "~/shared/hooks/useModal";
import { formatDate } from "~/shared/lib/formatDate";
import { NewsPageEdit } from "~/shared/routes";
import { Column } from "../types";

export const getColumns = (
  activeOrder?: ActiveOrder,
  filter?: Record<string, unknown> | null,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void,
  handleChangeFilter?: (name: string, value: unknown) => void
): Column[] => {
  const { open, handleClose, handleOpen } = useModal();

  const client = useGraphqlClient();

  const { data: categories } = useNewsCategoriesQuery(client);

  const { mutateAsync: updateOnIndex } = useUpdateOnIndexMutation(client);

  const getClickHandler = (name: string) => () => {
    if (activeOrder?.[name] && activeOrder[name] === SortOrder.Desc) {
      return handleOrderClick?.(null);
    }

    const direction = activeOrder?.name === name ? SortOrder.Desc : SortOrder.Asc;

    return handleOrderClick?.({ [name]: direction });
  };

  const getChangeHandler = (cellId: string) =>
    getEventValueHandler((value: unknown) => handleChangeFilter?.(cellId, value));

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
          isFilterActive={!!filter?.id}
          onSortClick={getClickHandler("id")}
          sortProps={getActiveProps("id")}
        >
          <TextField
            value={filter?.id}
            label={<Text>Enter id</Text>}
            onChange={getChangeHandler("id")}
            variant='outlined'
          />
        </TableHeadCell>
      )
    },
    {
      id: "content",
      label: (
        <Box className='flex'>
          <Text>Content</Text>
          <TableSortLabel onClick={getClickHandler("content")} {...getActiveProps("content")} />
        </Box>
      ),
      render: (value) => {
        if (typeof value !== "string") return null;

        const handleClick = () => handleOpen(value);

        return (
          <Fragment key={value}>
            <Button
              className='flex gap-2 items-center w-fit !capitalize p-4'
              variant='outlined'
              onClick={handleClick}
            >
              <VisibilityIcon />
              <Text>Preview</Text>
            </Button>
            <Modal
              open={open === value}
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
          isFilterActive={!!filter?.name}
          onSortClick={getClickHandler("name")}
          sortProps={getActiveProps("name")}
        >
          <TextField
            value={filter?.name}
            label={<Text>Enter title</Text>}
            onChange={getChangeHandler("name")}
            variant='outlined'
          />
        </TableHeadCell>
      ),
      minWidth: 120,
      render: (value, row) => {
        return (
          <Link className='hover:underline hover:text-green-500' to={`${NewsPageEdit}/${row.id}`}>
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
          isFilterActive={!!filter?.category}
          onSortClick={getClickHandler("category")}
          sortProps={getActiveProps("category")}
        >
          <FormControl fullWidth>
            <InputLabel id='category-select'>
              <Text component='span'>Category</Text>
            </InputLabel>
            <Select
              labelId='category-select'
              id='category-select'
              className='w-[300px]'
              value={(filter?.category as string) ?? ""}
              label={<Text>Category</Text>}
              onChange={getChangeHandler("category")}
            >
              <MenuItem key={"empty"} value={""}>
                <Text>Not selected</Text>
              </MenuItem>
              {categories?.newsCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TableHeadCell>
      ),
      minWidth: 80,
      render: (value) => {
        return (value as NewsCategory).name;
      }
    },

    {
      id: "published_at",
      label: (
        <TableHeadCell
          title='Published at'
          cellId='published_at'
          isFilterActive={!!filter?.published_at}
          onSortClick={getClickHandler("published_at")}
          sortProps={getActiveProps("published_at")}
        >
          <DatePicker
            value={filter?.published_at}
            onChange={(value) => handleChangeFilter?.("published_at", value)}
            renderInput={(props) => <TextField {...props} variant='outlined' />}
          />
        </TableHeadCell>
      ),
      minWidth: 80,
      format: formatDate
    },

    {
      id: "on_index",
      label: (
        <TableHeadCell
          title='На главной'
          cellId='on_index'
          isFilterActive={!!filter?.on_index}
          onSortClick={getClickHandler("on_index")}
          sortProps={getActiveProps("on_index")}
        >
          <FormControlLabel
            control={
              <Switch
                value={filter?.on_index}
                onChange={(event) => handleChangeFilter?.("on_index", event.target.checked)}
              />
            }
            label={<Text>Visible</Text>}
          />
        </TableHeadCell>
      ),
      minWidth: 80,
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