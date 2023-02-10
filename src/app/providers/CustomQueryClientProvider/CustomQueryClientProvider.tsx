import React, { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000
    }
  }
});

export const CustomQueryClientProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryCache}>{children}</QueryClientProvider>;
};
