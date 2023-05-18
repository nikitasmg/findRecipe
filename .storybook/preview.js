import React from "react";
import { addDecorator } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "~/app/providers";
import { CustomThemeProvider } from "~/app/providers/Theme";
import "../src/app/providers/Translation";
import "../src/shared/styles/index.css";
import "../src/shared/styles/overrides.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

addDecorator((story) => <CustomThemeProvider>{story()}</CustomThemeProvider>);
addDecorator((story) => <BrowserRouter>{story()}</BrowserRouter>);
addDecorator((story) => <Providers>{story()}</Providers>);
