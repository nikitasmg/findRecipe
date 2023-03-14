import React, { Fragment, PropsWithChildren } from "react";
import PopupStateContainer, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { PopupState } from "material-ui-popup-state/hooks";
import { Box, Popover, TableSortLabel } from "@mui/material";
import clsx from "clsx";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import { Button } from "../Button";
import styles from "./TableHeadLabel.module.css";

type Props = {
  cellId: string;
  title: string;
  isFilterActive?: boolean;
  onSortClick?: (cellId: string) => void;
  sortProps?: { active: boolean; direction: "asc" | "desc" };
  align?: "left" | "center" | "right";
  filterKey?: string;
  removeFilter?: (key: string) => void;
};

export const TableHeadCell: React.FC<PropsWithChildren<Props>> = ({
  cellId,
  title,
  onSortClick,
  sortProps,
  align = "left",
  children,
  isFilterActive,
  removeFilter,
  filterKey
}) => {
  const handleClickSort = () => {
    onSortClick?.(cellId);
  };

  const disableFilter = () => removeFilter?.(filterKey ?? "");

  return (
    <PopupStateContainer variant='popover' popupId={cellId}>
      {(popupState: PopupState) => (
        <Fragment>
          <Box className={clsx("flex items-center", { "justify-center": align === "center" })}>
            <Button
              className={clsx("!block !min-w-fit text-black", {
                "cursor-default": !handleClickSort,
                "!text-primary": sortProps?.active
              })}
              {...bindTrigger(popupState)}
              onClick={handleClickSort}
              textProps={{ align }}
            >
              {title}
            </Button>
            {sortProps && (
              <TableSortLabel
                className={clsx(styles.sortIcon, {
                  "cursor-default": !handleClickSort,
                  [styles.sortActive]: sortProps.active
                })}
                onClick={handleClickSort}
                {...sortProps}
              />
            )}
            {isFilterActive && !!removeFilter && (
              <FilterListOffIcon tabIndex={-1} onClick={disableFilter} />
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
