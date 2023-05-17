import { Box } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";
import { Button } from "../Button";
import clsx from "clsx";
import { SearchIcon } from "~shared/components/Icons";

type Props = {
  opened: boolean;
  handleClose: () => void;
} & (
  | {
      handleSubmit?: () => void;
      footer?: never;
      handleDrop?: () => void;
    }
  | {
      footer?: ReactNode;
      handleDrop?: never;
      handleSubmit?: never;
    }
);

export const ModalFilters: React.FC<PropsWithChildren<Props>> = ({
  opened,
  footer,
  handleClose,
  handleDrop,
  handleSubmit,
  children
}) => {
  const handleDropClick = () => {
    handleDrop?.();
    handleClose();
  };

  const handleApplyClick = () => {
    handleSubmit?.();
    handleClose();
  };

  return (
    <Box
      className={clsx(
        "absolute w-full max-w-[1280px] bg-mainBg hidden z-50",
        "rounded-lg border border-primary-30 p-[24px] pt-[45px] mt-3",
        {
          "!block": opened
        }
      )}
      sx={{ boxShadow: "0px 2px 4px rgba(83, 83, 83, 0.1)" }}
    >
      {children}

      {footer}

      {!footer && (
        <Box className='flex items-center justify-end gap-6 mt-9'>
          {handleDrop && (
            <Button variant='outlined' onClick={handleDropClick}>
              Drop
            </Button>
          )}
          {handleSubmit && (
            <Button
              variant='contained'
              onClick={handleApplyClick}
              startIcon={<SearchIcon color='mainBg' />}
            >
              Find
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};
