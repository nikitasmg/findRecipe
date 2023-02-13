import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@/app/App";
import "@shared/styles/index.css";

export const root = ReactDOM.createRoot(document.getElementById("root") as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
