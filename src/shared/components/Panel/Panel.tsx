import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

type Props = PropsWithChildren & {
  className?: string;
};

export const Panel: React.FC<Props> = ({ children, className }) => {
  return (
    <Box
      className={clsx(
        "flex flex-col m-8 mt-6 p-[24px] rounded-lg bg-mainBg max-w-[1280px] w-full overflow-auto",
        className
      )}
    >
      {children}
    </Box>
  );
};
