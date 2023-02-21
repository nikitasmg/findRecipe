import React, { Fragment } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import { HomePageRoute } from "~shared/routes";
import { Logo } from "~shared/components/Logo";
import { useModal } from "~/shared/hooks/useModal";
import { MenuButton } from "~/shared/components/MenuButton";
import { NavigationMenu } from "./components/NavigationMenu";
import { HeaderTabs } from "./components/HeaderTabs";
import { HeaderProfile } from "./components/HeaderProfile";

export const Header: React.FC = () => {
  const { open, toggleModal, handleClose } = useModal();

  const toggleMenu = () => toggleModal();

  return (
    <Fragment>
      <Box
        component='header'
        className='flex items-center justify-between px-2 pt-2 border bg-white'
      >
        <Box className='flex items-center'>
          <Link to={HomePageRoute} className='p-2'>
            <Logo size='small' />
          </Link>

          <HeaderTabs />
        </Box>

        <HeaderProfile />

        <MenuButton className='md:!hidden' onClick={toggleMenu} opened={!!open} />
      </Box>
      <NavigationMenu handleClose={handleClose} opened={!!open} />
    </Fragment>
  );
};
