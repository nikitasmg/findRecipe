import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "~/app/providers";
import { Router } from "~/app/providers/Router";
import { Snackbar } from "~/modules/Snackbar";

export const App: React.FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Snackbar />
        <Router />
      </BrowserRouter>
    </Providers>
  );
};
