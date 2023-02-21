import React, { Fragment } from "react";
import { useMeQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { Button, Fade, Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import { ProfilePage, SettingsPage } from "~shared/routes";
import { Link } from "react-router-dom";
import { Text } from "~/shared/components/Text";

const links = [
  {
    label: "Profile",
    path: ProfilePage
  },
  {
    label: "Settings",
    path: SettingsPage
  }
];

export const HeaderProfile: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const id = open ? "header-profile" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const client = useGraphqlClient();

  const { data } = useMeQuery(client);

  const name = data?.me.name ?? "";

  return (
    <Fragment>
      <Button className='!hidden md:!flex !capitalize' onClick={handleClick}>
        <Typography className='text-black'>{name}</Typography>

        <ExpandMoreIcon
          className={clsx("transition-transform duration-500 ease-in-out transform text-black", {
            "rotate-180": open,
            "rotate-0": !open
          })}
        />
      </Button>
      <Menu
        id={id}
        MenuListProps={{
          "aria-labelledby": id
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {links.map((link) => (
          <MenuItem className='!p-0' key={link.label}>
            <Link className='w-full px-4 py-2' to={link.path}>
              <Text>{link.label}</Text>
            </Link>
          </MenuItem>
        ))}
        <MenuItem className='!p-0'>
          <Button className='!capitalize  w-full !justify-start !px-4 !py-2'>
            <Text className='text-black' component='span'>
              Logout
            </Text>
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
