import { Box } from "@mui/material";
import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Languages } from "~/shared/types/Languages";
import { Text } from "../Text";
import { Link } from "../Link";
import { LinkButton } from "../LinkButton";
import { ButtonDelete } from "../ButtonDelete";
import { LangSwitcher } from "../LangSwitcher";
import { SaveButton } from "~shared/components/SaveButton";

type Props = {
  title: string;
  clientUrl?: string;
  backHref?: string;
  onBackClick?: () => void;
  onRemove?: () => void;
  onLangChange?: (lang: Languages) => void;
  formName?: string;
  isLoading?: boolean;
  hideSaveButton?: boolean;
};

export const DetailsHead: React.FC<Props> = ({
  title,
  clientUrl,
  onRemove,
  onBackClick,
  backHref,
  onLangChange,
  formName,
  isLoading,
  hideSaveButton
}) => (
  <Box className='flex flex-wrap items-center w-full md:flex-nowrap gap-6'>
    <LinkButton
      className='order-first w-full md:w-fit'
      onClick={onBackClick}
      href={backHref}
      variant='outlined'
    >
      Back
    </LinkButton>

    <Box className='order-last md:order-first w-full md:w-fit flex flex-col gap-6 md:flex-row items-center justify-center'>
      <Text
        className='w-full md:w-fit text-center text-mainText font-bold text-[24px]'
        component='h1'
        variant='h6'
      >
        {title}
      </Text>
      {onLangChange && <LangSwitcher onLangChange={onLangChange} />}
    </Box>

    {clientUrl && (
      <Link
        className='flex items-center justify-center w-full md:w-fit order-last md:order-first'
        to={clientUrl}
        target='_blank'
      >
        <Text component='span'>to the website</Text>
        <OpenInNewIcon className='!w-[20px] !h-[20px]' />
      </Link>
    )}

    <Box className='flex gap-6 md:ml-auto flex-wrap justify-end w-full md:w-fit'>
      {onRemove && <ButtonDelete className='w-full md:w-fit' onClick={onRemove} />}
      {!hideSaveButton && (
        <SaveButton className='w-full md:w-fit' disabled={isLoading} formName={formName} />
      )}
    </Box>
  </Box>
);
