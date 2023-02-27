import React, { Fragment, PropsWithChildren } from "react";
import PopupStateContainer, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { PopupState } from "material-ui-popup-state/hooks";
import { Box, Button, Popover, TableSortLabel } from "@mui/material";
import { Text } from "../Text";
import styles from "./TableHeadCell.module.css";

type Props = {
  cellId: string;
  title: string;
  isFilterActive?: boolean;
  onSortClick?: (cellId: string) => void;
  sortProps?: { active: boolean; direction: "asc" | "desc" };
  align?: "left" | "center" | "right";
};

export const TableHeadCell: React.FC<PropsWithChildren<Props>> = ({
  cellId,
  title,
  onSortClick,
  isFilterActive,
  sortProps,
  align = "left",
  children
}) => {
  const handleClickSort = () => {
    onSortClick?.(cellId);
  };

  return (
    <PopupStateContainer variant='popover' popupId={cellId}>
      {(popupState: PopupState) => (
        <Fragment>
          <Box className='flex'>
            <Button className='!block !capitalize' {...bindTrigger(popupState)}>
              <Text align={align} color={!isFilterActive ? "black" : ""}>
                {title}
              </Text>
            </Button>
            {sortProps && (
              <TableSortLabel
                className={styles.sortIcon}
                onClick={handleClickSort}
                {...sortProps}
              />
            )}
          </Box>
          {children && (
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
            >
              <div className='p-2'>{children}</div>
            </Popover>
          )}
        </Fragment>
      )}
    </PopupStateContainer>
  );
};
