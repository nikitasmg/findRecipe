import { Box, SwipeableDrawer } from "@mui/material";
import React, { useEffect } from "react";
import { usePaths } from "~/app/providers/Paths";
import { Path } from "~shared/components/Path";
import { useWindowSize } from "~shared/hooks/useWindowSize";
import { HeaderProfile } from "../HeaderProfile";

type Props = {
  opened: boolean;
  handleClose: () => void;
};

export const NavigationMenu: React.FC<Props> = ({ opened, handleClose }) => {
  const paths = usePaths();

  const { width } = useWindowSize();

  useEffect(() => {
    handleClose();
  }, [width, handleClose]);

  if (!opened) {
    return null;
  }

  return (
    <SwipeableDrawer
      className='flex flex-col p-2 bg-mainBg border-b-2 fixed left-0 w-full z-50'
      anchor='top'
      open={opened}
      onClose={handleClose}
      onOpen={() => null}
    >
      {paths.map((path, i) => (
        <Path key={i} {...path} onLinkClick={handleClose} />
      ))}
      <HeaderProfile />
    </SwipeableDrawer>
  );
};
