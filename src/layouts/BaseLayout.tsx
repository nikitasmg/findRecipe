import React, { Fragment, PropsWithChildren } from "react";
import { Header } from "~/modules/Header";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className='grow'>{children}</main>
    </Fragment>
  );
};
