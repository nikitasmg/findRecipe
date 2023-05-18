import { Box } from "@mui/material";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Languages } from "~/shared/types/Languages";
import { Text } from "../Text";
import { Link } from "../Link";
import { LinkButton } from "../LinkButton";
import { ButtonDelete } from "../ButtonDelete";
import { LangSwitcher } from "../LangSwitcher";

type Props = {
  title: string;
  clientUrl?: string;
  backHref?: string;
  onBackClick?: () => void;
  onRemove?: () => void;
  onLangChange?: (lang: Languages) => void;
};

export const DetailsHead: React.FC<Props> = ({
  title,
  clientUrl,
  onRemove,
  onBackClick,
  backHref,
  onLangChange
}) => (
  <Box className='flex flex-wrap items-center w-full md:flex-nowrap  gap-4'>
    <LinkButton
      className='order-first'
      startIcon={<ArrowBackIosNewIcon />}
      onClick={onBackClick}
      href={backHref}
      variant='outlined'
      size='small'
    >
      Back
    </LinkButton>

    <Box className='order-last md:order-first w-full md:w-fit flex flex-col gap-4 md:flex-row items-center justify-center'>
      <Text className='w-full md:w-fit text-center' component='h1' variant='h6'>
        {title}
      </Text>
      {onLangChange && <LangSwitcher onLangChange={onLangChange} />}
    </Box>

    {clientUrl && (
      <Link
        className='flex items-center justify-center w-full md:w-fit  order-last md:order-first'
        to={clientUrl}
        target='_blank'
      >
        <Text component='span'>to the website</Text>
        <OpenInNewIcon className='!w-[20px] !h-[20px]' />
      </Link>
    )}

    {onRemove && <ButtonDelete className='order-first !ml-auto' onClick={onRemove} />}
  </Box>
);
