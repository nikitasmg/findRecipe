import { ClickAwayListener } from "@mui/material";
import React, { useEffect } from "react";
import { usePaths } from "~/app/providers/Paths";
import { Path } from "~shared/components/Path";
import { useWindowSize } from "~shared/hooks/useWindowSize";

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
    <ClickAwayListener onClickAway={handleClose}>
      <div className='flex flex-col p-2 bg-white border-b-2'>
        {paths.map((path, i) => (
          <Path key={i} {...path} />
        ))}
      </div>
    </ClickAwayListener>
  );
};
