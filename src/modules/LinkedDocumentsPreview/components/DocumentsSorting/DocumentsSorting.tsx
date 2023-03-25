import { Box, Typography } from "@mui/material";
import React from "react";
import { TableHeadCell } from "~/shared/components/TableHeadLabel";
import { Text } from "~/shared/components/Text";
import { useSortProps } from "~/shared/hooks/useSortProps";
import { ActiveOrder } from "~/shared/types/ActiveOrder";

type Props = {
  handleChangeOrder: (order: ActiveOrder) => void;
  activeOrder: ActiveOrder;
};

export const DocumentsSorting: React.FC<Props> = ({ activeOrder, handleChangeOrder }) => {
  const { getClickHandler, getActiveProps } = useSortProps(handleChangeOrder, activeOrder);

  return (
    <Box className='flex flex-col sm:flex-row gap-6'>
      <Typography component='p'>
        <Text component='span'>Sort by</Text>:
      </Typography>
      <TableHeadCell
        title='ID'
        cellId='id'
        onSortClick={getClickHandler("id")}
        sortProps={getActiveProps("id")}
      />
      <TableHeadCell
        title='Title'
        cellId='user_name'
        onSortClick={getClickHandler("user_name")}
        sortProps={getActiveProps("user_name")}
      />
      <TableHeadCell
        title='Date create'
        cellId='created_at'
        onSortClick={getClickHandler("created_at")}
        sortProps={getActiveProps("created_at")}
      />
    </Box>
  );
};
