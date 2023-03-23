import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "../Link";
import { Text } from "../Text";

export type Path = {
  label: string;
  path?: string;
  children?: Path[];
  initialExpanded?: boolean;
};

export const Path: React.FC<Path> = ({ children, path, label, initialExpanded }) => {
  const presentationClassNames = clsx({ underline: !!path, "!text-black": !path });

  if (children) {
    return (
      <Accordion
        defaultExpanded={initialExpanded}
        disableGutters
        elevation={0}
        square
        className='w-full'
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='content-panel'
          id='content-panel'
          className='flex-row-reverse'
        >
          <Link className={presentationClassNames} to={path ?? ""}>
            <Text component='span'>{label}</Text>
          </Link>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col'>{children.map(Path)}</AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Link className={clsx("px-10 py-[12px]", presentationClassNames)} to={path ?? ""}>
      <Text component='span'>{label}</Text>
    </Link>
  );
};
