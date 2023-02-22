import { Box, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
import { Text } from "../Text";

type Props = {
  title: string;
  clientUrl?: string;
  onBackClick?: () => void;
  onRemove?: () => void;
};

export const DetailsHead: React.FC<Props> = ({ title, clientUrl, onRemove, onBackClick }) => {
  return (
    <Box className='flex flex-wrap items-center w-full md:flex-nowrap  gap-4'>
      <Button
        className='order-first'
        startIcon={<ArrowBackIosNewIcon />}
        onClick={onBackClick}
        variant='outlined'
        size='small'
      >
        <Text className='capitalize'>Back</Text>
      </Button>

      <Text
        className='order-last w-full md:w-fit md:order-first text-center'
        component='h1'
        variant='h6'
      >
        {title}
      </Text>

      {clientUrl && (
        <Link
          className='flex items-center justify-center w-full md:w-fit text-green-500 order-last md:order-first  hover:text-green-600'
          to={clientUrl}
          target='_blank'
        >
          <Text component='span'>to the website</Text>
          <OpenInNewIcon className='!w-[20px] !h-[20px]' />
        </Link>
      )}

      {onRemove && (
        <Button
          className='order-first !ml-auto'
          startIcon={<DeleteIcon />}
          onClick={onRemove}
          variant='outlined'
          color='error'
          size='small'
        >
          <Text className='capitalize'>Delete</Text>
        </Button>
      )}
    </Box>
  );
};
