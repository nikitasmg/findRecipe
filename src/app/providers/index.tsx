import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import React, { PropsWithChildren, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { CustomQueryClientProvider } from "./CustomQueryClientProvider";
import { GraphQlClientProvider } from "./GraphqlClient";
import { PathsProvider } from "./Paths";
import { CustomThemeProvider } from "./Theme";
import "./Translation";

type Props = {
  providers: React.FC<PropsWithChildren>[];
};

const CombineProviders = ({ providers, children }: PropsWithChildren<Props>) =>
  providers.reduceRight(
    (tree, StoreComponent) => <StoreComponent>{tree}</StoreComponent>,
    children as ReactElement
  );

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider adapterLocale={i18n.language} dateAdapter={AdapterDayjs}>
      <CombineProviders
        providers={[
          GraphQlClientProvider,
          PathsProvider,
          CustomThemeProvider,
          CustomQueryClientProvider
        ]}
      >
        {children}
      </CombineProviders>
    </LocalizationProvider>
  );
};
