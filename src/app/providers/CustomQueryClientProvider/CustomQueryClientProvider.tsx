import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCacheClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

export const CustomQueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryCacheClient}>{children}</QueryClientProvider>;
};
