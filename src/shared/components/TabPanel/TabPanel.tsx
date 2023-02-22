import React from "react";
import { PropsWithChildren } from "react";
import { clsx } from "clsx";

type Props = {
  index: number;
  value: number;
  className?: string;
};

export const TabPanel: React.FC<PropsWithChildren<Props>> = ({
  children,
  value,
  index,
  className,
  ...other
}) => {
  const id = `tabpanel-${index}`;

  return (
    <div
      role='tabpanel'
      className={clsx(className, { hidden: value !== index })}
      hidden={value !== index}
      id={id}
      aria-labelledby={id}
      {...other}
    >
      {children}
    </div>
  );
};
