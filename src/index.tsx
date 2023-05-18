import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "~/app/App";
import "~shared/styles/index.css";

export const bootstrap = () => {
  const domRoot: Element | null = document?.getElementById("root");

  if (!domRoot) {
    return;
  }

  const root = ReactDOM.createRoot(domRoot);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

bootstrap();
