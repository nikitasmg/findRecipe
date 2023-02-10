import React, { PropsWithChildren } from "react";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};
