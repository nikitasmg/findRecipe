import React from "react";
import { SortOrder } from "~/generated/graphql";
import ClearIcon from "@mui/icons-material/Clear";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { Box } from "@mui/material";
import { Text } from "../Text";

type Filter = { id: string; title: string; value: string };
type Sort = { id: string; order: SortOrder; name: string };

export type Props = {
  filters?: Filter[];
  onRemoveFilter?: (id: string) => void;
  sort?: Sort[];
  onRemoveOrder?: () => void;
};

const Filter: React.FC<Filter & { onRemoveFilter: Props["onRemoveFilter"] }> = ({
  id,
  title,
  value,
  onRemoveFilter
}) => {
  const handleRemove = () => onRemoveFilter?.(id);

  return (
    <Box className='flex items-center rounded border-[1px] border-primary p-2 shrink-0'>
      <Text className='text-lg'>{title}</Text>
      {value ? <>:&nbsp;</> : ""}
      <Text>{value}</Text>
      <Box component='button' className='text-primary' onClick={handleRemove}>
        <ClearIcon />
      </Box>
    </Box>
  );
};

const Order: React.FC<Sort & { onRemoveOrder: Props["onRemoveOrder"] }> = ({
  order,
  name,
  onRemoveOrder
}) => (
  <Box className='flex'>
    <Box className='flex'>
      <Text>Sort by</Text>:<Text>{name}</Text>
    </Box>
    {order === SortOrder.Asc ? <NorthIcon /> : <SouthIcon />}
    {onRemoveOrder && <ClearIcon onClick={onRemoveOrder} />}
  </Box>
);

export const FiltersControl: React.FC<Props> = ({
  filters,
  sort,
  onRemoveOrder,
  onRemoveFilter
}) => {
  return (
    <Box className='flex gap-2 flex-wrap'>
      {sort?.map((item) => (
        <Order onRemoveOrder={onRemoveOrder} key={item.id} {...item} />
      ))}
      {filters?.map((item) => (
        <Filter onRemoveFilter={onRemoveFilter} key={item.id} {...item} />
      ))}
    </Box>
  );
};
