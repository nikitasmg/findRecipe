import React, { useEffect, useRef } from "react";
import { usePaths } from "~/app/providers/Paths";
import { Path } from "~shared/components/Path";
import { useOutsideClick } from "~shared/hooks/useOutsideClick";
import { useWindowSize } from "../../../../shared/hooks/useWindowSize";

type Props = {
  opened: boolean;
  handleClose: () => void;
};

export const NavigationMenu: React.FC<Props> = ({ opened, handleClose }) => {
  const paths = usePaths();

  const navigationRef = useRef<HTMLDivElement>(null);

  useOutsideClick(navigationRef, handleClose);

  const { width } = useWindowSize();

  useEffect(() => {
    handleClose();
  }, [width, handleClose]);

  if (!opened) {
    return null;
  }

  return (
    <div ref={navigationRef} className='flex flex-col p-2 bg-white border-b-2'>
      {paths.map((path, i) => (
        <Path key={i} {...path} />
      ))}
    </div>
  );
};
