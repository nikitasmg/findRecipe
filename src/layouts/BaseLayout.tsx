import { Header } from "@/modules/Header";
import React, { PropsWithChildren } from "react";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
