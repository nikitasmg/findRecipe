import React from "react";
import { Box, Tab, Fade, Menu, MenuItem } from "@mui/material";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Text } from "~/shared/components/Text";

export type HeaderTab = {
  label: string;
  path?: string;
  children?: {
    label: string;
    path?: string;
  }[];
};

type HeaderTabProps = {
  tab: HeaderTab;
  value: number;
  handleSelect?: (value: number) => void;
  activePath?: string;
};

export const HeaderTab: React.FC<HeaderTabProps> = ({ tab, value, handleSelect, activePath }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [width, setWidth] = React.useState<string>("");

  const open = Boolean(anchorEl);

  const id = open ? tab.label : undefined;

  const labelClassName = "text-secondaryText text-[16px] leading-[19px]";

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setWidth(`${Math.floor(event.currentTarget.getBoundingClientRect().width)}px`);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = () => {
    handleClose();
    handleSelect?.(value);
  };

  if (!tab.children) {
    return (
      <Tab
        className='h-[72px]'
        sx={{ opacity: 1 }}
        onClick={handleItemClick}
        value={value}
        label={<Text className={labelClassName}>{tab.label}</Text>}
      />
    );
  }

  return (
    <>
      <Tab
        className='h-[72px]'
        sx={{ opacity: 1 }}
        onClick={handleClick}
        id={id}
        aria-controls={id}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        value={value}
        label={
          <Box className='flex'>
            <Text className={labelClassName}>{tab.label}</Text>
            <ExpandMoreIcon
              className={clsx(
                "transition-transform duration-500 ease-in-out transform text-secondaryText",
                {
                  "rotate-180": open,
                  "rotate-0": !open
                }
              )}
            />
          </Box>
        }
      />
      <Menu
        id={id}
        MenuListProps={{
          "aria-labelledby": id,
          style: { minWidth: width }
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {tab.children.map((tabInner) => {
          const isActive = activePath && activePath === tabInner.path;

          return (
            <MenuItem className='!p-0' onClick={handleItemClick} key={tabInner.label}>
              <Link
                className={clsx("w-full px-4 py-2", {
                  "text-primary": isActive
                })}
                to={tabInner.path ?? ""}
              >
                <Text>{tabInner.label}</Text>
              </Link>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
