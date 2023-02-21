import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type Path = {
  title: React.ReactNode;
  path?: string;
  children?: Path[];
};

export const Path: React.FC<Path> = ({ children, path, title }) => {
  if (children) {
    return (
      <Accordion disableGutters elevation={0} square className='w-full'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='content-panel'
          id='content-panel'
          className='flex-row-reverse'
        >
          <Link className={clsx({ "underline text-green-500": !!path })} to={path ?? ""}>
            {title}
          </Link>
        </AccordionSummary>
        <AccordionDetails className='flex flex-col'>{children.map(Path)}</AccordionDetails>
      </Accordion>
    );
  }

  return (
    <Link
      className={clsx("px-10 py-[12px]", { "underline text-green-500": !!path })}
      to={path ?? ""}
    >
      {title}
    </Link>
  );
};
