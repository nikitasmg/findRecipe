import React from "react";
import { Providers } from "~/app/providers";
import { Router } from "~/app/providers/Router";
import { Snackbar } from "~/modules/Snackbar";
import { Routing } from "~/pages/Routing";

export const App: React.FC = () => {
  return (
    <Providers>
      <Snackbar />
      <Router>
        <Routing />
      </Router>
    </Providers>
  );
};
