import React, { Fragment } from "react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CircularProgress, Fade, Menu, MenuItem, Typography } from "@mui/material";
import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "~/generated/graphql";
import { useGraphqlClient } from "~/app/providers/GraphqlClient";
import { LoginPageRoute, SettingsPage } from "~shared/routes";
import { Text } from "~shared/components/Text";
import { Button } from "~/shared/components/Button";
import { useAuthStore } from "~/shared/stores/auth";

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

  const { data, isLoading, isSuccess } = useMeQuery(client);

  const unAuth = useAuthStore((state) => state.unAuth);

  const { mutateAsync: logout, isLoading: isLogoutLoading } = useLogoutMutation(client);

  const name = data?.me.name ?? "";

  const loaderVisible = isLoading || isLogoutLoading;

  const isEmptyProfile = !name && isSuccess;

  const handleLogoutClick = () => {
    unAuth();
    logout({});
    history(LoginPageRoute);
  };

  return (
    <Fragment>
      <Button className='flex' onClick={handleClick}>
        {loaderVisible && <CircularProgress />}
        <Typography className='text-mainText'>{name}</Typography>

        {isEmptyProfile && <ManageAccountsIcon />}

        <ExpandMoreIcon
          className={clsx("transition-transform duration-500 ease-in-out transform text-mainText", {
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
