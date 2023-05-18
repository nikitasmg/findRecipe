import {
  Box,
  ButtonProps,
  ClickAwayListener,
  Tooltip,
  tooltipClasses,
  TooltipProps
} from "@mui/material";
import React, { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { useModal } from "~/shared/hooks/useModal";
import { Button } from "../Button";
import { Text } from "../Text";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow placement='bottom-end' classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "F3F4F6"
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#F3F4F6",
    padding: "10px",
    boxShadow: "10px 5px 5px gray",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    border: "1px solid black",
    fontSize: theme.typography.pxToRem(12)
  }
}));

export const ButtonDelete: React.FC<ButtonProps & { children?: ReactElement }> = ({
  onClick,
  children,
  ...buttonProps
}) => {
  const { open, handleOpen, handleClose } = useModal();

  const handleClick = () => {
    handleOpen();
  };

  const onSuccess: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose} touchEvent='onTouchStart'>
      <CustomTooltip
        disableHoverListener
        title={
          <Box className='flex flex-col gap-4'>
            <Text>Are you sure you want to delete?</Text>
            <Box className='flex gap-6'>
              <Button
                className='px-2 w-full min-w-fit'
                variant='outlined'
                color='success'
                size='small'
                onClick={handleClose}
              >
                No
              </Button>

              <Button
                className='px-2 w-full min-w-fit'
                variant='outlined'
                color='error'
                size='small'
                onClick={onSuccess}
                startIcon={<DeleteIcon />}
              >
                Yes
              </Button>
            </Box>
          </Box>
        }
        open={!!open}
        arrow
      >
        <Button
          startIcon={!children && <DeleteIcon />}
          variant='outlined'
          color='error'
          size='small'
          {...buttonProps}
          onClick={handleClick}
        >
          {children || "Delete"}
        </Button>
      </CustomTooltip>
    </ClickAwayListener>
  );
};
