import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "~/app/providers";
import { Router } from "~/app/providers/Router";

export const App: React.FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Providers>
  );
};
