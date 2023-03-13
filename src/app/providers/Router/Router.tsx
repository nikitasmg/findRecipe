import React from "react";
import { PropsWithChildren, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const Router: React.FC<PropsWithChildren> = ({ children }) => (
  <BrowserRouter>
    <Suspense>{children}</Suspense>
  </BrowserRouter>
);
