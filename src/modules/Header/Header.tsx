import React, { Fragment } from "react";
import { Box, ClickAwayListener } from "@mui/material";
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
      <Box component='header' className='flex justify-center border bg-mainBg'>
        <Box className='flex items-center justify-between px-2 pt-2 w-full max-w-[1280px]'>
          <Box className='flex items-center'>
            <Link to={HomePageRoute} className='p-2 shrink-0'>
              <Logo size='small' />
            </Link>

            <HeaderTabs />
          </Box>

          <Box className='hidden md:block'>
            <HeaderProfile />
          </Box>

          <ClickAwayListener onClickAway={handleClose} touchEvent='onTouchStart'>
            <Fragment>
              <MenuButton className='md:!hidden' onClick={toggleMenu} opened={!!open} />
              <NavigationMenu handleClose={handleClose} opened={!!open} />
            </Fragment>
          </ClickAwayListener>
        </Box>
      </Box>
    </Fragment>
  );
};
