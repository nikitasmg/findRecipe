import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { PageTitle } from "../PageTitle";
import { Text } from "../Text";

type Props = {
  title: string;
  countTitle: string;
  count: number;
  isLoading: boolean;
};

export const PageTableTitle: React.FC<Props> = ({ title, countTitle, count, isLoading }) => {
  return (
    <PageTitle>
      <Text component='p'>{title}</Text>
      <Box component='p' className='flex items-end'>
        <Text className='text-secondaryText' component='span'>
          {countTitle}
        </Text>
        &nbsp;
        {isLoading && <CircularProgress size={16} />}
        {!isLoading && <Text className='text-secondaryText' component='span'>{`${count}`}</Text>}
      </Box>
    </PageTitle>
  );
};
