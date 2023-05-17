import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Panel } from "~shared/components/Panel";

export const TableWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Panel className='!bg-secondaryBg px-4 pt-0 xl:px-0'>
      <Box className='flex flex-col'>{children}</Box>
    </Panel>
  );
};
