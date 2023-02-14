import React from "react";
import { Box, TableSortLabel } from "@mui/material";
import { SortOrder } from "~/api/generated/graphql";
import { Text } from "~/shared/components/Text";
import { ActiveOrder, Column } from "../types";

export const getColumns = (
  activeOrder?: ActiveOrder,
  handleOrderClick?: (_activeOrder: ActiveOrder) => void
): Column[] => {
  const getClickHandler = (name: string) => () => {
    if (activeOrder?.name === name && activeOrder.direction === SortOrder.Desc) {
      return handleOrderClick?.(null);
    }

    const direction = activeOrder?.name === name ? SortOrder.Desc : SortOrder.Asc;

    return handleOrderClick?.({ name, direction });
  };

  const getActiveProps = (name: string) => ({
    active: activeOrder?.name === name,
    direction: (activeOrder?.name === name
      ? activeOrder?.direction.toLocaleLowerCase()
      : "desc") as never
  });

  return [
    {
      id: "id",
      label: (
        <Box className='flex'>
          <Text>ID</Text>
          <TableSortLabel onClick={getClickHandler("id")} {...getActiveProps("id")} />
        </Box>
      )
    },
    {
      id: "name",
      label: (
        <Box className='flex'>
          <Text>Name</Text>
          <TableSortLabel onClick={getClickHandler("name")} {...getActiveProps("name")} />
        </Box>
      ),
      minWidth: 100
    },
    {
      id: "description",
      label: (
        <Box className='flex'>
          <Text>Description</Text>
          <TableSortLabel
            onClick={getClickHandler("description")}
            {...getActiveProps("description")}
          />
        </Box>
      ),
      minWidth: 170
    },
    {
      id: "content",
      label: (
        <Box className='flex'>
          <Text>Content</Text>
          <TableSortLabel onClick={getClickHandler("content")} {...getActiveProps("content")} />
        </Box>
      ),
      minWidth: 170
    },
    {
      id: "created_at",
      label: (
        <Box className='flex'>
          <Text>Created at</Text>
          <TableSortLabel
            onClick={getClickHandler("created_at")}
            {...getActiveProps("created_at")}
          />
        </Box>
      ),
      minWidth: 170,
      format: (value: string) => {
        const date = new Date(value);

        return `${date.getDate()}.${`${date.getMonth()}`.padStart(2, "0")}.${date.getFullYear()}`;
      }
    }
  ];
};
