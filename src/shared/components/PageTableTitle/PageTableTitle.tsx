import { Box, CircularProgress, Link, Typography } from "@mui/material";
import React from "react";
import { PageTitle } from "../PageTitle";
import { Text } from "../Text";
import { ExternalLinkIcon } from "~shared/components/Icons";

type Props = {
  title: string;
  count?: number;
  isLoading?: boolean;
  sitePath?: string;
};

export const PageTableTitle: React.FC<Props> = ({ title, count, isLoading, sitePath }) => {
  const isWithCount = typeof count !== "undefined";

  return (
    <PageTitle>
      <Text className='text-mainText font-bold text-[24px]' component='p'>
        {title}
      </Text>
      {isWithCount && (
        <Box component='p' className='flex items-center'>
          <Text className='text-secondaryText pt-1' component='span'>
            Count
          </Text>
          <Typography className='text-secondaryText pt-1' component='span'>
            :&nbsp;&nbsp;
          </Typography>
          {isLoading && <CircularProgress size={14} />}
          {!isLoading && (
            <Text className='text-secondaryText pt-1' component='span'>{`${count}`}</Text>
          )}
        </Box>
      )}
      {sitePath && (
        <Link
          className='flex gap-1 items-center hover:opacity-80 cursor:pointer'
          href={`${process.env.REACT_APP_SITE_URL}${sitePath === "/" ? "" : sitePath}`}
          target='_blank'
        >
          <ExternalLinkIcon />
          <Text className='underline text-blueText font-medium'>Page on the site</Text>
        </Link>
      )}
    </PageTitle>
  );
};
