import { Box, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { PropsWithChildren, ReactNode } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "../Button";
import { Text } from "../Text";

type Props = {
  opened: boolean;
  handleClose: () => void;
  title?: string;
} & (
  | {
      handleSuccess?: () => void;
      footer?: never;
      handleDrop?: () => void;
    }
  | {
      footer?: ReactNode;
      handleDrop?: never;
      handleSuccess?: never;
    }
);

export const ModalFilters: React.FC<PropsWithChildren<Props>> = ({
  opened,
  footer,
  handleClose,
  handleDrop,
  handleSuccess,
  title,
  children
}) => {
  const handleDropClick = () => {
    handleDrop?.();
    handleClose();
  };

  const handleApplyClick = () => {
    handleSuccess?.();
    handleClose();
  };

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      className='!w-full'
      PaperProps={{
        className: "w-full h-full !max-w-full !max-h-[90%] sm:w-[600px] sm:h-fit overflow-auto"
      }}
    >
      <Box className='flex items-center justify-between p-[20px]'>
        <Text className='font-bold'>{title ?? "Filters"}</Text>

        <Button onClick={handleClose} size='small' className='!min-w-fit'>
          <CloseIcon />
        </Button>
      </Box>

      <DialogContent>{children}</DialogContent>

      {footer}

      {!footer && (
        <DialogActions>
          {handleDrop && (
            <Button color='error' variant='outlined' onClick={handleDropClick}>
              Drop
            </Button>
          )}
          {handleSuccess && (
            <Button variant='outlined' onClick={handleApplyClick}>
              Apply
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};
