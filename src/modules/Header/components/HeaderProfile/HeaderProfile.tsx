import React, { Fragment } from "react";
import { Fade, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { LoginPageRoute, SettingsPage } from "~shared/routes";
import { Text } from "~shared/components/Text";
import { Button } from "~/shared/components/Button";
import { useAuthStore } from "~/shared/stores/auth";
import { MoreVert } from "@mui/icons-material";

const links = [
  {
    label: "Settings",
    path: SettingsPage
  }
];

export const HeaderProfile: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const id = open ? "header-profile" : undefined;

  const history = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const client = useGraphqlClient();

  const unAuth = useAuthStore((state) => state.unAuth);

  const { mutateAsync: logout } = useLogoutMutation(client);

  const handleLogoutClick = () => {
    unAuth();
    logout({});
    history(LoginPageRoute);
  };

  return (
    <Fragment>
      <IconButton onClick={handleClick}>
        <MoreVert className='text-mainText text-[24px]' />
      </IconButton>
      <Menu
        id={id}
        MenuListProps={{
          "aria-labelledby": id
        }}
        className='!w-full'
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
          <Button onClick={handleLogoutClick} className='w-full !justify-start !px-4 !py-2'>
            Logout
          </Button>
        </MenuItem>
      </Menu>
    </Fragment>
  );
};
