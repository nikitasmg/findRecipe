import React, { Fragment, PropsWithChildren } from "react";
import { Header } from "~/modules/Header";
import { Footer } from "~/modules/Footer";

export const BaseLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <main className='grow'>{children}</main>
      <Footer />
    </Fragment>
  );
};
