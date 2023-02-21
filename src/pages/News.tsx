import { Box } from "@mui/material";
import React, { useState } from "react";
import { NewsTable } from "~/modules/NewsTable";
import { PageTitle } from "~/shared/components/PageTitle";
import { Text } from "~/shared/components/Text";

export const News: React.FC = () => {
  const [newsCount, setNewsCount] = useState(0);

  return (
    <Box className='!flex flex-col h-full'>
      <PageTitle>
        <Text className='px-4' component='p'>
          News
        </Text>
        <Text className='text-gray-600' component='span'>
          count news
        </Text>
        &nbsp;
        <Text className='text-gray-600'>{`${newsCount}`}</Text>
      </PageTitle>
      <NewsTable onNewsCountChange={setNewsCount} />
    </Box>
  );
};
